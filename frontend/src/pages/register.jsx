import React, { useState } from "react";
import "./register.css";

export default function Register() {
  const [form, setForm] = useState({
    nome: "",
    sobrenome: "",
    celular: "",
    email: "",
    endereco: "",
    numero: "",
    bairro: ""
  });
  const [enviado, setEnviado] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setEnviado(true);
  }

  function handleBack() {
    window.history.back();
  }

  return (
    <div className="register-container">
      <button className="register-back-btn" onClick={handleBack} type="button">
        <span className="back-ellipse">
          <span className="back-arrow">←</span>
        </span>
        <span>Voltar</span>
      </button>
      <h2>Cadastro de Cliente</h2>
      {enviado ? (
        <div className="register-success">Cadastro realizado com sucesso!</div>
      ) : (
        <form onSubmit={handleSubmit} className="register-form">
          <input
            name="nome"
            placeholder="Nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
          <input
            name="sobrenome"
            placeholder="Sobrenome"
            value={form.sobrenome}
            onChange={handleChange}
            required
          />
          <input
            name="celular"
            placeholder="Celular"
            value={form.celular}
            onChange={handleChange}
            required
            type="tel"
          />
          <input
            name="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            required
            type="email"
          />
          <input
            name="endereco"
            placeholder="Endereço"
            value={form.endereco}
            onChange={handleChange}
            required
          />
          <input
            name="numero"
            placeholder="Número"
            value={form.numero}
            onChange={handleChange}
            required
          />
          <input
            name="bairro"
            placeholder="Bairro"
            value={form.bairro}
            onChange={handleChange}
            required
          />
          <button type="submit">
            Cadastrar
          </button>
        </form>
      )}
    </div>
  );
}
