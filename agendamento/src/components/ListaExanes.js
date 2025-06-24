"use client";
import { useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function ListaExames() {
  const [exames, setExames] = useState([]);
  const [status, setStatus] = useState("carregando");

  useEffect(() => {
    async function carregarExames() {
      try {
        const res = await fetch("/api/TipoExame", {
          headers: {
            "x-api-key": API_KEY
          }
        });

        if (!res.ok) throw new Error("Erro ao buscar exames");

        const data = await res.json();
        setExames(data);
        setStatus("ok");
      } catch (err) {
        console.error("Erro:", err);
        setStatus("erro");
      }
    }

    carregarExames();
  }, []);

  if (status === "carregando") return <p className="p-4">Carregando exames...</p>;
  if (status === "erro") return <p className="p-4 text-red-600">Erro ao carregar exames.</p>;

  return (
    <div className="p-4 max-w-full">
      <h2 className="text-2xl font-bold mb-4">Lista de Exames</h2>

      <div className="w-full">
        <table className="w-full text-sm table-auto border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1 text-left">ID</th>
              <th className="border px-2 py-1 text-left">Nome</th>
              <th className="border px-2 py-1 text-left">Descrição</th>
              <th className="border px-2 py-1 text-center">Duração Padrão</th>
              <th className="border px-2 py-1 text-left">Instruções de Preparo</th>
              <th className="border px-2 py-1 text-center">Ativo</th>
            </tr>
          </thead>
          <tbody>
            {exames.map((exame) => (
              <tr key={exame.id} className="odd:bg-white even:bg-gray-50">
                <td className="border px-2 py-1 text-left">{exame.id}</td>
                <td className="border px-2 py-1 text-left">{exame.nome}</td>
                <td className="border px-2 py-1 text-left">{exame.descricao}</td>
                <td className="border px-2 py-1 text-center">{exame.duracaoPadrao}</td>
                <td className="border px-2 py-1 text-left">{exame.instrucoesPreparo}</td>
                <td className="border px-2 py-1 text-center">{exame.ativo ? "Sim" : "Não"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
