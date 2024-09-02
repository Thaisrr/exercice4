import {Character} from "./Character.js";
import {Armor} from "./Armor.js";
import {Stuff} from "./Stuff.js";

export class Hero extends Character {
    xp: number = 0;
    bag: Stuff[] = [];
    bonusAttack: number = 0;
    bonusDefense: number = 0;

    constructor(name: string) {
        super(name, 1);
        this.pv = 50;
    }

    chooseEnemy(enemies: Character[]): Character | undefined{
        const aliveEnemies = enemies.filter(enemy => enemy.pv > 0);
        console.log(enemies)
        if(aliveEnemies.length === 1) {
            return aliveEnemies[0];
        } else {
            type enemyName = typeof aliveEnemies[number]['name'];
            const toAttack = prompt(`Qui voulez-vous attaquer ? ${aliveEnemies.map(enemy => enemy.name).join(', ')} ?`) as enemyName;
            return aliveEnemies.find(enemy => enemy.name === toAttack);
        }
    }

    flyYouFool() {
        const random = Math.floor(Math.random() * 20) + 1;
        switch (random) {
            case 20:
                alert(`L'ennemi tente de vous rattraper, chute et se blesse ! Vous gagnez 1 point d'expérience`);
                this.xp++;
                break;
            case 1:
                alert(`Vous trébuchez et vous blessez ! L'ennemi vous rattrape et vous inflige 10 points de dégâts`);
                this.takeDamage(10);
                return false;
            default:
                alert('Vous fuiez comme un lâche !');
        }
        return true;
    }

    displayStats() {
        alert(`Votre personnage: ${this.name} (niveau: ${this.level}, points de vie: ${this.pv}, points d'expérience: ${this.xp}, arme: ${this.weapon.name} (dégâts: ${this.weapon.damage}), armure: ${this.armor.name} (protection: ${this.armor.protection})`);
    }

    winXp(enemies: Character[]) {
        const enemyXp = enemies.reduce((acc, enemy) => acc + enemy.level, 0);
        this.xp += enemyXp;
        alert(`Vous avez gagné ${enemyXp} points d'expérience`);
        this.levelUp();
    }

    levelUp() {
        if(this.xp >= this.level * 10) {
            this.level++;
            this.xp = 0;
            alert(`Bravo ! Vous avez atteint le niveau ${this.level} !`);
            this.weapon.damage += 5;
            this.armor.protection += 2;
            this.bonusAttack += 5;
            this.bonusDefense += 2;
            this.pv += 10;
            this.displayStats();
        }
    }

    searchForStuff(enemies: Character[]) {

        // Ramasser une arme ou une armure random sur les ennemis morts
        const stuffType = Math.floor(Math.random() * 2) + 1 === 1 ? 'armor' : 'weapon';
        const stuff = enemies.filter(enemy => enemy.pv <= 0).map(enemy => enemy[stuffType]);
        if(stuff.length > 0) {
            const randomIndex = Math.floor(Math.random() * stuff.length);
            const newStuff = stuff[randomIndex];
            if(newStuff instanceof Armor) {
                newStuff.protection = newStuff.protection + this.bonusDefense;
                alert(`Vous avez trouvé une nouvelle armure: ${newStuff.name} (protection: ${newStuff.protection})`);
                if(confirm(`Remplacer votre armure actuelle ? ${this.armor.name} (protection: ${this.armor.protection})`)) {
                    this.armor = newStuff;
                }
            } else {
                newStuff.damage = newStuff.damage + this.bonusAttack;
                alert(`Vous avez trouvé une nouvelle arme: ${newStuff.name} (dégâts: ${newStuff.damage})`);
                if(confirm(`Remplacer votre arme actuelle ? ${this.weapon.name} (dégâts: ${this.weapon.damage})`)) {
                    this.weapon = newStuff;
                }
            }
        }

        // Ramasser des potions de soin ou de force. Une chance sur 3 d'en trouver une par ennemi.
        let soin = 0;
        let force = 0;
        enemies.forEach(() => {
            const random = Math.floor(Math.random() * 5) + 1;
            if(random < 3) {
                const stuff = new Stuff('Potion de soin');
                this.addToBag(stuff);
                soin++;
            } else if(random < 5) {
                const stuff = new Stuff('Potion de force');
                this.addToBag(stuff);
                force++;
            }
            if(soin > 0) alert(`Vous avez trouvé ${soin} potion(s) de soin`);
            if(force > 0) alert(`Vous avez trouvé ${force} potion(s) de force`);
        });
    }

    addToBag(stuff: Stuff) {
        this.bag.push(stuff);
    }

    displayBag() {
        alert(`Votre sac contient: ${this.bag.map(stuff => stuff.name).join(', ')}`);
    }

    chooseStuff() {
        if(this.bag.length === 0) {
            alert('Votre sac est vide');
            return;
        }
        const stuffName = prompt(`Quel objet voulez-vous utiliser ? ${this.bag.map(stuff => stuff.name).join(', ')}`);
        const stuff = this.bag.find(stuff => stuff.name === stuffName);
        if(stuff) {
            this.useStuff(stuff);
            this.bag = this.bag.filter(s => s !== stuff);
        } else {
            alert('Objet non trouvé');
            this.chooseStuff();
        }
    }

    useStuff(stuff: Stuff) {
        if(!this.bag.some(s => s.name === stuff.name)) {
            alert(`Vous ne possédez pas de ${stuff.name}`);
            return
        }
        if(stuff.name === 'Potion de soin' ) {
            this.pv += 10;
            alert(`Vous avez utilisé une potion de soin et récupéré 10 points de vie`);
        } else if(stuff.name === 'Potion de force') {
            this.weapon.damage += 5;
            this.bonusAttack += 5;
            alert(`Vous avez utilisé une potion de force et augmenté vos dégâts de 5 points`);
        }
    }

    chooseAction() : string | void {
        const action = prompt('Attaquer, fuir ou utiliser un objet ? (attack/flee/use)');
        if(action === 'attack') {
            return 'attack';
        } else if(action === 'flee') {
            return 'flee';
        } else if(action === 'use') {
            return 'use';
        } else {
            alert('Action non reconnue');
            this.chooseAction();
        }
    }
}