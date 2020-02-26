/* eslint-disable react/prop-types */
import React from 'react';
import renderer from 'react-test-renderer';

import Map from '../Map';

jest.mock('react-native-maps', () => {
  // eslint-disable-next-line global-require
  const { View } = require('react-native');
  const MockMapView = (props) => {
    const { children } = props;
    return <View>{children}</View>;
  };
  const MockMarker = (props) => {
    const { children } = props;
    return <View>{children}</View>;
  };
  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker,
  };
});


describe('Map component', () => {
  it('with defaults parameters', () => {
    // given
    const map = <Map />;

    // when
    const tree = renderer.create(map).toJSON();

    // then
    expect(tree).toMatchSnapshot();
  });
});
