import BookList from '../features/books/components/BookList';
import BorrowedList from '../features/books/components/BorrowedList';
import BorrowWarning from '../features/books/components/BorrowWarning';
import FilterBar from '../features/filters/components/FilterBar';

export default function HomePage() {
  return (
    <div className="home">
      <section>
        <FilterBar />
        <BorrowWarning />
        <BookList />
      </section>
      <BorrowedList />
    </div>
  );
}
