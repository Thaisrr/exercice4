import {Character} from "../types/Character.js";
import {Weapon} from "../types/Weapon.js";
import {Armor} from "../types/Armor.js";

const enemies = [
    new Character('Gobelin', 1, new Weapon('Baton pourri', 5)),
    new Character('Orque', 2, new Weapon('Hache rouillée', 15), new Armor('Vieille cotte de maille', 10)),
    new Character('Troll', 3, new Weapon('Gourdin en bois', 20), new Armor('Cuir renforcé', 15)),
    new Character('Dragon', 4, new Weapon('Souffle de feu', 30), new Armor('Ecailles de dragon', 20)),
]

export function generateEnemies(level: number) {
    const numberOfEnemies = Math.floor(Math.random() * level) + 1;
    const randomEnemies = [];
    const validEnemies = enemies.filter(enemy => enemy.level <= level + 1);
    for (let i = 0; i < numberOfEnemies; i++) {
        const randomIndex = Math.floor(Math.random() * validEnemies.length);
        randomEnemies.push(validEnemies[randomIndex]);
    }
    alert(`Vous êtes attaqué par ${randomEnemies.map(enemy => enemy.name).join(', ')}`);
    return randomEnemies.map(e => new Character(e.name, e.pv, e.weapon, e.armor));
    // On retourne une copie des ennemis pour ne pas modifier l'original
}

export function enemiesAttack(enemies: Character[], hero: Character) {
    enemies
        .filter(e => e.pv > 0)
        .forEach(enemy => {
            if(enemy.pv > 0) {
                alert(`${enemy.name} attaque ${hero.name}`);
                hero.takeDamage(enemy.calculateDamage(hero));
            }
    });
}