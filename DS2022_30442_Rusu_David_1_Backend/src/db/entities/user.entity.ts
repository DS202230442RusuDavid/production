import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Role from "src/roles/role.enum";
import Device from "./device.entity";

@Entity()
class User {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ unique: true })
    public email: string;

    @Column()
    public password: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.User,
    })
    public role: Role;

    @OneToMany(type => Device, device => device.user)
    public devices: Device[];
}

export default User;