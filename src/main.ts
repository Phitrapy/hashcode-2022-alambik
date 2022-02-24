export function main(nomFichier: string) { // C'est ici qu'on exécute le code
    console.log("on est dans le main");
    // 1) Lire un fichier en input
    lireFichier(nomFichier);

    // 2) Faire la tambouille

    // 3) Ecrire un fichier en output
}

function lireFichier(nomFichier: string) {
    console.log(`Fichier à ouvrir:`, nomFichier);
}