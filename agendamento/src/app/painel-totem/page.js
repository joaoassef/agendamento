'use client';

import React, { useState } from 'react';
import InputMask from "react-input-mask";

export default function PainelTotem() {

  const [cpf, setCpf] = useState('');
  const [mensagem, setMensagem] = useState('');

  const formatCPF = (value) => {
    // Remove tudo que não for número
    const numeric = value.replace(/\D/g, '');

    // Aplica a máscara
    return numeric
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
      .slice(0, 14); // Limita ao tamanho do CPF com máscara
  };

  const handleChange = (e) => {
    const formatted = formatCPF(e.target.value);
    setCpf(formatted);
  };

  // Inserir número no CPF
  const handleAddNumber = (num) => {
    const numeric = cpf.replace(/\D/g, '');
    if (numeric.length >= 11) return; // Limita a 11 dígitos
    const newCpf = formatCPF(numeric + num);
    setCpf(newCpf);
  };

  const clearNumbers = () =>{
    const cpf = "";
    setCpf(cpf);
  };

  const mostrarMensagem = () => {
    clearNumbers();
    setMensagem('Muito obrigado! Agora só aguardar e acompanhar no painel.');

    // Some após 3 segundos
    setTimeout(() => {
      setMensagem('');
      clearNumbers();
    }, 8000);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      
      <div className="text-center border-1 border-solid p-8 rounded-md bg-white shadow-lg">

          <h1 className="font-normal text-7xl" >Informe seu CPF</h1>
        
          <div className="mt-8">
            <input type="text" name="cpf" value={cpf} onChange={handleChange} className="bg-zinc-200 pb-2 rounded-md mb-2 text-8xl text-center font-medium text-blue-700 shadow-lg" placeholder="000.000.000-00" required />
          </div>

          <div  className="mt-4  flex items-center justify-center text-6xl">
             <div className="p-8 bg-cyan-500 rounded-md px-10 text-white m-2 cursor-pointer shadow-lg" onClick={() => handleAddNumber('7')}>7</div>
             <div className="p-8 bg-cyan-500 rounded-md px-10 text-white m-2 cursor-pointer shadow-lg" onClick={() => handleAddNumber('8')}>8</div>
             <div className="p-8 bg-cyan-500 rounded-md px-10 text-white m-2 cursor-pointer shadow-lg" onClick={() => handleAddNumber('9')}>9</div>
          </div>

          <div  className=" flex items-center justify-center text-6xl">
             <div className="p-8 bg-cyan-500 rounded-md px-10 text-white m-2 cursor-pointer shadow-lg" onClick={() => handleAddNumber('4')}>4</div>
             <div className="p-8 bg-cyan-500 rounded-md px-10 text-white m-2 cursor-pointer shadow-lg" onClick={() => handleAddNumber('5')}>5</div>
             <div className="p-8 bg-cyan-500 rounded-md px-10 text-white m-2 cursor-pointer shadow-lg" onClick={() => handleAddNumber('6')}>6</div>
          </div>

          <div  className=" flex items-center justify-center text-6xl">
             <div className="p-8 bg-cyan-500 rounded-md px-10 text-white m-2 cursor-pointer shadow-lg" onClick={() => handleAddNumber('1')}>1</div>
             <div className="p-8 bg-cyan-500 rounded-md px-10 text-white m-2 cursor-pointer shadow-lg" onClick={() => handleAddNumber('2')}>2</div>
             <div className="p-8 bg-cyan-500 rounded-md px-10 text-white m-2 cursor-pointer shadow-lg" onClick={() => handleAddNumber('3')}>3</div>
          </div>

          <div  className=" flex items-center justify-center text-6xl">
             <div className="p-8 bg-cyan-500 rounded-md px-10 text-white m-2 cursor-pointer shadow-lg" onClick={() => handleAddNumber('0')}>0</div>
             <div className="p-8 bg-red-500 rounded-md px-9 text-white m-2 cursor-pointer shadow-lg" onClick={() => clearNumbers()}> X </div>
             <div className="p-8 bg-green-500 rounded-md px-4 text-white m-2 cursor-pointer shadow-lg" onClick={() => mostrarMensagem()}><strong>OK</strong></div>
          </div>

       </div>

        {/* Mostrar mensagem de sucesso */}
        {mensagem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-blue-600 text-white text-4xl px-10 py-8 rounded-lg shadow-lg animate-fade">
              {mensagem}
            </div>
          </div>
        )}

    </div>
  );
}
