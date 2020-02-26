import React from 'react';
import renderer from 'react-test-renderer';

import ListButton from '../ListButton';

describe('List button component', () => {
  it('with default parameters', () => {
    // given
    const listButton = <ListButton />;

    // when
    const tree = renderer.create(listButton).toJSON();

    // then
    expect(tree).toMatchSnapshot();
  });
});
