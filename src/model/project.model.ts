import { Contributor } from "./contributor.model";
import { Skill } from "./skills.model";

export interface Project {
    nom: string,
    skills: Skill[],
    
    contributors: Contributor[] // pas sûr
}