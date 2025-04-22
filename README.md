# Sistema Web de Agendamento de Exames

## 📘 Projeto de Avaliação - Pós-Graduação IFSP Barretos

Este repositório contém o código-fonte de um sistema web desenvolvido como parte da Avaliação da disciplina **Desenvolvimento para Internet II** do curso de **Pós-Graduação lato sensu em Programação para Internet e Dispositivos Móveis**, ofertado pelo **Instituto Federal de São Paulo – campus Barretos**.

---

## 📌 Descrição Geral

O sistema foi desenvolvido com o objetivo de informatizar o processo de agendamento de exames médicos e laboratoriais de uma clínica, permitindo um fluxo organizado de atendimento e uma interface informativa para pacientes e funcionários.

---

## 🎯 Objetivos

- Criar uma solução gratuita, segura e fácil de usar;
- Fornecer feedback em tempo real aos pacientes sobre sua posição na fila;
- Otimizar o fluxo de atendimento com transparência e controle.

---

## 👥 Atores do Sistema

- **Administração**: gerencia usuários, tipos de exames e configurações gerais;
- **Secretaria**: realiza agendamentos, confirmações de comparecimento e gerencia o fluxo dos pacientes;
- **Paciente**: informa seus dados ao chegar à clínica e acompanha os avisos no painel.

---

## ✅ Funcionalidades Principais

[x] Primeira execução com cadastro de administrador e tempo padrão de atraso;
- Autenticação de usuários;
- Dashboard personalizado por perfil;
- Gerenciamento de tipos de exames;
- Cadastro e manutenção de usuários;
- Redefinição de senha com verificação por e-mail;
- Agendamento e cancelamento de exames;
- Confirmação de chegada do paciente via terminal;
- Painel digital com status de exames em tempo real;
- Chamadas para confirmação e realização de exames;
- Finalização e registro de desistências e ausências;
- Resumo de atividade diária com filtros.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- HTML5, CSS3, JavaScript
- Bootstrap / Tailwind CSS (dependendo da implementação escolhida)

### Backend
- PHP 8 / Laravel (ou framework MVC equivalente)
- MySQL / MariaDB

### Outras Tecnologias
- Servidor de e-mail (SMTP com PHP Mailer ou Laravel Mail)
- Git / GitHub para versionamento e entrega

---

## 📐 Arquitetura do Sistema

- Baseado no padrão **Model-View-Controller (MVC)**;
- Utiliza **API interna** para comunicação entre frontend e backend;
- Interface desacoplada e responsiva;
- Backend estruturado para manipulação dos dados e lógica de negócio;
- Frontend focado em usabilidade e acessibilidade.

---

## 📅 Entrega

- **Data limite:** 04 de junho de 2025 às 23h59
- **Forma de entrega:** Repositório público no GitHub/GitLab + submissão via Moodle IFSP Barretos

---

## 🔐 Requisitos de Segurança

- Senhas armazenadas com hash seguro;
- Verificação de e-mail para troca de senha e atualização de e-mail;
- Validação de entrada de dados e proteção contra injeções;
- Controle de acesso por perfil de usuário.

---

## 📺 Funcionalidades Públicas (sem login)

- Confirmação de chegada de paciente via CPF;
- Painel digital com lista de exames e status de atendimento.

---

## 👨‍💻 Desenvolvedores

> João Assef 
> Curso: Pós-Graduação em Programação para Internet e Dispositivos Móveis  
> Instituto Federal de São Paulo – campus Barretos

---

## 📄 Licença

Este projeto é distribuído sob a licença MIT. Sinta-se livre para usá-lo, modificá-lo e distribuí-lo conforme necessário.

