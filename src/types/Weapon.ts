import {Stuff} from "./Stuff.js";

export class Weapon extends Stuff {
    damage: number;

    constructor(name: string, damage: number) {
        super(name);
        this.damage = damage;
    }
}