import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeSocietesComponent } from './liste-societes/liste-societes.component';

const routes: Routes = [
  {path:'liste-societes' , component : ListeSocietesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
