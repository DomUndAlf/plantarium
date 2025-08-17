export interface IGarden {
    id: number;
    name: string;
    location: string;
    height: string;
    width: string;
}

export interface IStructure {
    id: number;
    width: number;
    height: number;
    type: string;
    x_position: number;
    y_position:number;

}

export interface IBed {
    id: number
    width: number;
    height: number;
    x_position: number;
    y_position:number;
    //später noch mehr daten aus dem entity
}