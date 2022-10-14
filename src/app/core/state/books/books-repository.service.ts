import { Injectable } from '@angular/core';
import { Book } from '../../model/book.model';
import { createStore, propsArrayFactory } from '@ngneat/elf';
import { selectAllEntities, selectEntities, setEntities, withEntities } from '@ngneat/elf-entities';
import { map, withLatestFrom } from 'rxjs';

const { withCollectionIds, selectCollectionIds, addCollectionIds, removeCollectionIds, inCollectionIds } =
  propsArrayFactory('collectionIds', { initialValue: [] as string[] });

@Injectable({ providedIn: 'root' })
export class BooksRepositoryService {
  private readonly store = createStore({ name: 'books' }, withEntities<Book>(), withCollectionIds());

  books$ = this.store.pipe(selectAllEntities());

  ownBooks$ = this.store.pipe(selectCollectionIds()).pipe(
    withLatestFrom(this.store.pipe(selectEntities())),
    map(([ids, books]) => ids.map((id) => books[id]))
  );

  setBooks(books: Book[]) {
    this.store.update(setEntities(books));
  }

  removeFromCollection(bookId: string) {
    this.store.update(removeCollectionIds(bookId));
  }

  addToCollection(bookId: string) {
    if (!this.store.query(inCollectionIds(bookId))) {
      this.store.update(addCollectionIds(bookId));
    }
  }
}
