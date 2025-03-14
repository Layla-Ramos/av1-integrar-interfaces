const Disciplina = require("../models/disciplina.js");

const criarDisciplina = async (req, res) => {
  try {
  const { nome, descricao, dataInicio, dataFim, tarefasIds } = req.body;

  const novaDisciplina = new Disciplina({
    nome,
    descricao,
    dataInicio,
    dataFim,
    tarefas: tarefasIds,
  });

  await novaDisciplina.save();

  // Atualiza as tarefas associadas à disciplina
  await Tarefa.updateMany(
    { _id: { $in: tarefasIds } },
    { $push: { disciplinas: novaDisciplina._id } }
  );

  res.status(201).json({
    message: "Disciplina criada com sucesso!",
    disciplina: novaDisciplina,
  });
}catch(error) {
  res.status(500).json({ error: "Não foi possível criar uma nova disciplina!" });
};
};

const obterTodasDisciplinas = async (req, res) => {
  try {
  const disciplinas = await Disciplina.find().populate('tarefas');
  res.status(200).json(disciplinas);
  }catch (error) {
    res.status(500).json({ error: "Não foi possível retornar as disciplinas!" });
  }
};

const deletarDisciplina = async (req, res) => {
  try {
  const { id } = req.params;

  const disciplina = await Disciplina.findById(id);
    if (!disciplina) {
      return res.status(404).json({ message: "Disciplina não encontrada" });
    }

  await Disciplina.deleteOne({ _id: id });

  res.status(200).json({ message: "Disciplina removida com sucesso!" });
  }catch (error) {
    res.status(500).json({ error: "Não foi possível deletar a disciplina!" });
  }
};

const editarDisciplina = async (req, res) => {
  try{
  const { id } = req.params;
  const { nome, descricao, dataInicio, dataFim, tarefasIds } = req.body;

  let disciplina = await Disciplina.findByIdAndUpdate(id, { nome, descricao, dataInicio, dataFim, tarefas: tarefasIds });

  if (!disciplina) {
    return res.status(404).json({ message: "Disciplina não encontrada" });
  }

  res.status(200).json({
    message: "Disciplina atualizada com sucesso!",
    disciplina,
  });
}catch (error) {
  res.status(500).json({ error: "Não foi possível editar a disciplina!" });
};
};

module.exports = { criarDisciplina, obterTodasDisciplinas, deletarDisciplina, editarDisciplina };