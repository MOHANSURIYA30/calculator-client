import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  API_URL :any = environment.apiUrl 
  constructor(private http:HttpClient) { }

  getDetails()
  {
    return this.http.get(this.API_URL+'get-details');
  }

  createDetails(data:any) {
    return this.http.post(this.API_URL+'create-detail',data);
  }

  deleteDetail(id:any)
  {
     return this.http.delete(this.API_URL+'delete-detail/'+id)
  }
}
