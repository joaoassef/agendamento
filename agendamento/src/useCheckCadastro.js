// "use client";
import { useState, useEffect } from 'react';

export function useCheckCadastro() {
  const [status, setStatus] = useState(0); // padrão: 0

  useEffect(() => {
    const check = async () => {
      try {
        const response = await fetch('http://localhost:5236/api/Administrador', {
          method: 'GET', // Or the appropriate HTTP method for your API
          headers: {
            'x-api-key': 'fwjfpjewfokwfwqww65fdqw4fwe4veew41f5e6fw65c1wec56e1ve56qf6ewfe1f'
          },
        });

        if (!response.ok) {
          // You might want to handle different HTTP status codes here
          // For example, if response.status === 401, it's an authentication error
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setStatus(data.length > 0 ? 1 : 0);
      } catch (error) {
        console.error("Failed to fetch administrator status:", error);
        setStatus(0);
      }
    };

    check();
  }, []);

  return status; // 1 ou 0
}