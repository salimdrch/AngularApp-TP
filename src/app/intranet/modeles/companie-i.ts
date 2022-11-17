export interface AvionI{
    type:string;
    capacite:number;
    autonomie?:number;
    code:string | number;
    modele:string;
}

export interface PersonnelI{
    nom:string;
    prenom:Array<string>;
    habilitation:HabilitationE;
}

export interface VolI{
    code:string | number;
    avion:AvionI;
    date:Date;
    personnel:Array<PersonnelI>;
    aeroportDepart:string;
    aeroportArrivee:string;
    duree:number;
}

enum HabilitationE{
    pilote = 'Pilote',
    copilote = 'Copilote',
    pnc = 'PNC'
}