export interface IGarden {
    id: number;
    name: string;
    location: string;
    height: string;
    width: string;
}

export interface IStructureManualInput {
    width: number;
    height: number;
    type: string;
    x_position: number;
    y_position:number;

}