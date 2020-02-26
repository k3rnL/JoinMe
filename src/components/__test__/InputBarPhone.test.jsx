import React from 'react';
import renderer from 'react-test-renderer';

import InputBarPhone from '../InputBarPhone';

describe('input bar phone component', () => {
  it('has with phone attribute', () => {
    // given
    const inputBarPhone = <InputBarPhone phone="0612345678" />;

    // when
    const tree = renderer.create(inputBarPhone).toJSON();

    // then
    expect(tree).toMatchSnapshot();
  });
});
