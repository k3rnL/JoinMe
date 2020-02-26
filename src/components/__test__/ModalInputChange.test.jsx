import React from 'react';
import renderer from 'react-test-renderer';

import ModalInputChange from '../ModalInputChange';

describe('Modal input change component', () => {
  it('with defaults parameters', () => {
    // given
    const modalInputChange = <ModalInputChange />;

    // when
    const tree = renderer.create(modalInputChange).toJSON();

    // then
    expect(tree).toMatchSnapshot();
  });
});
