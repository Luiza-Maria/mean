import { Menu } from "./menu-model";

export interface Order {
    id: number;
    nbTable:string,
    order: Menu[]
}