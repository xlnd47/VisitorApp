import { Component, OnInit } from '@angular/core';
import { Visitor } from '../_models/visitor';
import { AlertifyService } from '../_services/alertify.service';
import { VisitService } from '../_services/visit.service';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss'],
})
export class GraphsComponent implements OnInit {
  visitors: Visitor[] = [];
  liveVisitors: Visitor[] = [];
  todaysVisitors = 0;
  visitData = [
    { name: '0-1', value: 0 },
    { name: '1-2', value: 0 },
    { name: '2-3', value: 0 },
    { name: '3-4', value: 0 },
  ];
  chartLoaded = false;

  constructor(
    private visitService: VisitService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.loadVisitors();
    this.loadLiveVisitors();
  }

  loadVisitors() {
    this.visitService.getVisitors().subscribe(
      (visitors: Visitor[]) => {
        this.visitors = visitors;
        this.countVisitTimes();
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  loadLiveVisitors() {
    this.visitService.liveVisitors().subscribe(
      (visitors: Visitor[]) => {
        this.liveVisitors = visitors;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  countTodaysVisitors() {
    let i = 0;
    const today = new Date();
    this.visitors.forEach((visitor) => {
      if (
        new Date(visitor.visitBegin).getFullYear === today.getFullYear &&
        new Date(visitor.visitBegin).getMonth === today.getMonth &&
        new Date(visitor.visitBegin).getDate === today.getDate
      ) {
        i = i + 1;
      }
    });
    return i;
  }

  countVisitTimes() {
    const today = new Date();
    this.visitors.forEach((visitor) => {
      if (visitor.visitEnd != null) {
        const hours =
          (new Date(visitor.visitEnd).getTime() -
            new Date(visitor.visitBegin).getTime()) /
          36e5;

        if (hours <= 1) {
          this.visitData[0].value += 1;
        } else if (hours <= 2) {
          this.visitData[1].value += 1;
        } else if (hours <= 3) {
          this.visitData[2].value += 1;
        } else if (hours <= 4) {
          this.visitData[3].value += 1;
        }
      }
    });
    this.chartLoaded = true;
    return this.visitData;
  }
}
