import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  private contactos = [];
  private nombre_user = "";
  
  constructor(private service: ApiService, private router: Router) { }

  ngOnInit() {
    this.getDataUser();
  }
  getDataUser(){
    this.service.dataUser().subscribe(
      (response: any) => {
        this.nombre_user = response.nombre
        this.contactos = response.contactosNombres;
      },
      error => {console.log(error)}
    );
  }
  deleteAccount(){
    this.service.deleteUser(this.nombre_user).subscribe(
      (response: any) => {
        localStorage.removeItem('Authorization');
        localStorage.removeItem('user_name');
        this.router.navigate(['/'])
      },
      error => {console.log(error)}
    ) 
  }

  goToMessage(user_mesagge: string){
    localStorage.setItem('user_contact', user_mesagge);
    this.router.navigate(['/mensajes']);
  }

  getContactos(){ return this.contactos }
  getNombreUser(){ return this.nombre_user }
}
