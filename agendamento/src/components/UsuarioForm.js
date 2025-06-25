"use client";
import { useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const camposIniciais = {
  nome: "",
  email: "",
  senha: "",
  fotoUrl: "",
  dataNascimento: "",
  ativo: true,
  login: true, // será enviado para a API
};

export default function UsuarioForm() {
  const [formData, setFormData] = useState(camposIniciais);
  const [status, setStatus] = useState(null); // "sucesso" | "erro"
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [aguardando, setAguardando] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setEnviando(true);
    setStatus(null);
    setMensagem("⏳ Aguarde, estamos cadastrando...");
    setAguardando(true);

    const dadosParaEnvio = {
      ...formData,
      dataNascimento: formData.dataNascimento
        ? `${formData.dataNascimento}T00:00:00.000Z`
        : "",
      emailTemporario: formData.email,
      login: true, // garante que vai para o payload
    };

    try {
      const res = await fetch("/api/Usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify(dadosParaEnvio),
      });

      if (!res.ok) throw new Error("Erro ao cadastrar usuário");

      setStatus("sucesso");
      setMensagem("✅ Usuário cadastrado com sucesso!");
    } catch (err) {
      console.error(err);
      setStatus("erro");
      setMensagem("❌ Erro ao enviar os dados.");
    } finally {
      setTimeout(() => {
        setStatus(null);
        setMensagem("");
        setEnviando(false);
        setAguardando(false);
        setFormData(camposIniciais);
      }, 4000);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded shadow max-w-xl mx-auto"
    >
      <div>
        <label className="block mb-1 font-medium" htmlFor="nome">
          Nome
        </label>
        <input
          type="text"
          name="nome"
          id="nome"
          value={formData.nome}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium" htmlFor="email">
          E-mail
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium" htmlFor="senha">
          Senha
        </label>
        <input
          type="password"
          name="senha"
          id="senha"
          value={formData.senha}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium" htmlFor="fotoUrl">
          URL da Foto
        </label>
        <input
          type="text"
          name="fotoUrl"
          id="fotoUrl"
          value={formData.fotoUrl}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium" htmlFor="dataNascimento">
          Data de Nascimento
        </label>
        <input
          type="date"
          name="dataNascimento"
          id="dataNascimento"
          value={formData.dataNascimento}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
      </div>

      {enviando ? (
        <p
          className={`text-center font-semibold p-3 rounded ${
            aguardando
              ? "bg-yellow-100 text-yellow-700"
              : status === "sucesso"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {mensagem}
        </p>
      ) : (
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Cadastrar
        </button>
      )}
    </form>
  );
}
