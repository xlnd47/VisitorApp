import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  checkoutMode = false;
  values: any;


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getValues();
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  checkoutToggle(){
    this.checkoutMode = !this.checkoutMode;
  }

  getValues(){
    this.http.get('http://localhost:5000/api/visitors/types').subscribe(response => {
      this.values = response;
    }, error => {
      console.log(error);
    });
  }

  cancelRegisterMode(registerMode: boolean){
    this.registerMode = registerMode;
  }

  cancelCheckoutMode(checkoutMode: boolean){
    this.checkoutMode = checkoutMode;
  }
}
