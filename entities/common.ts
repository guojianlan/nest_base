import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column } from 'typeorm';

export abstract class CommonEntity {
  @Column({
    default: 0,
    select: false
  })
  create_at: number;
  @Column({
    default: 0
  })
  update_at: number;
  @Column({
    default: 0,
    select: false
  })
  delete_at: number;
}

