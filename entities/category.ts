import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    ValueTransformer,
    OneToMany,
    OneToOne,
    ManyToOne
} from 'typeorm';
import { CommonEntity } from './common';
@Entity('category')
export class Category extends CommonEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string
}


