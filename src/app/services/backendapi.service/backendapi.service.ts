import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "../../environment/environment/environment";

export interface ContactPayload {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class BackendapiService {
  apiUrl: string = environment.ApiUrl;

  constructor(private http: HttpClient, private routes: Router) { }

  postContactDetails(payload: ContactPayload): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/Contactus/contact`,
      payload
    );
  }
}
