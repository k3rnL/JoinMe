import React from 'react';
import renderer from 'react-test-renderer';

import ContactList from '../ContactsList';

describe('ContactList component', () => {
  it('has correct behaviour with filter parameter', () => {
    // given
    const contactList = <ContactList filter="" />;

    // when
    const tree = renderer.create(contactList).toJSON();

    // then
    expect(tree).toMatchSnapshot();
  });
});
