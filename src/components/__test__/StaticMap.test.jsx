import React from 'react';
import renderer from 'react-test-renderer';

import StaticMap from '../StaticMap.jsx';

describe('StaticMap component', () => {
  it('has location', () => {
    // given
    const staticMap = <StaticMap location="Epitech Paris"/>;

    // when
    const tree = renderer.create(staticMap).toJSON();

    // then
    expect(tree).toMatchSnapshot();
  });
});