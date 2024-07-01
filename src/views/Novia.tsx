import React, { useState } from 'react';
import "../index.css";
export const  Novia =()=> {
  const [answer, setAnswer] = useState<string>("");

  const handleYesClick = () => {
    setAnswer('yes');
  };

  const handleNoClick = () => {
    setAnswer('no');
  };

  const handleNoHover = () => {
    // Cambia la posición del botón 'No' al azar
    const newX = Math.random() * window.innerWidth;
    const newY = Math.random() * window.innerHeight;
    const noButton = document.getElementById('no-button');
    if (noButton) {
      noButton.style.position = 'absolute';
      noButton.style.left = `${newX}px`;
      noButton.style.top = `${newY}px`;
    }
  };

  return (
    <div className="App">
      <div className="card">

        <h1>¿Quieres ser mi novia?</h1>
        <div>
          <div className="group">
            <div className="btn">
              <button onClick={handleYesClick}>Sí</button>
            </div>
            <div className="btn">
              <button id="no-button" onClick={handleNoClick} onMouseEnter={handleNoHover}>
                No
              </button>
            </div>
          </div>
        </div>
        {answer && 
        <div className='response'>
          <p>Sabía que dirías que si! Te Amo ❤️</p>
        </div>
        }
      </div>
    </div>
  );
}