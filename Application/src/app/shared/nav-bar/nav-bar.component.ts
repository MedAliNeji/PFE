import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  user : any;

  constructor(private log : LoginService,private route : Router){}


  ngOnInit(){
    this.log.controle().subscribe(
      (response) => {        
        if(response){
          this.user = this.log.user;
        }
      }
    )
    
  }

  logout(){
    this.log.deconnexion()

  }

}
