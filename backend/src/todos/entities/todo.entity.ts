import { Users } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import {v4 as uuid} from "uuid"

@Entity()
export class Todos {
    @PrimaryColumn()
    id: string;

    @Column({default: false})
    done: boolean;

    @Column({nullable: false})
    description: string;
    
    @ManyToOne(type => Users, (user) => user.todos, {onDelete: 'CASCADE'})
    user: Users;

}