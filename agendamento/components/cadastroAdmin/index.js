"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export function CadastroAdmin() {
  const [formData, setFormData] = useState({
    Nome: "",
    Email: "",
    Senha: "",
  });

  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setMensagem("⏳ Aguarde, estamos cadastrando...");

    const dados = {
      ...formData,
      TempoMaximoAtraso: "30",
    };

    try {
      const response = await fetch("/api/Administrador", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify(dados),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(`Erro ao cadastrar: ${response.statusText}`);
      }

      setMensagem("✅ Administrador cadastrado com sucesso!");
      setTimeout(() => {
        setMensagem("");
        setEnviando(false);
        setFormData({ Nome: "", Email: "", Senha: "" });
        router.push("/");
      }, 4000);
    } catch (error) {
      console.error("Erro:", error.message);
      setMensagem(`❌ ${error.message}`);
      setEnviando(false);
    }
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

            {!enviando ? (
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full"
              >
                Cadastrar
              </button>
            ) : (
              <div className="text-blue-700 text-center font-semibold">⏳ Aguarde...</div>
            )}

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
