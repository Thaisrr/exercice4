import {Weapon} from "./Weapon.js";
import {Armor} from "./Armor.js";

export class Character {
    name: string;
    level: number = 0;
    weapon: Weapon;
    armor: Armor;
    pv: number = 20;

    constructor(
        name: string,
        level: number,
        weapon: Weapon = new Weapon("Vieux gourdin moisi", 10),
        armor: Armor = new Armor("Vieille tunique trouée", 5)
    ) {
        this.name = name;
        this.level = level;
        this.weapon = weapon;
        this.armor = armor;
    }

    calculateDamage(enemy: Character): number {
        const random = Math.floor(Math.random() * 20) + 1;
        switch (random) {
            case 20:
                alert("Coup critique !");
                return this.weapon.damage * 2;
            case 1:
                alert("Echec critique !");
                return 0;
        }
        let damages = this.weapon.damage - enemy.armor.protection;
        return damages > 0 ? damages : 0;
    }



    attack(enemy: Character) {
        if(enemy.pv >= 0) {
            alert(`${this.name} attaque ${enemy.name}`);
            enemy.takeDamage(this.calculateDamage(enemy));
        } else {
            alert(`${enemy.name} est déjà mort !`)
        }
    }

    takeDamage(damage: number) {
        alert(`${this.name} subit ${damage} points de dégâts`);
        this.pv -= damage;
        if(this.pv <= 0) {
            alert(`${this.name} est mort !`);
        }
    }

}