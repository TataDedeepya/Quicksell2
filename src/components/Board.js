import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEllipsis } from '@fortawesome/free-solid-svg-icons';

import Card from './Card';

function getPriorityText(priority) {
  switch (priority) {
    case 4:
      return 'Urgent';
    case 3:
      return 'High';
    case 2:
      return 'Medium';
    case 1:
      return 'Low';
    case 0:
      return 'No priority';
    default:
      return '';
  }
}

function Board({ tickets, users, groupByOption, orderByOption }) {
  const groupTickets = (tickets, groupByOption) => {
    switch (groupByOption) {
      case 'status':
        return tickets.reduce((grouped, ticket) => {
          const status = ticket.status;
          if (!grouped[status]) {
            grouped[status] = [];
          }
          grouped[status].push(ticket);
          return grouped;
        }, {});

      case 'user':
        return tickets.reduce((grouped, ticket) => {
          const user = users.find((user) => user.id === ticket.userId);
          if (user) {
            const userName = user.name;
            if (!grouped[userName]) {
              grouped[userName] = [];
            }
            grouped[userName].push(ticket);
          }
          return grouped;
        }, {});

      case 'priority':
        return tickets.reduce((grouped, ticket) => {
          const priority = ticket.priority;
          if (!grouped[priority]) {
            grouped[priority] = [];
          }
          grouped[priority].push(ticket);
          return grouped;
        }, {});

      default:
        return {};
    }
  };

  const sortTickets = (groupedTickets, orderByOption) => {
    switch (orderByOption) {
      case 'priority':
        return Object.keys(groupedTickets)
          .sort((a, b) => b - a)
          .reduce((sorted, priority) => {
            sorted[priority] = groupedTickets[priority];
            return sorted;
          }, {});

      case 'title':
        return Object.keys(groupedTickets).reduce((sorted, key) => {
          sorted[key] = groupedTickets[key].sort((a, b) => a.title.localeCompare(b.title));
          return sorted;
        }, {});

      default:
        return {};
    }
  };

  const groupedTickets = groupTickets(tickets, groupByOption);
  const sortedTickets = sortTickets(groupedTickets, orderByOption);

  return (
    <div className="board">
      {Object.keys(sortedTickets).map((group) => (
        <div key={group} className="group">
          <h2>{groupByOption === 'priority' ? getPriorityText(parseInt(group)) : group}-{sortedTickets[group].length}{' '}
            <span className="heading-icon">
              <FontAwesomeIcon icon={faPlus} />{' '}
              <FontAwesomeIcon icon={faEllipsis} />
            </span> </h2>
          {sortedTickets[group].map((ticket) => (
            <Card key={ticket.id} ticket={ticket} groupByOption={groupByOption} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
