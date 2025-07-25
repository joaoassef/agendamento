"use client";

import { useEffect, useState } from "react";
import { RelogioDinamico } from "../../../components/relogioDinamico";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

// Painel de Chamado
export default function PainelChamado() {
  const [isClient, setIsClient] = useState(false);
  const [chamadoAtual, setChamadoAtual] = useState(null);
  const [ultimosChamados, setUltimosChamados] = useState([]);
  const [tiposExame, setTiposExame] = useState([]);

  // Verifica se o componente está sendo renderizado no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const carregarTiposExame = async () => {
      try {
        const res = await fetch("/api/TipoExame", {
          headers: { "x-api-key": API_KEY },
        });

        if (!res.ok) throw new Error("Erro ao buscar tipos de exame");

        const data = await res.json();
        setTiposExame(data);
      } catch (error) {
        console.error("Erro ao carregar tipos de exame:", error);
      }
    };

    const carregarChamados = async () => {
      try {
        const res = await fetch("/api/Agendamento", {
          headers: { "x-api-key": API_KEY },
        });

        if (!res.ok) throw new Error("Erro ao buscar agendamentos");

        const dados = await res.json();

        const chamadosValidos = dados
          .filter(
            (ag) =>
              ag.confirmacaoChamada === true &&
              ag.dataHoraFinalizacao === null &&
              ag.dataHoraDesistencia === null &&
              ag.cancelado === false
          )
          .sort((a, b) => b.id - a.id);

        const [maisRecente, ...restantes] = chamadosValidos;

        setChamadoAtual(maisRecente || null);
        setUltimosChamados(restantes.slice(0, 4));
      } catch (error) {
        console.error("Erro ao carregar chamados:", error);
      }
    };

    carregarTiposExame();
    carregarChamados();

    //Isso eu não gostei mas kkkkkkkkk
    const intervalo = setInterval(() => {
      carregarChamados();
    }, 3000);

    return () => clearInterval(intervalo);
  }, [isClient]);

  const buscarNomeExame = (id) => {
    const exame = tiposExame.find((ex) => ex.id === id);
    return exame ? exame.nome : "Exame não informado";
  };

  // Renderiza só no cliente para evitar erro de hydration
  if (!isClient) return null;

  return (
    <div className="w-screen h-screen flex flex-col border border-b-emerald-800 p-2 text-center bg-blue-950">
      {/* Topo */}
      <div className="flex justify-between items-center px-3 text-amber-100">
        <div className="text-xl font-bold text-blue-400">Medi<span className="text-white">fy</span>Now</div>
        <div className="text-lg text-blue-400">
          <RelogioDinamico />
        </div>
      </div>

      {/* Paciente chamado */}
      <div className="flex-grow flex flex-col justify-center text-yellow-200 p-4 text-center">
        {chamadoAtual ? (
          <>
            <h1 className="text-9xl">{chamadoAtual.nome}</h1>
            <p className="text-3xl text-blue-300 mt-2">
              {buscarNomeExame(chamadoAtual.tipoExameId)}
            </p>
          </>
        ) : (
          <h1 className="text-5xl text-white">Aguardando chamado...</h1>
        )}
      </div>

      {/* Últimos chamados */}
      <div className="text-left text-blue-400 border-b-blue-400 border-b-2 mb-3 pb-2">
        Pessoas que já foram chamadas
      </div>

      <div className="flex gap-4 w-full mt-auto">
        {ultimosChamados.map((paciente) => (
          <div
            key={paciente.id}
            className="flex-1 bg-blue-900 text-amber-50 p-4 m-2 mt-3 mb-3 flex flex-col justify-center text-center"
          >
            <h1 className="text-3xl">{paciente.nome}</h1>
            <p className="text-lg text-blue-300 mt-1">
              {buscarNomeExame(paciente.tipoExameId)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
