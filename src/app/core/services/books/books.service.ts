import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../../model/book.model';
import { Observable, tap } from 'rxjs';
import { BooksRepositoryService } from '../../state/books/books-repository.service';

@Injectable({ providedIn: 'root' })
export class BooksService {
  private readonly API_BASE_URL = 'https://www.googleapis.com/books/v1';

  constructor(private http: HttpClient, private booksRepositoryService: BooksRepositoryService) {}

  getBooks(): Observable<{ items: Book[] }> {
    return this.http
      .get<{ items: Book[] }>(`${this.API_BASE_URL}/volumes?q=totoro&maxResults=5&orderBy=relevance`)
      .pipe(
        tap({
          next: (response: { items: Book[] }): void => this.booksRepositoryService.setBooks(response.items),
        })
      );
  }
}
