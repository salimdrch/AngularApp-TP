import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, doc, getDoc, deleteDoc, setDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { AeroportI, PersonnelI, VolI } from '../modeles/companie-i';
import { PersonnelsService } from './personnels.service';

@Injectable({
  providedIn: 'root'
})
export class CompagnieService {

  /***
   * Déclaration des variables
   */

  aeroports: Array<AeroportI> = [];
  vol: Array<VolI> = [];
  vols: Array<{ id: string, data: VolI }> = [];

  // Example with BehaviorSubject
  vols$: BehaviorSubject<Array<{ id: string, data: VolI }>> = new BehaviorSubject(<Array<{ id: string, data: VolI }>>[]);

  constructor(private readonly http: HttpClient, private bdd: Firestore, private personalService: PersonnelsService) {
    this.getAeroports();
  }

  /** 
  * Récupération des données de vols à partir d'un json
  **/

  getVols() {
    this.http.get<Array<VolI>>("assets/data/vols.json").subscribe(v => {
      this.vol = v
    })
  }


  /** 
  * Récupération des données de aeroports à partir d'un json
  **/

  getAeroports() {
    this.aeroports = [];
    this.http.get<Array<AeroportI>>("assets/data/aeroports.json").subscribe(a => {
      this.aeroports = a;
    });
  }

  /** 
   * Récupération des données de aeroports par le nom à partir d'un json
   **/

  getAeroportByName(nameA: string): AeroportI {
    let aeroport = <AeroportI>{};
    try {
      aeroport = this.aeroports.find(({ name }) => name === nameA) as AeroportI
      return aeroport
    } catch (error) {
      throw (error);
    }
  }

  /**
   * Vérification des si les ID suivantes existent dans les données 
   */
  idInList(id: string | number): boolean {
    let tmp: boolean = false; 
    this.vols.forEach( element => id == element.id ? tmp = true : console.log("not in array", element))
    return tmp;
  }

  /** 
  * Récupération des données dans la Firebase
  **/

  /** Recuperer une collection de vols */
  async getFireVols() {
    this.vols = []; // reinitialized array list 
    this.personalService.getFirePersonnels(); // recuperer la list des personnels 
    await getDocs(collection(this.bdd, 'vols'))
      .then((vol) => {
        vol.forEach(v => {
          let listPersonnel: Array<PersonnelI> = []
          let aeroportDepart = <AeroportI>{};
          let aeroportArrivee = <AeroportI>{};

          // on récupere la liste de personnels p
          v.data()["personnel"].forEach((el: any) => {
            let r: any = this.personalService.personnels.find(({ id }) => id == el)            
            listPersonnel.push(r.data);
          });

          aeroportDepart = this.getAeroportByName(v.data()["aeroportDepart"]) as AeroportI
          aeroportArrivee = this.getAeroportByName(v.data()["aeroportArrivee"]) as AeroportI

          let data = v.data();
          data["personnel"] = listPersonnel as Array<PersonnelI>
          data["aeroportDepart"] = aeroportDepart
          data["aeroportArrivee"] = aeroportArrivee
          this.vols.push({ id: v.id, data: data as VolI });
        })
        this.vols$.next(this.vols);
      })
      .catch(err => console.log("Erreur", err));;
  }


  /***
 * function CREATE, UPDATE, DELETE Vols
 */

   async addFireVols(id: string, data: VolI) {
    const docVol = doc(this.bdd, 'vols', id);
    // Créer ou mettre à jour le vol
    await setDoc(docVol, data, { merge: true })
      .then((r) => {
        this.getFireVols()
        alert("Le vol a été crée")
      })
      .catch((err) => {
        console.log("Le vol n'a été crée")
      });
  }

  /** Recuperer un vol à partir de son id */
  async updateFireVols(id: string, data: VolI) {
    const docVol = doc(this.bdd, "vols", id);
    await setDoc(docVol, data, { merge: true })
      .then((r) => {
        alert("Le vol a été mis à jour")
      })
      .catch((err) => {
        console.log("Le vol n'a été mis à jour")
      });
  }

  /** delete un vol à partir de son id */
  async delFireVols(id: string) {
    const docVol = doc(this.bdd, "vols", id);
    await deleteDoc(docVol)
      .then((r) => {
        this.getFireVols()
        alert("Le vol a été supprimé")
      })
      .catch((err) => {
        console.log("Le vol n'a été supprimé")
      });
  }

}
