import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }
  private url: string = environment.apiUrl;
  options = {
    headers: new HttpHeaders({
      'content-type': "application/json",
      'authorization': "Bearer " + sessionStorage.getItem("accessToken")
    })
  }
  user: any;
  acessTocken: string = '';
  connected: boolean = false;


  role(): Observable<string> {

    if (!sessionStorage.getItem("accessToken") || !sessionStorage.getItem('user')) return of("");
    else
      return this.http.post<any>(`${this.url}/controle`, { accessToken: sessionStorage.getItem("accessToken") }, this.options).pipe(
        map((response) => {
          console.log(response);
          if (response.connected) {
            this.connected = true;
            this.user = JSON.parse(sessionStorage.getItem("user")!);
            return response.role;
          }
          else {
            this.connected = false;
            return ""
          }
        }),
        catchError(error => {
          console.error('Error:', error);
          return of("");
        })
      )

  }

  controle(): Observable<boolean> {
    if (!sessionStorage.getItem("accessToken") || !sessionStorage.getItem('user')) return of(false);
    else
      return this.http.post<any>(`${this.url}/controle`, { accessToken: sessionStorage.getItem("accessToken") }, this.options).pipe(
        map((response) => {
          console.log(response);
          if (response.connected) {
            this.connected = true;
            this.user = JSON.parse(sessionStorage.getItem("user")!);
            return true;
          }
          else {
            this.connected = false;
            sessionStorage.clear();
            return false
          }
        }),
        catchError(error => {
          console.error('Error:', error);
          return of(false);
        })
      )
  }

  // controle2()  {
  //   this.http.post<any>(`${this.url}/controle`, { accessToken: sessionStorage.getItem("accessToken") }, this.options).subscribe(
  //     (response) => {
  //       console.log(response);
  //       if(response.connected){
  //         this.connected = true;
  //         this.user = response.user;
  //       }
  //       else{
  //         this.connected = false;
  //       }
  //     },
  //     (error) => {
  //       console.error('Error:', error);
  //     }
  //   );

  // }

  deconnexion() {
    sessionStorage.clear();
    window.location.replace(window.location.href + "/Deconnecter");
  }

  login(email: string, password: string): Observable<boolean> {
    console.log("login service");

    return this.http.post<any>(`${this.url}/login`, { email, password })
      .pipe(
        map((response) => {


          // Store login information for successful login
          sessionStorage.setItem("accessToken", response.accessToken);
          sessionStorage.setItem("user", JSON.stringify(response.user));

          // alert("connected \n hello "+response.user.nom+" "+response.user.prenom);
          return true; // Login successful
        }),
        tap(result => {
          // console.log(result); // Log the login result (true or false)
          // console.log(JSON.parse(sessionStorage.getItem("user")!).role);

        }),
        catchError(error => {
          // console.error(error);
          console.error('Error:', error);
          // alert("An error occurred during login");
          return of(false); // Return false in case of error
        })
      );
  }

  register(data: any): Observable<boolean> {
    console.log(data);

    return this.http.post<{ accessToken: string, user: any }>(`${this.url}/register`, data, this.options).pipe(
      map(
        (response) => {
          alert("Registration Done ");
          this.router.navigate(['/login']);
          return true
        }
      ),
      catchError(error => {
        console.error('Error Connexion:', error);
        throw of(false);
      })

    )
  }



}
