import Contributor from "./model/contributor.model";
import Project from "./model/project.model";
import { Situation } from "./model/situation.model";

export function readInputFile(contenu: any): Situation {
    const contributors = [];
    const projects = [];

    let offset = 0;

    let lignes: string[] = contenu.split(`\n`);
    // console.log(lignes);

    // 1e ligne
    const [peopleNb, projectNb] = lignes[0].split(` `);

    offset++;
    for (let i = 0; i < Number(peopleNb); i++) {
        
        const [nom, skillsNb] = lignes[i + offset].split(` `);
        
        let newC: Contributor;
    
        newC = {nom, skills: []};
        for(let j = 0; j < Number(skillsNb); j ++) {
            const [skill, niveau] = lignes[1 + i + j + offset].split(` `);
            newC.skills.push({nom: skill, niveau: Number(niveau)});
        }

        contributors.push(newC);

        offset+= Number(skillsNb);
    }

    offset+= Number(peopleNb);
    
    for (let i = 0; i < Number(projectNb); i++) {
        const [nom, duree, score, bestBefore, rolesNb] = lignes[i + offset].split(` `);
        let newP: Project;
    
        newP = {nom, duree, score, bestBefore, skills: []} as any;

        for(let j = 0; j < Number(rolesNb); j ++) {
            const [skill, niveau] = lignes[1 + i + j + offset].split(` `);
            newP.skills.push({nom: skill, niveau: Number(niveau)});
        }

        projects.push(newP);

        offset+= Number(rolesNb);
    }

    return {contributors, projects}
}