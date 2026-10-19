import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { BorrowedBook } from '../../types/book';

export const selectBooks = (state: RootState) => state.books.items;
export const selectBorrowedIds = (state: RootState) => state.books.borrowedIds;
export const selectBooksStatus = (state: RootState) => state.books.status;
export const selectBooksError = (state: RootState) => state.books.error;
export const selectWarning = (state: RootState) => state.books.warning;

export const selectBorrowedBooks = createSelector(
  [selectBooks, selectBorrowedIds],
  (books, ids): BorrowedBook[] =>
    books
      .filter((book) => ids.includes(book.id))
      .map(({ id, title, author }) => ({ id, title, author })),
);
