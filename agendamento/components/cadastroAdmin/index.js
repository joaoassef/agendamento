'use client'; // Garanta que o componente seja tratado como "client-side"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importação correta do `useRouter`

export function CadastroAdmin() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
  });

  const [mensagem, setMensagem] = useState('');
  const router = useRouter(); // Usando o `useRouter` corretamente dentro do componente funcional

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dados = {
      ...formData,
      tempoMaximoAtraso: "00:15:00"
    };

    try {
      const response = await fetch('http://localhost:5025/api/Administrador', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
      });

      if (!response.ok) {
        const erroDetalhado = await response.text();
        throw new Error(`Erro ao cadastrar administrador: ${erroDetalhado}`);
      }

      const resultado = await response.json();
      setMensagem("✅ Administrador cadastrado com sucesso!");
      
      

    } catch (error) {
      //console.error("Erro:", error.message);
      //setMensagem(`❌ ${error.message}`);
    }
    
    // Redireciona para a página inicial após o sucesso
      router.push('/'); // Redireciona para a página principal ou uma página específica 

  };
  

  return (
    <div className="h-screen flex items-center justify-center bg-blue-950">
      <div className="flex justify-center border p-6 rounded-md bg-amber-50 w-[700px]">
        <div className="px-6 w-full">
          <h1 className="text-2xl font-bold mb-4">Cadastrar Administrador</h1>
          <p className="mb-4">Preencha os dados abaixo para criar o primeiro administrador do sistema.</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label>Nome Completo</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="bg-zinc-200 px-3 py-2 rounded-md w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label>E-mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-zinc-200 px-3 py-2 rounded-md w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label>Senha</label>
              <input
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                className="bg-zinc-200 px-3 py-2 rounded-md w-full"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Cadastrar
            </button>

            {mensagem && (
              <div className="mt-4 text-sm text-center text-red-600">
                {mensagem}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
