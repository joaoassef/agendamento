"use client";

import { useCheckCadastro } from "@/useCheckCadastro";
import { CadastroAdmin } from "../cadastroAdmin";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const metadata = {
  title: "Login",
  description: "Página de acesso ao sistema",
};

export function Login() {
  const [formData, setFormData] = useState({
    Email: "",
    Senha: "",
  });

  const [mensagem, setMensagem] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5236/api/Autenticacao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "fwjfpjewfokwfwqww65fdqw4fwe4veew41f5e6fw65c1wec56e1ve56qf6ewfe1f",
        },
        body: JSON.stringify({
          email: formData.username,
          senha: formData.password,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`❌ Erro no login: ${errorText}`);
        
      }

      const resultado = await response.json();
      console.log("Login bem-sucedido!", resultado);

      setMensagem("✅ Login realizado com sucesso!");
      // Redireciona após o login, se necessário
      router.push("/painel"); // Substitua pela rota correta do painel
    } catch (error) {
      setMensagem(error.message);
    }
  };

  const admin = useCheckCadastro();

  return (
    <div className="h-screen flex items-center justify-center bg-blue-950">
      {admin === 1 ? (
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
            </div>

            {mensagem && (
              <div className="mt-4 text-center text-red-600 text-sm">
                {mensagem}
              </div>
            )}
          </form>
        </div>
      ) : (
        <CadastroAdmin />
      )}
    </div>
  );
}
