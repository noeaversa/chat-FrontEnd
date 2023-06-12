import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  private contactos = [];
  
  constructor(private service: ApiService) { }

  ngOnInit() {
    this.getDataUser();
  }
  getDataUser(){
    this.service.dataUser().subscribe(
      (response: any) => {
        this.contactos = response.contactosNombres;
      },
      error => {console.log(error)}
    );
  }
  getContactos(){ return this.contactos }
}
