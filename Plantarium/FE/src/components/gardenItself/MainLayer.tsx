import { useState, useContext, useRef } from "react";
import { Stage, Layer, Rect, Text, Group, Circle } from "react-konva";
import useImage from "use-image";
import { UserContext, StructContext, BedsContext, SinglePlantContext } from "../../contexts";
import { IBed, IBedPlant, IPlant, IStructure } from "../../interfaces/interfaces";
import { DialogContext } from "../dialogues/Dialogcontext";
import { Button } from "@headlessui/react";

type Props = {
    isPlacing: boolean;
    pendingStruct: IStructure | null;
    setIsPlacing: (v: boolean) => void;
    pendingPlant: any | null;
    setPendingPlant: (p: any | null) => void;
    weather: any | null;
};

function MainLayer({ isPlacing, pendingStruct, setIsPlacing, pendingPlant, setPendingPlant, weather }: Props) {
    const user = useContext(UserContext);
    const { structures, setStructures } = useContext(StructContext) || { structures: [], setStructures: () => { } };
    const { beds, setBeds, setActiveBedId } = useContext(BedsContext)!;
    const stageRef = useRef<any>(null);
    const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);
    const [hoveredBedIndex, setHoveredBedIndex] = useState<number | null>(null);

    const plantCtx = useContext(SinglePlantContext);
    if (!plantCtx) {
        return <p className="text-white">Lade Pflanzen...</p>;
    }
    const { singularPlants, setSingularPlants } = plantCtx;

    const dialog = useContext(DialogContext);

    const [grassImg] = useImage("../../assets/grass.jpg");
    const [bedImg] = useImage("../../assets/soil.jpg");
    const [terImg] = useImage("../../assets/terace.jpg");
    const [roofImg] = useImage("../../assets/roof.jpg");
    const [pathImg] = useImage("../../assets/path.jpg");

    if (!user) return <p className="text-white p-4">Lade Nutzerdaten...</p>;

    const gardenWidth = Number(user.width) * 100;
    const gardenHeight = Number(user.height) * 100;

    const SNAP_THRESHOLD = 15;

    const [, setNeedsWatering] = useState<boolean>(false);

    const enoughWater = (entity: IBedPlant | IPlant) => {
        const last5DaysSum = weather?.last5DaysSum ?? 0;
        const interval = (entity as any)?.plants?.watering_interval;

        const lastWatered = (entity as any).last_watered || (entity as any).plants?.last_watered;
        if (lastWatered) {
            const diffDays =
                (new Date().getTime() - new Date(lastWatered).getTime()) /
                (1000 * 60 * 60 * 24);

            if (diffDays <= interval) {
                return true;
            }
        }

        if (interval === 1 && last5DaysSum > 7) return true;
        if (interval === 2 && last5DaysSum > 12) return true;
        if (interval === 3 && last5DaysSum > 16) return true;
        else return false;
    };

    const waterAllPlants = async () => {
        await Promise.all(
            beds.flatMap((b) =>
                (b.bed_plants ?? []).map((bp: IBedPlant) =>
                    updateWatered(bp, "bed")
                )
            )
        );
        await Promise.all(
            singularPlants.map((sp: IPlant) =>
                updateWatered(sp, "plant")
            )
        );
        setNeedsWatering(false);
    }

    const updateWatered = async (entity: any, type: "bed" | "plant") => {
        if (enoughWater(entity)) {
            setNeedsWatering(true);
            return;
        }
        const today = new Date().toISOString().split("T")[0];

        if (type === "bed") {
            const bedId = (entity as any).bed_id;
            const plantId = (entity as any).plants.id;
            await fetch(`${import.meta.env.VITE_BEDS_URL}/me/garden/beds/${bedId}/plants/${plantId}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ last_watered: today }),
            });
            setBeds((prev) =>
                prev.map((b) =>
                    b.id === bedId
                        ? {
                            ...b,
                            bed_plants: b.bed_plants.map((bp:any) =>
                                bp.plants.id === plantId
                                    ? {
                                        ...bp,
                                        plants: {
                                            ...bp.plants,
                                            last_watered: today,
                                        },
                                    }
                                    : bp
                            ),
                        }
                        : b
                )
            );

        } else {
            const plantId = (entity as any).plants.id;
            await fetch(`${import.meta.env.VITE_PLANTS_URL}/me/garden/individual-plants/${plantId}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ last_watered: today }),
            });
            setSingularPlants((prev) =>
                prev.map((p) =>
                    p.plants.id === plantId ? { ...p, last_watered: today } : p
                ));
        }
    };


    const snapTo = (pos: { x: number; y: number }, width: number, height: number) => {
        const candidates = [...structures, ...beds];
        let snappedX = pos.x;
        let snappedY = pos.y;

        for (const item of candidates) {
            const edges = {
                left: item.x_position,
                right: item.x_position + item.width,
                top: item.y_position,
                bottom: item.y_position + item.height,
            };

            if (Math.abs(pos.x - edges.left) < SNAP_THRESHOLD)
                snappedX = edges.left;
            else if (Math.abs(pos.x + width - edges.right) < SNAP_THRESHOLD)
                snappedX = edges.right - width;
            else if (Math.abs(pos.x - edges.right) < SNAP_THRESHOLD)
                snappedX = edges.right;
            else if (Math.abs(pos.x + width - edges.left) < SNAP_THRESHOLD)
                snappedX = edges.left - width;


            if (Math.abs(pos.y - edges.top) < SNAP_THRESHOLD)
                snappedY = edges.top;
            else if (Math.abs(pos.y + height - edges.bottom) < SNAP_THRESHOLD)
                snappedY = edges.bottom - height;
            else if (Math.abs(pos.y - edges.bottom) < SNAP_THRESHOLD)
                snappedY = edges.bottom;
            else if (Math.abs(pos.y + height - edges.top) < SNAP_THRESHOLD)
                snappedY = edges.top - height;

        }

        snappedX = Math.max(0, Math.min(snappedX, gardenWidth - width));
        snappedY = Math.max(0, Math.min(snappedY, gardenHeight - height));
        return { x: snappedX, y: snappedY };
    };

    const handleDragMove = (e: any) => {
        if (!pendingStruct) return;

        const pos = e.target.position();
        const width = pendingStruct.width * 200;
        const height = pendingStruct.height * 200;

        const snapped = snapTo(pos, width, height);
        e.target.position(snapped);
        setDragPos(snapped);
    };

    const handleDragEnd = async (e: any) => {
        if (!pendingStruct || !isPlacing) return;

        const pos = e.target.position();
        const isBed = pendingStruct.type === "bed";

        const baseUrl = isBed
            ? import.meta.env.VITE_BEDS_URL
            : import.meta.env.VITE_STRUCT_URL;

        try {
            const res = await fetch(
                `${baseUrl}/me/garden/${isBed ? "beds" : "surfaces"}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({
                        type: isBed ? undefined : pendingStruct.type,
                        x_position: pos.x,
                        y_position: pos.y,
                        width: pendingStruct.width * 100,
                        height: pendingStruct.height * 100,
                    }),
                }
            );
            console.log("baseUrl", baseUrl);
            if (res.ok) {
                const data = await res.json();
                const newStruct = {
                    ...data.data,
                    width: pendingStruct.width * 100,
                    height: pendingStruct.height * 100,
                };
                if (isBed) {
                    setBeds((prev: IBed[]) => [...prev, newStruct]);
                } else {
                    setStructures((prev: IStructure[]) => [...prev, newStruct]);
                }
                setIsPlacing(false);
                setDragPos(null);
            }
        } catch (err) {
            console.error("Speicherfehler", err);
        }
    };

    return (
        <main className="flex-grow pt-[60px] w-full overflow-auto">

            <p> the last time it rained in your garden was: {weather?.lastRainDay?.date ?? "—"} </p>
            <p> it rained {weather?.last5DaysSum ?? "—"} mm</p>
            <Button className="m-3 p-2 pl-8 pr-8 rounded-xl text-white bg-darkMint/80 font-normal hover:bg-darkMint/50 active:scale-97 transition duration-150" onClick={async () => await waterAllPlants()}
            >water your garden</Button>

            <div className="w-full flex justify-center mt-5">
                <Stage
                    width={gardenWidth}
                    height={gardenHeight}
                    ref={stageRef}
                    className="mb-10">
                    <Layer>
                        <Rect
                            x={0}
                            y={0}
                            width={gardenWidth}
                            height={gardenHeight}
                            fillPatternImage={grassImg}
                            fillPatternRepeat="repeat"
                            fillPatternScale={{ x: 0.4, y: 0.4 }}
                            shadowBlur={10}
                        />
                    </Layer>

                    <Layer>
                        {structures.map((s, i) => {
                            let fill = pathImg;
                            if (s.type === "terrace") fill = terImg;
                            else if (s.type === "building") fill = roofImg;
                            else if (s.type === "bed") fill = bedImg;

                            return (
                                <Rect
                                    key={i}
                                    x={s.x_position}
                                    y={s.y_position}
                                    width={s.width}
                                    height={s.height}
                                    shadowBlur={s.type === "building" ? 20 : s.type === "terrace" ? 5 : 0}
                                    fillPatternImage={fill}
                                    fillPatternRepeat="repeat"
                                    fillPatternScale={{ x: 0.15, y: 0.15 }}
                                />
                            );
                        })}
                        {beds.map((b: any, i: number) => (
                            <Group
                                key={`bed-fragment-${i}`}
                                onMouseEnter={() => setHoveredBedIndex(i)}
                                onMouseLeave={() => setHoveredBedIndex(null)}
                            >
                                <Rect
                                    x={b.x_position}
                                    y={b.y_position}
                                    width={b.width}
                                    height={b.height}
                                    fillPatternImage={bedImg}
                                    fillPatternScale={{ x: 0.4, y: 0.4 }}
                                    stroke={"green"}
                                    strokeWidth={0.5}
                                    onClick={() => {
                                        if (b.bed_plants && b.bed_plants.length > 0) {
                                            alert("In diesem Beet ist schon eine Pflanze. Du kannst hier nichts Neues setzen.");
                                            return;
                                        }
                                        dialog.setActiveDialog("plant-bed");
                                        setActiveBedId(b.id);
                                    }}
                                />
                                {b.bed_plants?.[0] && !enoughWater(b.bed_plants?.[0]) &&
                                    <Rect
                                        x={b.x_position}
                                        y={b.y_position}
                                        width={b.width}
                                        height={b.height}
                                        fill={"brown"}
                                        opacity={0.4}
                                    />}
                                {hoveredBedIndex === i && (
                                    <Text
                                        x={b.x_position + 5}
                                        y={b.y_position + 5}
                                        text={`Beet ${b.id}:\n${b.bed_plants?.[0]?.plants?.name ?? "click to plant"
                                            }`}
                                        fontFamily="Calibri"
                                        fontSize={15}
                                        fill="white"
                                    />
                                )}
                            </Group>
                        ))}
                        {/* das hier das grüne hovervierecke:  */}

                        {isPlacing && pendingStruct && (
                            <Rect
                                x={dragPos?.x || 50}
                                y={dragPos?.y || 50}
                                width={pendingStruct.width * 100}
                                height={pendingStruct.height * 100}
                                fill="rgba(0, 200, 0, 0.3)"
                                draggable
                                onDragMove={handleDragMove}
                                onDragEnd={handleDragEnd}
                            />
                        )}
                    </Layer>
                    <Layer>
                        {singularPlants.map((p: any, i: number) => (
                            <Group>
                                <Circle
                                    key={`plant-${i}`}
                                    x={p.x_position}
                                    y={p.y_position}
                                    radius={15}
                                    fill={enoughWater(p) ? "green" : "brown"}
                                    shadowBlur={5}
                                />
                                <Text
                                    x={(p.x_position ?? 0) - 5}
                                    y={(p.y_position ?? 0) - 5}
                                    text={p.plants.id}
                                    fontFamily="Calibri"
                                    fontSize={12}
                                    fill="white"
                                />
                            </Group>
                        ))}

                        {isPlacing && pendingPlant && (
                            <Circle
                                x={dragPos?.x || 50}
                                y={dragPos?.y || 50}
                                radius={15}
                                fill="rgba(0, 200, 0, 0.3)"
                                draggable
                                onDragMove={(e) => {
                                    const pos = e.target.position();
                                    const snapped = snapTo(pos, 30, 30);
                                    e.target.position(snapped);
                                    setDragPos(snapped);
                                }}
                                onDragEnd={async (e) => {
                                    const pos = e.target.position();
                                    console.log("DEBUG SEND:", {
                                        x_position: pos.x,
                                        y_position: pos.y,
                                        planting_date: pendingPlant.planting_date,
                                        plantData: pendingPlant.plantData,
                                    });
                                    const res = await fetch(`${import.meta.env.VITE_PLANTS_URL}/me/garden/individual-plants`, {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        credentials: "include",
                                        body: JSON.stringify({
                                            x_position: pos.x,
                                            y_position: pos.y,
                                            planting_date: pendingPlant.planting_date,
                                            plantData: {
                                                name: pendingPlant.plantData.name,
                                                watering_interval: Number(pendingPlant.plantData.watering_interval),
                                            },
                                        }),
                                    });
                                    if (res.ok) {
                                        const data = await res.json();
                                        setSingularPlants((prev) => [...prev, data]);
                                        setIsPlacing(false);
                                        setDragPos(null);
                                        setPendingPlant(null);
                                    }
                                }}
                            />
                        )}
                    </Layer>
                </Stage>
            </div>
        </main>
    );
}

export default MainLayer;
