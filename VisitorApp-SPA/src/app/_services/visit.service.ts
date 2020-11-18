import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  baseUrl = 'http://localhost:5000/api/visitors/';

  constructor(private http: HttpClient) {}

  register(model: any){
    return this.http.post(this.baseUrl + 'add', model);
  }

}
