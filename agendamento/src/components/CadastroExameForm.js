"use client";
import { useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const camposIniciais = {
  nome: "",
  descricao: "",
  duracaoPadrao: "",
  instrucoesPreparo: "",
  ativo: true
};

export default function CadastroExameForm() {
  const [formData, setFormData] = useState(camposIniciais);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/TipoExame", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY
        },
        body: JSON.stringify(formData)
      });

      const respostaApi = await res.text();
      console.log("Resposta da API:", respostaApi);

      if (!res.ok) throw new Error(respostaApi);

      setStatus("success");
      setTimeout(() => {
        setFormData(camposIniciais);
        setStatus(null);
      }, 3000);
    } catch (error) {
      console.error("Erro ao cadastrar exame:", error);
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-white shadow-md rounded-xl max-w-xl mx-auto"
    >
      <h2 className="text-xl font-bold text-gray-800">Cadastro de Exame</h2>

      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
          Nome do exame
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          value={formData.nome}
          onChange={handleChange}
          required
          className="mt-1 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
          Descrição
        </label>
        <textarea
          id="descricao"
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          className="mt-1 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <div>
        <label htmlFor="duracaoPadrao" className="block text-sm font-medium text-gray-700">
          Duração Padrão (HH:MM:SS)
        </label>
        <input
          id="duracaoPadrao"
          name="duracaoPadrao"
          type="text"
          placeholder="01:00:00"
          value={formData.duracaoPadrao}
          onChange={handleChange}
          className="mt-1 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="instrucoesPreparo" className="block text-sm font-medium text-gray-700">
          Instruções de Preparo
        </label>
        <textarea
          id="instrucoesPreparo"
          name="instrucoesPreparo"
          value={formData.instrucoesPreparo}
          onChange={handleChange}
          className="mt-1 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <div className="flex items-center space-x-2">
        <input
          id="ativo"
          name="ativo"
          type="checkbox"
          checked={formData.ativo}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
        />
        <label htmlFor="ativo" className="text-sm text-gray-700">
          Exame ativo
        </label>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition w-full"
      >
        Cadastrar Exame
      </button>

      {status === "loading" && <p className="text-gray-500">Enviando...</p>}
      {status === "success" && <p className="text-green-600">Exame cadastrado com sucesso!</p>}
      {status === "error" && <p className="text-red-600">Erro ao cadastrar exame. Veja o console.</p>}
    </form>
  );
}
