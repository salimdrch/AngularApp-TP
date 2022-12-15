export interface PageI {
    titre:string; // variable obligatoire
    intro?:string;
    contenue?:string; // varibale optionnelle
}
export interface ProfilI{
    titre:string;
    prenom:string;
    status:string;
    contenu?: string;
}

export interface ContenusI{
    mentions:PageI;
    profil:ProfilI;
}