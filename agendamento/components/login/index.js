"use client"; // Indica que esse componente é renderizado no cliente

import { useCheckCadastro } from "@/useCheckCadastro"; // Hook customizado para verificar se há administradores cadastrados
import { CadastroAdmin } from "../cadastroAdmin"; // Componente que renderiza o formulário de cadastro de administrador
import { useState } from "react";
import { useRouter } from "next/navigation"; // Hook do Next.js para navegação no client-side

// Informações de SEO para a página, usadas automaticamente pelo App Router
export const metadata = {
  title: "Login",
  description: "Página de acesso ao sistema",
};

// Componente principal da página de login
export function Login() {
  // Estado para armazenar os dados do formulário de login
  const [formData, setFormData] = useState({
    Email: "",
    Senha: "",
  });

  // Estado para mensagens de erro ou sucesso
  const [mensagem, setMensagem] = useState("");

  // Hook de navegação do Next.js
  const router = useRouter();

  // Atualiza o estado formData à medida que o usuário digita
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Envia os dados do formulário para autenticação
  const handleSubmit = async (event) => {
    event.preventDefault(); // Previne recarregamento da página

    try {
      const response = await fetch("http://localhost:5236/api/Autenticacao/Login", {
        method: "POST",
        headers: {
          // Chave de autenticação da API
          "x-api-key": "fwjfpjewfokwfwqww65fdqw4fwe4veew41f5e6fw65c1wec56e1ve56qf6ewfe1f",
        },
        body: JSON.stringify({
          Email: formData.Email,
          Senha: formData.Senha,
        }),
      });

      // Se a resposta não for OK, lança erro detalhado
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`❌ Erro no login: ${errorText}`);
      }

      // Resposta bem-sucedida
      const resultado = await response.json();
      console.log("Login bem-sucedido!", resultado);

      // Define mensagem de sucesso e redireciona
      setMensagem("✅ Login realizado com sucesso!");
      router.push("/painel"); // Redireciona para o painel do sistema
    } catch (error) {
      // Mostra mensagem de erro em caso de falha
      setMensagem(error.message);
    }
  };

  // Hook que verifica se já existe algum administrador cadastrado
  const admin = useCheckCadastro(); // Retorna 0 se não houver nenhum admin

  return (
    <div className="h-screen flex items-center justify-center bg-blue-950">
      {admin === 0 ? (
        // Se não há admin cadastrado, exibe o formulário de cadastro
        <CadastroAdmin />
      ) : (
        // Caso contrário, exibe o formulário de login
        <div className="flex justify-center border-1 border-solid p-4 rounded-md bg-amber-50">
          <form onSubmit={handleSubmit} method="POST">
            <div>
              <div><label>Usuário</label></div>
              <input
                type="text"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                className="bg-zinc-200 px-3 py-1 rounded-md mb-4"
                required
              />
            </div>

            <div>
              <div><label>Senha</label></div>
              <input
                type="password"
                name="Senha"
                value={formData.Senha}
                onChange={handleChange}
                className="bg-zinc-200 px-3 py-1 rounded-md mb-4"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-3 py-1 rounded-md"
              >
                Entrar
              </button>

              {/* Exibe mensagem de erro ou sucesso */}
              {mensagem && (
                <span className="mt-4 text-center ps-2 text-red-600 text-sm">
                  {mensagem}
                </span>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
