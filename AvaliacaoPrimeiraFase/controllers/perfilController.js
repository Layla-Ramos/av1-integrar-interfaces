const Perfil = require("../models/perfil.js");

const criarPerfil = async (req, res) => {
  try {
  const { matricula, telefone, endereco, alunoId } = req.body;

  const novoPerfil = new Perfil({
    matricula,
    telefone,
    endereco,
    aluno: alunoId,
  });

  await novoPerfil.save();

  await Aluno.updateOne(
    { _id: alunoId },
    { $set: { perfil: novoPerfil._id } }
  );

  res.status(201).json({
    message: "Perfil criado com sucesso!",
    perfil: novoPerfil,
  });
}catch (error){
  res.status(500).json({error: "Não foi possível criar o perfil"});
}
};

const obterTodosPerfis = async (req, res) => {
  try {
  const perfis = await Perfil.find().populate('aluno');
  res.status(200).json(perfis);
}catch (error){
  res.status(500).json({error: "Não foi possível retornar os perfis"});
}
};

const deletarPerfil = async (req, res) => {
  try {
  const { id } = req.params;

  //procura se o perfil existe
  const perfil = await Perfil.findById(id);
  if (!perfil) {
  return res.status(404).json({ message: "Perfil não encontrado" });
  }

  await Perfil.deleteOne({ _id: id });
  res.status(200).json({ message: "Perfil removido com sucesso!" });
  }catch (error){
    res.status(500).json({error: "Não foi possível deletar o perfil"});
  }
};

const editarPerfil = async (req, res) => {
  try {
  const { id } = req.params;
  const { matricula, telefone, endereco, alunoId } = req.body;

  let perfil = await Perfil.findByIdAndUpdate(id, { matricula, telefone, endereco, aluno: alunoId });

  if (!perfil) {
    return res.status(404).json({ message: "Perfil não encontrada" });
  }

  res.status(200).json({
    message: "Perfil atualizado com sucesso!",
    perfil,
  });
}catch (error){
  res.status(500).json({error: "Não foi possível editar o perfil"});
};
};

module.exports = {criarPerfil, obterTodosPerfis, deletarPerfil, editarPerfil};