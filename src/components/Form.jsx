import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../store/formReducer';

const Form = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const formData = useSelector((state) => state.form);
  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(Number(e.target.value));
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const updatedFormData = {
      name,
      age,
      gender,
    };

    dispatch(updateFormData(updatedFormData));
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          Age:
          <input type="number" value={age} onChange={handleAgeChange} />
        </label>
        <br />
        <label>
          Gender:
          <select value={gender} onChange={handleGenderChange}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <br />
        <button type="submit">Save</button>
      </form>

      <div>
        <h2>Form Data:</h2>
        <p>Name: {formData.name}</p>
        <p>Age: {formData.age}</p>
        <p>Gender: {formData.gender}</p>
      </div>
    </div>
  );
};

export default Form;
