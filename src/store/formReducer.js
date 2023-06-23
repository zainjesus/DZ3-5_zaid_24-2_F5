const initialState = {
  name: '',
  age: 0,
  gender: '',
};

export const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_FORM_DATA':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const updateFormData = (payload) => ({
  type: 'UPDATE_FORM_DATA',
  payload: payload,
});
