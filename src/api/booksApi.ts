import type { ApiResult } from '../types/api';
import type { Book, BookSeed } from '../types/book';

const seeds: BookSeed[] = [
  { title: 'Clean Code', author: 'Robert C. Martin', category: 'CNTT', year: 2008, available: 3 },
  { title: 'Design Patterns', author: 'Erich Gamma', category: 'CNTT', year: 1994, available: 2 },
  { title: 'Cấu trúc dữ liệu và giải thuật', author: 'Đỗ Xuân Lôi', category: 'CNTT', year: 2010, available: 5 },
  { title: 'You Don’t Know JS', author: 'Kyle Simpson', category: 'CNTT', year: 2015, available: 0 },
  { title: 'Lập trình React thực chiến', author: 'Nguyễn Văn An', category: 'CNTT', year: 2023, available: 4 },
  { title: 'Refactoring', author: 'Martin Fowler', category: 'CNTT', year: 2018, available: 1 },
  { title: 'Kinh tế học vi mô', author: 'N. Gregory Mankiw', category: 'Kinh tế', year: 2014, available: 4 },
  { title: 'Kinh tế học vĩ mô', author: 'N. Gregory Mankiw', category: 'Kinh tế', year: 2014, available: 2 },
  { title: 'Nguyên lý kế toán', author: 'Trần Thị Hồng', category: 'Kinh tế', year: 2019, available: 0 },
  { title: 'Tư duy nhanh và chậm', author: 'Daniel Kahneman', category: 'Kinh tế', year: 2011, available: 3 },
  { title: 'Marketing căn bản', author: 'Philip Kotler', category: 'Kinh tế', year: 2017, available: 2 },
  { title: 'English Grammar in Use', author: 'Raymond Murphy', category: 'Ngoại ngữ', year: 2019, available: 6 },
  { title: 'IELTS Cambridge 18', author: 'Cambridge University Press', category: 'Ngoại ngữ', year: 2023, available: 1 },
  { title: 'Minna no Nihongo', author: '3A Corporation', category: 'Ngoại ngữ', year: 2012, available: 3 },
  { title: 'Tiếng Trung giao tiếp', author: 'Lê Thị Mai', category: 'Ngoại ngữ', year: 2020, available: 0 },
];

const books: Book[] = seeds.map((seed, index) => ({ id: `b${index + 1}`, ...seed }));

export function fetchBooksApi(shouldFail = false, delay = 500): Promise<ApiResult<Book[]>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (shouldFail) {
        resolve({ ok: false, error: 'Không thể tải danh sách sách. Vui lòng thử lại.' });
        return;
      }
      resolve({ ok: true, data: books.map((book) => ({ ...book })) });
    }, delay);
  });
}
