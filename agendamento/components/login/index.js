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
    email: "",
    senha: "",
  });

  const [mensagem, setMensagem] = useState("");
  const router = useRouter();
  const admin = useCheckCadastro();

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
      const response = await fetch("/api/Autenticacao/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key":
            "fwjfpjewfokwfwqww65fdqw4fwe4veew41f5e6fw65c1wec56e1ve56qf6ewfe1f",
        },
        body: JSON.stringify({
          email: formData.email,
          senha: formData.senha,
        }),
      });

      if (!response.ok) {
        throw new Error("OPS! Erro no login.");
      }

      const resultado = await response.json();
      console.log("Login bem-sucedido!", resultado);

      // ✅ Define cookie de autenticação
      document.cookie = "auth=true; path=/";

      setMensagem("✅ Login realizado com sucesso!");

      document.cookie = "auth=true; path=/";
      document.cookie = `nome=${resultado.nome}; path=/`;

      router.push("/admin");
    } catch (error) {
      setMensagem(error.message || "Erro ao realizar login.");
    }
  };

  return (
    <div className=" bg-blue-950">
      <div>
        <h1 className="text-xl font-bold mb-0 text-blue-400 p-3">
          Medi<span class="text-white">fy</span>Now
        </h1>
      </div>
      <div className="h-screen flex items-center justify-center bg-blue-950">
        <div>
          {admin === 0 ? (
            <CadastroAdmin />
          ) : (
            <div className="flex justify-center border border-gray-300 p-6 rounded-md bg-amber-50 shadow-lg">
              <form onSubmit={handleSubmit} method="POST" className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Usuário
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-zinc-200 px-3 py-2 rounded-md w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Senha
                  </label>
                  <input
                    type="password"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    className="bg-zinc-200 px-3 py-2 rounded-md w-full"
                    required
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Entrar
                  </button>

                  {mensagem && (
                    <p className="mt-3 text-center text-red-600 text-sm">
                      {mensagem}
                    </p>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
