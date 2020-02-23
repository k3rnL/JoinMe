import React from 'react';
import renderer from 'react-test-renderer';

import Button from '../Button.jsx';

describe('<Button />', () => {
  it('has 1 child', () => {
    // given
    const button = <Button title="title"/>;

    // when
    const tree = renderer.create(button).toJSON();

    // then
    expect(tree).toMatchSnapshot();
  });
});