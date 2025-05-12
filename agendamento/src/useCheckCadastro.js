// useCheckCadastro.js
import { useState, useEffect } from 'react';

export function useCheckCadastro() {
  const [status, setStatus] = useState(0); // padrão: 0

  useEffect(() => {
    const check = async () => {
      try {
        const response = await fetch('http://localhost:5025/api/Administrador');
        if (!response.ok) throw new Error();
        const data = await response.json();
        setStatus(data.length > 0 ? 1 : 0);
      } catch {
        setStatus(0);
      }
    };

    check();
  }, []);

  return status; // 1 ou 0
}
