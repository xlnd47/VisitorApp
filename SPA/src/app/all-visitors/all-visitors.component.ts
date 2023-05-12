import { Component, OnInit } from '@angular/core';
import { Visitor } from '../_models/visitor';
import { VisitType } from '../_models/visitType';
import { AlertifyService } from '../_services/alertify.service';
import { VisitService } from '../_services/visit.service';

@Component({
  selector: 'app-all-visitors',
  templateUrl: './all-visitors.component.html',
  styleUrls: ['./all-visitors.component.scss'],
})
export class AllVisitorsComponent implements OnInit {
  visitors!: Visitor[];
  typesLoaded = false;
  visitorsLoaded = false;
  types: VisitType[] = [];
  constructor(
    private visitService: VisitService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.loadVisitTypes();
    this.loadVisitors();
  }

  loadVisitTypes() {
    this.visitService.getTypes().subscribe(
      (visitTypes: VisitType[]) => {
        this.types = visitTypes;
        this.typesLoaded = true;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  loadVisitors() {
    this.visitService.getVisitors().subscribe(
      (visitors: Visitor[]) => {
        this.visitors = visitors.sort((a, b) =>
          a.visitBegin > b.visitBegin ? 1 : -1
        );
        this.visitorsLoaded = true;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  getVisitType(index: number) {
    return this.types[index] ? this.types[index].name : null;
  }
}
