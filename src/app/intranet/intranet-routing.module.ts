import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { AttributionsComponent } from './pages/attributions/attributions.component';
import { AvionsComponent } from './pages/avions/avions.component';
import { PersonnelsComponent } from './pages/personnels/personnels.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';

const routes: Routes = [
  { path:'', component:AccueilComponent, children:[
    { path:'', component:AttributionsComponent },
    { path:'avions', component:AvionsComponent },
    { path:'personnels', component:PersonnelsComponent },
    { path:'userManagement', component:UserManagementComponent},
    { path:'userForm', component:UserFormComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntranetRoutingModule { }
