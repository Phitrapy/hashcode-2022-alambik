import Contributor from "./model/contributor.model";
import Skill from "./model/skill.model";
import Project from "./model/project.model";

export function readInputFile(contenu: any) {
    const contributors = [];

    let lignes: string[] = contenu.split(`\n`);
    console.log(lignes);
    let offset = 1;

    // 1e ligne
    const [peopleNb, projectNb] = lignes[0].split(` `);
    console.log(`Contributeurs: ${peopleNb}, Projets: ${projectNb}`)

    for (let i = 0; i < Number(peopleNb); i++) {
        const [nom, skillsNb] = lignes[i + offset].split(` `);
        let newC: Contributor;
    
        newC = {nom, skills: []};
        for(let j = 0; j < Number(skillsNb); j ++) {
            const [skill, level] = lignes[i + j + offset].split(` `);
            newC.skills.push({nom: skill, level});
        }

        console.log(newC);
        contributors.push(newC);

        offset+= Number(skillsNb);
    }

    console.log(`contributeurs`, contributors);
}