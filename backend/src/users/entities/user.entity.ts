import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import {hashSync, genSaltSync} from "bcrypt-nodejs"
import {v4 as uuid} from "uuid"
import { Todos } from "src/todos/entities/todo.entity";


@Entity()
export class Users {
    @PrimaryColumn()
    id: string;

    @Column({nullable: false, unique: true})
    user_name: string;
 
    @Column({nullable: false, select: false})
    password: string;

    @OneToMany(() => Todos, (todo) => todo.user, {eager: true})
    todos: Todos[];

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        const salt = genSaltSync(10)
        this.password = hashSync(this.password, salt)
    } 

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}