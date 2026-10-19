import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Book } from '../../../types/book';
import BookItem from './BookItem';

const book: Book = {
  id: 'b1',
  title: 'Clean Code',
  author: 'Robert C. Martin',
  category: 'CNTT',
  year: 2008,
  available: 3,
};

describe('BookItem', () => {
  it('hiển thị đúng thông tin sách', () => {
    render(<BookItem book={book} isBorrowed={false} onBorrow={jest.fn()} onReturn={jest.fn()} />);

    expect(screen.getByText('Clean Code')).toBeInTheDocument();
    expect(screen.getByText('Robert C. Martin')).toBeInTheDocument();
    expect(screen.getByText('CNTT')).toBeInTheDocument();
    expect(screen.getByText('Năm XB: 2008')).toBeInTheDocument();
    expect(screen.getByText('Còn lại: 3')).toBeInTheDocument();
  });

  it('click "Mượn" gọi onBorrow với đúng id', async () => {
    const user = userEvent.setup();
    const onBorrow = jest.fn();
    render(<BookItem book={book} isBorrowed={false} onBorrow={onBorrow} onReturn={jest.fn()} />);

    await user.click(screen.getByRole('button', { name: 'Mượn' }));

    expect(onBorrow).toHaveBeenCalledTimes(1);
    expect(onBorrow).toHaveBeenCalledWith('b1');
  });

  it('nút "Mượn" bị vô hiệu hoá khi hết bản', async () => {
    const user = userEvent.setup();
    const onBorrow = jest.fn();
    render(
      <BookItem book={{ ...book, available: 0 }} isBorrowed={false} onBorrow={onBorrow} onReturn={jest.fn()} />,
    );

    const button = screen.getByRole('button', { name: 'Mượn' });
    expect(button).toBeDisabled();
    await user.click(button);
    expect(onBorrow).not.toHaveBeenCalled();
  });

  it('hiển thị nút "Trả" khi đang mượn và gọi onReturn', async () => {
    const user = userEvent.setup();
    const onReturn = jest.fn();
    render(<BookItem book={book} isBorrowed onBorrow={jest.fn()} onReturn={onReturn} />);

    await user.click(screen.getByRole('button', { name: 'Trả' }));

    expect(onReturn).toHaveBeenCalledWith('b1');
  });
});
