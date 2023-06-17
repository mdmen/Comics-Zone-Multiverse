import { screen } from '@testing-library/dom';
import { getPageBody } from './setup/utils';
import { containerClass } from '../src/constants/app';

const containerTestId = 'container';
document.body.innerHTML = getPageBody();

test('Initially empty', () => {
  expect(screen.getByTestId(containerTestId)).toBeEmptyDOMElement();
});

test(`Has class "${containerClass}"`, () => {
  expect(screen.getByTestId(containerTestId)).toHaveClass(containerClass);
});
