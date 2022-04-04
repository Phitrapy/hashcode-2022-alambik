import Contributor from "./contributor.model";
import Skill from "./skill.model";

export default class Project {
    nom: string;
    skills: Skill[];
    duree: number;
    progress: number;
    dayDone?: number
    bestBefore: number;
    score: number;

    contributors: Contributor[] = [] // pas sûr

    get isDone(): boolean {
        return this.remainingDays === 0;
    }

    get remainingDays(): number{
        return this.duree - this.progress;
    }

    public worthDecay(day: number): number {
        const decay = this.bestBefore - day;
        return Math.min(decay, 0);
    }

    public potentialWorhDecay(day: number): number {
        const decay = this.bestBefore - (day + this.remainingDays);
        return Math.min(decay, 0);
    }

    public worth(day: number) {
        if (!this.isDone) {
            return 0;
        }
        return Math.max(this.score - this.worthDecay(day), 0);
    }

    public potentialWorth(day: number) {
        return Math.max(this.score - this.potentialWorhDecay(day), 0);
    }

    public work() {
        if (!this.isDone) this.progress++;
    }

    public done(day: number) {
        if(!this.isDone) this.dayDone = day;
    }
}