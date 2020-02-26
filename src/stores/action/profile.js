export const updateUid = (uid) => ({
  type: 'UPDATE_UID',
  uid,
});

export const updatePhoneNumber = (phone) => ({
  type: 'UPDATE_PHONE',
  phone,
});

export const updatePicture = (picture) => ({
  type: 'UPDATE_PICTURE',
  picture,
});

export const updateNames = ({ firstname, lastname }) => ({
  type: 'UPDATE_NAMES',
  firstname,
  lastname,
});
