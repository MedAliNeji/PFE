import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntrepriseRoutingModule } from './entreprise-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProfileEntrepriseComponent } from './profile-entreprise/profile-entreprise.component';
import { ListeOffresComponent } from './liste-offres/liste-offres.component';
import { AjoutOffreComponent } from './ajout-offre/ajout-offre.component';


@NgModule({
  declarations: [
    ProfileEntrepriseComponent,
    ListeOffresComponent,
    AjoutOffreComponent
  ],
  imports: [
    CommonModule,
    EntrepriseRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EntrepriseModule { }
