import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column({ default: false })
  isCompleted: boolean;
}
