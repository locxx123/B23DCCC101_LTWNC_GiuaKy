import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { MAX_BORROW } from '../features/books/booksSlice';
import { selectBorrowedIds } from '../features/books/selectors';
import { useTheme } from '../hooks/useTheme';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const borrowedCount = useAppSelector(selectBorrowedIds).length;

  return (
    <header className="header">
      <div className="header-inner">
        <h1 className="logo">📚 Mini Library</h1>
        <nav className="nav">
          <NavLink to="/" end>
            Sách
          </NavLink>
          <NavLink to="/stats">Thống kê</NavLink>
        </nav>
        <div className="header-right">
          <span className="badge">
            Đang mượn: {borrowedCount}/{MAX_BORROW}
          </span>
          <button type="button" className="btn btn-outline" onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Tối' : '☀️ Sáng'}
          </button>
        </div>
      </div>
    </header>
  );
}
