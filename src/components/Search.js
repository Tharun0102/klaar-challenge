import React, { useState } from 'react';

const Search = ({ setPages, setListState, dataLimit }) => {
  const [value, setValue] = useState('');

  const hasText = (data, value) => {
    const values = Object.values(data);
    for (let i = 0; i < values.length; i++) {
      if (String(values[i]).indexOf(value.toUpperCase()) > -1) {
        return true;
      }
    }
    return false;
  }

  const onType = (e) => {
    setValue(e.target.value);
    //search
    const originalList = JSON.parse(localStorage.getItem('my-list'));
    const newList = originalList.filter((data) => {
      return hasText(data, e.target.value);
    });
    setListState(newList);
    setPages(Math.round(newList.length / dataLimit));
  }

  return (
    <div className="search-bar">
      <input
        style={{ padding: 5 }}
        value={value}
        placeholder="search"
        onChange={onType}
      />
    </div>
  );
};


export default Search;