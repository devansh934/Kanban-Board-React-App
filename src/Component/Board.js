import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Filter from './Filter';
import KanbanColumn from './KanbanColumn';
import "./Board.css";

const boardStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '20px',
    marginTop:"20px",
    backgroundColor: "#F8F8F8",
    height:"53rem",
  
  
  };

const fetchData = async () => {
    try {
      const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


const groupTickets = (tickets, groupingOption, users) => {
  let groupedTickets = [];

  switch (groupingOption) {
    case 'user':
      // Group tickets by user
      groupedTickets = tickets.reduce((acc, ticket) => {
        const user = users.find(user => user.id === ticket.userId);
        const userName = user ? user.name : 'Unknown User';
        const userGroup = acc.find(group => group.title === userName);
        if (userGroup) {
          userGroup.tickets.push({ ...ticket, userName });
        } else {
          acc.push({ title: userName, tickets: [{ ...ticket, userName }] });
        }
        return acc;
      }, []);
      break;

    case 'status':
      // Group tickets by status
      groupedTickets = tickets.reduce((acc, ticket) => {
        const statusGroup = acc.find(group => group.title === ticket.status);
        if (statusGroup) {
          statusGroup.tickets.push(ticket);
        } else {
          acc.push({ title: ticket.status, tickets: [ticket] });
        }
        return acc;
      }, []);
      break;


    case 'priority':
      // Group tickets by priority
      groupedTickets = tickets.reduce((acc, ticket) => {
        const priorityGroup = acc.find(group => group.title === ticket.priority.toString());
        if (priorityGroup) {
          priorityGroup.tickets.push(ticket);
        } else {
          acc.push({ title: ticket.priority.toString(), tickets: [ticket] });
        }
        return acc;
      }, []);
      break;

    default:
      // Default to grouping by status if the option is not recognized
      groupedTickets = groupTickets(tickets, 'status', users);
      break;
  }
  return groupedTickets;
};


  

const sortTickets = (tickets, sortingOption) => {
  let sortedTickets = [];

  switch (sortingOption) {
    case 'priority':
      // Sort tickets by priority in descending order
      sortedTickets = [...tickets].sort((a, b) => b.priority - a.priority);
      break;

    case 'title':
      // Sort tickets by title in ascending order
      sortedTickets = [...tickets].sort((a, b) => a.title.localeCompare(b.title));
      break;

    default:
      // Default to sorting by priority if the option is not recognized
      sortedTickets = sortTickets(tickets, 'priority');
      break;
  }

  return sortedTickets;
};



const Board = () => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [groupingOption, setGroupingOption] = useState('user');
    const [sortingOption, setSortingOption] = useState('priority');
    const [displayedTickets, setDisplayedTickets] = useState([]);
  
    useEffect(() => {
      fetchData().then(data => {
        setTickets(data.tickets);
        setUsers(data.users);
      });
    }, []);

 const groupedTickets = groupTickets(tickets, groupingOption, users);
  const sortedTickets = sortTickets(groupedTickets, sortingOption);

  const handleGroupingChange = option => {
    setGroupingOption(option);
  };

  const handleSortingChange = option => {
    setSortingOption(option);
  };

  const handleDisplayClick = () => {
    setDisplayedTickets(sortedTickets);
  };


  return (
    <div>
    <div className='filterB'>
      <Filter
       
        onGroupingChange={handleGroupingChange}
        onSortingChange={handleSortingChange}
        onDisplayClick={handleDisplayClick}
      />

      </div>
      {/* Render Kanban Columns based on displayedTickets */}
      <div  className="active" style={boardStyle}>
      {displayedTickets.map(column => (
        <KanbanColumn key={column.id} title={column.title} tickets={column.tickets} />
      ))}
      </div>
    </div>
  );
};
export default Board;
