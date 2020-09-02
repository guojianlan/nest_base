import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    ValueTransformer,
    OneToMany,
    OneToOne
} from 'typeorm';
import { CommonEntity } from './common';
import { PasswordTransformer } from 'utils/password.transformer';
@Entity('user')
export class User extends CommonEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        default: "",
        nullable: false,
    })
    mobile: string
    @Column({
        select:false,
        transformer: new PasswordTransformer()
    })
    password: string
}


