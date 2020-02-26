import React from 'react';
import renderer from 'react-test-renderer';

import ProfileButton from '../ProfileButton';

describe('Profile button component', () => {
  it('with defaults parameters', () => {
    // given
    const profileButton = <ProfileButton />;

    // when
    const tree = renderer.create(profileButton).toJSON();

    // then
    expect(tree).toMatchSnapshot();
  });
});
