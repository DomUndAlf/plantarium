import { createContext } from "react";
import { IBed, IGarden, IStructure } from "./interfaces/interfaces";

export const UserContext = createContext<IGarden | null>(null);

export const StructContext = createContext<{
    structures: IStructure[];
    setStructures: React.Dispatch<React.SetStateAction<IStructure[]>>;
} | null>(null);

export const BedsContext = createContext<{
    beds: IBed[];
    setBeds: React.Dispatch<React.SetStateAction<IBed[]>>;
    activeBedId: number | null;
    setActiveBedId: (id: number | null) => void;
} | null>(null);

export const SinglePlantContext = createContext<
    {
        [x: string]: any;
        singularPlants: any[];
        setSingularPlants: React.Dispatch<React.SetStateAction<any[]>>;
    } | null
>(null);
