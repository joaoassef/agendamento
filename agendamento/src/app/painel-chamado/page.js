

import { RelogioDinamico } from "../../../components/relogioDinamico";

export default function PainelChamado() {
  return (

    <div className="w-screen h-screen flex flex-col border border-b-emerald-800 p-2 text-center bg-blue-950">

      {/* Top Bar */}
      <div className="flex justify-between items-center px-3 text-amber-100">
        <div className="text-xl font-bold text-blue-400">LOGO</div>
        <div className="text-lg text-blue-400"><RelogioDinamico /></div>
      </div>

      {/* Centralized Name */}
      <div className="flex-grow flex flex-col justify-center text-yellow-200 p-4 text-center">
        <h1 className="text-9xl"> Marcelo Abreu</h1>
        <h3 className="text-5xl mt-6 text-blue-400">SALA 4</h3>
      </div>

      {/* Bottom Cards */}
      <div className="text-left text-blue-400  border-b-blue-400 border-b-2 mb-3 pb-2">Pessoas que já foram chamadas</div>

      <div className="flex gap-4 w-full mt-auto">
  <div className="flex-1 bg-blue-900 text-amber-50 p-4 m-2 mt-3 mb-3 flex flex-col justify-center text-center">
    <h1 className="text-3xl">Marcelo Abreu de Jesu Silva Contigo Abreu</h1>
    <h3 className="text-1xl mt-1 text-blue-400">SALA 4</h3>
  </div>
  <div className="flex-1 bg-blue-900 text-amber-50 p-4 m-2 mt-3 mb-3 flex flex-col justify-center text-center">
    <h1 className="text-3xl">Marcelo Abreu</h1>
    <h3 className="text-1xl mt-1 text-blue-400">SALA 4</h3>
  </div>
  <div className="flex-1 bg-blue-900 text-amber-50 p-4 m-2 mt-3 mb-3 flex flex-col justify-center text-center">
    <h1 className="text-3xl">Marcelo Abreu</h1>
    <h3 className="text-1xl mt-1 text-blue-400">SALA 4</h3>
  </div>
  <div className="flex-1 bg-blue-900 text-amber-50 p-4 m-2 mt-3 mb-3 flex flex-col justify-center text-center">
    <h1 className="text-3xl">Marcelo Abreu</h1>
    <h3 className="text-1xl mt-1 text-blue-400">SALA 4</h3>
  </div>
</div>


  </div>

  );
}