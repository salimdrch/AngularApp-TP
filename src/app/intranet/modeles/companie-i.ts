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
    aeroportDepart:AeroportI;
    aeroportArrivee:AeroportI;
    duree:number;
}

export interface AeroportI{
    name:string;
    city:string;
    country:string;
    iata_code:string;
    _geoloc: CoordoneeI;
    links_count:number;
    objectID:string;
}

export interface CoordoneeI{
    lat:number;
    lng:number;
}

enum HabilitationE{
    pilote = 'Pilote',
    copilote = 'Copilote',
    pnc = 'PNC'
}