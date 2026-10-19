import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useFilterStore } from '../../filters/filterStore';
import { borrowBook, fetchBooks, returnBook } from '../booksSlice';
import { selectBooks, selectBooksError, selectBooksStatus, selectBorrowedIds } from '../selectors';
import BookItem from './BookItem';

export default function BookList() {
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectBooks);
  const borrowedIds = useAppSelector(selectBorrowedIds);
  const status = useAppSelector(selectBooksStatus);
  const error = useAppSelector(selectBooksError);
  const keyword = useFilterStore((state) => state.keyword);
  const category = useFilterStore((state) => state.category);

  const filteredBooks = useMemo(() => {
    const query = keyword.trim().toLowerCase();
    return books.filter((book) => {
      const matchCategory = category === 'Tất cả' || book.category === category;
      const matchKeyword =
        !query || book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query);
      return matchCategory && matchKeyword;
    });
  }, [books, keyword, category]);

  const handleBorrow = useCallback((id: string) => dispatch(borrowBook(id)), [dispatch]);
  const handleReturn = useCallback((id: string) => dispatch(returnBook(id)), [dispatch]);
  const handleRetry = useCallback(() => dispatch(fetchBooks()), [dispatch]);

  if (status === 'idle' || status === 'loading') {
    return <p className="status">Đang tải...</p>;
  }

  if (status === 'failed') {
    return (
      <div className="status error">
        <p>{error}</p>
        <button type="button" className="btn btn-primary" onClick={handleRetry}>
          Thử lại
        </button>
      </div>
    );
  }

  if (filteredBooks.length === 0) {
    return <p className="status">Không tìm thấy sách phù hợp.</p>;
  }

  return (
    <ul className="book-list">
      {filteredBooks.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          isBorrowed={borrowedIds.includes(book.id)}
          onBorrow={handleBorrow}
          onReturn={handleReturn}
        />
      ))}
    </ul>
  );
}
