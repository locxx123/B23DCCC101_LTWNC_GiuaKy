import { useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';
import { CATEGORIES, type CategoryStats } from '../../types/book';
import { selectBooks, selectBooksStatus, selectBorrowedIds } from '../books/selectors';

export default function StatsPage() {
  const books = useAppSelector(selectBooks);
  const borrowedIds = useAppSelector(selectBorrowedIds);
  const status = useAppSelector(selectBooksStatus);

  const stats = useMemo(() => {
    const byCategory: CategoryStats = { CNTT: 0, 'Kinh tế': 0, 'Ngoại ngữ': 0 };
    books.forEach((book) => {
      byCategory[book.category] += 1;
    });
    return byCategory;
  }, [books]);

  if (status === 'idle' || status === 'loading') {
    return <p className="status">Đang tải...</p>;
  }

  return (
    <section className="stats">
      <h2>Thống kê thư viện</h2>
      <div className="stats-grid">
        {CATEGORIES.map((category) => (
          <div key={category} className="stat-card">
            <span className="stat-label">{category}</span>
            <span className="stat-value">{stats[category]}</span>
            <span className="muted">đầu sách</span>
          </div>
        ))}
        <div className="stat-card highlight">
          <span className="stat-label">Đang mượn</span>
          <span className="stat-value">{borrowedIds.length}</span>
          <span className="muted">cuốn</span>
        </div>
      </div>
      <p className="muted">Tổng số đầu sách: {books.length}</p>
    </section>
  );
}
