import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin/admin.service';
import { EntrepriseService } from 'src/app/services/entreprise/entreprise.service';

@Component({
  selector: 'app-liste-societes',
  templateUrl: './liste-societes.component.html',
  styleUrls: ['./liste-societes.component.css']
})
export class ListeSocietesComponent implements OnInit{
  x:any;
  entreprise: any;
  popform !: FormGroup;
  popform1!:FormGroup;
  private modalService = inject(NgbModal);
  @ViewChild('pop') popRef!: TemplateRef<any>;
  @ViewChild('pop1') popRef1!: TemplateRef<any>;

  openAjout(){
    this.initForm1();
    this.modalService.open(this.popRef1, { backdropClass: 'pop-up-backdrop' });
  }

  listeSocietes!:any[];
  constructor(private entre : EntrepriseService , private router : ActivatedRoute , private formbuild : FormBuilder){}
  ngOnInit(): void {
    this.entre.getEntreprises().subscribe(data=>{
      this.listeSocietes=data;
    })
    this.initForm();
    this.initForm1();
  }
  initForm(){ // edit
    this.popform = this.formbuild.group({
      id_ent: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', Validators.required],
      adresse: ['', Validators.required],
      contact: ['', Validators.required],
      secteuractivite:['',Validators.required],
      password: ['', [Validators.minLength(4)]],
      logo: ['', Validators.required],
    });
  }
  initForm1(){ // add
    this.popform1 = this.formbuild.group({
      // id_ent: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [ Validators.required, Validators.email]],
      adresse: ['', Validators.required],
      contact: ['', Validators.required],
      secteuractivite:['',Validators.required],
      password: ['', [Validators.required,Validators.minLength(4)]],
      logo: ['', Validators.required],
    });
  }

  onModifie(i:any){
    this.entre.getEntreprise(i.id_ent).subscribe(
      (res: any) => {
        this.entreprise = res[0];
        this.popform.patchValue({
          id_ent: i.id_ent,
          nom: i.nom,
          email: i.email,
          adresse: i.adresse,
          contact: i.contact,
          secteuractivite:i.secteuractivite,
          // password:i.password, //On ne peut pas recupérer le mot de passe (Haché) 
          logo:i.logo
        });
      }
    );
    this.modalService.open(this.popRef, { backdropClass: 'pop-up-backdrop' });
    
  }
  onSubmit(){ // submit the edit
  //  const formData=this.popform.value;
  let formData : any = {
    id_ent: this.popform.value.id_ent,
    nom: this.popform.value.nom,
    email: this.popform.value.email,
    adresse: this.popform.value.adresse,
    contact: this.popform.value.contact,
    secteuractivite: this.popform.value.secteuractivite,
    logo: this.popform.value.logo,
    // password: this.popform.value.password !== '' ? this.popform.value.password : undefined
  }
  if(this.popform.value.password !== ''){
    formData['password'] = this.popform.value.password;
  }
   this.entre.editEntreprise(formData).subscribe(()=>{
    // this.popform.reset();
    this.modalService.dismissAll();
    console.log("Mise à Jour avec Succés");
    this.ngOnInit();
   },error=>{
    console.error('Erreur lors de la mise à jour de l\'entreprise :', error);
    alert("Erreur lors de la mise à jour de l'entreprise");
   })
  //  console.log(formData);
   
  }
  onAjout(){ // submit the add
    
    const formData=this.popform1.value;
    if(this.popform1.valid){
    this.entre.addEntreprise(formData).subscribe(()=>{
      this.modalService.dismissAll();
      console.log("Ajouté avec Succés");
      this.ngOnInit();
     },error=>{
      console.error('Erreur lors de l\'ajout de l\'entreprise :', error);
      alert("Erreur lors de l'ajout de l'entreprise");
     })
    }
    this.modalService.open(this.popRef1, { backdropClass: 'pop-up-backdrop' });
    console.log(formData);
  }

}
