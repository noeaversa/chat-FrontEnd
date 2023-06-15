import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  private user_sender = localStorage.getItem("user_name");
  private user_receiver = localStorage.getItem("user_contact");
  public messages: any;
  public message = "";

  constructor(private service: ApiService) {
    this.messages = []
  }

  ngOnInit(){
    this.getChat()
  }

  public getChat(){
    this.messages = [];
    this.service.obtainChat(this.user_sender, this.user_receiver).subscribe(
      (response: any) => {
        console.log(response);
        this.saveEachMessage(response)
        console.log(this.messages)
      },
      error => { console.log(error)}
    )
  }  

  private saveEachMessage(msg: any){
    for(let index = 0; index < msg.length; index++){
      let objectMensaje = {
        "id": msg[index]._id,
        "fecha": msg[index].fecha,
        "mensaje": msg[index].mensaje,
        "autor": msg[index].nombreAutor
      }
      this.messages.push(objectMensaje);
    }
  }

  public submitMessage(){
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const fechaHoy = date + " " + time;
    const dataBody = {
      "nombreAutor": this.user_sender,
      "nombreReceptor": this.user_receiver,
      "mensaje": this.message,
      "fecha": fechaHoy,
      "estado": 1
    }
    this.service.postChat(dataBody).subscribe(
      (response: any) => {
        this.getChat();
      },
      error => { console.log(error) }
    )
  }

  public deleteMSG(mensaje: any){
    console.log("mensaje",mensaje)
    this.messages.pop(mensaje);
    const idMensaje = mensaje.id;
    this.service.deleteMessage(idMensaje).subscribe(
      (response: any) => {
        console.log(this.messages)
      },
      error => {console.log(error)}
    )
  }
}
