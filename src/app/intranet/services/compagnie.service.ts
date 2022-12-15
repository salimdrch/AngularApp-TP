import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, doc, getDoc, deleteDoc, setDoc} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { AvionI, PersonnelI, VolI } from '../modeles/companie-i';

@Injectable({
  providedIn: 'root'
})
export class CompagnieService {
  
  vol: Array<VolI> = [];
  
  vols:Array<{id: string, data: VolI}> = [];
  avions:Array<AvionI> = [];
  personnels:Array<{id: string, data: PersonnelI}> = [];
  listeAvions!:Array<{id: string, data: AvionI}>;
  listePersonnelsById:Array<PersonnelI> = [];
  listePersonnels!:Array<{id: string, data: PersonnelI}>;

  personnels$: BehaviorSubject<Array<{id: string, data: PersonnelI}>> = new BehaviorSubject(<Array<{id: string, data: PersonnelI}>>[]);
  vols$: BehaviorSubject<Array<{id: string, data: VolI}>> = new BehaviorSubject(<Array<{id: string, data: VolI}>>[]);

  constructor(private readonly http:HttpClient, private bdd:Firestore) {
    this.getVols();
    this.getAvions();
    //this.getPersonnels();
    //this.getFirePersonnels();
   }

  /** 
  * Récupération des données de vols
  **/
  getVols(){
  this.http.get<Array<VolI>>("assets/data/vols.json").subscribe(p =>{
    console.log("Donnée retourné depuis le fichier json",p);
    this.vol = p 
    })
  }

   /** 
  * Récupération des données de avions
  **/

  getAvions(){
    this.http.get<Array<AvionI>>("assets/data/avions.json").subscribe(a =>{
      console.log("Donnée retourné depuis le fichier json",a);
      this.avions = a 
    })
  }

  /** 
  * Récupération des données de personels
  **/
  
 


  /** Requete pour récupérer une collection */
  async getFireAvs(){
    await getDocs(collection(this.bdd, 'avions'))
    .then(av => {
      console.log(av);
      av.forEach(a => {
        console.log(a.id, a.data());
        //this.listeAvions.push({id:a.id, data:a.data() as AvionI}); 
        this.avions.push(a.data() as AvionI);
      })
    })
    .catch(erreur => console.log("Erreur", erreur));
  }

  /** Requete pour récupérer une collection de personnell à partir de la firebase */
  async getFirePersonnels(){
    this.personnels = []; // reinitialized array list 
    await getDocs(collection(this.bdd, 'personnels'))
    .then((per) =>{
      console.log(per);
      per.forEach(p => {
        console.log(p.id, p.data());
        //this.listePersonnels.push({id: p.id, data: p.data() as PersonnelI});
        this.personnels.push({id:p.id, data:p.data() as PersonnelI});
      })
      this.personnels$.next(this.personnels);
      console.log("dans le service : ", this.personnels);
    })
    .catch(err => console.log("Erreur", err));
  }

  /** Recuperer un avion à partir de son code */
  async getFireAvions(code : string){
    const docAvion = doc(this.bdd, "avions", code);
    await getDoc(docAvion);
    return docAvion
  }

  /** Récuperer un personnel à partir de son id */
  async getPersonnelVols(id : string){
    const docPersonnel = doc(this.bdd, "personnels",id);
    return await getDoc(docPersonnel);
  }

  /** Recuperer une collection de vols */
  async getFireVols(){
    this.vols = []; // reinitialized array list 
    await getDocs(collection(this.bdd, 'vols'))
    .then((vol) =>{
      console.log(vol);
      vol.forEach(v => {
        console.log("ID :", v.id, "donne : ", v.data());
        //this.listePersonnels.push({id: p.id, data: p.data() as PersonnelI});
        this.vols.push({id:v.id, data: v.data() as VolI});
        console.log("Donnée de personnels ",v.data()["personnel"]);
      })  
      this.vols$.next(this.vols);
      console.log("dans le service : " + this.vols);
    })
    .catch(err => console.log("Erreur", err));;
  }

  /*
  getPersonnelById(tab_id: Array<string>){
    this.listePersonnelsById = [];
    for (let i = 0; i < tab_id.length; i++) {
      this.getPersonnelVols(tab_id[i])
      .then(
        p => this.listePersonnelsById.push(p.data() as PersonnelI)
      )
      .catch(err => console.log(err));
    }
    console.log("Fin getPersonnelById", this.listePersonnelsById);
  }
  */

    getPersonnelById(){
     
    }



  /** delete un avion à partir de son code */
  async delFireAvions(code : string){
    const docAvion = doc(this.bdd, "avions", code);
    await deleteDoc(docAvion);
  }

  /** Recuperer un avion à partir de son code */
  async updateFireAvions(code : string, data: AvionI){
    const docAvion = doc(this.bdd, "avions", code);
    await setDoc(docAvion, data, {merge:true});
  
  }


  /* getPersonnels(){
    this.http.get<Array<PersonnelI>>("assets/data/personnels.json").subscribe(pers =>{
      console.log("Donnée retourné depuis le fichier json",pers);
      this.personnels = pers 
    })
  } */


  // getPersonnels(){
  //   this.http.get<Array<PersonnelI>>("assets/data/personnels.json").subscribe({
  //       next: (p) => {
  //         this.personnels = p;
  //         //this.getFirePersonnels();
  //       },
  //       error: (e) => {
  //         console.log(e);
  //       },
  //       complete: () => {
  //         console.log("Chargement de donnée terminée");
  //         this.getFireAvs();
  //       }
  //   })
  // }
}
