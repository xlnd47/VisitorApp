import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Visitor } from '../_models/visitor';
import { VisitType } from '../_models/visitType';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  }),
};

@Injectable({
  providedIn: 'root',
})
export class VisitService {
  baseUrl = environment.apiUrl + 'visitors/';

  constructor(private http: HttpClient) {}

  register(model: any) {
    return this.http.post(this.baseUrl + 'add', model);
  }

  checkout(model: any) {
    return this.http.post(this.baseUrl + 'end', model);
  }

  checkoutById(id: number): Observable<Visitor> {
    return this.http.post<Visitor>(
      this.baseUrl + 'end/' + id.toString(),
      {},
      httpOptions
    );
  }

  getTypes() {
    return this.http.get<VisitType[]>(this.baseUrl + 'types');
  }

  liveVisitors(): Observable<Visitor[]> {
    return this.http.get<Visitor[]>(this.baseUrl + 'live', httpOptions);
  }

  getVisitors(): Observable<Visitor[]> {
    return this.http.get<Visitor[]>(this.baseUrl, httpOptions);
  }
}
