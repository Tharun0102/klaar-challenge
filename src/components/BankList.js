import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import Search from './Search';

const BankList = () => {
  const cities = ["MUMBAI", "BANGALORE", "CHENNAI", "DELHI", "KOLKATA"];
  const [city, setCity] = useState(cities[0]);
  const [listState, setListState] = useState([]);
  const [pages, setPages] = useState(1);
  const [dataLimit, setDataLimit] = useState(10);

  useEffect(() => {
    const getList = async () => {
      const data = localStorage.getItem(city);
      if (data) {
        setListState(JSON.parse(data));
      } else {
        const response = await axios.get(`https://vast-shore-74260.herokuapp.com/banks?city=${city}`);
        setListState(response.data);
        localStorage.setItem(city, JSON.stringify(response.data));
      }
    }
    getList();
    setPages(Math.round(listState.length / dataLimit));
  }, []);

  const cityChangehandler = async (e) => {
    const value = e.target.value;
    console.log(value);
    setCity(value);
    const data = localStorage.getItem(value);
    if (data) {
      setListState(JSON.parse(data));
    } else {
      const response = await axios.get(`https://vast-shore-74260.herokuapp.com/banks?city=${value}`);
      setListState(response.data);
      localStorage.setItem(value, JSON.stringify(response.data));
    }
    setPages(Math.round(listState.length / dataLimit));
  }

  return (
    <div>
      <div className="dropdown-search">
        <select style={{ padding: 5 }} className="city-dropdown" onChange={cityChangehandler}>
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
          city={city}
        />
        {/* <Favourites /> */}
      </div>
      {
        listState.length > 0 ? (
          <>
            <Pagination
              data={listState}
              title="Banks List"
              pages={pages}
              setPages={setPages}
              dataLimit={dataLimit}
              setDataLimit={setDataLimit}
              city={city}
            />
          </>
        ) : (
          <h1>No data to display</h1>
        )
      }
    </div >
  );
};

export default BankList;