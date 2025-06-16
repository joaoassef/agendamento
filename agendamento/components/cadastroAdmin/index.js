"use client"; // Garanta que o componente seja tratado como "client-side"

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Importação correta do `useRouter`

export function CadastroAdmin() {
  const [formData, setFormData] = useState({
    Nome: "",
    Email: "",
    Senha: "",
  });

  const [mensagem, setMensagem] = useState("");
  const router = useRouter(); // Usando o `useRouter` corretamente dentro do componente funcional

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dados = {
      ...formData,
      TempoMaximoAtraso: "30",
    };

    try {
      // const response = await fetch("http://localhost:5236/api/Administrador", {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "x-api-key":
      //       "fwjfpjewfokwfwqww65fdqw4fwe4veew41f5e6fw65c1wec56e1ve56qf6ewfe1f",
      //   },
      //   body: JSON.stringify(dados),
      // });

      const query = new URLSearchParams(dados).toString();
      const response = await fetch(
        `/api/Administrador?${query}`,
        {
          method: "GET",
          headers: {
            "x-api-key": "fwjfpjewfokwfwqww65fdqw4fwe4veew41f5e6fw65c1wec56e1ve56qf6ewfe1f",
          },
        }
      );

      if (!response.ok) {
        const errorBody = await response.text(); // Obtenha a resposta de erro bruta
        console.error("API Error Response:", errorBody); // Registre o erro bruto
        throw new Error(
          `Erro ao cadastrar administrador: ${response.status} - ${response.statusText} - ${errorBody}`
        );
      }

      const resultado = await response.json();
      setMensagem("✅ Administrador cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro:", error.message);
      setMensagem(`❌ ${error.message}`);
    }

    // Redireciona para a página inicial após o sucesso
    router.push("/"); // Redireciona para a página principal ou uma página específica
  };

  return (
    <div className="h-screen flex items-center justify-center bg-blue-950">
      <div className="flex justify-center border p-6 rounded-md bg-amber-50 w-[700px]">
        <div className="px-6 w-full">
          <h1 className="text-2xl font-bold mb-4">Cadastrar Administrador</h1>
          <p className="mb-4">
            Preencha os dados abaixo para criar o primeiro administrador do
            sistema.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label>Nome Completo</label>
              <input
                type="text"
                name="Nome"
                value={formData.Nome}
                onChange={handleChange}
                className="bg-zinc-200 px-3 py-2 rounded-md w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label>E-mail</label>
              <input
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                className="bg-zinc-200 px-3 py-2 rounded-md w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label>Senha</label>
              <input
                type="password"
                name="Senha"
                value={formData.Senha}
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
