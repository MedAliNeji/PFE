import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin/admin.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent {
  x: any;
  user: any;
  popform !: FormGroup;
  popform1!: FormGroup;
  private modalService = inject(NgbModal);
  @ViewChild('pop') popRef!: TemplateRef<any>;
  @ViewChild('pop1') popRef1!: TemplateRef<any>;

  openAjout() {
    this.initForm1();
    this.modalService.open(this.popRef1, { backdropClass: 'pop-up-backdrop' });
  }

  listeUsers!: any[];
  constructor(private us: UserService, private router: ActivatedRoute, private formbuild: FormBuilder) { }
  ngOnInit(): void {
    this.us.getUsers().subscribe(data => {
      this.listeUsers = data;
    })
    this.initForm();
    this.initForm1();
  }
  initForm() { // edit
    this.popform = this.formbuild.group({
      id_user: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.minLength(4)]],
      departement: ['', Validators.required],
      contact: ['', Validators.required],
    });
  }
  initForm1() { // add
    this.popform1 = this.formbuild.group({
      // id_user: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      departement: ['', Validators.required],
      contact: ['', Validators.required],

    });
  }

  onModifie(i: any) {
    this.us.getUser(i.id_user).subscribe(
      (res: any) => {
        this.user = res[0];
        this.popform.patchValue({
          id_user: i.id_user,
          nom: i.nom,
          prenom: i.prenom,
          email: i.email,
          // password:i.password, //On ne peut pas recupérer le mot de passe (Haché)
          departement: i.departement,
          contact: i.contact,

        });
      }
    );
    this.modalService.open(this.popRef, { backdropClass: 'pop-up-backdrop' });

  }
  onSubmit() { // submit the edit
    //  const formData=this.popform.value;
    let formData: any = {
      id_user: this.popform.value.id_user,
      nom: this.popform.value.nom,
      prenom: this.popform.value.prenom,
      email: this.popform.value.email,
      departement: this.popform.value.departement,
      contact: this.popform.value.contact,
      // password: this.popform.value.password !== '' ? this.popform.value.password : undefined
    }
    if (this.popform.value.password !== '') {
      formData['password'] = this.popform.value.password;
    }
    this.us.editUser(formData).subscribe(() => {
      // this.popform.reset();
      this.modalService.dismissAll();
      console.log("Update Successfully");
      this.ngOnInit();
    }, error => {
      console.error('Error while updating user', error);
      alert("Error while updating user");
    })
    //  console.log(formData);

  }
  onAjout() { // submit the add

    const formData = this.popform1.value;
    if (this.popform1.valid) {
      this.us.addUser(formData).subscribe(() => {
        this.modalService.dismissAll();
        console.log("Add Successfully");
        this.ngOnInit();
      }, error => {
        console.error('Error while adding user :', error);
        alert("Error while adding user");
      })
    }
    this.modalService.open(this.popRef1, { backdropClass: 'pop-up-backdrop' });
    console.log(formData);
  }

  //Delete
  onDelete(id: string) {
    this.us.DeleteUser(id).subscribe(
      response => {
        // Handle successful response
        console.log('User deleted successfully:', response);
      },
      error => {
        // Handle error response
        console.error('Error deleting user:', error);
      }

    );

  }
}
