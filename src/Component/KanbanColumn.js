
import React from 'react';
import Card from './Card';



const KanbanColumn = ({ title, tickets }) => {
  return (
    <div >
      <div className='flexC'>
      <div className='imgC'>
     <img className='imageC' src="https://unsplash.com/photos/a-man-standing-in-front-of-a-wall-with-a-pattern-on-it-bl9iKfisiEU" height={25}  alt="" />
      <h2 className='titleC'>{title}</h2>
      </div>
      <div className='plusC'>
        <h3>+</h3>
        <h3>...</h3>
      </div>
      </div>
      <div>
        {tickets.map(ticket => (
          <Card className="active" key={ticket.id} title={ticket.title} status={ticket.status} priority={ticket.priority} />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
