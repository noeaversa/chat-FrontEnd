import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private url_basic = 'http://localhost:3001';
  
  constructor(private http: HttpClient, private router: Router) { }

 // users 
  public getAllUsers(){
    const headers = this.configHeaders();
    return this.http.get(`${this.url_basic}/usuarios`, {headers});
  }

  public dataUser(){
    var user_name_str = localStorage.getItem("user_name");
    const url_user = `${this.url_basic}/usuarios/${user_name_str}`;
    const headers = this.configHeaders();
    return this.http.get(url_user, { headers })
  }

  public addContactos(bodyContent: object){
    var user_name_str = localStorage.getItem("user_name");
    const headers = this.configHeaders();
    const url_patch_contacto = `${this.url_basic}/usuarios/${user_name_str}`;
    return this.http.patch(url_patch_contacto, bodyContent, {headers});
  }

  public register(nombre: string, contra: string){
    const url_register = `${this.url_basic}/usuarios/registrarse/`;
    this.userEnter(url_register, nombre, contra);
  }

  public logIn(nombre: string, contra: string){
    const url_logIn = `${this.url_basic}/usuarios/login`;
    this.userEnter(url_logIn, nombre, contra);
  }

  public deleteUser(nombre: string){
    const url_delete = `${this.url_basic}/usuarios/${nombre}`;
    const headers = this.configHeaders();
    return this.http.delete(url_delete, {headers});
  }

  private userEnter(url: any, nombre: string, contra: string){
    const dataBody = {
      "nombre": nombre,
      "contra": contra
    }
    this.http.post(url, dataBody).subscribe( 
      (response: any) => { 
        console.log(response)
        localStorage.setItem('Authorization', response.claveJWT);
        localStorage.setItem('user_name', response.nombre)
        this.router.navigate(['/profile'])
      },
      error => { console.log(error) }
    )
  }

// messages:
  public obtainChat(user_sender: string | null, user_receiver: string | null){
    const url_chat = `${this.url_basic}/usuarios/${user_receiver}/${user_sender}/recibirChat`;
    console.log(url_chat)
    const headers = this.configHeaders();
    return this.http.get(url_chat, {headers});
  };

  public postChat(bodyContent: object){
    const url_post_chat =  `${this.url_basic}/mensajes`;
    const headers = this.configHeaders();
    return this.http.post(url_post_chat, bodyContent, {headers});
  }

  public deleteMessage(id: any){
    const url_delete_mensaje = `${this.url_basic}/mensajes/${id}`;
    const headers = this.configHeaders();
    return this.http.delete(url_delete_mensaje, {headers});
  }

  
// config
  private configHeaders() {
    var token = localStorage.getItem("Authorization")
    var headers = new HttpHeaders();
    if(token){ headers = headers.set("Authorization", token);  }
    return headers;
  }
}
