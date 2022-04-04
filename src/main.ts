import * as fs from 'fs';
import { removeAllListeners } from 'process';
import Contributor from './model/contributor.model';
import Project from './model/project.model';
import { Situation } from './model/situation.model';
import Skill from './model/skill.model';
import { readInputFile } from "./read-input-file";

export function main(nomFichier: string) { // C'est ici qu'on exécute le code
    console.log("on est dans le main");
    // 1) Lire un fichier en input
    const fichier = lireFichier(nomFichier);
    const situation = readInputFile(fichier);

    // 2) Faire la tambouille
    tambouiller(situation);

    // 3) Ecrire un fichier en output
    ecrireFichier(nomFichier, `test écriture`);
}

function lireFichier(nomFichier: string) {
    console.log(`Fichier à ouvrir:`, nomFichier);
    const file = fs.readFileSync(nomFichier, 'utf8');
    return file;
}

function ecrireFichier(nomFichier: string, contenu: any) {
    fs.writeFile(nomFichier + `_output.txt`, contenu, (erreur) => {
        if(erreur) {
            console.error(`ERREUR LORS DE L'ECRITURE`, erreur);
        } else {
            console.log(`Fichier ${nomFichier + `_output.txt`} ecrit!`)
        }
    });
}

function tambouiller({contributors, projects}: Situation) {

    const kanban: Kanban = new Kanban({freeContributors: contributors, todo: projects});
    const history = [kanban];

    // Un jour... S'il reste des projets à faire
    while (!kanban.isDone) {
        // Mettre à jour le kanban
        kanban.update();
        
    }

    /*
        Stratégies:
        1) task killer
            Faire du lean management
        2) brain up
            Maximiser les level-up des contributeurs, au détriment des points

        Mesures
    */
}

class Kanban {
    freeContributors: Contributor[] = [];
    todo: Project[] = [];
    doing: Project[] = [];
    done: Project[] = [];
    stale: Project[] = [];

    private _day = 0;

    public get day(): number {
        return this.day;
    }

    public get isDone() {
        return this.flatRaf.length === 0;
    }

    public get raf(): {todo: Project[], doing: Project[]} {
        return {todo: this.todo, doing: this.doing};
    }

    public get flatRaf(): Project[] {
        return this.raf.todo.concat(this.raf.doing);
    }

    public get rafPotentialWorth(): number{
        return this.flatRaf.reduce((w,p) => w + p.potentialWorth(this.day), 0);
    }

    public get worth(): number {
        return this.done.reduce((w,p) => w + p.worth(this.day), 0);
    }

    constructor(kanban: Partial<Kanban>) {
        Object.keys(kanban).forEach(key => this[key] = kanban[key]);
    }

    /**
     * Met à jour le Kanban
     */
    update() {
        // Vérifier l'avancement
            // Marquer les projets finis de doing à done, et les projets sans valeur de doing à stale
        const newDoing: Project[] = this.doing.reduce((list, p) => !p.isDone? [...list, p] : list, []);
        const newDone: Project[] = this.doing.reduce((list, p) => p.isDone? [...list, p] : list, []);
            // Libérer les gens affectés aux projets finis ou stale
        this.freeContributors.concat(newDone.flatMap(p => p.contributors)).filter((p1, i1, arr) => arr.indexOf(p1) === i1);
        this.doing = newDoing;
        this.done = [...this.done, ...newDone];
            // Passer les projets todo et doing sans valeur potentielle de todo à stale
        const newStale: Project[] = this.todo.reduce((list, p) => p.potentialWorth(this.day) === 0 ? [...list, p] : list, []);
        newStale.concat(this.doing.reduce((list, p) => p.potentialWorth(this.day) === 0 ? [...list, p] : list, []));
        this.stale = [...this.stale, ...newStale];
    }

    /**
     * Attribue des gens à des projets
     */
    affect() {
        let freeContributors = [...this.freeContributors];
        const markedForDoingIndex: number[] = [];
        this.todo.forEach((p, index) => {
            try {
                const {applicants, remaining} = findApplicants(p, freeContributors);
                p.contributors = applicants;
                freeContributors = remaining;
                markedForDoingIndex.push(index);
            } catch (error) {
                console.error(error);
            }
        });
        
        // Marquer les projets en cours de todo à doing
        const newTodo: Project[] = this.todo.reduce((list, p) => p.contributors.length !== 0 ? [...list, p] : list, []);
        const newDoing: Project[] = this.todo.reduce((list, p) => p.contributors.length === 0? [...list, p] : list, []);
    }
}

function findApplicants(p: Project, contributors: Contributor[]): {applicants: Contributor[], remaining: Contributor[]} {
    const remaining = [...contributors];
    const applicants: Contributor[] = [];

    const needMentor: Skill[] = [];

    // Essaie d'affecter un contributeur à chaque rôle
    p.skills.forEach(projectSkill => {
        const applicantIndex = remaining.findIndex((c) => c.skills.some(contribSkill => contribSkill.nom === projectSkill.nom && contribSkill.niveau >= projectSkill.niveau));
        
        if (applicantIndex === -1) {
            needMentor.push(projectSkill);
        } else {
            applicants.push(...remaining.splice(applicantIndex, 1));
        }
    });

    // Essaie d'affecter un contributeur mentoré à chaque rôle non pourvu
    // const unmatchedSkill = needMentor.reduce((list, p) => {
    //     const potentialApplicants = remaining.findIndex((c) => c.skills.some(contribSkill => contribSkill.nom === projectSkill.nom && contribSkill.niveau >= projectSkill.niveau));
    //     [...p, ]
    // }, []);

    if (applicants.length < p.skills.length) throw `Pas assez de contributeurs qualifiés sur le projet ${p.nom}(manque: ${p.skills.length - applicants.length}))`;

    return {applicants, remaining};
}