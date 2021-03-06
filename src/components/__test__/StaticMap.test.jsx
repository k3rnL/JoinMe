import React from 'react';
import renderer from 'react-test-renderer';

import StaticMap from '../StaticMap';

describe('StaticMap component', () => {
  it('has location', () => {
    // given
    const staticMap = <StaticMap location="Paris" />;

    // when
    const tree = renderer.create(staticMap).toJSON();

    // then
    expect(tree).toMatchSnapshot();
  });
});
