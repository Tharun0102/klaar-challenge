import React, { useState, useEffect } from 'react';

import './Styles/BankTable.css';
import './Styles/Pagination.css';

const Pagination = ({ data, title, pages, setPages, dataLimit, setDataLimit }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const [starred, setStarred] = useState([]);


  useEffect(() => {
    let array = localStorage.getItem('starredArray');
    if (array) {
      array = JSON.parse(array);
    }
    if (array) {
      setStarred(array);
    } else {
      const dummy_array = [];
      for (let i = 0; i < data.length; i++) {
        dummy_array.push(false);
      }
      setStarred({ ...dummy_array });
      localStorage.setItem('starredArray', JSON.stringify(dummy_array));
    }
  }, []);



  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const changePageSize = (e) => {
    setDataLimit(Number(e.target.value));
  }

  return (
    <div>
      <h2>{title}</h2>
      <h2>{ }</h2>
      <table>
        <thead>
          <tr>
            <th>S.NO</th>
            <th>Bank Name</th>
            <th>Bank Id</th>
            <th>Branch</th>
            <th>Address</th>
            <th>IFSC</th>
            <th>City</th>
            <th>District</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {
            getPaginatedData().map((data, index) => {
              const currId = (index + 1) + (currentPage - 1) * Number(dataLimit);
              return (
                <tr key={data.ifsc}>
                  <td>{currId}</td>
                  <td>
                    {data.bank_name}
                    <span style={{ cursor: 'pointer' }}
                      onClick={
                        () => {
                          starred[currId - 1] = !starred[currId - 1];
                          localStorage.setItem('starredArray', JSON.stringify(starred));
                          setStarred({ ...starred });
                        }
                      }
                    >
                      {(starred[currId - 1]) ? ' ★' : ' ☆'}
                    </span>
                  </td>
                  <td>{data.bank_id}</td>
                  <td>{data.branch}</td>
                  <td>{data.address}</td>
                  <td>{data.ifsc}</td>
                  <td>{data.city}</td>
                  <td>{data.district}</td>
                  <td>{data.state}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>

      <div className="pagination">
        <div style={{ display: 'inline' }}>
          <label htmlFor="page size">Page Size : </label>
          <select
            id="page size"
            value={dataLimit}
            onChange={changePageSize}
          >
            {
              [10, 20, 30].map(size => {
                return <option key={size} value={size}>{size}</option>
              })
            }
          </select>
        </div>
        <button
          onClick={goToPreviousPage}
          className='prev-btn'
          disabled={currentPage === 1}
        >
          prev
        </button>

        <button
          onClick={goToNextPage}
          className='next-btn'
          disabled={currentPage === pages}
        >
          next
       </button>
      </div>
    </div>
  );
}




export default Pagination;