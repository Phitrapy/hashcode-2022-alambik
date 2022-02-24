// Lancer le code avec:
// npx ts-node index.ts

import { main } from "./src/main";

main(); // Placer le code à écécuter dans la méthode main.


// Code exemple
const nom: string = `crevard`; // const -> initialise une constante
let oups = 2; // let -> initialise une variable

function faisCoucou(nomPersonne?: string) {
    console.log(`Coucou`, nomPersonne, `!`);
}

faisCoucou(nom);


