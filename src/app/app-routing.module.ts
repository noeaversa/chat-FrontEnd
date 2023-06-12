import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LogInComponent } from './log-in/log-in.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', title: 'Home' ,component: HomeComponent },
  { path: 'register', title: 'Registro', component: RegisterComponent },
  { path: 'ingreso', title: 'Ingreso' , component: LogInComponent  },
  { path: 'profile', title: 'Perfil', component: ProfileComponent  },
  { path:'usuarios', title:'User', component: UsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }