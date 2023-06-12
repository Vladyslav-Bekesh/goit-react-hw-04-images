import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';


function SearchForm({ onSubmit }) {
  const [searchField, setSerchField] = useState('');

  const handleChange = ({ target: { value } }) => {
    setSerchField(value);
  };

  const resetForm = () => {
    setSerchField('');
  };

  const onSubmitForm = event => {
    event.preventDefault();
    if (searchField !== '') {
      onSubmit(makeCorrectQuerry(searchField));
      resetForm();
      return;
    }

    toast.warning('Enter name of images or photos');
  };

  function makeCorrectQuerry(querry) {
    return querry.trim().split(' ').join('+');
  }

  return (
    <form onSubmit={onSubmitForm}>
      <button type="submit">
        <span>Search</span>
      </button>

      <input
        type="text"
        autoComplete="on"
        autoFocus
        placeholder="Search images and photos"
        value={searchField}
        onChange={handleChange}
      />
    </form>
  );
}

export default SearchForm;
