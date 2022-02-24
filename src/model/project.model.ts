import Contributor from "./contributor.model";
import { Skill } from "./skill.model";

export default interface Project {
    nom: string,
    skills: Skill[],
    duree: number,
    bestBefore: number,
    score: number

    contributors: Contributor[] // pas sûr
}