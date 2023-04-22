import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, retry, throwError } from "rxjs";
import { Images } from "src/app/core/models/images.interface";

Injectable({
    providedIn: 'root'
})

export class ImagesService {
    constructor(private http: HttpClient) {}

    public getImages(): Observable<Images> {
        const httpOptions : Object = {
            headers: new HttpHeaders({
              'Accept': 'text/html',
              'Content-Type': 'text/plain; charset=utf-8'
            }),
            responseType: 'text'
        };
          
        return this.http
            .get<Images>('http://localhost:4200/images', httpOptions)
            .pipe(
                retry(3),
                catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          console.error("An error occurred:", error.error.message);
        } else {
          console.error(
            `Backend returned code ${error.status}, ` + `body was: ${error.error}`
          );
        }
        return throwError("Something bad happened; please try again later.");
      }
}