import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { MAX_BORROW, returnBook } from '../booksSlice';
import { selectBorrowedBooks } from '../selectors';

export default function BorrowedList() {
  const dispatch = useAppDispatch();
  const borrowedBooks = useAppSelector(selectBorrowedBooks);

  const handleReturn = useCallback((id: string) => dispatch(returnBook(id)), [dispatch]);

  return (
    <aside className="panel">
      <h2>
        Sách đang mượn ({borrowedBooks.length}/{MAX_BORROW})
      </h2>
      {borrowedBooks.length === 0 ? (
        <p className="muted">Bạn chưa mượn cuốn nào.</p>
      ) : (
        <ul className="borrowed-list">
          {borrowedBooks.map((book) => (
            <li key={book.id}>
              <div>
                <strong>{book.title}</strong>
                <p className="muted">{book.author}</p>
              </div>
              <button type="button" className="btn btn-outline" onClick={() => handleReturn(book.id)}>
                Trả
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
