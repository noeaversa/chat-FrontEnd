import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  private users: any;
  private contacts: any;
  isClicked: boolean = false;

  constructor(private service: ApiService) { 
    this.users = [];
    this.contacts = [];
  }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    const name_user = localStorage.getItem("user_name");
    this.service.dataUser().subscribe(
      (response: any) => {
        this.contacts = response.contactosNombres
        this.service.getAllUsers().subscribe(
          (response: any) => {
            console.log(response)
            response.forEach((res: any) => {
              if(res.nombre != name_user && !this.contacts.includes(res.nombre))
                this.users.push(res.nombre);
            });
          },
          error => {console.log(error)}
        )
    },
    error => {console.log(error)}
    )
  }

  addContact(name: string){
    if(!this.isClicked && !this.contacts.includes(name)){
      this.contacts.push(name);
      console.log(this.contacts);
      this.isClicked = true
    }
    else
      this.isClicked = false
  }

  addNewContacts(){
    const body = {
      "contactosNombres": this.contacts
    }
    this.service.addContactos(body).subscribe(
      (response: any) => {console.log(response)},
      error => {console.log(error)}
    )
  }

  getUsers() {
    return this.users;
  }
}
