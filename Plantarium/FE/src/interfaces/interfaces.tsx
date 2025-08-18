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
    bed_plant: IBedPlant;
}

export interface IBedPlant {
    id: number;
    name: string;
    y_position: number;
    x_position: number;
    watering_interval?: number;
    watered: boolean;
    date_of_planting: Date;
}

export interface IPlant {
    id: number;
    name: string;
    y_position: number;
    x_position: number;
    date_of_planting: Date;
    watering_interval?: number;
    watered: boolean;
}