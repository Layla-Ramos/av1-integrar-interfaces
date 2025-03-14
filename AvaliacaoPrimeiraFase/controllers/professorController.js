const Professor = require("../models/professor.js");

const criarProfessor = async (req, res) => {
  try {
    const { nome, idade, disciplinasIds } = req.body;

    const novoProfessor = new Professor({
      nome,
      idade,
      disciplinas: disciplinasIds
    });

    await novoProfessor.save();

    res.status(201).json({
      message: "Professor criado com sucesso!",
      professor: novoProfessor,
    });
  } catch (error) {
    res.status(500).json({ error: "Não foi possível criar professor" });
  }
};

const obterTodosProfessores = async (req, res) => {
  try {
    const professores = await Professor.find().populate('disciplinas');
    res.status(200).json(professores);

  } catch (error) {
    res.status(500).json({ error: "Não foi possível retornar os professores" });
  }
};

const deletarProfessor = async (req, res) => {
  try{
  const { id } = req.params;

//verifica se o professor existe na base
  const professor = await Professor.findById(id);
    if (!professor) {
    return res.status(404).json({ message: "Professor não encontrado" });
    }

  await Professor.deleteOne({ _id: id });

  res.status(200).json({ message: "Professor removido com sucesso!" });
}catch (error) {
  res.status(500).json({ error: "Não foi possível deletar o professor" });
}
};

const editarProfessor = async (req, res) => {
  try {
  const { id } = req.params;
  const { nome, idade, disciplinasIds } = req.body;

  let professor = await Professor.findByIdAndUpdate(id, { nome, idade, 
  disciplinas: disciplinasIds });

  if (!professor) {
    return res.status(404).json({ message: "Professor não encontrado" });
  }

  res.status(200).json({
    message: "Professor atualizado com sucesso!",
    professor,
  });
}catch (error) {
  res.status(500).json({ error: "Não foi possível editar o professor" });
}
};

module.exports = { criarProfessor, obterTodosProfessores, deletarProfessor, editarProfessor };