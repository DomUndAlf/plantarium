import { useContext } from "react";
import { UserContext } from "../mainStructure/MainFrame";

type Props = {
    detailName: string;
}

function Details({ detailName }: Props) {
    const user = useContext(UserContext);
    switch (detailName) {
        case "garden":
            return (<div className="p-5 bg-white/80 text-black rounded-xl">
                <p className="font-semibold">Ort:</p> <p className="font-light">{user?.location}</p>
                <p className="font-semibold">Höhe:</p> <p className="font-light">{user?.height} m</p>
                <p className="font-semibold">Breite:</p> <p className="font-light">{user?.width} m </p>
            </div>);
        case "structure":
            // hier gehört noch mapping hin
            return (
                <div className="p-5 bg-white/80 text-black rounded-xl">
                <p className="font-semibold">Art:</p>
                <p className="font-semibold">Höhe:</p>
                <p className="font-semibold">Breite:</p>
                {/* soll man hier noch location im garten anzeigen? */}
            </div>
            );
        case "beds":
            // hier gehört noch mapping hin
            return (<div className="p-5 bg-white/80 text-black rounded-xl">
                <p className="font-semibold">Höhe:</p>
                <p className="font-semibold">Breite:</p>
                {/* soll man hier noch location im garten anzeigen? */}
            </div>);
        case "bedplants":
            // hier gehört noch mapping hin, details aus den Pflanzenentity
            return (
                <div className="p-5 bg-white/80 text-black rounded-xl">
                <p className="font-semibold">Art:</p>
                <p className="font-semibold">Höhe:</p>
                <p className="font-semibold">Breite:</p>
                <p className="font-semibold">Gepflanzt am:</p>
                {/* soll man hier noch location im garten anzeigen? */}
            </div>
            );
        case "plants":
            // hier gehört noch mapping hin, details aus den Pflanzenentity
            return (
                <div className="p-5 bg-white/80 text-black rounded-xl">
                <p className="font-semibold">Name:</p>
                <p className="font-semibold">Höhe:</p>
                <p className="font-semibold">Breite:</p>
                <p className="font-semibold">Gepflanzt am:</p>
                {/* soll man hier noch location im garten anzeigen? */}
            </div>
            );
    }
}

export default Details;