const Tarefa = require("../models/tarefa.js");

const criarTarefa = async (req, res) => {
  try {
    const { titulo, alunoId, disciplinasIds } = req.body;
    const concluida = false;

    const novaTarefa = new Tarefa({
      titulo,
      aluno: alunoId,
      concluida,
      disciplinas: disciplinasIds,
    });

    await novaTarefa.save();

    res.status(201).json({
      message: "Tarefa criada com sucesso!",
      tarefa: novaTarefa,
    });
  } catch (error) {
    res.status(500).json({ error: "Não foi possível criar tarefa" });
  }
};

const obterTodasTarefas = async (req, res) => {
  try {
    const tarefas = await Tarefa.find().populate("aluno").populate("disciplinas");
    res.status(200).json(tarefas);

  } catch (error) {
    res.status(500).json({ error: "Não foi possível retornar tarefas" });
  }
};

const deletarTarefa = async (req, res) => {
  try {
  const { id } = req.params;

  //verifica se a tarefa existe na base
    const tarefa = await Tarefa.findById(id);
      if (!tarefa) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
      }
  
  await Tarefa.deleteOne({ _id: id });

  res.status(200).json({ message: "Tarefa removida com sucesso!" });

}catch (error) {
  res.status(500).json({ error: "Não foi possível deletar a tarefa" });
}
};

const editarTarefa = async (req, res) => {
  try {
  const { id } = req.params;
  const { titulo, concluida } = req.body;

  let tarefa = await Tarefa.findByIdAndUpdate(id, { titulo, concluida });

  if (!tarefa) {
    return res.status(404).json({ message: "Tarefa não encontrada" });
  }

  res.status(200).json({
    message: "Tarefa atualizada com sucesso!",
    tarefa,
  });
}catch (error) {
  res.status(500).json({ error: "Não foi possível editar a tarefa" });
}
};

module.exports = { criarTarefa, obterTodasTarefas, deletarTarefa, editarTarefa }