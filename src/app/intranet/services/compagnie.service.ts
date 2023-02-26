import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, doc, getDoc, deleteDoc, setDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { AeroportI, AvionI, PersonnelI, VolI } from '../modeles/companie-i';

@Injectable({
  providedIn: 'root'
})
export class CompagnieService {

  /***
   * Déclaration des variables
   */

  avions: Array<AvionI> = [];
  aeroports: Array<AeroportI> = [];
  vol: Array<VolI> = [];
  personnels: Array<{ id: string, data: PersonnelI }> = [];
  vols: Array<{ id: string, data: VolI }> = [];
  //listePersonnelsById:Array<PersonnelI> = [];
  //listePersonnels!:Array<{id: string, data: PersonnelI}>;
  //listeAvions!:Array<{id: string, data: AvionI}>;

  // Example with BehaviorSubject
  personnels$: BehaviorSubject<Array<{ id: string, data: PersonnelI }>> = new BehaviorSubject(<Array<{ id: string, data: PersonnelI }>>[]);
  vols$: BehaviorSubject<Array<{ id: string, data: VolI }>> = new BehaviorSubject(<Array<{ id: string, data: VolI }>>[]);

  constructor(private readonly http: HttpClient, private bdd: Firestore) {
    this.getVols();
    //this.getAvions();
    this.getAeroports();
    //this.getPersonnels();
    //this.getFirePersonnels();
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
 * Récupération des données de avions à partir d'un json
 **/

  getAvions() {
    this.http.get<Array<AvionI>>("assets/data/avions.json").subscribe(a => {
      this.avions = a
    });
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

  /** Requete pour récupérer une collection de personnell à partir de la firebase */
  async getFirePersonnels() {
    this.personnels = []; // reinitialized array list 
    await getDocs(collection(this.bdd, 'personnels'))
      .then((per) => {
        per.forEach(p => {
          //this.listePersonnels.push({id: p.id, data: p.data() as PersonnelI});
          this.personnels.push({ id: p.id, data: p.data() as PersonnelI });
        })
        this.personnels$.next(this.personnels);
      })
      .catch(err => console.log("Erreur", err));
  }

  /** Recuperer un avion à partir de son code */
  async getFireAvions(code: string) {
    const docAvion = doc(this.bdd, "avions", code);
    await getDoc(docAvion);
    return docAvion
  }

  /** Récuperer un personnel à partir de son id */
  async getPersonnelVols(id: string) {
    const docPersonnel = doc(this.bdd, "personnels", id);
    return await getDoc(docPersonnel);
  }

  /** Recuperer une collection de vols */
  async getFireVols() {
    this.vols = []; // reinitialized array list 
    this.getFirePersonnels(); // recuperer la list des personnels 
    await getDocs(collection(this.bdd, 'vols'))
      .then((vol) => {
        vol.forEach(v => {
          let listPersonnel: Array<PersonnelI> = []
          let aeroportDepart = <AeroportI>{};
          let aeroportArrivee = <AeroportI>{};

          // on récupere la liste de personnels p
          v.data()["personnel"].forEach((el: any) => {
            let r: any = this.personnels.find(({ id }) => id == el)            
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
   * function CREATE, UPDATE, DELETE AIRPLANE
   */

  /** delete un avion à partir de son code */
  async delFireAvions(code: string) {
    const docAvion = doc(this.bdd, "avions", code);
    await deleteDoc(docAvion)
      .then((r) => {
        this.getFireAvs()
        alert("L'avion a été supprimé")
        console.log("L'avion à été supprimé")
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
        console.log("L'avion à été mis à jour")
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
        console.log("L'avion à été crée")
      })
      .catch((err) => {
        console.log("L'avion n'a été crée")
      });
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
        console.log("Le personnel à été crée")
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
        console.log("L'avion à été mis à jour")
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
        console.log("Le personnel à été supprimé")
      })
      .catch((err) => {
        console.log("Le personnel n'a été supprimé")
      });
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
        console.log("Le vol à été crée")
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
        console.log("Le vol à été mis à jour")
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
        console.log("Le vol à été supprimé")
      })
      .catch((err) => {
        console.log("Le vol n'a été supprimé")
      });
  }

}
