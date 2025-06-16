'use client';

import { useState } from 'react';

export default function PageCadastroAgendamento() {
  const [formData, setFormData] = useState({
    cpf: '',
    nome: '',
    email: '',
    dataNascimento: '',
    tipoExameId: '',
    tipoExame: {
      id: '',
      nome: '',
      descricao: '',
      duracaoPadrao: '',
      instrucoesPreparo: '',
      ativo: true,
    },
    dataHoraExame: '',
  });

  const [status, setStatus] = useState('');
  const [cpfInvalido, setCpfInvalido] = useState(false);

  const formatCPF = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const unmaskCPF = (value) => value.replace(/\D/g, '');

  const isValidCPF = (cpf) => {
    cpf = unmaskCPF(cpf);
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
    let firstCheck = (sum * 10) % 11;
    if (firstCheck === 10 || firstCheck === 11) firstCheck = 0;
    if (firstCheck !== parseInt(cpf.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
    let secondCheck = (sum * 10) % 11;
    if (secondCheck === 10 || secondCheck === 11) secondCheck = 0;

    return secondCheck === parseInt(cpf.charAt(10));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('tipoExame.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        tipoExame: { ...prev.tipoExame, [field]: value },
      }));
      return;
    }

    if (name === 'cpf') {
      const maskedCPF = formatCPF(value);
      setFormData((prev) => ({ ...prev, cpf: maskedCPF }));
      setCpfInvalido(false);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidCPF(formData.cpf)) {
      setCpfInvalido(true);
      setStatus('❌ CPF inválido.');
      return;
    }

    const payload = {
      id: 0,
      cpf: unmaskCPF(formData.cpf),
      nome: formData.nome.trim(),
      email: formData.email.trim(),
      dataNascimento: formData.dataNascimento,
      tipoExameId: Number(formData.tipoExameId),
      tipoExame: {
        id: Number(formData.tipoExame.id),
        nome: formData.tipoExame.nome.trim(),
        descricao: formData.tipoExame.descricao.trim(),
        duracaoPadrao: formData.tipoExame.duracaoPadrao, // já vem no formato HH:mm:ss
        instrucoesPreparo: formData.tipoExame.instrucoesPreparo.trim(),
        ativo: formData.tipoExame.ativo === 'true' || formData.tipoExame.ativo === true,
      },
      dataHoraExame: formData.dataHoraExame,
      cancelado: false,
      comparecimento: false,
    };

    try {
      const response = await fetch('/api/agendamento', {
        method: 'POST',
        headers: {
          'x-api-key': 'fwjfpjewfokwfwqww65fdqw4fwe4veew41f5e6fw65c1wec56e1ve56qf6ewfe1f',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dto: payload }), // ⚠️ envia como { dto: {...} }
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      setStatus('✅ Agendamento realizado com sucesso!');
      setCpfInvalido(false);
      setFormData({
        cpf: '',
        nome: '',
        email: '',
        dataNascimento: '',
        tipoExameId: '',
        tipoExame: {
          id: '',
          nome: '',
          descricao: '',
          duracaoPadrao: '',
          instrucoesPreparo: '',
          ativo: true,
        },
        dataHoraExame: '',
      });
    } catch (error) {
      console.error('Erro ao realizar o agendamento:', error.message);
      setStatus('❌ Erro ao realizar o agendamento.');
    }
  };

  return (
    <div className="p-8 bg-white rounded shadow-md max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-blue-900">Cadastro de Agendamento</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* CPF */}
        <div>
          <label className="block font-semibold mb-1">CPF</label>
          <input
            type="text"
            name="cpf"
            maxLength={14}
            value={formData.cpf}
            onChange={handleChange}
            placeholder="000.000.000-00"
            className={`border w-full p-2 rounded ${cpfInvalido ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          {cpfInvalido && <p className="text-red-600 text-sm mt-1">CPF inválido.</p>}
        </div>

        {/* Nome */}
        <div>
          <label className="block font-semibold mb-1">Nome</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Nome completo"
            className="border border-gray-300 w-full p-2 rounded"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@exemplo.com"
            className="border border-gray-300 w-full p-2 rounded"
            required
          />
        </div>

        {/* Data de Nascimento */}
        <div>
          <label className="block font-semibold mb-1">Data de Nascimento</label>
          <input
            type="date"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
            className="border border-gray-300 w-full p-2 rounded"
            required
          />
        </div>

        {/* Tipo de Exame */}
        <div className="grid grid-cols-2 gap-4 border p-4 rounded bg-gray-50">
          <h2 className="col-span-2 font-semibold">Dados do Tipo de Exame</h2>

          <div>
            <label className="block text-sm">ID Tipo Exame</label>
            <input
              type="number"
              name="tipoExameId"
              value={formData.tipoExameId}
              onChange={handleChange}
              className="border border-gray-300 w-full p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm">ID</label>
            <input
              type="number"
              name="tipoExame.id"
              value={formData.tipoExame.id}
              onChange={handleChange}
              className="border border-gray-300 w-full p-2 rounded"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm">Nome do Exame</label>
            <input
              type="text"
              name="tipoExame.nome"
              value={formData.tipoExame.nome}
              onChange={handleChange}
              className="border border-gray-300 w-full p-2 rounded"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm">Descrição</label>
            <input
              type="text"
              name="tipoExame.descricao"
              value={formData.tipoExame.descricao}
              onChange={handleChange}
              className="border border-gray-300 w-full p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm">Duração Padrão (HH:mm:ss)</label>
            <input
              type="time"
              step="1"
              name="tipoExame.duracaoPadrao"
              value={formData.tipoExame.duracaoPadrao}
              onChange={handleChange}
              className="border border-gray-300 w-full p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm">Instruções de Preparo</label>
            <input
              type="text"
              name="tipoExame.instrucoesPreparo"
              value={formData.tipoExame.instrucoesPreparo}
              onChange={handleChange}
              className="border border-gray-300 w-full p-2 rounded"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm">Ativo</label>
            <select
              name="tipoExame.ativo"
              value={formData.tipoExame.ativo}
              onChange={handleChange}
              className="border border-gray-300 w-full p-2 rounded"
              required
            >
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </select>
          </div>
        </div>

        {/* Data e Hora do Exame */}
        <div>
          <label className="block font-semibold mb-1">Data e Hora do Exame</label>
          <input
            type="datetime-local"
            name="dataHoraExame"
            value={formData.dataHoraExame}
            onChange={handleChange}
            className="border border-gray-300 w-full p-2 rounded"
            required
          />
        </div>

        {/* Botão */}
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
        >
          Cadastrar Agendamento
        </button>
      </form>

      {status && (
        <div
          className={`mt-4 font-medium ${
            status.includes('Erro') || status.includes('inválido')
              ? 'text-red-600'
              : 'text-green-600'
          }`}
        >
          {status}
        </div>
      )}
    </div>
  );
}
