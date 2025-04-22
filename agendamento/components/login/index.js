import { CadastroAdmin } from "../cadastroAdmin";

export const metadata = {
    title: "Login",
    description: "Página de acesso ao sistema",
};
  
  
export function Login() {

    let login = "joao";
    let senha = "12345678";

    //Se o existir administrador cadastrado, exibe o formulário de login, se não exibe o formulário de cadastro do administrador
    let admin = 1;
   
    return (
                
            <div className="h-screen flex items-center justify-center">

                {admin === 1 ? (
        
                <div className="flex justify-center border-1 border-solid p-4 rounded-md">
                
                    <form action="" method="POST">

                        <div>
                            <div>
                                <label form="">Usuário</label>
                            </div>
                            <div>
                                <input type="text" name="username" className="bg-zinc-200 px-3 py-1 rounded-md mb-4" placeholder="" required />
                            </div>
                        </div>

                        <div>
                            <div>
                                <label form="">Usuário</label>
                            </div>

                            <div className="text-center">
                                <input type="password" name="password" className="bg-zinc-200 px-3 py-1 rounded-md mb-4 " placeholder="" required />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded-md">Entrar</button>
                        </div>
                    
                    </form>
                </div>

            ) : <>
                <CadastroAdmin />
                </>
                
                }
        </div>
      
    );
  }