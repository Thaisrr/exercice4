import {Stuff} from "./Stuff.js";

export class Armor extends Stuff {
    protection: number;

    constructor(name: string, protection: number) {
        super(name);
        this.protection = protection;

    }

}