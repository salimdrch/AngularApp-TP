export interface IdI {
    mail: string;
    password: string ;
}

export interface UserI {
    uid: string | number;
    nom: string;
    prenoms?:string;
    tel?: string | number;
    photoURL?: string;
    statut: "user" | "admin";
}
