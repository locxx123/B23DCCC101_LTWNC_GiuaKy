import type { Book } from '../../types/book';
import reducer, {
  borrowBook,
  clearWarning,
  fetchBooks,
  initialState,
  returnBook,
  setWarning,
  type BooksState,
} from './booksSlice';

const books: Book[] = [
  { id: 'b1', title: 'Clean Code', author: 'Robert C. Martin', category: 'CNTT', year: 2008, available: 2 },
  { id: 'b2', title: 'Kinh tế học vi mô', author: 'Mankiw', category: 'Kinh tế', year: 2014, available: 0 },
];

const loadedState = (overrides: Partial<BooksState> = {}): BooksState => ({
  ...initialState,
  status: 'succeeded',
  items: books.map((book) => ({ ...book })),
  ...overrides,
});

describe('booksSlice reducer', () => {
  it('trả về initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('fetchBooks.pending chuyển sang loading', () => {
    const state = reducer(initialState, { type: fetchBooks.pending.type });
    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  it('fetchBooks.fulfilled lưu danh sách sách', () => {
    const state = reducer(initialState, { type: fetchBooks.fulfilled.type, payload: books });
    expect(state.status).toBe('succeeded');
    expect(state.items).toHaveLength(2);
  });

  it('fetchBooks.rejected lưu thông báo lỗi', () => {
    const state = reducer(initialState, {
      type: fetchBooks.rejected.type,
      payload: 'Lỗi mạng',
      error: { message: 'Rejected' },
    });
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Lỗi mạng');
  });

  it('borrowBook giảm số bản còn lại và thêm vào danh sách đang mượn', () => {
    const state = reducer(loadedState(), borrowBook('b1'));
    expect(state.items[0].available).toBe(1);
    expect(state.borrowedIds).toEqual(['b1']);
  });

  it('borrowBook không thay đổi khi sách đã hết bản', () => {
    const state = reducer(loadedState(), borrowBook('b2'));
    expect(state.items[1].available).toBe(0);
    expect(state.borrowedIds).toEqual([]);
  });

  it('returnBook tăng số bản còn lại và xoá khỏi danh sách đang mượn', () => {
    const borrowed = reducer(loadedState(), borrowBook('b1'));
    const state = reducer(borrowed, returnBook('b1'));
    expect(state.items[0].available).toBe(2);
    expect(state.borrowedIds).toEqual([]);
  });

  it('setWarning và clearWarning', () => {
    const warned = reducer(loadedState(), setWarning('Cảnh báo'));
    expect(warned.warning).toBe('Cảnh báo');
    expect(reducer(warned, clearWarning()).warning).toBeNull();
  });
});
