import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, deleteDoc, getDocs, collection } from '@angular/fire/firestore';
import { AvionI } from '../modeles/companie-i';

@Injectable({
  providedIn: 'root'
})
export class AvionsService {

  /***
   * Déclaration des variables
   */

  avions: Array<AvionI> = [];

  constructor(private readonly http: HttpClient, private bdd: Firestore) { }

  /** 
   * Récupération des données de avions à partir d'un json
   **/

  getAvions() {
    this.http.get<Array<AvionI>>("assets/data/avions.json").subscribe(a => {
      this.avions = a
    });
  }

  /**
   * Vérification des si les ID suivantes existent dans les données 
   */
  idInList(id: string | number): boolean {
    let tmp: boolean = false; 
    this.avions.forEach( element => id == element.code ? tmp = true : console.log("not in array", element));
    return tmp;
  }

    /** 
  * Récupération des données dans la Firebase
  **/

  /** Requete pour récupérer une collection */
  async getFireAvs() {
    this.avions = [];
    await getDocs(collection(this.bdd, 'avions'))
      .then(av => {
        av.forEach(a => {
          //this.listeAvions.push({id:a.id, data:a.data() as AvionI}); 
          this.avions.push(a.data() as AvionI);
        })
      })
      .catch(erreur => console.log("Erreur", erreur));
  }

  /***
   * function CREATE, UPDATE, DELETE AIRPLANE
   */

  /** delete un avion à partir de son code */
  async delFireAvions(code: string) {
    const docAvion = doc(this.bdd, "avions", code);
    await deleteDoc(docAvion)
      .then((r) => {
        this.getFireAvs()
        alert("L'avion a été supprimé")
      })
      .catch((err) => {
        console.log("L'avion n'a été supprimé")
      });
  }

  /** Recuperer un avion à partir de son code */
  async updateFireAvions(code: string, data: AvionI) {
    const docAvion = doc(this.bdd, "avions", code);
    await setDoc(docAvion, data, { merge: true })
      .then((r) => {
        alert("L'avion a été mis à jour")
      })
      .catch((err) => {
        console.log("L'avion n'a été mis à jour")
      });
  }

  async addFireAvions(code: string, data: AvionI) {
    const docAvion = doc(this.bdd, 'avions', code);
    // Créer ou mettre à jour l'avion
    await setDoc(docAvion, data, { merge: true })
      .then((r) => {
        this.getFireAvs()
        alert("L'avion a été crée")
      })
      .catch((err) => {
        console.log("L'avion n'a été crée")
      });
  }


}
