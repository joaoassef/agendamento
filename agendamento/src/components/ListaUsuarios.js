"use client";
import { useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [status, setStatus] = useState("carregando");
  const [excluindo, setExcluindo] = useState(null);

  async function carregarUsuarios() {
    try {
      const res = await fetch("/api/Usuario", {
        headers: {
          "x-api-key": API_KEY,
        },
      });

      if (!res.ok) throw new Error("Erro ao buscar usuários");

      const data = await res.json();
      setUsuarios(data);
      setStatus("ok");
    } catch (err) {
      console.error(err);
      setStatus("erro");
    }
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function excluirUsuario(id) {
    const confirmar = confirm("Tem certeza que deseja excluir este usuário?");
    if (!confirmar) return;

    setExcluindo(id);

    try {
      const res = await fetch(`/api/Usuario/${id}`, {
        method: "DELETE",
        headers: {
          "x-api-key": API_KEY,
        },
      });

      console.log(res);

      if (!res.ok) throw new Error("Erro ao excluir usuário");

      // Atualiza lista após excluir
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Erro ao excluir usuário:", err);
      alert("Erro ao excluir usuário.");
    } finally {
      setExcluindo(null);
    }
  }

  if (status === "carregando") {
    return <p className="text-gray-600">🔄 Carregando usuários...</p>;
  }

  if (status === "erro") {
    return <p className="text-red-600">❌ Erro ao carregar os usuários.</p>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Usuários Cadastrados</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-2">Nome</th>
              <th className="text-left p-2">E-mail</th>
              <th className="text-left p-2">Nascimento</th>
              <th className="text-left p-2">Ativo</th>
              <th className="text-left p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id} className="border-t border-gray-200">
                <td className="p-2">{u.nome}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">
                  {u.dataNascimento
                    ? new Date(u.dataNascimento).toLocaleDateString("pt-BR")
                    : "-"}
                </td>
                <td className="p-2">
                  {u.ativo ? (
                    <span className="text-green-600 font-semibold">Sim</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Não</span>
                  )}
                </td>
                <td className="p-2">
                  <button
                    onClick={() => excluirUsuario(u.id)}
                    disabled={excluindo === u.id}
                    className={`text-sm text-white px-3 py-1 rounded ${
                      excluindo === u.id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    {excluindo === u.id ? "Excluindo..." : "Excluir"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
