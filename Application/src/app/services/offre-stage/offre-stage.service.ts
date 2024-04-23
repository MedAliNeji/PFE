import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffreStageService {


  constructor(private http : HttpClient) { }
  private url: string = environment.apiUrl ;
  options = {headers : new HttpHeaders(
    {'content-type' : "application/json"}
  )}

  ajouterOffreStage(offre : any):Observable<boolean>{
    return this.http.post<any>(this.url+"/addOffre",offre , this.options).pipe(
      map((res)=>{
        return true;
      }),
      catchError((err)=>{
        console.log("err",err);
        return of(false);
      })
    );
  }
}
