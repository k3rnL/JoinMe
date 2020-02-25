import React from 'react';
import renderer from 'react-test-renderer';

import Button from '../Button';

describe('Button component', () => {
  it('has a title', () => {
    // given
    const button = <Button title="title" />;

    // when
    const tree = renderer.create(button).toJSON();

    // then
    expect(tree).toMatchSnapshot();
  });
});
