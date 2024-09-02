import {Hero} from "./types/Hero.js";
import {enemiesAttack, generateEnemies} from "./utils/enemies.generator.js";

function initGame() {
    let name;
    do {
        name = prompt('Entrez le nom de votre personnage');
    } while (!name);
    const character = new Hero(name);
    alert(`Voici vos statistiques:
    - Nom: ${character.name}
    - Niveau: ${character.level}
    - Arme: ${character.weapon.name} (dégâts: ${character.weapon.damage})
    - Armure: ${character.armor.name} (protection: ${character.armor.protection})`
    );
    return character;
}

function playGame() {
    const hero = initGame();
    while(hero.pv > 0) {
        let fly = false;
        let enemies = generateEnemies(hero.level);
        do {
            const action = hero.chooseAction();
            if(action === 'attack') {
                const enemy = hero.chooseEnemy(enemies);
                if(enemy) {
                    hero.attack(enemy);
                    enemiesAttack(enemies, hero);
                }
            } else if(action === 'flee'){
                if(hero.flyYouFool()) {
                    fly = true;
                    break;
                }
            } else if (action === 'use') {
                hero.chooseStuff();
            }
        } while (enemies.some(enemy => enemy.pv > 0) && hero.pv > 0);
        if(hero.pv > 0 && !fly) {
            hero.searchForStuff(enemies);
            hero.winXp(enemies);
        }

    }
    alert(`Game over ! Vous avez atteint le niveau ${hero.level} avec ${hero.xp} points d'expérience`);
}



playGame();