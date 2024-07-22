import { render, screen } from '@testing-library/react';

import Options from '../Options';

test('서버가 반환한 아이스크림 종류별 이미지', async () => {
  render(<Options optionType="scoops" />);

  // find images
  // const scoopsImages = screen.getAllByRole('img', { name: /scoop$/i });
  // getBy: 동기적, findBy: 비동기
  const scoopsImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopsImages).toHaveLength(2);

  // confirm alt text of images
  const altText = scoopsImages.map((el) => el.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
  // 단일 : toBe, 배열 or 객체 : toEqual
});

test('서버가 반환한 아이스크림의 토핑 종류별 이미지', async () => {
  render(<Options optionType="toppings" />);

  // 이미지를 찾기
  const toppingImages = await screen.findAllByRole('img', { name: /topping$/i });

  // 이미지가 내가 원하는 만큼 왔는지 확인
  expect(toppingImages).toHaveLength(3);

  // 이미지가 정상적으로 왔는지 확인
  const altTexts = toppingImages.map((image) => image.alt);
  expect(altTexts).toEqual(['Cherries topping', 'M&Ms topping', 'Hot fudge topping']);
});
