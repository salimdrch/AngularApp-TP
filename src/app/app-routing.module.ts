import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { ErreurRouteComponent } from './pages/erreur-route/erreur-route.component';
import { FooterComponent } from './pages/footer/footer.component';
import { MentionsComponent } from './pages/mentions/mentions.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ProfilComponent } from './pages/profil/profil.component';

const routes: Routes = [
  {path: '', component:ConnexionComponent},
  {path: 'mentions', component:MentionsComponent},
  {path:'profil',component:ProfilComponent},
  {path:'intranet', loadChildren: () => import('./intranet/intranet.module').then(m => m.IntranetModule)},
  {path:'**', component:ErreurRouteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
