import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { clearWarning } from '../booksSlice';
import { selectWarning } from '../selectors';

export default function BorrowWarning() {
  const dispatch = useAppDispatch();
  const warning = useAppSelector(selectWarning);

  if (!warning) return null;

  return (
    <div className="alert" role="alert">
      <span>{warning}</span>
      <button type="button" className="alert-close" aria-label="Đóng" onClick={() => dispatch(clearWarning())}>
        ×
      </button>
    </div>
  );
}
