import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeOffresComponent } from './liste-offres/liste-offres.component';
import { DepotOffreComponent } from './depot-offre/depot-offre.component';

const routes: Routes = [
  {path:"liste_offres",component:ListeOffresComponent},
  {path:'depot_offre',component : DepotOffreComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtudiantRoutingModule { }
