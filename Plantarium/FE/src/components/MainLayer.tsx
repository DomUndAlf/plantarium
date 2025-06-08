//blanke Rasenfläche ohne Beete und Strukturen

import { useEffect, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import useImage from 'use-image';


function MainLayer() {
    const [user, setUser] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
    const [, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const [grassImg] = useImage('../../public/assets/grass.jpg');

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch("http://localhost:3001/users/me", {
                credentials: "include",
            });

            if (res.ok) {
                const data = await res.json();
                setUser({
                    height: data.data.height,
                    width: data.data.width,
                });
            }
        };
        fetchUser();
    }, []);

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

    const gardenWidth: number = user.width * 100;
    const gardenHeight: number = user.height * 100;

    const stageWidth: number = Math.max(window.innerWidth, gardenWidth);
    const stageHeight: number = Math.max(window.innerHeight, gardenHeight + 50);

    const rectX: number = (stageWidth - gardenWidth) / 2;

    return (
        <main className="flex-grow pt-[60px] w-full overflow-auto">
            <div className="w-max mx-auto min-w-full">
                <Stage width={stageWidth} height={stageHeight} className="inline-block mb-10">
                    <Layer>
                        <Rect
                            x={rectX}
                            y={(user.height * 100 + 70 - user.height * 100) / 2}
                            width={user.width * 100}
                            height={user.height * 100}
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