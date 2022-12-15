export interface IdI {
    id: string | number;
    passe: string | number;
}

export interface UserI {
    uid: string | number;
    nom: string;
    prenoms:string;
    tel: number;
    photoURL: string;
    statut?:string;
}
