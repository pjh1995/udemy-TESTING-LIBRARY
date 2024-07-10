import { render, screen } from '@testing-library/react';
import App from './App';

test('App contains correct heading', () => {
  render(<App />);
  // const headingElement = screen.getByText(/learn react/i);
  // getByText 보단 getByRole을 더 권장함.
  const headingElement = screen.getByRole('heading', { name: /learn react/i });
  // https://testing-library.com/docs/queries/about/#priority
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques#roles
  expect(headingElement).toBeInTheDocument();
});
