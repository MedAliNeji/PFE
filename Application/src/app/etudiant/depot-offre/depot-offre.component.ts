import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DepotService } from 'src/app/services/Depot/depot-stage.service';

@Component({
  selector: 'app-depot-offre',
  templateUrl: './depot-offre.component.html',
  styleUrls: ['./depot-offre.component.css']
})
export class DepotOffreComponent {


  constructor(private formB:FormBuilder , private depotS : DepotService , private route : Router){}

  registerForm = this.formB.group({
    nom : ['',Validators.required],
    prenom : ['',Validators.required],
    email : ['',[Validators.required,Validators.email]],
    tel : ['',Validators.required],
    genre : ['m',Validators.required]
  })

  ngOnInit(){
    if(!this.depotS.canActivate()){
      this.route.navigate(['/etudiant','liste_offres'])
    }

  }

  registerSubmited(){
    this.depotS.addDepot(this.registerForm.value).subscribe(
      (res) => {
        if(res){
          this.route.navigate(['/etudiant','liste_offres'])
        }
        else{
          alert("Erreur lors de l'ajout de l'offre")
        }
      }
    )

  }

}
