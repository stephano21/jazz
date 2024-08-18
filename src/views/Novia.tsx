import React, { useState } from 'react';
import { Button, ButtonToolbar, Panel, Notification, toaster } from 'rsuite';
import "../index.css";
export const Novia = () => {
  const [answer, setAnswer] = useState<string>("");
  const message = (
    <Notification type="success" header={`Princesa Hermosa!`} closable>
      <p>Sabía que dirías que si! <br /> Te Amo ❤️</p>
      <hr />
      <ButtonToolbar>
        <Button appearance="primary">Ok</Button>
        <Button appearance="default">Cancel</Button>
      </ButtonToolbar>
    </Notification>
  );
  const handleYesClick = () => {
    setAnswer('yes');
    toaster.push(message, { placement:"topCenter"})
  };

  const handleNoClick = () => {
    setAnswer('no');
  };

  const handleNoHover = () => {
    console.log("On")
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
      <Panel header="¿Quieres ser mi novia?" shaded>
        <div>
          <div className="group">
            <div className="btn">
              <Button onClick={handleYesClick} color="green" appearance="primary">
                Sí
              </Button>
            </div>
            <div className="btn">
              
              <Button appearance="primary" color="red" id='no-button' onMouseEnter={handleNoHover}>No</Button>
            </div>
          </div>
        </div>
        
      </Panel>
    </div>
  );
}