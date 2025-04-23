import Link from 'next/link';

export default function PaginaInicial() {
    return (

        <div className="min-h-screen flex items-center justify-center bg-blue-950">
            <div className="grid grid-cols-3 gap-10 text-3xl">
                <div className="bg-blue-900 text-amber-50 p-4 h-50 flex items-center justify-center rounded-2xl shadow-black">
                    <Link href="/painel-chamado">Painel de Chamados</Link>
                </div>
                <div className="bg-blue-900 text-amber-50 p-4 h-50 flex items-center justify-center rounded-2xl shadow-black">
                    <Link href="/painel-totem">Totem</Link>
                </div>
                <div className="bg-blue-900 text-amber-50 p-4 h-50 flex items-center justify-center rounded-2xl shadow-black">
                    <Link href="/painel-adm">Acesso ao Sistema</Link>
                </div>
            </div>
        </div>


    )}