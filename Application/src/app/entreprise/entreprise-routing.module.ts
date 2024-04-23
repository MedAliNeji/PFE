import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileEntrepriseComponent } from './profile-entreprise/profile-entreprise.component';
import { ListeOffresComponent } from './liste-offres/liste-offres.component';
import { AjoutOffreComponent } from './ajout-offre/ajout-offre.component';

const routes: Routes = [
  {path:'profile' , component : ProfileEntrepriseComponent},
  {path:'liste-offre' , component : ListeOffresComponent},
  {path:'ajout-offre' , component : AjoutOffreComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntrepriseRoutingModule { }
