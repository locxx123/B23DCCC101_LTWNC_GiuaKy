import { configureStore } from '@reduxjs/toolkit';
import type { Book } from '../../types/book';
import reducer, { borrowBook, fetchBooks, MAX_BORROW } from './booksSlice';
import { borrowLimitMiddleware } from './borrowLimitMiddleware';

const books: Book[] = ['b1', 'b2', 'b3', 'b4'].map((id) => ({
  id,
  title: `Sách ${id}`,
  author: 'Tác giả',
  category: 'CNTT',
  year: 2020,
  available: 1,
}));

describe('borrowLimitMiddleware', () => {
  it(`chặn mượn quá ${MAX_BORROW} cuốn và hiện cảnh báo`, () => {
    const store = configureStore({
      reducer: { books: reducer },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(borrowLimitMiddleware),
    });
    store.dispatch({ type: fetchBooks.fulfilled.type, payload: books });

    ['b1', 'b2', 'b3', 'b4'].forEach((id) => store.dispatch(borrowBook(id)));

    const state = store.getState().books;
    expect(state.borrowedIds).toEqual(['b1', 'b2', 'b3']);
    expect(state.items[3].available).toBe(1);
    expect(state.warning).not.toBeNull();
  });
});
