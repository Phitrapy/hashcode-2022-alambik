import Project from "./project.model";
import Skill from "./skill.model";

export default interface Contributor {
    nom: string;
    skills: Skill[];
    project?: Project; // pas sûr
}