import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  baseUrl:string = "http://localhost:3000/"

  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<any>{
    return this.httpClient.get(`${this.baseUrl}customers`)
  }
  getTransaction():Observable<any>{
    return this.httpClient.get(`${this.baseUrl}transactions`)
  }
}
