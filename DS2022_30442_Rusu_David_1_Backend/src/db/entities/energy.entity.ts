import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Device from "./device.entity";

@Entity()
class Energy {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public consumption : number;

    @Column()
    public timeStamp : Date;

    @ManyToOne(type => Device, device => device.energy,{cascade: true, onDelete: 'CASCADE'})
    public device: Device;
    
}

export default Energy;