import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  public user: string = ""
  public contra: string = ""
  
  constructor(private apiService: ApiService) { }

  submitData() {    
    if(this.user != "" && this.contra != ""){
      this.apiService.register(this.user, this.contra)
    } 
  }
}