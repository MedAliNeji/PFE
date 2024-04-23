import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepotService } from 'src/app/services/Depot/depot-stage.service';
import { ListeOffresService } from 'src/app/services/etudiant/liste-offres.service';

@Component({
  selector: 'app-liste-offres',
  templateUrl: './liste-offres.component.html',
  styleUrls: ['./liste-offres.component.css']
})
export class ListeOffresComponent implements OnInit{

  adress : string[]=[]
  secteurs : string[]=[]

  filteradress : string="";
  filtersecteurs : string="";


  offres:any[] = [];

constructor(private list:ListeOffresService,private router:Router,private depotS : DepotService){}
redirectToDepotOffre(offreStageId: number) {
  // Redirect to 'depotOffre' route with 'id_entreprise' parameter
  this.depotS.id_os = offreStageId;
  this.router.navigate(['/etudiant','depot_offre']);
}


ngOnInit(): void {
  this.list.getListe_Offres().subscribe(data=>{
    this.offres=data; 
    // console.log(data)

    for(let c of data){
      if( !this.adress.includes(c.adresse!.trim().toUpperCase()) ) { this.adress.push(c.adresse!.trim().toUpperCase()) }
      this.extractSecturs(c.secteuractivite)
      
    }


  })
}

extractSecturs(col : string){
  let sec = [];
  sec = col.split(",");
  for(let c of sec){
    if( !this.secteurs.includes(c.trim().toUpperCase()) ) { this.secteurs.push(c.trim().toUpperCase()) }
  }
}


filtredOffres = ()=>{
    if(this.filteradress == "" && this.filtersecteurs == "")
      return this.offres;
      else{
        let f : any[] =this.offres
        if(this.filteradress != ""){
          f=f.filter( c =>  c.adresse?.trim().toUpperCase().includes(this.filteradress)  )
        }
        if(this.filtersecteurs != ""){
          f=f.filter( c =>  c.secteuractivite?.trim().toUpperCase().includes(this.filtersecteurs)  )
        }
        
        // console.log(f);
        
        return f;
      }
}

}
