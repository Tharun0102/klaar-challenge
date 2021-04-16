import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import Search from './Search';

const BankList = () => {
  const cities = ["MUMBAI", "BANGALORE", "CHENNAI", "DELHI", "KOLKATA"];
  const [listState, setListState] = useState([]);
  const [pages, setPages] = useState(1);
  const [dataLimit, setDataLimit] = useState(10);

  useEffect(() => {
    const getList = async () => {
      const data = localStorage.getItem('my-list');
      if (data) {
        setListState(JSON.parse(data));
      } else {
        const response = await axios.get('https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI');
        setListState(response.data);
        localStorage.setItem('my-list', JSON.stringify(response.data));
      }
    }
    getList();
    setPages(Math.round(listState.length / dataLimit));
  }, []);


  return (
    <div>
      <div className="dropdown-search">
        <select style={{ padding: 5 }} className="city-dropdown">
          {
            cities.map(c => {
              return <option key={c} value={c}>{c}</option>
            })
          }
        </select>
        <Search
          setListState={setListState}
          setPages={setPages}
          dataLimit={dataLimit}
        />
        {/* <Favourites /> */}
      </div>
      {listState.length > 0 ? (
        <>
          <Pagination
            data={listState}
            title="Banks List"
            pages={pages}
            setPages={setPages}
            dataLimit={dataLimit}
            setDataLimit={setDataLimit}
          />
        </>
      ) : (
        <h1>No data to display</h1>
      )}
    </div>
  );
};

export default BankList;