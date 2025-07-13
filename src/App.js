import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import './App.css';

function App() {
  const [aluno, setAluno] = useState({ nome: '', idade: '', curso: '' });
  const [listaAlunos, setListaAlunos] = useState([]);

  const handleChange = (e) => {
    setAluno({ ...aluno, [e.target.name]: e.target.value });
  };

  const cadastrarAluno = (e) => {
    e.preventDefault();
    if (!aluno.nome || !aluno.idade || !aluno.curso) return;

    const idadeNum = parseInt(aluno.idade, 10);
    if (isNaN(idadeNum) || idadeNum < 18) return;

    setListaAlunos([...listaAlunos, aluno]);
    setAluno({ nome: '', idade: '', curso: '' });
  };

  const salvarPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Lista de Alunos', 12, 22);

    doc.setFontSize(12);
    let y = 30;

    listaAlunos.forEach((aluno, index) => {
      doc.text(
        `${index + 1}. ${aluno.nome} - ${aluno.idade} anos - ${aluno.curso}`,
        14,
        y
      );
      y += 10;
    });

    doc.save('lista_alunos.pdf');
  };

  return (
    <div className="container">
      <h1>Cadastro de Alunos</h1>

      <form onSubmit={cadastrarAluno}>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={aluno.nome}
          onChange={handleChange}
        />
        <input
          type="number"
          name="idade"
          placeholder="Idade"
          value={aluno.idade}
          onChange={handleChange}
        />
        <select
          name="curso"
          value={aluno.curso}
          onChange={handleChange}
        >
          <option value="">Selecione o curso</option>
          <option value="Ciência da Computação">Ciência da Computação</option>
          <option value="Análise e Desenvolvimento de Sistemas">Análise e Desenvolvimento de Sistemas</option>
          <option value="Sistema da Informação">Sistema da Informação</option>
          <option value="Desing Gráfico">Design Gráfico</option>
        </select>
        <button type="submit">Cadastrar</button>
      </form>

      <button id = "pdfbutton" onClick={salvarPDF} style={{ marginTop: '15px' }}>
        Salvar em PDF
      </button>

      <ul>
        {listaAlunos.map((a, index) => (
          <li key={index}>
            <strong>{a.nome}</strong> - {a.idade} anos - {a.curso}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
