"use client";
import { useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function ListaAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [tiposExame, setTiposExame] = useState([]);
  const [status, setStatus] = useState("carregando");
  const [filtro, setFiltro] = useState({ nome: "", cpf: "", dataHoraExame: "" });

  const carregarAgendamentos = async () => {
    try {
      const [resAg, resTipos] = await Promise.all([
        fetch("/api/Agendamento", { headers: { "x-api-key": API_KEY } }),
        fetch("/api/TipoExame", { headers: { "x-api-key": API_KEY } }),
      ]);
      if (!resAg.ok || !resTipos.ok) throw new Error("Erro ao buscar dados");

      const [dadosAg, dadosTipos] = await Promise.all([
        resAg.json(),
        resTipos.json(),
      ]);

      const agComExame = dadosAg
        .map((ag) => {
          const tipo = dadosTipos.find((t) => t.id === ag.tipoExameId);
          return { ...ag, tipoExame: tipo ? `${tipo.id} - ${tipo.nome}` : "-" };
        })
        .sort((a, b) => new Date(b.dataHoraExame) - new Date(a.dataHoraExame)); // <-- aqui

      setAgendamentos(agComExame);
      setStatus("ok");
    } catch (err) {
      console.error("Erro:", err);
      setStatus("erro");
    }
  };

  useEffect(() => {
    carregarAgendamentos();
  }, []);

  const chamarPaciente = async (id) => {
    try {
      await fetch(`/api/Agendamento/ConfirmacaoDados/${id}`, {
        method: "POST",
        headers: { "x-api-key": API_KEY },
      });
      await fetch(`/api/Agendamento/ChamarPaciente/${id}`, {
        method: "POST",
        headers: { "x-api-key": API_KEY },
      });
      alert("Paciente confirmado e chamado com sucesso!");
      carregarAgendamentos();
    } catch {
      alert("Erro ao confirmar ou chamar paciente.");
    }
  };

  const finalizarExame = async (id) => {
    try {
      await fetch(`/api/Agendamento/FinalizarExame/${id}`, {
        method: "POST",
        headers: { "x-api-key": API_KEY },
      });
      alert("Exame finalizado com sucesso!");
      carregarAgendamentos();
    } catch {
      alert("Erro ao finalizar exame.");
    }
  };

  const cancelarAgendamento = async (id) => {
    try {
      const confirmar = confirm("Deseja realmente cancelar este agendamento?");
      if (!confirmar) return;

      await fetch(`/api/Agendamento/CancelarAgendamento/${id}`, {
        method: "POST",
        headers: { "x-api-key": API_KEY },
      });

      await fetch(`/api/Agendamento/DesistirAtendimento/${id}`, {
        method: "POST",
        headers: { "x-api-key": API_KEY },
      });

      await fetch(`/api/Agendamento/DesistirPaciente/${id}`, {
        method: "POST",
        headers: { "x-api-key": API_KEY },
      });

      await fetch(`/api/Agendamento/InformarAusencia/${id}`, {
        method: "POST",
        headers: { "x-api-key": API_KEY },
      });

      alert("Agendamento cancelado com sucesso.");
      carregarAgendamentos();
    } catch {
      alert("Erro ao cancelar o agendamento.");
    }
  };

  const agendamentosFiltrados = agendamentos.filter((ag) => {
    const nomeMatch = ag.nome.toLowerCase().includes(filtro.nome.toLowerCase());
    const cpfMatch = ag.cpf.includes(filtro.cpf);
    const dataMatch = filtro.dataHoraExame
      ? ag.dataHoraExame.includes(filtro.dataHoraExame)
      : true;
    return nomeMatch && cpfMatch && dataMatch;
  });

  if (status === "carregando") return <p className="p-4">Carregando...</p>;
  if (status === "erro") return <p className="p-4 text-red-600">Erro ao carregar dados.</p>;

  return (
    <div className="p-4 max-w-full">
      <h2 className="text-2xl font-bold mb-4">Lista de Agendamentos</h2>

      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Nome"
          className="border p-2"
          value={filtro.nome}
          onChange={(e) => setFiltro({ ...filtro, nome: e.target.value })}
        />
        <input
          type="text"
          placeholder="CPF"
          className="border p-2"
          value={filtro.cpf}
          onChange={(e) => setFiltro({ ...filtro, cpf: e.target.value })}
        />
        <input
          type="datetime-local"
          className="border p-2"
          value={filtro.dataHoraExame}
          onChange={(e) =>
            setFiltro({ ...filtro, dataHoraExame: e.target.value })
          }
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {[
                "ID", "Nome", "CPF", "Data Nasc.", "Exame", "Data/Hora",
                "Cancelado", "Comparecimento", "Conf. Comparecimento",
                "Início", "Finalização", "Desistência", "Motivo", "Ações"
              ].map((col) => (
                <th key={col} className="border px-2 py-1 text-center">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {agendamentosFiltrados.map((ag) => (
              <tr key={ag.id} className="odd:bg-white even:bg-gray-50">
                <td className="border px-2 py-1">{ag.id}</td>
                <td className="border px-2 py-1 text-center">{ag.nome}</td>
                <td className="border px-2 py-1 text-center">{ag.cpf}</td>
                <td className="border px-2 py-1 text-center">
                  {new Date(ag.dataNascimento).toLocaleDateString("pt-BR")}
                </td>
                <td className="border px-2 py-1 text-center">{ag.tipoExame}</td>
                <td className="border px-2 py-1 text-center">
                  {new Date(ag.dataHoraExame).toLocaleString("pt-BR")}
                </td>
                <td className="border px-2 py-1 text-center">
                  {ag.cancelado ? "Sim" : "Não"}
                </td>
                <td className="border px-2 py-1 text-center">
                  {ag.comparecimento ? "Confirmado" : "-"}
                </td>
                <td className="border px-2 py-1 text-center">
                  {ag.confirmacaoComparecimento ? "✅" : "-"}
                </td>
                <td className="border px-2 py-1 text-center">
                  {ag.dataHoraInicial
                    ? new Date(ag.dataHoraInicial).toLocaleString("pt-BR", {
                        day: "2-digit", month: "2-digit", year: "numeric",
                        hour: "2-digit", minute: "2-digit", second: "2-digit"
                      })
                    : "-"}
                </td>
                <td className="border px-2 py-1 text-center">
                  {ag.dataHoraFinalizacao
                    ? new Date(ag.dataHoraFinalizacao).toLocaleString("pt-BR", {
                        day: "2-digit", month: "2-digit", year: "numeric",
                        hour: "2-digit", minute: "2-digit", second: "2-digit"
                      })
                    : "-"}
                </td>
                <td className="border px-2 py-1 text-center">
                  {ag.dataHoraDesistencia
                    ? new Date(ag.dataHoraDesistencia).toLocaleString("pt-BR", {
                        day: "2-digit", month: "2-digit", year: "numeric",
                        hour: "2-digit", minute: "2-digit", second: "2-digit"
                      })
                    : "-"}
                </td>
                <td className="border px-2 py-1">{ag.motivoDesistencia ?? "-"}</td>
                <td className="border px-2 py-1 space-y-1 text-center">
                  {ag.comparecimento && ag.confirmacaoChamada == null && (
                    <button
                      onClick={() => chamarPaciente(ag.id)}
                      className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                    >
                      Chamar
                    </button>
                  )}
                  {ag.confirmacaoChamada !== null && ag.dataHoraFinalizacao === null && (
                    <button
                      onClick={() => finalizarExame(ag.id)}
                      className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                    >
                      Finalizar
                    </button>
                  )}
                  {!ag.cancelado &&
                    !ag.comparecimento &&
                    !ag.confirmacaoComparecimento &&
                    !ag.confirmacaoChamada &&
                    !ag.dataHoraInicial &&
                    !ag.dataHoraFinalizacao && (
                      <button
                        onClick={() => cancelarAgendamento(ag.id)}
                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                      >
                        Cancelar
                      </button>
                    )}
                  {ag.dataHoraDesistencia && (
                    <div title="Cancelado/Desistiu" className="text-red-600 text-lg">❌</div>
                  )}
                  {ag.dataHoraFinalizacao && (
                    <div title="Exame finalizado" className="text-green-600 text-lg">✅</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
