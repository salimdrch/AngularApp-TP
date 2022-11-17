import { Injectable } from '@angular/core';
import { PageI, ProfilI } from '../modeles/page-i';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  mentions:PageI = {
    titre: "Mentions légales",
    contenue: "        Ces mentions ne servent à rien !     "

  };

  profil:ProfilI = {
    titre: "Profil",
    contenu: " Je sappelle GROOT !!!!"
  }
  constructor() { }
}
