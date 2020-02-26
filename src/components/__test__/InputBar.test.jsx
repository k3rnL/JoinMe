import React from 'react';
import renderer from 'react-test-renderer';

import InputBar from '../InputBar';

describe('Input bar component', () => {
  it('with default parameters', () => {
    // given
    const inputBar = <InputBar onChangeText={() => {}} value="value" />;

    // when
    const tree = renderer.create(inputBar).toJSON();

    // then
    expect(tree).toMatchSnapshot();
  });
});
