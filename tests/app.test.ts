import { screen } from '@testing-library/dom';
import { getPageBody } from './setup/utils';

const containerTestId = 'container';
document.body.innerHTML = getPageBody();

test('Container element initially is empty', () => {
  expect(screen.getByTestId(containerTestId)).toBeEmptyDOMElement();
});
