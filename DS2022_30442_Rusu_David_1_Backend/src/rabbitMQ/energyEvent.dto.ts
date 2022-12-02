import { Timestamp } from "typeorm";

export default class EnergyEvent{
    public device_id: number;
    public measurement_value : number;
    public timestamp : string;  
}