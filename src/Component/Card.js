import React, { useState } from "react";
import "./Card.css";

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "5px",
  padding: "10px",
  margin: "10px",
  cursor: "pointer",
};

const Card = ({ title, priority, featureRequest }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="cardC" style={cardStyle} onClick={toggleCard}>
      <div className="camC">
        <div className="sizeC">CAM-{priority}</div>
        <img
          className="imageC"
          src="https://plus.unsplash.com/premium_photo-1677231559666-53bed9be43ba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym95c3xlbnwwfHwwfHx8MA%3D%3D"
          height={25}
          alt=""
        />
      </div>
      <div className="check">
        <strong>{title}</strong>
      </div>
      <div className="sizeC">
        <span>... </span> Feature Request: {featureRequest ? "Yes" : "No"}
      </div>

      {/* Conditionally render additional content when the card is open */}
      {isOpen && (
        <div>
          
        </div>
      )}
    </div>
  );
};

export default Card;
