import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  public user: string = "";
  public contra: string = "";

  constructor(private apiService: ApiService) { }

  submitData() {    
    if(this.user != "" && this.contra != ""){
      this.apiService.logIn(this.user, this.contra)
    } 
  }
}
