'use client';

import React, { useEffect, useState } from 'react';

export function RelogioDinamico() {
  const [dataHora, setDataHora] = useState(getCurrentDateTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setDataHora(getCurrentDateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function getCurrentDateTime() {
    const now = new Date();

    const dia = now.getDate();
    const ano = now.getFullYear();
    const hora = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    // Array com nomes dos meses
    const meses = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];

    const mesPorExtenso = meses[now.getMonth()];

    return `${dia} de ${mesPorExtenso} de ${ano} - ${hora}`;
  }

  return <span>{dataHora}</span>;
}
