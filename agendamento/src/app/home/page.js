import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSolarPanel, faCalculator, faSliders} from '@fortawesome/free-solid-svg-icons';

export default function PaginaInicial() {
    return (

        <div className="min-h-screen flex items-center justify-center bg-blue-950">
            
            <div className="grid grid-cols-3 gap-10 text-3xl">
                
                <Link href="/painel-chamado">
                    <div className="bg-blue-900 text-amber-50 p-4 h-50 flex flex-col items-center justify-center rounded-2xl shadow-black">
                        <FontAwesomeIcon icon={faSolarPanel} className="text-2xl mb-2 p-4" />
                        <div>Painel de Chamados</div>
                    </div>
                </Link>

                <Link href="/painel-totem">
                    <div className="bg-blue-900 text-amber-50 p-4 h-50 flex flex-col items-center justify-center rounded-2xl shadow-black">
                        <FontAwesomeIcon icon={faCalculator} className="text-2xl mb-2 p-4" />
                        <div>Totem</div>
                    </div>
                </Link>

                <Link href="/painel-adm">
                    <div className="bg-blue-900 text-amber-50 p-4 h-50 flex flex-col items-center justify-center rounded-2xl shadow-black">
                    <FontAwesomeIcon icon={faSliders} className="text-2xl mb-2 p-4" />
                    <div>Administrativo</div>
                    </div>
                </Link>

            </div>
        </div>

    )}