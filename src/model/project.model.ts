import Contributor from "./contributor.model";
import { Skill } from "./skill.model";

export default interface Project {
    nom: string,
    skills: Skill[],

    contributors: Contributor[] // pas sûr
}