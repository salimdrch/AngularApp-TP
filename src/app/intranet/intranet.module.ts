import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntranetRoutingModule } from './intranet-routing.module';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { AvionsComponent } from './pages/avions/avions.component';
import { AttributionsComponent } from './pages/attributions/attributions.component';
import { PersonnelsComponent } from './pages/personnels/personnels.component';
import { AvionsPipe } from './utils/avions.pipe';
import { FormsModule } from '@angular/forms';
import { PersonnelPipe } from './utils/personnel.pipe';
import { ModelePipe } from './utils/modele.pipe';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { UserFormComponent } from './pages/user-form/user-form.component';


@NgModule({
  declarations: [
    AccueilComponent,
    AvionsComponent,
    AttributionsComponent,
    PersonnelsComponent,
    AvionsPipe,
    PersonnelPipe,
    ModelePipe,
    UserManagementComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    IntranetRoutingModule,
    FormsModule
  ]
})
export class IntranetModule { }
