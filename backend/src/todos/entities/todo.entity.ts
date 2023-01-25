import { Entity, PrimaryColumn } from "typeorm";
import {v4 as uuid} from "uuid"

@Entity()
export class Todos {
    @PrimaryColumn()
    id: string;
    
}