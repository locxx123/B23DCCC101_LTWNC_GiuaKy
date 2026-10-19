export const CATEGORIES = ['CNTT', 'Kinh tế', 'Ngoại ngữ'] as const;

export type Category = (typeof CATEGORIES)[number];

export type CategoryFilter = Category | 'Tất cả';

export interface Book {
  id: string;
  title: string;
  author: string;
  category: Category;
  year: number;
  available: number;
}

export type BookSeed = Omit<Book, 'id'>;

export type BorrowedBook = Pick<Book, 'id' | 'title' | 'author'>;

export type CategoryStats = Record<Category, number>;

export type FetchStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
