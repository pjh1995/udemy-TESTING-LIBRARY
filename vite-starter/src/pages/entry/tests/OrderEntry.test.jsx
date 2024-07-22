import { http, HttpResponse } from 'msw';
import { server } from '../../../mocks/server';

import { render, screen } from '@testing-library/react';
import OrderEntry from '../OrderEntry';

const handlers = [
  http.get('http://localhost:3030/scoops', () => {
    return new HttpResponse(null, { status: 500 });
  }),
  http.get('http://localhost:3030/toppings', () => {
    return new HttpResponse(null, { status: 500 });
  }),
];
test('/scoops와 /topping 경로에 오는 에러 값 처리 테스트', async () => {
  // 에러를 발생시키기 위해 resetHandlers override
  server.resetHandlers(...handlers);
  render(<OrderEntry />);

  const alerts = await screen.findAllByRole('alert', { name: /Please try again later.$/i });
  expect(alerts).toHaveLength(2);
});
