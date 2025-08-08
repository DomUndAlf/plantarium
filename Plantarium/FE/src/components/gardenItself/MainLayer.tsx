import { useEffect, useState, useContext, useRef } from "react";
import { Stage, Layer, Rect, Text } from "react-konva";
import useImage from 'use-image';
import { UserContext } from "../mainStructure/MainFrame";
import { IStructureManualInput } from "../../interfaces/interfaces";


type Props = {
    isPlacing: boolean;
    pendingStruct: IStructureManualInput | null;
    setIsPlacing: (v: boolean) => void;
};

function MainLayer({ isPlacing, pendingStruct, setIsPlacing }: Props) {
    const user = useContext(UserContext);
    const stageRef = useRef<any>(null);
    const [structures, setStructures] = useState<IStructureManualInput[]>([]);
    const [beds, setBeds] = useState<IStructureManualInput[]>([]);
    const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);


    const [grassImg] = useImage('../../public/assets/grass.jpg');
    const [bedImg] = useImage('../../public/assets/soil.jpg');
    const [terImg] = useImage('../../public/assets/terace.jpg');
    const [roofImg] = useImage('../../public/assets/roof.jpg');
    const [pathImg] = useImage('../../public/assets/path.jpg');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [surfacesRes, bedsRes] = await Promise.all([
                    fetch("http://localhost:3001/me/garden/surfaces", { credentials: "include" }),
                    fetch("http://localhost:3001/me/garden/beds", { credentials: "include" })
                ]);

                if (surfacesRes.ok) {
                    const data = await surfacesRes.json();
                    const surfaces = data.data.map((s: any) => ({
                        ...s,
                        width: s.width ?? 200,
                        height: s.height ?? 200,
                    }));
                    setStructures(surfaces);
                } else {
                    console.error("Fehler beim Laden der Strukturen");
                }

                if (bedsRes.ok) {
                    const data = await bedsRes.json();
                    const beds = data.data.map((b: any) => ({
                        ...b,
                        width: b.width ?? 200,
                        height: b.height ?? 200,
                    }));
                    setBeds(beds);
                } else {
                    console.error("Fehler beim Laden der Beete");
                }

            } catch (err) {
                console.error("Netzwerkfehler beim Laden der Daten", err);
            }
        };

        fetchData();
    }, []);

    if (!user) return <p className="text-white p-4">Lade Nutzerdaten...</p>;

    const gardenWidth = Number(user.width) * 100;
    const gardenHeight = Number(user.height) * 100;

    const handleDragEnd = async (e: any) => {
        if (!pendingStruct || !isPlacing) return;

        const pos = e.target.position();
        const isBed = pendingStruct.type === "bed";

        try {
            const res = await fetch(`http://localhost:3001/me/garden/${isBed ? "beds" : "surfaces"}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    type: isBed ? undefined : pendingStruct.type,
                    x_position: pos.x,
                    y_position: pos.y,
                    width: pendingStruct.width * 200,
                    height: pendingStruct.height * 200,
                }),
            });

            if (res.ok) {
                const data = await res.json();
                const newStruct = {
                    ...data.data,
                    width: pendingStruct.width * 200,
                    height: pendingStruct.height * 200,
                };

                if (isBed) {
                    setBeds(prev => [...prev, newStruct]);
                } else {
                    setStructures(prev => [...prev, newStruct]);
                }
                setIsPlacing(false);
                setDragPos(null);
            } else {
                console.error("Fehler beim Speichern");
            }
        } catch (err) {
            console.error("Netzwerkfehler beim Speichern", err);
        }
    };


    return (
        <main className="flex-grow pt-[60px] w-full overflow-auto">
            <div className="w-full flex justify-center">
                <Stage
                    width={gardenWidth}
                    height={gardenHeight}
                    ref={stageRef}
                    className="mb-10"
                >
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
                            let fill = undefined;

                            if (s.type === "path") fill = pathImg;
                            else if (s.type === "terrace") fill = terImg;
                            else if (s.type === "building") fill = roofImg;
                            else fill = bedImg;

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
                            <Rect
                                key={`bed-${i}`}
                                x={b.x_position}
                                y={b.y_position}
                                width={b.width}
                                height={b.height}
                                fillPatternImage={bedImg}
                                fillPatternScale={{ x: 0.4, y: 0.4 }}
                            />
                        )
                        )}

                        {isPlacing && pendingStruct && (
                            <Rect
                                x={dragPos?.x || 50}
                                y={dragPos?.y || 50}
                                width={pendingStruct.width * 200}
                                height={pendingStruct.height * 200}
                                fill="rgba(0, 200, 0, 0.3)"
                                draggable
                                onDragEnd={handleDragEnd}
                                onDragMove={e => setDragPos(e.target.position())}
                            />
                        )}
                    </Layer>
                </Stage>

            </div>
        </main>
    );
}

export default MainLayer;
