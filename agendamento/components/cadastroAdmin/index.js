
export const metadata = {
    title: "Cadastro de Administrador",
    description: "Página de primeiro acesso ao sistema",
  };

export function CadastroAdmin() {


    return (
                
            <div className="h-screen flex items-center justify-center">
        
                <div className="flex justify-center border-1 border-solid p-4 rounded-md">

                <div className="px-3">
                    <h1 className="text-2xl font-bold mb-4">Cadastrar Administrador</h1>
                    <p>Estamos felizes que esteja utilizando nossa aplicação. </p>
                    <p>Vamos cria o cadastro do administrador do sistema?</p>
                    <p>Preencha os formulário ao lado.</p>
                </div>
                
                    <form action="" method="POST">

                        <div>
                            <div>
                                <label form="">Nome Completo</label>
                            </div>
                            <div>
                                <input type="text" name="nome" className="bg-zinc-200 px-3 py-1 rounded-md mb-4 w-80"  placeholder="" required />
                            </div>
                        </div>

                        <div>
                            <div>
                                <label form="">Usuário</label>
                            </div>

                            <div className="text-center">
                                <input type="text" name="usuario" className="bg-zinc-200 px-3 py-1 rounded-md mb-4  w-80" placeholder="" required />
                            </div>
                        </div>

                        <div>
                            <div>
                                <label form="">Senha</label>
                            </div>

                            <div className="text-center">
                                <input type="password" name="password" className="bg-zinc-200 px-3 py-1 rounded-md mb-4  w-80" placeholder="" required />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded-md">Cadastrar</button>
                        </div>
                    
                    </form>
                </div>


        </div>
      

    );
  }