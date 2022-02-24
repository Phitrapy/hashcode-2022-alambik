// Lancer le code avec:
// npm install
// npx ts-node index.ts

import { main } from "./src/main";

// récupère le nom du fichier en input:
const nomFichier = process.argv[2];

if (nomFichier){ 
    main(nomFichier); // Placer le code à écécuter dans la méthode main.
} else {
    console.error(`TUTUTUT! Il faut fournir le nom de l'input en argument!`)!
}


// Code exemple
const nom: string = `crevard`; // const -> initialise une constante
let oups = 2; // let -> initialise une variable

function faisCoucou(nomPersonne?: string) {
    console.log(`Coucou`, nomPersonne, `!`);
}

// décommenter pour exécuter:
// faisCoucou(nom);