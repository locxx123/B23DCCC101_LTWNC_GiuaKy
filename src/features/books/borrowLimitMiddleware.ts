import type { Middleware } from '@reduxjs/toolkit';
import { borrowBook, MAX_BORROW, setWarning, type BooksState } from './booksSlice';

export const borrowLimitMiddleware: Middleware<object, { books: BooksState }> =
  (store) => (next) => (action) => {
    if (borrowBook.match(action)) {
      const { borrowedIds } = store.getState().books;
      if (borrowedIds.length >= MAX_BORROW) {
        return next(setWarning(`Bạn chỉ được mượn tối đa ${MAX_BORROW} cuốn cùng lúc. Hãy trả bớt sách trước khi mượn thêm.`));
      }
    }
    return next(action);
  };
