"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [autorizado, setAutorizado] = useState(null);
  const [nomeUsuario, setNomeUsuario] = useState("");

  const botoes = [
    { label: "| Dashboard", rota: "/admin/dashboard" },
    { label: "| Cadastrar Agendamento", rota: "/admin/cadastro/agendamento" },
    { label: "| Todos Agendamento", rota: "/admin/lista/agendamentos" },
    { label: "| Cadastrar Exames", rota: "/admin/cadastro/exames" },
    { label: "| Todos Exames", rota: "/admin/lista/exames" },
  ];

  const handleLogout = () => {
    document.cookie = "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    document.cookie = "nome=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    router.push("/painel-adm");
  };

  useEffect(() => {
    const isAuth = document.cookie.includes("auth=true");

    if (!isAuth) {
      router.push("/painel-adm");
    } else {
      const match = document.cookie.match(/(?:^|; )nome=([^;]*)/);
      if (match) {
        setNomeUsuario(decodeURIComponent(match[1]));
      }
      setAutorizado(true);
    }
  }, [router]);

  if (autorizado === null) return null;

  return (
    <div className="h-screen flex">
      {/* Menu Lateral */}
      <aside className="w-64 bg-blue-900 text-white p-6 flex flex-col justify-between">
        <div>
          <div className="mb-8">
            <h1 className="text-xl font-bold mb-0 text-blue-400">
              Medi<span className="text-white">fy</span>Now
            </h1>
            <h3>Painel Admin</h3>
            {nomeUsuario && (
              <h4 className="text-sm text-blue-300 mt-2">
                Bem-vindo, {nomeUsuario}
              </h4>
            )}
          </div>

          <nav className="flex flex-col space-y-4">
            {botoes.map((item, index) => (
              <Link
                key={index}
                href={item.rota}
                className="bg-blue-700 hover:bg-blue-600 py-2 px-2 rounded"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 hover:bg-red-500 py-2 px-4 rounded text-white font-semibold"
        >
          Sair
        </button>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 p-10 bg-gray-100 overflow-y-auto">{children}</main>
    </div>
  );
}
