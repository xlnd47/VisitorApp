import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { VisitService } from '../_services/visit.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(
    private visitService: VisitService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {}

  register() {
    this.visitService.register(this.model).subscribe(
      () => {
        // console.log('registration successful');
        this.alertify.success('registration successful');
        this.cancelRegister.emit(false);
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
    // console.log('cancelled');
  }
}
