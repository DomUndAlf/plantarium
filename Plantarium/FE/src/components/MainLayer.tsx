//blanke Rasenfläche ohne Beete und Strukturen

import { useEffect, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";

function MainLayer() {
    const [user, setUser] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
    const [, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

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

    const gardenWidth = user.width * 100;
    const gardenHeight = user.height * 100;

    const stageWidth = Math.max(window.innerWidth, gardenWidth + 200);
    const stageHeight = Math.max(window.innerHeight, gardenHeight + 200);

    const rectX = (stageWidth - gardenWidth) / 2;

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
                            fill="red"
                            shadowBlur={10}
                        />
                    </Layer>
                </Stage>
            </div>
        </main>
    )
}

export default MainLayer