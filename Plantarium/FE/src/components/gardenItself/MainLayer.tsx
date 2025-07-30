//blanke Rasenfläche ohne Beete und Strukturen

import { useEffect, useState, useContext } from "react";
import { Stage, Layer, Rect } from "react-konva";
import useImage from 'use-image';
import { UserContext } from "../mainStructure/MainFrame";


function MainLayer() {
    const user = useContext(UserContext);
    //gucken ob strukturen da, wenn nicht, Dialogfenster aufrufen

    const [, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const [grassImg] = useImage('../../public/assets/grass.jpg');

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!user) return <p className="text-white p-4">Lade Nutzerdaten...</p>;

    const gardenWidth: number = Number(user.width) * 100;
    const gardenHeight: number = Number(user.height) * 100;

    const stageWidth: number = Math.max(window.innerWidth, gardenWidth);
    const stageHeight: number = Math.max(window.innerHeight, gardenHeight + 50);

    const rectX: number = (stageWidth - gardenWidth) / 2;

    return (
        <main className="flex-grow pt-[60px] w-full overflow-auto">
            <div className="w-max mx-auto min-w-full">
                <Stage width={stageWidth} height={stageHeight} className="inline-block mb-10 ml-10 mr-10">
                    <Layer>
                        <Rect
                            x={rectX}
                            y={(Number(user.height) * 100 + 70 - Number(user.height) * 100) / 2}
                            width={Number(user.width) * 100}
                            height={Number(user.height) * 100}
                            fillPatternImage={grassImg}
                            fillPatternRepeat="repeat"
                            fillPatternScale={{ x: 0.4, y: 0.4 }}
                            shadowBlur={10}
                        />
                    </Layer>
                </Stage>
            </div>
        </main>
    )
}

export default MainLayer