# Exercice 4 M2I - Java

## Objectif

Créer un jeu de combat en typescript.

1. Créer un personnage
    - nom
    - pv : 100 par défaut
    - armure : Armure (nom, point d'armure)
    - arme : Arme ( nom, point de dégats)
        - XP ( points d'expérience ) 0 par défaut
          -niveau : 1 par défaut
          L'utilisateur choisi le nom, et obtient des points et des armes armures par défaut.
          ( Optionnel : l'utilisateur peut choisir une classe de personnage, qui définit ses stats par défaut )

2. Créer des ennemis
    - pv
    - niveau


Le personnage peut se battre contre un ennemis, il peut attaquer, ou fuir.
Ses actions sont conditionnés par un lancé de dés. Il peut faire des réussite critique, et des échecs critiques.


## Lancer le projet

Pour lancer le projet, il suffit de lancer la commande suivante :

```bash
npm run build
```

et d'ouvrir le fichier html dans un navigateur.