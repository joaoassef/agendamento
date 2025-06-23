"use client";

import AgendamentoForm from "@/components/AgendamentoForm";

export default function Page() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Cadastro de Agendamento</h1>
      <AgendamentoForm />
    </main>
  );
}