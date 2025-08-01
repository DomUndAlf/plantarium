import BedDetails from "../Sidebar/BedDetails";
import BedplantDetails from "../Sidebar/BedplantDetails";
import PlantDetails from "../Sidebar/PlantDetails";
import StructureDetails from "../Sidebar/StructureDetails";

function Dialoge(activeDialog: any) {

    switch (activeDialog) {
        case "bed":
            return <BedDetails />;

        case "plant":
            return <PlantDetails />;

        case "structure":
            return <StructureDetails />;

        case "bedplant":
            return <BedplantDetails />; //DAS SIND DIE FENSTER IN DER SIDEBAR DU DEPP LOL
    }

}

export default Dialoge;