let mongoose = require("mongoose");
let bcrypt = require("bcrypt");

//Não possui relacionamento

//criando o esquema de administrador
let admSchema = new mongoose.Schema({ 
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true }
});

//transformando a senha em hash
admSchema.pre('save', function (next)  {
    if (this.isNew || this.isModified('senha')) {
        bcrypt.hash(this.senha, 5, (err, hashedSenha) => {
            if (err) next (err);
            else {
                this.senha = hashedSenha;
                next();
            }
        });
    } else {
        next();
    }
});

//compara se a senha que o usuario forneceu é igual a que está no banco
admSchema.methods.isCorrectPassword = function (senha, callback) {
    bcrypt.compare(senha, this.senha, (err, same) => {
        if (err) callback(err);
        else callback(null, same);
    });
};

module.exports = mongoose.model("Adm", admSchema);