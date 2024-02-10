import React, { useState } from 'react';
import "./index.css";
function App() {
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
          <button onClick={handleYesClick}>Sí</button>
          <button id="no-button" onClick={handleNoClick} onMouseEnter={handleNoHover}>
            No
          </button>
        </div>
        {answer && <p>Sabía que dirías que si! Te Amo ❤️</p>}
      </div>
    </div>
  );
}

export default App;
