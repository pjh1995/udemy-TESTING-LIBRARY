import { logRoles } from '@testing-library/dom';

import { render, screen, fireEvent } from '@testing-library/react';
// fireEvent : 간단한 클릭
// userEvent : 사용자 인터렉션
import ColorButton from './ColorButton';

test('Roles 디버깅 example', () => {
  const { container } = render(<ColorButton />);
  logRoles(container);
  const buttonEl = screen.getByRole('button', { name: /blue/i });
});

test('button click flow', () => {
  // render App
  render(<ColorButton />);
  // find the button
  const buttonEl = screen.getByRole('button', { name: /blue/i });
  // check initial color
  expect(buttonEl).toHaveClass('red');

  // click the button
  fireEvent.click(buttonEl);
  // check button thext
  expect(buttonEl).toHaveTextContent(/red/i);
  // check button thext
  expect(buttonEl).toHaveClass('blue');
  // expect(buttonEl).toHaveStyle({ 'background-color': 'blue' });
  // fail : rgb값으로 넣어야함 ㅋ
});
