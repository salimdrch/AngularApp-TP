import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntranetRoutingModule } from './intranet-routing.module';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { AvionsComponent } from './pages/avions/avions.component';
import { AttributionsComponent } from './pages/attributions/attributions.component';
import { PersonnelsComponent } from './pages/personnels/personnels.component';


@NgModule({
  declarations: [
    AccueilComponent,
    AvionsComponent,
    AttributionsComponent,
    PersonnelsComponent
  ],
  imports: [
    CommonModule,
    IntranetRoutingModule
  ]
})
export class IntranetModule { }
