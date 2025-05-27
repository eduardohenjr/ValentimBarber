import React, { useState } from 'react';

const ClienteForm = ({ onSubmit, initialValues }) => {
  const [nome, setNome] = useState(initialValues?.nome || "");
  const [email, setEmail] = useState(initialValues?.email || "");
  const [telefone, setTelefone] = useState(initialValues?.telefone || "");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ nome, email, telefone });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="telefone">Telefone:</label>
        <input
          type="tel"
          id="telefone"
          value={telefone}
          onChange={e => setTelefone(e.target.value)}
          required
        />
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
};

export default ClienteForm;
