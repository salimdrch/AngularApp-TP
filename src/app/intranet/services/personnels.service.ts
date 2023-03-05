import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDocs,  setDoc, deleteDoc } from '@angular/fire/firestore';
import { PersonnelI } from '../modeles/companie-i';

@Injectable({
  providedIn: 'root'
})
export class PersonnelsService {
  
  personnels: Array<{ id: string, data: PersonnelI }> = [];

  constructor( private readonly http: HttpClient, private bdd: Firestore) { }

  idInList(id: string | number): boolean {
    let tmp: boolean = false; 
    this.personnels.forEach( element => id == element.id ? tmp = true : console.log("not in array", element));
    return tmp;
  }

  /** 
  * Récupération des données dans la Firebase
  **/

  /** Requete pour récupérer une collection de personnell à partir de la firebase */
  async getFirePersonnels() {
    this.personnels = []; // reinitialized array list 
    await getDocs(collection(this.bdd, 'personnels'))
      .then((per) => {
        per.forEach(p => {
          this.personnels.push({ id: p.id, data: p.data() as PersonnelI });
        })
      })
      .catch(err => console.log("Erreur", err));
  }

  /***
   * function CREATE, UPDATE, DELETE PERSONAL
   */

  async addFirePersonnel(id: string, data: PersonnelI) {
    const docPersonnel = doc(this.bdd, 'personnels', id);
    // Créer ou mettre à jour le personnel
    await setDoc(docPersonnel, data, { merge: true })
      .then((r) => {
        this.getFirePersonnels()
        alert("Le personnel a été crée")
      })
      .catch((err) => {
        console.log("Le personnel n'a été crée")
      });
  }

  /** Recuperer un personnel à partir de son id */
  async updateFirePersonnel(id: string, data: PersonnelI) {
    const docPersonnel = doc(this.bdd, "personnels", id);
    await setDoc(docPersonnel, data, { merge: true })
      .then((r) => {
        alert("L'avion a été mis à jour")
      })
      .catch((err) => {
        console.log("L'avion n'a été mis à jour")
      });
  }

  /** delete un personnel à partir de son id */
  async delFirePersonnel(id: string) {
    const docPersonnel = doc(this.bdd, "personnels", id);
    await deleteDoc(docPersonnel)
      .then((r) => {
        this.getFirePersonnels()
        alert("Le personnel a été supprimé")
      })
      .catch((err) => {
        console.log("Le personnel n'a été supprimé")
      });
  }
}
