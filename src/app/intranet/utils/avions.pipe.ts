import { Pipe, PipeTransform } from '@angular/core';
import { VolI } from '../modeles/companie-i';

@Pipe({
  name: 'avions'
})
export class AvionsPipe implements PipeTransform {

  transform(vols: Array<VolI>, filtre?:string): Array<VolI> {
    if(!filtre || filtre.length == 0) return vols;
    if(vols.length == 0) return [];

    return vols.filter(v => v.avion.modele.indexOf(filtre) != -1);
  }

}
