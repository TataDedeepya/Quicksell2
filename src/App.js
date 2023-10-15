import React, { useState, useEffect } from 'react';
import DisplayOptions from './components/DisplayOptions';
import Board from './components/Board';
import './styles.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupByOption, setGroupByOption] = useState('user');
  const [orderByOption, setOrderByOption] = useState('priority');

  useEffect(() => {
    const apiUrl = 'https://api.quicksell.co/v1/internal/frontend-assignment';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets);
        setUsers(data.users);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="app">
      {tickets.length === 0 || users.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <>
          <DisplayOptions
            groupByOption={groupByOption}
            orderByOption={orderByOption}
            setGroupByOption={setGroupByOption}
            setOrderByOption={setOrderByOption}
          />
          <Board tickets={tickets} users={users} groupByOption={groupByOption} orderByOption={orderByOption} />
        </>
      )}
    </div>
  );
}

export default App;
