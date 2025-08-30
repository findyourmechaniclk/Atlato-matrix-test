import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor(private http: HttpClient) { }

  callUrl(): Observable<any> {
    const url = 'https://dev.api.atlato.com/api-store/web/primary/global/icons';


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }
}
