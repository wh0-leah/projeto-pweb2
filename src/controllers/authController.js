const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Usuario = require("../entidades/Usuario");

const { usuarios } = require("../data");

const register = async (req, res) => {
  const { email, password, name } = req.body;

  // validação
  if (!email || !password || !name) {
    return res.status(400).json({
      error: "Nome, email e senha são obrigatórios."
    });
  }

  // verifica se usuário já existe
  const usuarioExists = usuarios.find(
    (usuario) => usuario.email === email
  );

  if (usuarioExists) {
    return res.status(409).json({
      error: "Usuário já cadastrado."
    });
  }

  // criptografa senha
  const passwordHash = await bcrypt.hash(password, 10);

  // cria usuário usando a entidade
  const newUsuario = new Usuario(
    usuarios.length + 1,
    name,
    email,
    passwordHash
  );

  // salva no array
  usuarios.push(newUsuario);

  // gera token JWT
  const token = jwt.sign(
    {
      id: newUsuario.id,
      email: newUsuario.email,
      name: newUsuario.name
    },
    process.env.JWT_SECRET || "segredo_super_forte",
    {
      expiresIn: "1h",
    }
  );

  return res.status(201).json({
    token
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // validação
  if (!email || !password) {
    return res.status(400).json({
      error: "Email e senha são obrigatórios."
    });
  }

  // procura usuário
  const usuario = usuarios.find(
    (item) => item.email === email
  );

  if (!usuario) {
    return res.status(401).json({
      error: "Credenciais inválidas."
    });
  }

  // compara senha
  const match = await bcrypt.compare(
    password,
    usuario.password
  );

  if (!match) {
    return res.status(401).json({
      error: "Credenciais inválidas."
    });
  }

  // gera token
  const token = jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
      name: usuario.name
    },
    process.env.JWT_SECRET || "segredo_super_forte",
    {
      expiresIn: "1h",
    }
  );

  return res.json({
    token
  });
};

module.exports = {
  register,
  login,
};