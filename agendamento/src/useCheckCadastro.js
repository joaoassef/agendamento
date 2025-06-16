 //"use client";
import { useState, useEffect } from 'react';

export function useCheckCadastro() {
  const [status, setStatus] = useState(0); // padrão: 0

  useEffect(() => {
    const check = async () => {
      try {
        const response = await fetch('/api/Administrador', {
          method: 'GET', 
          headers: {
            'x-api-key': 'fwjfpjewfokwfwqww65fdqw4fwe4veew41f5e6fw65c1wec56e1ve56qf6ewfe1f'
          },
        });

        console.log("Status do administrador:", response.ok); 

        if (!response.ok) {
          throw new Error(`Erro! status: ${response.status}`);
        }

        const data = await response.json();
        setStatus(data.length > 0 ? 1 : 0); 
      } catch (error) {
        setStatus(0);
      }
    };

    check();
  }, []);

  return status; // 1 ou 0
}