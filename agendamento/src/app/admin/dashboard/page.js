"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function DashboardPage() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [tiposExame, setTiposExame] = useState([]);
  const [estatisticas, setEstatisticas] = useState({
    total: 0,
    hoje: 0,
    comparecimentos: 0,
    cancelados: 0,
  });
  const [porExame, setPorExame] = useState([]);

  useEffect(() => {
    async function carregarDados() {
      try {
        // Buscar tipos de exame
        const resExame = await fetch("/api/TipoExame", {
          headers: {
            "x-api-key": API_KEY,
          },
        });
        const exames = await resExame.json();
        setTiposExame(exames);

        // Buscar agendamentos
        const resAgendamento = await fetch("/api/Agendamento", {
          headers: {
            "x-api-key": API_KEY,
          },
        });
        const agendamentosData = await resAgendamento.json();
        setAgendamentos(agendamentosData);

        const hoje = new Date().toISOString().split("T")[0];

        const stats = {
          total: agendamentosData.length,
          hoje: agendamentosData.filter((a) => a.dataHoraExame?.startsWith(hoje)).length,
          comparecimentos: agendamentosData.filter((a) => a.comparecimento).length,
          cancelados: agendamentosData.filter((a) => a.cancelado).length,
        };

        // Agrupar por tipo de exame
        const agrupado = agendamentosData.reduce((acc, item) => {
          const tipo = exames.find((e) => e.id === item.tipoExameId)?.nome || "Desconhecido";
          acc[tipo] = (acc[tipo] || 0) + 1;
          return acc;
        }, {});

        const chartData = Object.entries(agrupado).map(([tipo, total]) => ({
          tipo,
          total,
        }));

        setEstatisticas(stats);
        setPorExame(chartData);
      } catch (err) {
        console.error("Erro ao carregar dados do dashboard:", err);
      }
    }

    carregarDados();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Total Agendamentos</p>
          <p className="text-2xl font-bold">{estatisticas.total}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Exames Hoje</p>
          <p className="text-2xl font-bold">{estatisticas.hoje}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Comparecimentos</p>
          <p className="text-2xl font-bold">{estatisticas.comparecimentos}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Cancelados</p>
          <p className="text-2xl font-bold">{estatisticas.cancelados}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Agendamentos por Tipo de Exame</h2>
        {porExame.length === 0 ? (
          <p className="text-gray-500">Nenhum dado disponível.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={porExame}>
              <XAxis dataKey="tipo" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#38bdf8" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
