import { deepStrictEqual } from 'assert';
import * as fs from 'fs';

export function main(nomFichier: string) { // C'est ici qu'on exécute le code
    console.log("on est dans le main");
    // 1) Lire un fichier en input
    const fichier = lireFichier(nomFichier);

    // 2) Faire la tambouille
    tambouiller();

    // 3) Ecrire un fichier en output
    ecrireFichier(nomFichier, `test écriture`);
}

function lireFichier(nomFichier: string) {
    console.log(`Fichier à ouvrir:`, nomFichier);
    const file = fs.readFileSync(nomFichier,'utf8');
    console.log(file);
}

function ecrireFichier(nomFichier: string, contenu: any) {
    fs.writeFile(nomFichier + `_output.txt`, contenu, (erreur) => {
        if(erreur) {
            console.error(`ERREUR LORS DE L'ECRITURE`, erreur);
        } else {
            console.log(`Fichier ${nomFichier + `_output.txt`} ecrit!`)
        }
    });
}

function tambouiller() {
    console.log(`prout`);
}