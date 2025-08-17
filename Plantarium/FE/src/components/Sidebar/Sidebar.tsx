import { Dialog } from "@headlessui/react";
import { useState } from "react";
import YardIcon from '@mui/icons-material/Yard';
import { List, ListItem, ListItemButton } from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import GardenDetails from "./GardenDetails";
import StructureDetails from "./StructureDetails";
import BedDetails from "./BedDetails";
import PlantDetails from "./PlantDetails";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

function Sidebar({ isOpen, onClose }: Props) {
    const [openGarden, setOpenGarden] = useState(true);
    const [openStructures, setOpenStructures] = useState(false)
    const [openPlants, setOpenPlants] = useState(false);


    const handleClick = (location: string) => {
        if (location === "garden")
            setOpenGarden(!openGarden);
        else if (location === "structure")
            setOpenStructures(!openStructures);
        else if (location === "plants")
            setOpenPlants(!openPlants);
    };


    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-white/30" />

            <div className="fixed inset-y-0 left-0 w-100 bg-mint shadow-lg p-4  overflow-y-auto h-screen">
                <YardIcon onClick={onClose} className="mb-4 text-white"></YardIcon>
                <List className="space-y-4 text-white font-semibold text-lg">

                    <ListItemButton onClick={() => handleClick("garden")}>
                        <ListItem>your garden</ListItem>
                        {openGarden ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <> {openGarden && <GardenDetails /> } </>


                    <ListItemButton onClick={() => handleClick("structure")}>
                        <ListItem>structures and beds</ListItem>
                        {openStructures ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                
                    <> {openStructures && <BedDetails />}
                     {openStructures && <StructureDetails /> }
                    </>

                    <ListItemButton onClick={() => handleClick("plants")}>
                        <ListItem>singular plants</ListItem>
                        {openPlants ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <> {openPlants && <PlantDetails />} </>
                    
                </List>
            </div>
        </Dialog>
    );
}

export default Sidebar;

