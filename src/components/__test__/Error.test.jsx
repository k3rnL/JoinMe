import React from 'react';
import renderer from 'react-test-renderer';

import ErrorMessage from '../Error';

describe('Error component', () => {
  it('with default parameters', () => {
    // given
    const errorMessage = <ErrorMessage />;

    // when
    const tree = renderer.create(errorMessage).toJSON();

    // then
    expect(tree).toMatchSnapshot();
  });
});
