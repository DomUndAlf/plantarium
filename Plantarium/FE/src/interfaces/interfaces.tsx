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
    watered: boolean;
    bed_plan: IBedPlant[];
}

export interface IBedPlant {
    id: number;
    name: string;
    edible: boolean;
    watering_interval?: number;
    bloom_start_month?: number;
    bloom_end_month?: number;
    harvest_start_month?: number;
    harvest_end_month?: number;
    watered: boolean;
}