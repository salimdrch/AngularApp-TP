export interface PageI {
    titre:string; // variable obligatoire
    intro?:string;
    contenue?:string; // varibale optionnelle
}
export interface ProfilI{
    titre:string;
    contenu?: string;
}

export interface ContenusI{
    mentions:PageI;
    profil:ProfilI;
}