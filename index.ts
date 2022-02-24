
// Code exemple
const nom: string = `crevard`; // const -> initialise une constante
let oups = 2; // let -> initialise une variable

function faisCoucou(nomPersonne?: string) {
    console.log(`Coucou`, nomPersonne, `!`);
}

faisCoucou(nom);

// run with:
// npx ts-node index.ts
