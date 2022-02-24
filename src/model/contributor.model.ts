import { Project } from "./project.model";
import { Skill } from "./skills.model";

export interface Contributor {
    nom: string;
    skills: Skill[];
    project: Project; // pas sûr
}