import React from 'react';
import renderer from 'react-test-renderer';

import InputBar from '../InputBar.jsx';

describe('input bar components', () => {
  it('has placeholder', () => {
    // given
    const inputBar = <InputBar placeholder="title"/>;

    // when
    const tree = renderer.create(inputBar).toJSON();

    // then
    expect(tree).toMatchSnapshot();
  });
});