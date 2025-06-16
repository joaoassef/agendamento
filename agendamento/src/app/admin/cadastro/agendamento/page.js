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

    const duracaoFormatada =
      formData.tipoExame.duracaoPadrao.length === 5
        ? formData.tipoExame.duracaoPadrao + ':00'
        : formData.tipoExame.duracaoPadrao;

    const dataHoraFormatada =
      formData.dataHoraExame.length === 16
        ? formData.dataHoraExame + ':00'
        : formData.dataHoraExame;

    const payload = {
      Id: 0,
      CPF: unmaskCPF(formData.cpf),
      Nome: formData.nome.trim(),
      Email: formData.email.trim(),
      DataNascimento: formData.dataNascimento,
      TipoExameId: Number(formData.tipoExameId),
      TipoExame: {
        Id: Number(formData.tipoExame.id),
        Nome: formData.tipoExame.nome.trim(),
        Descricao: formData.tipoExame.descricao.trim(),
        DuracaoPadrao: duracaoFormatada,
        InstrucoesPreparo: formData.tipoExame.instrucoesPreparo.trim(),
        Ativo:
          formData.tipoExame.ativo === 'true' || formData.tipoExame.ativo === true,
      },
      DataHoraExame: dataHoraFormatada,
      Cancelado: false,
      Comparecimento: false,
    };

    try {
const response = await fetch('/api/proxy/agendamento', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
});


      if (!response.ok) {
        const errorText = await response.text();
        console.error('Resposta do backend:', errorText);
        throw new Error('Erro ao salvar o agendamento');
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
        <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} placeholder="CPF" required className="border w-full p-2 rounded" />
        <input type="text" name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome completo" required className="border w-full p-2 rounded" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="border w-full p-2 rounded" />
        <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} required className="border w-full p-2 rounded" />
        <input type="number" name="tipoExameId" value={formData.tipoExameId} onChange={handleChange} placeholder="ID do Tipo de Exame" required className="border w-full p-2 rounded" />
        <input type="number" name="tipoExame.id" value={formData.tipoExame.id} onChange={handleChange} placeholder="ID do Exame" required className="border w-full p-2 rounded" />
        <input type="text" name="tipoExame.nome" value={formData.tipoExame.nome} onChange={handleChange} placeholder="Nome do Exame" required className="border w-full p-2 rounded" />
        <input type="text" name="tipoExame.descricao" value={formData.tipoExame.descricao} onChange={handleChange} placeholder="Descrição" required className="border w-full p-2 rounded" />
        <input type="time" step="1" name="tipoExame.duracaoPadrao" value={formData.tipoExame.duracaoPadrao} onChange={handleChange} placeholder="Duração Padrão" required className="border w-full p-2 rounded" />
        <input type="text" name="tipoExame.instrucoesPreparo" value={formData.tipoExame.instrucoesPreparo} onChange={handleChange} placeholder="Instruções de Preparo" required className="border w-full p-2 rounded" />
        <select name="tipoExame.ativo" value={formData.tipoExame.ativo} onChange={handleChange} className="border w-full p-2 rounded">
          <option value="true">Ativo</option>
          <option value="false">Inativo</option>
        </select>
        <input type="datetime-local" name="dataHoraExame" value={formData.dataHoraExame} onChange={handleChange} required className="border w-full p-2 rounded" />
        <button type="submit" className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded w-full">Cadastrar Agendamento</button>
      </form>
      {status && (
        <div className={`mt-4 font-medium ${status.includes('Erro') || status.includes('inválido') ? 'text-red-600' : 'text-green-600'}`}>{status}</div>
      )}
    </div>
  );
}