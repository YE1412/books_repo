import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { BookModel } from "../models/book.model";
import { Observable, catchError, throwError } from "rxjs";
import { Injectable } from '@angular/core';
import BaseUrl from '@app/service/back-off-base';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private _httpClient: HttpClient){ }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0){
      // A client-side or network error occurred.
      console.error('An error occurred : ', error.error);
    } else {
      // The backend returned an unsuccessful response code
      // The response body may contains any clues as to what went wrong
      console.error(`Backend returned code ${error.status}, body was :`, error.error);
    }
    // Return an observable with a user-facing error message
    return throwError(() => new Error('Somtething bad happened; please try again later.'));
  }

  public addBook(bookModel: BookModel): Observable<BookModel>{
    return this._httpClient.post<BookModel>(`${BaseUrl}/books`, bookModel)
      .pipe(
        catchError((err) => this.handleError(err))
      );
  }

  public deleteBook(id: number): Observable<unknown>{
    const url = `${BaseUrl}/books/${id}`;
    return this._httpClient.delete(url)
      .pipe(
        catchError((err) => this.handleError(err))
      );
  }

  public updateBook(id: number, book: BookModel): Observable<unknown>{
    const url = `${BaseUrl}/books/${id}`;
    return this._httpClient.put<BookModel>(url, book)
      .pipe(
        catchError((err) => this.handleError(err))
      );
  }

  public getBooks(): Observable<BookModel[]> {
      return this._httpClient.get<BookModel[]>(`${BaseUrl}/books/all`)
        .pipe(
          catchError((err) => this.handleError(err))
        );
  }

  public getBookById(id: number): Observable<BookModel> {
    const url = `${BaseUrl}/books/${id}`;
    return this._httpClient.get<BookModel>(url)
      .pipe(
        catchError((err) => this.handleError(err))
      ); 
  }
}

/*const httpOptions = {
  headers: new HttpHeaders(
    {'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8080'}
  )
}*/
