import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    ValueTransformer,
    OneToMany,
    OneToOne,
    ManyToOne,
    ManyToMany,
    JoinTable
} from 'typeorm';
import { CommonEntity } from './common';
import { Article } from './article';
@Entity('tag')
export class Tag extends CommonEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string
    @ManyToMany(type => Article)
    articles: Article[]
}


