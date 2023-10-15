
import React from 'react';

import '../styles.css';

function Card({ ticket, groupByOption }) {
  const renderIcon = (iconClass, tooltip) => (
    <span className="icon" title={tooltip}>
      <i className={iconClass} />
    </span>
  );

  const renderFeatureRequestBox = () => (
    <span className={`feature-request-box ${ticket.tag.includes('Feature request') ? 'feature-request' : ''}`}>
      Feature Request
    </span>
  );
  const { id, title, status, priority, userId } = ticket;
  const renderContentBasedOnGroup = () => { 

    return (
      <span className="icon-container">
        {groupByOption !== 'status' && renderIcon(getTodoStatusIconClass(status), `To-Do: ${status}`)}
      {groupByOption !== 'priority' && renderIcon(getPriorityIconClass(priority), `Priority: ${priority}`)}
      {groupByOption !== 'user' && renderIcon('fas fa-user', `User ${userId}`)}
      </span>
      
    );
  };

  const getTodoStatusIconClass = (status) => {
    switch (status.toLowerCase()) {
      case 'todo':
        return "fa-regular fa-circle";
      case 'in progress':
        return "fa-solid fa-circle-half-stroke";
      case 'backlog':
        return 'fas fa-spinner';
      case 'done':
        return "fa-solid fa-check";
      default:
        return '';
    }
  };

  const getPriorityIconClass = (priority) => {
    switch (priority) {
      case 4:
        return "fa-solid fa-circle-exclamation";
      case 3:
        return "fa-solid fa-circle-up";
      case 2:
         return "fa-solid fa-circle-minus";
      case 1:
        return "fa-solid fa-circle-down";
      case 0:
        return "fa-solid fa-circle-xmark";
      default:
        return '';
    }
  };

  return (
    <div className="card">
      <div className="card-content">
        <div className="card-header">
          <span className="card-id">{id}</span>
        </div>
        <h3>{title}</h3>
        {renderContentBasedOnGroup()}
        {renderFeatureRequestBox()}
      </div>
    </div>
  );
}

export default Card;
/*
        {groupByOption !== 'priority' && renderIcon(getPriorityIconClass(priority), `Priority: ${priority}`)}
        {groupByOption !== 'todo' && renderIcon(getTodoStatusIconClass(status), `To-Do: ${status}`)}
        {groupByOption !== 'user' && renderIcon('fas fa-user', `User ${userId}`)}
        */