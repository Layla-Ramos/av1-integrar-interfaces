const Aluno = require("../models/aluno.js");

const criarAluno = async (req, res) => {
  try {
  const { nome, idade } = req.body;

  if (!nome || !idade) {
    return res.status(400).json({
      error: "Nome e idade são campos obrigatórios!"
    })
  }

  const novoAluno = new Aluno({
    nome,
    idade,
  });

  await novoAluno.save();

  res.status(201).json({
    message: "Aluno criado com sucesso!",
    aluno: novoAluno,
  });
}catch (error) {
    res.status(500).json({ error: "Não foi possível criar um novo aluno!" });
  }
};

const obterTodosAlunos = async (req, res) => {
  try {
  const alunos = await Aluno.find().populate('perfil');
  res.status(200).json(alunos);
}catch (error) {
  res.status(500).json({ error: "Não foi possível retornar os launos" });
}
};

const deletarAluno = async (req, res) => {
  try {
  const { id } = req.params;

  //verifica se existe esse aluno
    const aluno = await Aluno.findById(id);
    if (!aluno) {
      return res.status(404).json({ message: "Aluno não encontrado" });
    }

  await Aluno.deleteOne({ _id: id });
  res.status(200).json({ message: 'Aluno removido com sucesso!' });
  }catch (error) {
    res.status(500).json({ error: "Não foi possível deletar o aluno!" });
  }
};

const editarAluno = async (req, res) => {
  try {
  const { id } = req.params;
  const { nome, idade } = req.body;

  let aluno = await Aluno.findByIdAndUpdate(id, { nome, idade });

  if (!aluno) {
    return res.status(404).json({ message: "Aluno não encontrado" });
  }
  res.status(200).json({
    message: 'Aluno atualizado com sucesso!',
    aluno,
  });
}catch (error) {
  res.status(500).json({ error: "Não foi possível editar aluno."})
}
};

module.exports = {criarAluno, obterTodosAlunos, deletarAluno, editarAluno  };