import { Checkbox, Input } from "@headlessui/react";
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import OpacityOutlinedIcon from '@mui/icons-material/OpacityOutlined';
import { useEffect, useState } from "react";

type PlantDialogueProps = {
    plantType: "bed" | "single";
    onChange?: (values: any) => void;
};


function PlantDialogue({ plantType, onChange }: PlantDialogueProps) {
    const [formData, setFormData] = useState({
        name: "",
        planting_date: new Date().toISOString().split("T")[0],
        watering_interval: 0,
        edible: false
    });

    useEffect(() => {
        if (onChange) {
            onChange(formData);
        }
    }, [formData, onChange]);

    return (
        <>
            <div>
                <p className="mt-3 font-semibold "> Name: </p>
                <Input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="mt-2 w-full font-light p-2 border-1 rounded-xl border-darkMint/20" placeholder="plant name"></Input>
                <p className="mt-3 font-semibold"> Date of planting: </p>
                <Input
                    type="date"
                    value={formData.planting_date}
                    onChange={(e) => setFormData({ ...formData, planting_date: e.target.value })}
                    required
                />
                <div>
                    <p className="mt-3 font-semibold"> watering needs: </p>gg
                    <WaterDropOutlinedIcon onClick={() => setFormData({ ...formData, watering_interval: 1 })} className="hover:bg-mint " />
                    <OpacityOutlinedIcon onClick={() => setFormData({ ...formData, watering_interval: 2 })} className="hover:bg-mint" />
                    <WaterDropIcon onClick={() => setFormData({ ...formData, watering_interval: 3 })} className="hover:bg-mint" />
                </div>
                <p className="mt-3 font-semibold"> Is this plant edible? </p>
                <Checkbox
                    checked={formData.edible}
                    onChange={() => setFormData({ ...formData, edible: !formData.edible })}
                    className="group block size-4 rounded border bg-white data-checked:bg-mint"
                >
                    {/* Checkmark icon */}
                    <svg className="stroke-white opacity-0 group-data-checked:opacity-100" viewBox="0 0 14 14" fill="none">
                        <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Checkbox>

                {plantType === "bed" && (
                    <>
                        <p className="mt-3 font-semibold"> plant will be placed in the selected bed </p>
                    </>
                )}

                {plantType === "single" && (
                    <>
                        <p className="mt-3 font-semibold"> place plant freely: </p>
                    </>
                )}
            </div>
        </>
    )
}

export default PlantDialogue;