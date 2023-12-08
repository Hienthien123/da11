import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseModel } from 'src/app/models/baseResponse.model';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class DocumentFileService {

  private baseUrl = `${environment.apiUrl}/DocumentFile`;

  constructor(private http: HttpClient) { }

  delete(id: number) : Observable<BaseResponseModel<number>> {
    const apiUrl = `${this.baseUrl}/Delete/${id}`;
    return this.http.delete<BaseResponseModel<number>>(apiUrl);
  }
}
