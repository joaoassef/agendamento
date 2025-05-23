'use client';

import React, { useState } from 'react';
import InputMask from "react-input-mask";

export default function PainelTotem() {

  const [cpf, setCpf] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [corMensagem, setCorMensagem] = useState('bg-blue-600');

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove tudo que não for número
  
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }
  
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
  
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;
  
    return true;
  }
  

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

    clearNumbers(); //Limpa o campo de CPF

    let tempo = 10000; //Tempo padrão de 10 segundos
    if (!validarCPF(cpf)) {
      setMensagem('CPF inválido ou não cadastrado!');
      setCorMensagem('bg-red-600');
      tempo = 3000;
    }else{
      setCorMensagem('bg-green-600');
      setMensagem('Muito obrigado! Agora só aguardar e acompanhar no painel.');

      //Neste momento tenho que salvar o CPF na base para aparecer no painel
      //.........ATENÇÃO..................

    }

    //Tempo para mostrar a mensagem
    setTimeout(() => {
      setMensagem('');
      
    }, tempo);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-950 p-4">
  <div className="text-center border border-solid p-5 sm:p-8 rounded-md bg-white shadow-lg w-full max-w-md sm:max-w-lg md:max-w-2xl">

    <h1 className="font-normal text-3xl sm:text-5xl md:text-6xl lg:text-6xl">Informe seu CPF</h1>

    <div className="mt-6">
      <input
        type="text"
        name="cpf"
        value={cpf}
        onChange={handleChange}
        className="w-full bg-zinc-200 py-2 px-4 rounded-md mb-4 text-3xl sm:text-5xl md:text-6xl text-center font-medium text-blue-700 shadow-lg"
        placeholder="000.000.000-00"
        required
      />
    </div>

    <div className="mt-4 flex items-center justify-center text-3xl sm:text-5xl md:text-6xl">
      <div className="w-24 h-24 sm:w-28 sm:h-28 p-4 sm:p-6 bg-cyan-500 rounded-md px-6 sm:px-8 text-white m-2 cursor-pointer shadow-lg" onClick={() => handleAddNumber('7')}>7</div>
      <div className="w-24 h-24 sm:w-28 sm:h-28 p-4 sm:p-6 bg-cyan-500 rounded-md px-6 sm:px-8 text-white m-2 cursor-pointer shadow-lg" onClick={() => handleAddNumber('8')}>8</div>
      <div className="w-24 h-24 sm:w-28 sm:h-28 p-4 sm:p-6 bg-cyan-500 rounded-md px-6 sm:px-8 text-white m-2 cursor-pointer shadow-lg" onClick={() => handleAddNumber('9')}>9</div>
    </div>

    <div className="flex items-center justify-center text-3xl sm:text-5xl md:text-6xl">
      <div className="w-24 h-24 sm:w-28 sm:h-28 p-4 sm:p-6 bg-cyan-500 rounded-md px-6 sm:px-8 text-white m-2 cursor-pointer shadow-lg" onClick={() => handleAddNumber('4')}>4</div>
      <div className="w-24 h-24 sm:w-28 sm:h-28 p-4 sm:p-6 bg-cyan-500 rounded-md px-6 sm:px-8 text-white m-2 cursor-pointer shadow-lg" onClick={() => handleAddNumber('5')}>5</div>
      <div className="w-24 h-24 sm:w-28 sm:h-28 p-4 sm:p-6 bg-cyan-500 rounded-md px-6 sm:px-8 text-white m-2 cursor-pointer shadow-lg" onClick={() => handleAddNumber('6')}>6</div>
    </div>

    <div className="flex items-center justify-center text-3xl sm:text-5xl md:text-6xl">
      <div className="w-24 h-24 sm:w-28 sm:h-28 p-4 sm:p-6 bg-cyan-500 rounded-md px-6 sm:px-8 text-white m-2 cursor-pointer shadow-lg" onClick={() => handleAddNumber('1')}>1</div>
      <div className="w-24 h-24 sm:w-28 sm:h-28 p-4 sm:p-6 bg-cyan-500 rounded-md px-6 sm:px-8 text-white m-2 cursor-pointer shadow-lg" onClick={() => handleAddNumber('2')}>2</div>
      <div className="w-24 h-24 sm:w-28 sm:h-28 p-4 sm:p-6 bg-cyan-500 rounded-md px-6 sm:px-8 text-white m-2 cursor-pointer shadow-lg" onClick={() => handleAddNumber('3')}>3</div>
    </div>

    <div className="flex items-center justify-center text-3xl sm:text-5xl md:text-6xl">
      <div className="w-24 h-24 sm:w-28 sm:h-28 p-4 sm:p-6 bg-cyan-500 rounded-md px-6 sm:px-8 text-white m-2 cursor-pointer shadow-lg" onClick={() => handleAddNumber('0')}>0</div>
      <div className="w-24 h-24 sm:w-28 sm:h-28 p-4 sm:p-6 bg-red-500 rounded-md px-5 sm:px-7 text-white m-2 cursor-pointer shadow-lg" onClick={() => clearNumbers()}> X </div>
      <div className="w-24 h-24 sm:w-28 sm:h-28 p-4 sm:p-6 bg-blue-700 rounded-md px-4 sm:px-2 text-white m-2 cursor-pointer shadow-lg" onClick={() => mostrarMensagem()}><strong>OK</strong></div>
    </div>
  </div>

  {/* Mensagem de sucesso */}
  {mensagem && (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className={`${corMensagem} text-white text-2xl sm:text-3xl md:text-4xl px-6 sm:px-10 py-4 sm:py-8 rounded-lg shadow-lg animate-fade`}>
        {mensagem}
      </div>
    </div>
  )}
</div>

  );
}