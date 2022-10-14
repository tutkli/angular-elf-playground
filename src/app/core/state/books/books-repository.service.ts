import { Injectable } from '@angular/core';
import { Book } from '../../model/book.model';
import { createStore, propsArrayFactory, Store } from '@ngneat/elf';
import { selectAllEntities, selectEntities, setEntities, withEntities } from '@ngneat/elf-entities';
import { map, withLatestFrom } from 'rxjs';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';

const { withCollectionIds, selectCollectionIds, addCollectionIds, removeCollectionIds, inCollectionIds } =
  propsArrayFactory('collectionIds', { initialValue: [] as string[] });

const bookStore: Store = createStore({ name: 'books' }, withEntities<Book>(), withCollectionIds());

export const persist = persistState(bookStore, {
  key: 'books',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class BooksRepositoryService {
  books$ = bookStore.pipe(selectAllEntities());

  ownBooks$ = bookStore.pipe(selectCollectionIds()).pipe(
    withLatestFrom(bookStore.pipe(selectEntities())),
    map(([ids, books]) => ids.map((id) => books[id]))
  );

  setBooks(books: Book[]) {
    bookStore.update(setEntities(books));
  }

  removeFromCollection(bookId: string) {
    bookStore.update(removeCollectionIds(bookId));
  }

  addToCollection(bookId: string) {
    if (!bookStore.query(inCollectionIds(bookId))) {
      bookStore.update(addCollectionIds(bookId));
    }
  }
}
