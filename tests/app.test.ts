import { screen } from '@testing-library/dom';
import { getPageBody } from './setup/utils';

const containerTestId = 'container';
document.body.innerHTML = getPageBody();

describe('App container', () => {
  test('Container element initially is empty', () => {
    expect(screen.getByTestId(containerTestId)).toBeEmptyDOMElement();
  });
});
