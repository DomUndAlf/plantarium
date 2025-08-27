import { useState, useContext, useRef } from "react";
import { Stage, Layer, Rect, Text, Group, Circle } from "react-konva";
import useImage from "use-image";
import { UserContext, StructContext, BedsContext, SinglePlantContext } from "../mainStructure/MainFrame";
import { IBed, IStructure } from "../../interfaces/interfaces";
import { DialogContext } from "../dialogues/Dialogcontext";

type Props = {
    isPlacing: boolean;
    pendingStruct: IStructure | null;
    setIsPlacing: (v: boolean) => void;
    pendingPlant: any | null;
    setPendingPlant: (p: any | null) => void;
};

function MainLayer({ isPlacing, pendingStruct, setIsPlacing, pendingPlant, setPendingPlant }: Props) {
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

    const [grassImg] = useImage("../../public/assets/grass.jpg");
    const [bedImg] = useImage("../../public/assets/soil.jpg");
    const [terImg] = useImage("../../public/assets/terace.jpg");
    const [roofImg] = useImage("../../public/assets/roof.jpg");
    const [pathImg] = useImage("../../public/assets/path.jpg");

    if (!user) return <p className="text-white p-4">Lade Nutzerdaten...</p>;

    const gardenWidth = Number(user.width) * 100;
    const gardenHeight = Number(user.height) * 100;

    const SNAP_THRESHOLD = 15;

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

        try {
            const res = await fetch(
                `http://localhost:3001/me/garden/${isBed ? "beds" : "surfaces"}`,
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
                                    fillPatternImage={fill}
                                    fillPatternRepeat="repeat"
                                    fillPatternScale={{ x: 0.15, y: 0.15 }}
                                />
                            );
                        })}
                        {beds.map((b, i) => (
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
                                    onClick={() => {
                                        if (b.bed_plants && b.bed_plants.length > 0) {

                                            alert("In diesem Beet ist schon eine Pflanze. Du kannst hier nichts Neues setzen.");
                                            return;
                                        }
                                        dialog.setActiveDialog("plant-bed");
                                        setActiveBedId(b.id);
                                    }}
                                />
                                {hoveredBedIndex === i && (
                                    <Text
                                        x={b.x_position + 5}
                                        y={b.y_position + 5}
                                        text={`Beet ${b.id}:\n${b.bed_plants?.[0]?.plants?.name ?? "empty bed"
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
                        {singularPlants.map((p: {
                            [x: string]: any; x_position: number | undefined; y_position: number | undefined;
                        }, i: any) => (
                            <Group>
                                <Circle
                                    key={`plant-${i}`}
                                    x={p.x_position}
                                    y={p.y_position}
                                    radius={15} // kannst du dynamisch machen
                                    fill="green"
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
                                    const snapped = snapTo(pos, 30, 30); // Durchmesser = 30 für Circle
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
                                    const res = await fetch("http://localhost:3001/me/garden/individual-plants", {
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
                                        setPendingPlant(null); // zurücksetzen
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
