import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    ValueTransformer,
    OneToMany,
    OneToOne,
    ManyToOne,
    JoinColumn,
    ManyToMany,
    JoinTable
} from 'typeorm';
import { CommonEntity } from './common';
import { Category } from './category';
import { Tag } from './tag'
@Entity('article')
export class Article extends CommonEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    user_id: string
    @Column()
    title: string
    @Column()
    description: string
    @Column({
        select: false
    })
    category_id: number
    @ManyToOne(type => Category)
    @JoinColumn({
        name: 'category_id'
    })
    category: Category
    @ManyToMany(type => Tag)
    @JoinTable({
        name: 'article_tag',
        joinColumn: {
            name: "article_id",
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: "tag_id",
            referencedColumnName: 'id',
        }
    })
    tags: Promise<Tag[]>
}


