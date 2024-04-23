import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListeOffresService {
  private url: string = environment.apiUrl ;

  getListe_Offres():Observable<any[]>{
    return this.http.get<any[]>(this.url+"/offres").pipe(catchError(err=>{
      console.error('Error Connexion:', err);
        return of([]);
    }))
  }

  constructor(private http:HttpClient) { }
}
