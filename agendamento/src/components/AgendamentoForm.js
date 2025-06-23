"use client";
import { useState, useEffect } from "react";

const API_KEY =
  "fwjfpjewfokwfwqww65fdqw4fwe4veew41f5e6fw65c1wec56e1ve56qf6ewfe1f";

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
      cpf: formData.cpf.replace(/\D/g, ""), // remove pontuação
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
      setFormData(camposIniciais);
    } catch (error) {
      console.error("Erro no submit:", error);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto">
      {["nome", "cpf", "email"].map((campo) => (
        <input
          key={campo}
          type={campo === "email" ? "email" : "text"}
          name={campo}
          placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
          value={formData[campo]}
          onChange={handleChange}
          required
          className="w-full border p-2"
        />
      ))}

      <input
        type="date"
        name="dataNascimento"
        value={formData.dataNascimento}
        onChange={handleChange}
        required
        className="w-full border p-2"
      />

      <input
        type="datetime-local"
        name="dataHoraExame"
        value={formData.dataHoraExame}
        onChange={handleChange}
        required
        className="w-full border p-2"
      />

      <select
        name="tipoExameId"
        value={formData.tipoExameId}
        onChange={handleChange}
        required
        className="w-full border p-2"
      >
        <option value="">Selecione o tipo de exame</option>
        {tiposExame.map((tipo) => (
          <option key={tipo.id} value={tipo.id}>
            {tipo.nome}
          </option>
        ))}
      </select>

      <button type="submit" className="bg-blue-600 text-white p-2 w-full">
        Agendar
      </button>

      {status === "loading" && <p>Enviando...</p>}
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
