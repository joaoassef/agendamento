"use client";

import React, { useState } from 'react';
import InputMask from "react-input-mask";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function PainelTotem() {
  const [cpf, setCpf] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [corMensagem, setCorMensagem] = useState('bg-blue-600');

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true;
  };

  const formatCPF = (value) => {
    const numeric = value.replace(/\D/g, '');
    return numeric
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
      .slice(0, 14);
  };

  const handleChange = (e) => {
    const formatted = formatCPF(e.target.value);
    setCpf(formatted);
  };

  const handleAddNumber = (num) => {
    const numeric = cpf.replace(/\D/g, '');
    if (numeric.length >= 11) return;
    const newCpf = formatCPF(numeric + num);
    setCpf(newCpf);
  };

  const clearNumbers = () => setCpf("");

  const mostrarMensagem = async () => {
    const rawCpf = cpf.replace(/\D/g, '');
    clearNumbers();
    let tempo = 10000;

    if (!validarCPF(cpf)) {
      setMensagem('CPF inválido ou não cadastrado!');
      setCorMensagem('bg-red-600');
      tempo = 3000;
    } else {
      try {
        const res = await fetch(`/api/Agendamento/PesquisaCPF/${rawCpf}`, {
          headers: { "x-api-key": API_KEY }
        });

        if (!res.ok) throw new Error("Não encontrado");

        const data = await res.json();

        if (data) {
          setCorMensagem('bg-green-600');
          setMensagem('Agendamentos encontrados. Por favor, aguarde.');
        } else {
          setMensagem('Nenhum agendamento encontrado para este CPF.');
          setCorMensagem('bg-red-600');
          tempo = 3000;
        }
      } catch (err) {
        console.error(err);
        setMensagem('Erro ao verificar agendamento.');
        setCorMensagem('bg-red-600');
        tempo = 3000;
      }
    }

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

        {[['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3'], ['0', 'X', 'OK']].map((row, i) => (
          <div key={i} className="flex items-center justify-center text-3xl sm:text-5xl md:text-6xl">
            {row.map((val) => (
              <div
                key={val}
                className={`w-24 h-24 sm:w-28 sm:h-28 p-4 sm:p-6 rounded-md px-6 sm:px-8 text-white m-2 cursor-pointer shadow-lg ${val === 'X' ? 'bg-red-500' : val === 'OK' ? 'bg-blue-700' : 'bg-cyan-500'}`}
                onClick={() => {
                  if (val === 'X') clearNumbers();
                  else if (val === 'OK') mostrarMensagem();
                  else handleAddNumber(val);
                }}
              >
                <strong>{val}</strong>
              </div>
            ))}
          </div>
        ))}
      </div>

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
