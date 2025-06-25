import Link from "next/link";

export const metadata = {
  title: "Painel Admin",
  description: "Área administrativa do sistema",
};

export default function AdminLayout({ children }) {
  const botoes = [
    { label: "| Cadastrar Agendamento", rota: "/admin/cadastro/agendamento" },
    { label: "| Todos Agendamento", rota: "/admin/lista/agendamentos" },
    // { label: "Administração", rota: "/admin/cadastro/administrador" },
    // { label: "Secretaria", rota: "/admin/cadastro/secretaria" },
    { label: "| Cadastrar Exames", rota: "/admin/cadastro/exames" },
    { label: "| Todos Exames", rota: "/admin/lista/exames" },
    // { label: "Entrada de Paciente", rota: "/admin/entrada/paciente" },
  ];

  return (
    <div className="h-screen flex">
      {/* Menu Lateral */}
      <aside className="w-64 bg-blue-900 text-white p-6">
        <div className="mb-8">
          <h1 className="text-xl font-bold mb-0 text-blue-400">
            Medi<span className="text-white">fy</span>Now
          </h1>
          <h3>Painel Admin</h3>
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
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 p-10 bg-gray-100 overflow-y-auto">
        {/* Aqui onde vai abrir o conteúdo das páginas */}
        {children}
      </main>
    </div>
  );
}
