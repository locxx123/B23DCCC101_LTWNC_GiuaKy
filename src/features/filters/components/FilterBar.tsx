import { useEffect, useState } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';
import { CATEGORIES, type CategoryFilter } from '../../../types/book';
import { useFilterStore } from '../filterStore';

const OPTIONS: CategoryFilter[] = ['Tất cả', ...CATEGORIES];

export default function FilterBar() {
  const category = useFilterStore((state) => state.category);
  const setCategory = useFilterStore((state) => state.setCategory);
  const setKeyword = useFilterStore((state) => state.setKeyword);
  const [input, setInput] = useState(() => useFilterStore.getState().keyword);
  const debouncedInput = useDebounce(input, 300);

  useEffect(() => {
    setKeyword(debouncedInput);
  }, [debouncedInput, setKeyword]);

  return (
    <div className="filter-bar">
      <input
        type="search"
        className="search-input"
        placeholder="Tìm theo tên sách hoặc tác giả..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="category-tabs">
        {OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            className={option === category ? 'chip active' : 'chip'}
            onClick={() => setCategory(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
