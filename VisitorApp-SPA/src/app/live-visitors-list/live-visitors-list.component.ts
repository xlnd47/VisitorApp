import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Visitor } from '../_models/visitor';
import { VisitType } from '../_models/visitType';
import { AlertifyService } from '../_services/alertify.service';
import { VisitService } from '../_services/visit.service';

@Component({
  selector: 'app-live-visitors-list',
  templateUrl: './live-visitors-list.component.html',
  styleUrls: ['./live-visitors-list.component.scss'],
})
export class LiveVisitorsListComponent implements OnInit {
  visitors!: Visitor[];
  types!: VisitType[];

  constructor(
    private visitService: VisitService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadVisitors();
    this.loadVisitTypes();
  }

  getVisitType(index: number) {
    return this.types[index].name;
  }

  checkoutVisitor(id: number) {
    this.visitService.checkoutById(id).subscribe(
      (visitor: Visitor) => {
        this.alertify.error(`${visitor.firstName} checked out`);
        this.router
          .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/live-visitors']);
          });
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  loadVisitTypes() {
    this.visitService.getTypes().subscribe(
      (visitTypes: VisitType[]) => {
        this.types = visitTypes;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  loadVisitors() {
    this.visitService.liveVisitors().subscribe(
      (visitors: Visitor[]) => {
        this.visitors = visitors;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }
}
