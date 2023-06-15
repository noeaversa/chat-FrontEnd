import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  private users: any;
  private contacts: any;
  isClicked: boolean = false;

  constructor(private service: ApiService, private router: Router) { 
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
                this.users.push({"nombre":res.nombre, "isClicked": false});
            });
          },
          error => {console.log(error)}
        )
    },
    error => {console.log(error)}
    )
  }

  addContact(user: any){
    if(!this.isClicked && !this.contacts.includes(user.nombre)){
      this.contacts.push(user.nombre);
      user.isClicked = true
    }
    else{
      user.isClicked = false
      this.contacts.pop(user.nombre)
    }
  }
  addNewContacts(){
    const body = {
      "contactosNombres": this.contacts
    }
    this.service.addContactos(body).subscribe(
      (response: any) => {console.log(response); this.router.navigate(['/profile'])},
      error => {console.log(error)}
    )
  }
  
  getUsers() {
    return this.users;
  }
}
