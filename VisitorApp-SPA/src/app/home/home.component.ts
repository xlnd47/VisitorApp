import { Component, OnInit } from '@angular/core';
import { VisitService } from '../_services/visit.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  registerMode = false;
  checkoutMode = false;
  values: any;

  constructor(private visitService: VisitService) {}

  ngOnInit() {
    this.getValues();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  checkoutToggle() {
    this.checkoutMode = !this.checkoutMode;
  }

  getValues() {
    this.visitService.getTypes().subscribe(
      (response) => {
        this.values = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }

  cancelCheckoutMode(checkoutMode: boolean) {
    this.checkoutMode = checkoutMode;
  }
}
