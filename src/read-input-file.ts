import Contributor from "./model/contributor.model";
import Skill from "./model/skill.model";
import Project from "./model/project.model";
import { off } from "process";

export function readInputFile(contenu: any) {
    const contributors = [];
    const projects = [];

    let offset = 0;

    let lignes: string[] = contenu.split(`\n`);
    // console.log(lignes);

    // 1e ligne
    const [peopleNb, projectNb] = lignes[0].split(` `);
    console.log(`Contributeurs: ${peopleNb}, Projets: ${projectNb}`)

    offset++;
    for (let i = 0; i < Number(peopleNb); i++) {
        
        const [nom, skillsNb] = lignes[i + offset].split(` `);
        
        let newC: Contributor;
    
        newC = {nom, skills: []};
        for(let j = 0; j < Number(skillsNb); j ++) {
            const [skill, level] = lignes[1 + i + j + offset].split(` `);
            newC.skills.push({nom: skill, level});
        }

        contributors.push(newC);

        offset+= Number(skillsNb);
    }

    offset++;
    offset++;
    offset++;
    for (let i = 0; i < Number(projectNb); i++) {
        
        console.log(`oups`, offset)
        console.log(`projet`, lignes[i + offset])
        const [nom, duree, score, bestBefore, rolesNb] = lignes[i + offset].split(` `);
        let newP: Project;
    
        newP = {nom, duree, score, bestBefore, skills: []} as any;

        console.log({rolesNb});
        for(let j = 0; j < Number(rolesNb); j ++) {
            const [skill, level] = lignes[1 + i + j + offset].split(` `);
            newP.skills.push({nom: skill, level});
        }

        console.log(newP);
        projects.push(newP);

        offset+= Number(rolesNb);
    }

    console.log(`contributeurs`, contributors);
    console.log(`projects`, projects);
    
}