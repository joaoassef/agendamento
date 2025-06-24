"use client";
import { useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function ListaAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [tiposExame, setTiposExame] = useState([]);
  const [status, setStatus] = useState("carregando");
  const [filtro, setFiltro] = useState({
    nome: "",
    cpf: "",
    dataHoraExame: "",
  });

  const carregarAgendamentos = async () => {
    try {
      const [resAg, resTipos] = await Promise.all([
        fetch("/api/Agendamento", {
          headers: { "x-api-key": API_KEY },
        }),
        fetch("/api/TipoExame", {
          headers: { "x-api-key": API_KEY },
        }),
      ]);

      if (!resAg.ok || !resTipos.ok) throw new Error("Erro ao buscar dados");

      const [dadosAg, dadosTipos] = await Promise.all([
        resAg.json(),
        resTipos.json(),
      ]);

      setTiposExame(dadosTipos);

      const agendamentosComNomeExame = dadosAg.map((ag) => {
        const tipo = dadosTipos.find((t) => t.id === ag.tipoExameId);
        return { ...ag, tipoExame: tipo ? `${tipo.id} - ${tipo.nome}` : "-" };
      });

      setAgendamentos(agendamentosComNomeExame);
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
      const confirmar = await fetch(`/api/Agendamento/ConfirmacaoDados/${id}`, {
        method: "POST",
        headers: { "x-api-key": API_KEY },
      });
      if (!confirmar.ok) throw new Error("Erro ao confirmar dados");

      const chamada = await fetch(`/api/Agendamento/ChamarPaciente/${id}`, {
        method: "POST",
        headers: { "x-api-key": API_KEY },
      });
      if (!chamada.ok) throw new Error("Erro ao chamar paciente");

      alert("Paciente confirmado e chamado com sucesso!");
      carregarAgendamentos(); // Atualiza a lista após ação
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro ao confirmar ou chamar paciente.");
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

  if (status === "carregando")
    return <p className="p-4">Carregando agendamentos...</p>;
  if (status === "erro")
    return <p className="p-4 text-red-600">Erro ao carregar agendamentos.</p>;

  return (
    <div className="p-4 max-w-full">
      <h2 className="text-2xl font-bold mb-4">Lista de Agendamentos</h2>

      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Nome do paciente"
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

      <div className="w-full overflow-x-auto">
        <table className="w-full text-xs table-auto border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {[
                "ID",
                "Nome",
                "CPF",
                // "Email",
                "Data Nasc.",
                "Nome do Exame",
                "Data/Hora Exame",
                "Cancelado",
                "Comparecimento",
                "Conf. Comparecimento",
                "Conf. Chamada",
                "Início",
                "Finalização",
                "Desistência",
                "Motivo Desistência",
                "Observações",
                "Ações",
              ].map((col) => (
                <th
                  key={col}
                  className={`border px-2 py-1 whitespace-nowrap ${
                    [
                      "Data/Hora Exame",
                      "Cancelado",
                      "Comparecimento",
                      "Conf. Comparecimento",
                      "Conf. Chamada",
                      "Início",
                      "Finalização",
                      "Desistência",
                      "Motivo Desistência",
                      "Observações",
                      "Ações",
                    ].includes(col)
                      ? "text-center"
                      : "text-left"
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {agendamentosFiltrados.map((ag) => (
              <tr key={ag.id} className="odd:bg-white even:bg-gray-50">
                <td className="border px-2 py-1 text-left">{ag.id}</td>
                <td className="border px-2 py-1 text-left">{ag.nome}</td>
                <td className="border px-2 py-1 text-left">{ag.cpf}</td>
                {/* <td className="border px-2 py-1 text-left">{ag.email}</td> */}
                <td className="border px-2 py-1 text-left">
                  {new Date(ag.dataNascimento).toLocaleDateString("pt-BR")}
                </td>
                <td className="border px-2 py-1 text-left">{ag.tipoExame}</td>
                <td className="border px-2 py-1 text-center">
                  {new Date(ag.dataHoraExame).toLocaleString("pt-BR")}
                </td>
                <td className="border px-2 py-1 text-center">
                  {ag.cancelado ? "Sim" : "Não"}
                </td>
                <td className="border px-2 py-1 text-center">
                  {ag.comparecimento === null ? "-" : "Confirmado"}
                </td>
               <td className="border px-2 py-1 text-center">
  {ag.confirmacaoComparecimento
    ? <span className="text-green-600 text-lg font-bold">✅</span>
    : "-"}
</td>
                <td className="border px-2 py-1 text-center">
                  {ag.confirmacaoChamada ?? "-"}
                </td>
<td className="border px-2 py-1 text-center">
  {ag.dataHoraInicial
    ? new Date(ag.dataHoraInicial).toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "-"}
</td>
                <td className="border px-2 py-1 text-center">
                  {ag.dataHoraFinalizacao ?? "-"}
                </td>
                <td className="border px-2 py-1 text-center">
                  {ag.dataHoraDesistencia ?? "-"}
                </td>
                <td className="border px-2 py-1 text-center">
                  {ag.motivoDesistencia ?? "-"}
                </td>
                <td className="border px-2 py-1 text-center">
                  {ag.observacoes ?? "-"}
                </td>
                <td className="border px-2 py-1 text-center">
                  {ag.comparecimento !== null &&
                  ag.confirmacaoChamada === null ? (
                    <button
                      onClick={() => chamarPaciente(ag.id)}
                      className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                    >
                      Chamar
                    </button>
                  ) : ag.confirmacaoChamada !== null ? (
                    <span className="text-green-600 text-lg font-bold">✅</span>
                  ) : (
                    "-"
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
