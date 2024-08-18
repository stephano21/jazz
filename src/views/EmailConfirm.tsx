import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button, ButtonToolbar, Panel, Notification, toaster } from 'rsuite';
import "../index.css";
import { useRequest } from '../api/UseRequest';
import { Endpoints } from '../api/routes';
export const EmailConfirm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userId = searchParams.get('userId');
  const code = searchParams.get('code');
  console.log("Datos", { userId, code })
  const { getRequest } = useRequest();
  useEffect(() => {
    if (!userId || !code) {
      navigate('/');
    }
  }, [userId, code, navigate]);

  const Validate = () => {
    getRequest<any>(Endpoints.EmailConfirm, {
      userIdEncript: userId,
      codeEncript: code
    })
      .then((e) => {
        //setData(e)
        console.log(e);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    // Realiza una solicitud a la API para obtener los datos

  }, []);

  return (
    <div className="App">
      <Panel header="Confirmación de correo electronico" shaded>
        <div>
        <ButtonToolbar>

            <Button onClick={() => Validate()} appearance="primary" block><i className="bi bi-pencil-square"></i> Confirmar</Button>
        </ButtonToolbar>
            
        </div>

      </Panel>
    </div>
  );
}