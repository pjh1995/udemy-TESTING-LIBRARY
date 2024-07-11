import { logRoles } from '@testing-library/dom';
import { describe } from 'vitest';

import { render, screen, fireEvent } from '@testing-library/react';
// fireEvent : 간단한 클릭
// userEvent : 사용자 인터렉션
import ColorButton from './ColorButton';
import { kebabToTitle } from './helper';

test('Roles 디버깅 example', () => {
  expect.assertions(0);
  // 통과 해야하는 테스트 갯수
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
  expect(buttonEl).toHaveClass('medium-violet-red');

  // click the button
  fireEvent.click(buttonEl);
  // check button thext
  expect(buttonEl).toHaveTextContent(/red/i);
  // check button thext
  expect(buttonEl).toHaveClass('midnight-blue');
  // expect(buttonEl).toHaveStyle({ 'background-color': 'blue' });
  // fail : rgb값으로 넣어야함 ㅋ
});

test('checkbox flow', async () => {
  // render App
  render(<ColorButton />);
  // find the elements
  const buttonEl = screen.getByRole('button', { name: /blue/i });
  const checkboxEl = screen.getByRole('checkbox', { name: /disable button/i });

  // check initial conditions
  expect(buttonEl).toBeEnabled();
  expect(checkboxEl).not.toBeChecked();

  //// check after check

  // check the checkbox
  await fireEvent.click(checkboxEl);
  expect(checkboxEl).toBeChecked();
  expect(buttonEl).toBeDisabled();

  // unCheck the checkbox
  await fireEvent.click(checkboxEl);
  expect(checkboxEl).not.toBeChecked();
  expect(buttonEl).toBeEnabled();
});

test('button color flow', async () => {
  // render App
  render(<ColorButton />);

  // find the elements
  const buttonEl = screen.getByRole('button', { name: /blue/i });
  const checkboxEl = screen.getByRole('checkbox', { name: /disable button/i });

  // check initial conditions
  expect(buttonEl).toBeEnabled();
  expect(buttonEl).toHaveClass('medium-violet-red');
  expect(checkboxEl).not.toBeChecked();

  //// check after check

  async function checkButtonDisabled() {
    // https://kentcdodds.com/blog/avoid-nesting-when-youre-testing
    // check the checkbox , button color red
    await fireEvent.click(checkboxEl);
    expect(checkboxEl).toBeChecked();
    expect(buttonEl).toBeDisabled();
    expect(buttonEl).toHaveClass('grey');
  }
  // check the checkbox , button color red
  await checkButtonDisabled();

  // unCheck the checkbox
  await fireEvent.click(checkboxEl);
  expect(checkboxEl).not.toBeChecked();
  expect(buttonEl).toBeEnabled();
  expect(buttonEl).toHaveClass('medium-violet-red');

  // change button color
  await fireEvent.click(buttonEl);
  expect(buttonEl).toHaveClass('midnight-blue');

  // check the checkbox , button color red
  await checkButtonDisabled();
});

// unit test
describe('kebabToTitle', () => {
  test('check title', () => {
    expect(kebabToTitle('medium-violet-red')).toBe('medium violet red');
  });
});
