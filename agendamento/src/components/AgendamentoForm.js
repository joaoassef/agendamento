"use client";
import { useState, useEffect } from "react";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const camposIniciais = {
  nome: "",
  cpf: "",
  email: "",
  dataNascimento: "",
  dataHoraExame: "",
  tipoExameId: "",
};

export default function AgendamentoForm() {
  const [formData, setFormData] = useState(camposIniciais);
  const [tiposExame, setTiposExame] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    async function carregarTiposExame() {
      try {
        const res = await fetch("/api/TipoExame", {
          headers: {
            "x-api-key": API_KEY,
          },
        });

        if (!res.ok) throw new Error("Erro ao carregar tipos de exame");

        const data = await res.json();
        setTiposExame(data);
      } catch (err) {
        console.error("Erro ao buscar tipos de exame:", err);
        setTiposExame([]);
      }
    }

    carregarTiposExame();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatISO = (valor) => {
    if (!valor) return null;
    const data = new Date(valor);
    return data.toISOString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const payload = {
      cpf: formData.cpf.replace(/\D/g, ""),
      nome: formData.nome,
      email: formData.email,
      tipoExameId: Number(formData.tipoExameId),
      dataNascimento: formatISO(formData.dataNascimento),
      dataHoraExame: formatISO(formData.dataHoraExame),
    };

    console.log("Payload enviado:", payload);

    try {
      const res = await fetch("/api/Agendamento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify(payload),
      });

      const respostaApi = await res.text();
      console.log("Resposta da API:", respostaApi);

      if (!res.ok) throw new Error(respostaApi);

      setStatus("success");

      setTimeout(() => {
        setFormData(camposIniciais);
        setStatus(null);
      }, 3000); // Apos 3 segundos, limpa o formulário e o status deixa proximo agendamento

    } catch (error) {
      console.error("Erro no submit:", error);
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-white shadow-md rounded-xl max-w-xl mx-auto"
    >
      <h2 className="text-xl font-bold text-gray-800">
        Cadastro de Agendamento
      </h2>

      {["nome", "cpf", "email"].map((campo) => (
        <div key={campo}>
          <label
            htmlFor={campo}
            className="block text-sm font-medium text-gray-700 capitalize"
          >
            {campo}
          </label>
          <input
            id={campo}
            type={campo === "email" ? "email" : "text"}
            name={campo}
            placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
            value={formData[campo]}
            onChange={handleChange}
            required
            className="mt-1 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}

      <div>
        <label
          htmlFor="dataNascimento"
          className="block text-sm font-medium text-gray-700"
        >
          Data de Nascimento
        </label>
        <input
          id="dataNascimento"
          type="date"
          name="dataNascimento"
          value={formData.dataNascimento}
          onChange={handleChange}
          required
          className="mt-1 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="dataHoraExame"
          className="block text-sm font-medium text-gray-700"
        >
          Data e Hora do Exame
        </label>
        <input
          id="dataHoraExame"
          type="datetime-local"
          name="dataHoraExame"
          value={formData.dataHoraExame}
          onChange={handleChange}
          required
          className="mt-1 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="tipoExameId"
          className="block text-sm font-medium text-gray-700"
        >
          Tipo de Exame
        </label>
        <select
          id="tipoExameId"
          name="tipoExameId"
          value={formData.tipoExameId}
          onChange={handleChange}
          required
          className="mt-1 w-full border rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione o tipo de exame</option>
          {tiposExame.map((tipo) => (
            <option key={tipo.id} value={tipo.id}>
              {tipo.nome}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition w-full"
      >
        Agendar
      </button>

      {status === "loading" && <p className="text-gray-500">Enviando...</p>}
      {status === "success" && (
        <p className="text-green-600">Agendamento realizado com sucesso!</p>
      )}
      {status === "error" && (
        <p className="text-red-600">
          Erro ao realizar agendamento. Veja o console.
        </p>
      )}
    </form>
  );
}
