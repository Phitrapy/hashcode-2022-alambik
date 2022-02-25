import Contributor from "./contributor.model";
import Project from "./project.model";

export interface Situation {
    contributors: Contributor[],
    projects: Project[],
}