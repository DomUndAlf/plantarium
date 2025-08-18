import { Input } from "@headlessui/react";
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import OpacityOutlinedIcon from '@mui/icons-material/OpacityOutlined';

type PlantDialogueProps = {
  plantType: "bed" | "single";
};

function PlantDialogue({ plantType }: PlantDialogueProps) {
    return (
        <>
            <div>
                <p className="mt-3 font-semibold "> Name: </p>
                <Input className="mt-2 w-full font-light p-2 border-1 rounded-xl border-darkMint/20" value="plant name"></Input>
                <p className="mt-3 font-semibold"> Date of planting: </p>
                <Input className="mt-2 w-full font-light p-2 border-1 rounded-xl border-darkMint/20" type="date" value="0"></Input>
                <div>
                    <p className="mt-3 font-semibold"> watering needs: </p>
                    <WaterDropOutlinedIcon /> <OpacityOutlinedIcon /> <WaterDropIcon />
                </div>
            </div>
        </>
    )
}

export default PlantDialogue;