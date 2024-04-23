import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EntrepriseService } from 'src/app/services/entreprise/entreprise.service';
import { LoginService } from 'src/app/services/login.service';
import { OffreStageService } from 'src/app/services/offre-stage/offre-stage.service';

@Component({
  selector: 'app-profile-entreprise',
  templateUrl: './profile-entreprise.component.html',
  styleUrls: ['./profile-entreprise.component.css']
})
export class ProfileEntrepriseComponent {

  // pop up view
  private modalService = inject(NgbModal);

  @ViewChild('pop') popRef!: TemplateRef<any>;


  openPopup() {
    this.popform = this.formbuild.group({
      titre: ['' , Validators.required],
      description: ['' , Validators.required],
      date_debut: ['' , Validators.required],
      date_fin: ['' , Validators.required],
      id_ent: [this.id_ent , Validators.required],
      nombre : [0 , Validators.required]
    });
    this.modalService.open(this.popRef, { backdropClass: 'pop-up-backdrop' });
  }

  constructor(private formbuild : FormBuilder,private logU : LoginService,private offreS:OffreStageService) { }

  entreprise: any;
  id_ent : string ='';

  popform !: FormGroup;

  ngOnInit(): void {
    
    this.entreprise = this.logU.user;
    this.id_ent = this.entreprise.id_ent;
    
  }

onAjout(){
  this.offreS.ajouterOffreStage(this.popform.value).subscribe(
    res =>{
      if(res){
        alert("Offre ajoutée avec succès");
        this.modalService.dismissAll();
      }
      else{
        alert("Erreur lors de l'ajout de l'offre");
        this.modalService.dismissAll();
      }
    }
  )
  
}



}
