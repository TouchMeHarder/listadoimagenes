import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, delay } from "rxjs";
import { LoremIpsum } from "lorem-ipsum";

@Injectable()
export class InterceptorService implements HttpInterceptor {

    private list: Array<any> = [];

    constructor(private http: HttpClient) {}

    private lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 8,
        min: 4
      },
      wordsPerSentence: {
        max: 16,
        min: 4
      }
    });

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return this.handleRequests(req, next);
    }

    handleRequests(req: HttpRequest<any>, next: HttpHandler): any {
        const { url, method } = req;

        this.fillImageList();

        if (url.endsWith("/images") && method === "GET") {
          req = req.clone({
            body: this.list,
          });
          return next.handle(req).pipe(delay(500));
        }
        
        return next.handle(req);
      }

    private fillImageList() {
      for (let i = 1; i <= 4000; i++) {
          this.list.push({
              id: i,
              photo: 'https://picsum.photos/id/' + i + '/500/500',
              text: this.lorem.generateWords(2)
          });
      }
    }
}