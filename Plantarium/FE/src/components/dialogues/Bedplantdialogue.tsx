import { Input } from "@headlessui/react";
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import OpacityOutlinedIcon from '@mui/icons-material/OpacityOutlined';


function BedplantDialogue() {
    return (
        <>

            <p className="text-xl font-bold text-darkMint mb-3 mt-6">Add a plant to this bed</p>
            <div>
                <p className="mt-2 text-sm text-darkMint font-medium">
                    Please create a separate bed for every type of plant you would like to plant there.
                </p>
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

export default BedplantDialogue;