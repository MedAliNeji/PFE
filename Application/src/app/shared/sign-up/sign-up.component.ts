import { DepartmentService } from './../../services/department.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registerForm!: FormGroup;
  // departments: string[] = [];

  constructor(private fb: FormBuilder, private logS: LoginService, private departmentService: DepartmentService) { }



  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      email: ['', [Validators.required]], //Validators.pattern('[a-zA-Z0-9._%+-]+@isetr.tn$')]],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      //departement: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      rpassword: ['', [Validators.required, Validators.minLength(4)]]
    });
    this.registerForm.setValidators(this.matchingPasswords);
    // this.fetchDepartments();
  }
  // registerForm = new FormGroup({
  //   firstname: new FormControl(""),
  //   lastname: new FormControl(""),
  //   email: new FormControl(""),
  //   mobile: new FormControl(""),
  //   pwd: new FormControl(""),
  //   rpwd: new FormControl("")

  // });
  /* fetchDepartments() {
     this.departmentService.getDepartments().subscribe(
       departments => {
         this.departments = departments;
       },
       error => {
         console.error('Error fetching departments:', error);
       }
     );
   }*/
  registerSubmited() {
    if (this.registerForm.valid) {
      // // Submit the form if it's valid
      // console.log('Form submitted successfully');
      // console.log(this.registerForm.value);
      this.logS.register(this.registerForm.value).subscribe(
        (response) => {
          console.log(response);
          if (response) {

          }
          else {
            alert("Error while inscription");
          }
        },
        (error) => {
          console.error('Error:', error);
        }
      );


    } else {
      // Mark all fields as touched to display error messages
      this.registerForm.markAllAsTouched();
    }
  }


  matchingPasswords(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('rpassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

}
