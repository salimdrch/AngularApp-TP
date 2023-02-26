import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { ErreurRouteComponent } from './pages/erreur-route/erreur-route.component';
import { MentionsComponent } from './pages/mentions/mentions.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { AuthGuard } from './securite/auth.guard';

const routes: Routes = [
  {path: '', component:ConnexionComponent},
  {path: 'mentions', component:MentionsComponent},
  {path:'profil',component:ProfilComponent},
  {path:'intranet', loadChildren: () => import('./intranet/intranet.module').then(m => m.IntranetModule), canActivate:[AuthGuard], canLoad:[AuthGuard] },
  {path:'**', component:ErreurRouteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
