import { render, screen } from '@testing-library/react';

import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// fireEvent는 이벤트를 세부적으로 제어할 수 있는 기능을 제공합니다.
// userEvent는 더 높은 수준의 API로, 사용자의 실제 동작을 시뮬레이션하는 데 중점을 둡니다.

import SunmmaryForm from '../SummaryForm';
import SummaryForm from '../SummaryForm';

test('checkbox enabled test', async () => {
  const user = userEvent.setup();

  render(<SunmmaryForm />);

  //   expect.assertion(3);

  const checkboxEl = screen.getByRole('checkbox', { name: /Terms/i });
  const buttonEl = screen.getByRole('button', { name: /Confirm/i });

  // checkbox is unchecked by default
  expect(checkboxEl).not.toBeChecked();

  // checking checkbox enables button
  await user.click(checkboxEl);
  expect(checkboxEl).toBeChecked();
  expect(buttonEl).toBeEnabled();

  // unchecking checkbox agoin disabled button
  await user.click(checkboxEl);
  expect(checkboxEl).not.toBeChecked();
  expect(buttonEl).toBeDisabled();
});

test('popover responds to hover', async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  // popover starts out hidden
  // popover가 없는지 어떻게 체크하지..? getByRole은 screen에 rendering 되어있어야함.
  const popoverEl = screen.queryByText(/no ice cream/i);
  expect(popoverEl).not.toBeInTheDocument();

  // popover apperas on mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  // expect(popoverEl).toBeInTheDocument();
  // screen.queryByText는 즉시 현재 DOM 상태를 기준으로 검색하므로 await 이후에는 새로 검색을 해서 써야함.
  const popoverEl2 = screen.queryByText(/no ice cream/i);
  expect(popoverEl2).toBeInTheDocument();

  // popover disappears when we mouse out
  await user.unhover(termsAndConditions);
  expect(popoverEl2).not.toBeInTheDocument();
});
