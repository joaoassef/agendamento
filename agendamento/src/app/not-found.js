export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="text-center max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <div className="mb-6">
          <svg
            className="mx-auto w-20 h-20 text-blue-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-.01-14a9 9 0 110 18 9 9 0 010-18z"
            />
          </svg>
        </div>
        <h1 className="text-6xl font-extrabold text-blue-700 mb-2">404</h1>
        <p className="text-xl font-medium text-gray-700 mb-2">
          Página não encontrada
        </p>
        <div className="text-sm text-blue-600 italic mb-6">
          Esta página foi diagnosticada com... ausência total de conteúdo!
          <br />
          Mas calma, a equipe do <strong>MedifyNow</strong> já está cuidando disso.
        </div>
        <a
          href="/"
          className="inline-block w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition"
        >
          Voltar para o início do MedifyNow
        </a>
      </div>
    </div>
  );
}
