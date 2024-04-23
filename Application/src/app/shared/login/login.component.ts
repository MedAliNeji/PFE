import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private formBuild : FormBuilder,private login : LoginService,private router : Router) { }

  loginForm = this.formBuild.group({
    email : ['', [Validators.required, Validators.email]],
    password : ['', [Validators.required]]
  })

  ngOnInit(): void {
    // this.login.controle();
  }

  onSubmit(){
    this.login.login(this.loginForm.value.email! , this.loginForm.value.password!).subscribe( (res : any) => {
      // console.log(res);
      if(res){
        window.location.href = '/';
      }
      else{
        alert("Inccorect email ou mot de passe");
        this.loginForm.patchValue({
          password : ''
        })
      }
      
    })
  }

}
