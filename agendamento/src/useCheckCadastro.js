"use client";
import { useState, useEffect } from 'react';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export function useCheckCadastro() {
  const [status, setStatus] = useState(0); // 0 = não cadastrado, 1 = cadastrado

  useEffect(() => {
    const check = async () => {
      try {
        const response = await fetch('/api/Administrador', {
          method: 'GET',
          headers: {
            'x-api-key': API_KEY,
          },
        });

        console.log("Status da requisição:", response.ok);

        if (!response.ok) {
          throw new Error(`Erro! Status HTTP: ${response.status}`);
        }

        const data = await response.json();

        // Se encontrou algum administrador, considera como cadastrado
        setStatus(data.length > 0 ? 1 : 0);

      } catch (error) {
        console.error("Erro ao verificar cadastro:", error);
        setStatus(0);
      }
    };

    check();
  }, []);

  return status;
}
