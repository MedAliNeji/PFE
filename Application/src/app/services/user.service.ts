import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  private url: string = environment.apiUrl;
  options = {
    headers: new HttpHeaders(
      { 'content-type': "application/json" }
    )
  }




  // Users
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.url + "/users", this.options).pipe(catchError(err => {
      console.error('Error Connexion:', err);
      return of([]);
    }))
  }


  getUser(id: string): Observable<any[]> {
    return this.http.post<any[]>(`${this.url}/user`, { id_user: +id }, this.options).pipe(
      catchError(err => {
        console.log(err)
        alert("Erreur lors de la recuperation des utilisateurs");
        return of([]);
      })
    );
  }

  editUser(i: any): Observable<any> {
    return this.http.post<any>(this.url + "/editUser", i, this.options);
  }
  addUser(data: any): Observable<any> {
    return this.http.post<any>(this.url + "/addUser", data, this.options);
  }

  DeleteUser(id: string) {
    return this.http.post<any>(`${this.url}/deleteUser`, { id_user: +id }, this.options).pipe(
      catchError(err => {
        console.log(err)
        alert("Erreur lors de la suppression de l'utilisateur");
        return of([]);
      })
    );
  }

}
