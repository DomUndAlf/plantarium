import { Dialog } from "@headlessui/react";
import { useState } from "react";
import YardIcon from '@mui/icons-material/Yard';
import { List, ListItem, ListItemButton } from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Details from "./Details";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

function Sidebar({ isOpen, onClose }: Props) {
    const [openGarden, setOpenGarden] = useState(true);
    const [openStructures, setOpenStructures] = useState(false)
    const [openBeds, setOpenBeds] = useState(false);
    const [openBedPlants, setOpenBedPlants] = useState(false);
    const [openPlants, setOpenPlants] = useState(false);


    const handleClick = (location: string) => {
        if (location === "garden") 
            setOpenGarden(!openGarden);
        else if (location === "structure")
            setOpenStructures(!openStructures);
        else if (location === "beds")
            setOpenBeds(!openBeds);
        else if (location === "bedplants")
            setOpenBedPlants(!openBedPlants);
        else if (location === "plants")
            setOpenPlants(!openPlants);
    };


    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-white/30" />

            <div className="fixed inset-y-0 left-0 w-100 bg-mint shadow-lg p-4">
                <YardIcon onClick={onClose} className="mb-4 text-white"></YardIcon>
                <List className="space-y-4 text-white font-semibold text-lg">
                    
                    <ListItemButton onClick={() => handleClick("garden")}>
                        <ListItem>Deine Gartendaten</ListItem>
                        {openGarden ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    {openGarden && <Details detailName={"garden"} />}

                    <ListItemButton onClick={() => handleClick("structure")}>
                        <ListItem>Deine Strukturen</ListItem>
                        {openStructures ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    {openStructures && <Details detailName={"structure"} />}

                    <ListItemButton onClick={() => handleClick("beds")}>
                        <ListItem>Deine Beete</ListItem>
                        {openBeds ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    {openBeds && <Details detailName={"beds"} />}

                    <ListItemButton onClick={() => handleClick("bedplants")}>
                        <ListItem>Deine Beetpflanzen</ListItem>
                        {openBedPlants ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    {openBedPlants && <Details detailName={"bedplants"} />}

                    <ListItemButton onClick={() => handleClick("plants")}>
                        <ListItem>Deine Einzelpflanzen</ListItem>
                        {openPlants ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    {openPlants && <Details detailName={"plants"} />}
                </List>
            </div>
        </Dialog>
    );
}

export default Sidebar;

//Gartendaten immer anzeigen?

//Routen reinlegen

 //ExpandMore/Less sind nur die Icons
                  