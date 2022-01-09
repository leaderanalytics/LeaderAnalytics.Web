import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";
import { environment } from '../../environments/environment';
import { ContactRequest, AsyncResult } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class SiteServicesService {

  constructor(private httpClient: HttpClient)  {
  }

  SendContactRequest(request: ContactRequest): Observable<AsyncResult> {
    const url = environment.api_url + '/webapi/sendContactRequest';
    const msg = 'Name: ' + request.Name + '\r\nPhone: ' + request.Phone + '\r\nEmail: ' + request.EMail + '\r\nRequirement: ' + request.Requirement + '\r\nComment: ' + request.Message;
    const json = JSON.stringify({ "To": "leaderanalytics@outlook.com,sam.wheat@outlook.com", "Msg": msg, "CaptchaCode": request.Captcha });
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    // todo: use an interceptor to handle success and error conditions.
    return this.httpClient.post<AsyncResult>(url, json, options).pipe(catchError(this.handleError));
  }


  // not used
  handleSuccess(input: Observable<AsyncResult>): Observable<AsyncResult> {
    input.subscribe(x => {
      x.Success = true;
      return x;
    });
    return input;
  }


  handleError(error: HttpErrorResponse): Observable<AsyncResult> {
    let result: AsyncResult = new AsyncResult();

    if (error.status !== 201) {
      result.ErrorMessage = "Status: " + error.status + " Message: " + error.error;
    }
    else
      result.Success = true;

    return of(result);
  }
}
