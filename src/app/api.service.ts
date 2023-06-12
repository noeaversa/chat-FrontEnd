import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private url_basic = 'http://localhost:3001';
  
  constructor(private http: HttpClient, private router: Router) { }

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
    const url_patch_contacto = `${this.url_basic}/usuarios/${user_name_str}`
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

  private configHeaders() {
    var token = localStorage.getItem("Authorization")
    var headers = new HttpHeaders();
    if(token){ headers = headers.set("Authorization", token);  }
    return headers;
  }
}
