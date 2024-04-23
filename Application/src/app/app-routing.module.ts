import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { SignUpComponent } from './shared/sign-up/sign-up.component';
import { entrepriseGuard } from './guards/entreprise.guard';
import { adminGuard } from './guards/admin.guard';
import { encadreurGuard } from './guards/encadreur.guard';
import { etudiantGuard } from './guards/etudiant.guard';
import { LayoutComponent } from './shared/layout/layout.component';

const routes: Routes = [


  // { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  // { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
  // { path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) },
  // { path: 'services', loadChildren: () => import('./services/services.module').then(m => m.ServicesModule) },
  // { path: 'portfolio', loadChildren: () => import('./portfolio/portfolio.module').then(m => m.PortfolioModule) },
  // { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
  // { path: 'single-blog', loadChildren: () => import('./single-blog/single-blog.module').then(m => m.SingleBlogModule) },
  // { path: 'elements', loadChildren: () => import('./elements/elements.module').then(m => m.ElementsModule) },
  // { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  // { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
  // { path: '404', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) },

  {path:'home',component: LayoutComponent},
  { path: 'entreprise', loadChildren: () => import('./entreprise/entreprise.module').then(m => m.EntrepriseModule) ,canActivate: [entrepriseGuard]},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) , canActivate:[adminGuard] },
  { path: 'encadrant', loadChildren: () => import('./encadreur/encadreur.module').then(m => m.EncadreurModule) , canActivate : [encadreurGuard]},
  { path: 'etudiant', loadChildren: () => import('./etudiant/etudiant.module').then(m => m.EtudiantModule) , canActivate : [etudiantGuard]},


  {path : 'register' , component : SignUpComponent},
  {path : 'login' ,component : LoginComponent},
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  // { path: '**', redirectTo: '404' },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
