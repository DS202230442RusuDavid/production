import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Energy from "./energy.entity";
import User from "./user.entity";

@Entity()
class Device {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public description: string;

    @Column()
    public address: string;

    @Column()
    public maximumHourlyConsumption: number;

    @OneToMany(type => Energy, energy => energy.device)
    public energy: Energy[];

    @ManyToOne(type => User, user => user.devices,{cascade: true, onDelete: 'CASCADE'})
    public user: User;
}

export default Device;