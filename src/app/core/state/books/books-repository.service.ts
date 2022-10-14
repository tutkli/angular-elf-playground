import { Injectable } from '@angular/core';
import { Book } from '../../model/book.model';
import { createStore, propsArrayFactory, Store } from '@ngneat/elf';
import { selectAllEntities, selectEntities, setEntities, withEntities } from '@ngneat/elf-entities';
import { map, withLatestFrom } from 'rxjs';

const { withCollectionIds, selectCollectionIds, addCollectionIds, removeCollectionIds, inCollectionIds } =
  propsArrayFactory('collectionIds', { initialValue: [] as string[] });

@Injectable({ providedIn: 'root' })
export class BooksRepositoryService {
  private readonly _store: Store = createStore({ name: 'books' }, withEntities<Book>(), withCollectionIds());

  books$ = this._store.pipe(selectAllEntities());

  ownBooks$ = this._store.pipe(selectCollectionIds()).pipe(
    withLatestFrom(this._store.pipe(selectEntities())),
    map(([ids, books]) => ids.map((id) => books[id]))
  );

  setBooks(books: Book[]) {
    this._store.update(setEntities(books));
  }

  removeFromCollection(bookId: string) {
    this._store.update(removeCollectionIds(bookId));
  }

  addToCollection(bookId: string) {
    if (!this._store.query(inCollectionIds(bookId))) {
      this._store.update(addCollectionIds(bookId));
    }
  }
}
