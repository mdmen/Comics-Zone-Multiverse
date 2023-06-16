import { screen } from '@testing-library/dom';
import { getPageBody } from '@/test-utils';
import { containerClass } from './constants/app';

const containerTestId = 'container';
document.body.innerHTML = getPageBody();

describe('App container', () => {
  test('Initially is empty', () => {
    expect(screen.getByTestId(containerTestId)).toBeEmptyDOMElement();
  });

  test(`Has a class "${containerClass}"`, () => {
    expect(screen.getByTestId(containerTestId)).toHaveClass(containerClass);
  });
});
