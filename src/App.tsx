import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import Header from './components/Header';
import { fetchBooks } from './features/books/booksSlice';
import { selectBooksStatus } from './features/books/selectors';
import HomePage from './pages/HomePage';

const StatsPage = lazy(() => import('./features/stats/StatsPage'));

export default function App() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectBooksStatus);

  useEffect(() => {
    if (status === 'idle') {
      const shouldFail = new URLSearchParams(window.location.search).has('fail');
      dispatch(fetchBooks(shouldFail));
    }
  }, [status, dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <main className="container">
        <Suspense fallback={<p className="status">Đang tải trang...</p>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stats" element={<StatsPage />} />
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter>
  );
}
