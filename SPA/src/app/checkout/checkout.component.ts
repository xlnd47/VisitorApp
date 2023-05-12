import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { error } from 'protractor';
import { AlertifyService } from '../_services/alertify.service';
import { VisitService } from '../_services/visit.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(
    private visitService: VisitService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {}

  cancel() {
    this.cancelRegister.emit(false);
  }

  checkout() {
    this.visitService.checkout(this.model).subscribe(
      () => {
        this.alertify.success('checked visitor out');
        this.cancelRegister.emit(false);
      },
      (error) => {
        this.alertify.error(error);
      }
    );
    console.log(this.model);
  }
}
