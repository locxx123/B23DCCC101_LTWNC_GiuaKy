import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchBooksApi } from '../../api/booksApi';
import { isApiSuccess } from '../../types/api';
import type { Book, FetchStatus } from '../../types/book';

export const MAX_BORROW = 3;

export interface BooksState {
  items: Book[];
  borrowedIds: string[];
  status: FetchStatus;
  error: string | null;
  warning: string | null;
}

export const initialState: BooksState = {
  items: [],
  borrowedIds: [],
  status: 'idle',
  error: null,
  warning: null,
};

export const fetchBooks = createAsyncThunk<Book[], boolean | undefined, { rejectValue: string }>(
  'books/fetchBooks',
  async (shouldFail = false, { rejectWithValue }) => {
    const result = await fetchBooksApi(shouldFail);
    if (isApiSuccess(result)) {
      return result.data;
    }
    return rejectWithValue(result.error);
  },
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    borrowBook(state, action: PayloadAction<string>) {
      const book = state.items.find((item) => item.id === action.payload);
      if (!book || book.available <= 0 || state.borrowedIds.includes(book.id)) return;
      book.available -= 1;
      state.borrowedIds.push(book.id);
      state.warning = null;
    },
    returnBook(state, action: PayloadAction<string>) {
      if (!state.borrowedIds.includes(action.payload)) return;
      const book = state.items.find((item) => item.id === action.payload);
      if (book) book.available += 1;
      state.borrowedIds = state.borrowedIds.filter((id) => id !== action.payload);
      state.warning = null;
    },
    setWarning(state, action: PayloadAction<string>) {
      state.warning = action.payload;
    },
    clearWarning(state) {
      state.warning = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? action.error.message ?? 'Đã có lỗi xảy ra';
      });
  },
});

export const { borrowBook, returnBook, setWarning, clearWarning } = booksSlice.actions;

export default booksSlice.reducer;
