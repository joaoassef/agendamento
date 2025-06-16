"use client";

import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSolarPanel,
  faCalculator,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";

export default function PaginaInicial() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-950">
      <div className="grid grid-cols-3 gap-10 text-3xl">
        <Link href="/painel-chamado">
          <div className="bg-blue-900 text-amber-50 p-4 h-50 flex flex-col items-center justify-center rounded-2xl shadow-black">
            {/* Correção aqui: de text-9x1 para text-9xl */}
            <FontAwesomeIcon
              icon={faSolarPanel}
              className="text-8xl mb-2 p-4"
            />
            <div className="text-xl">Painel de Chamados</div>
          </div>
        </Link>

        <Link href="/painel-totem">
          <div className="bg-blue-900 text-amber-50 p-4 h-50 flex flex-col items-center justify-center rounded-2xl shadow-black">
            <FontAwesomeIcon
              icon={faCalculator}
              // Correção aqui: de "ttext-8xl" para "text-8xl"
              className="text-8xl mb-2 p-4"
            />
            {/* Adicione o tamanho do texto para manter a proporção com outros cards, se ainda não o fez */}
            <div className="text-xl">Totem</div>
          </div>
        </Link>

        <Link href="/painel-adm">
          <div className="bg-blue-900 text-amber-50 p-4 h-50 flex flex-col items-center justify-center rounded-2xl shadow-black">
            <FontAwesomeIcon
              icon={faSliders}
              // Correção aqui: de "ttext-8xl" para "text-8xl"
              className="text-8xl mb-2 p-4"
            />
            {/* Adicione o tamanho do texto para manter a proporção com outros cards, se ainda não o fez */}
            <div className="text-xl">Administração</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
