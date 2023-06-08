import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private url_basic = 'http://localhost:3001'
  
  constructor(private http: HttpClient) { }

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
        localStorage.setItem('Authorization', response.claveJWT)
      },
      error => { console.log(error) }
    )
  }
}
