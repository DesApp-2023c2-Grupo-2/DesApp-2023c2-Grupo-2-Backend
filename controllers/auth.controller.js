const Usuario = require("../models/usuario");

module.exports.register = async (req, res) => {
  const data = new Usuario({
    usuario: req.body.usuario,
    contrasenia: req.body.contrasenia,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    dni: req.body.dni,
    matricula: req.body.matricula,
    rol: req.body.rol,
    email: req.body.email,
    editor: req.body.editor,
  });
  try {
    const dataToSave = await data.save();
    return res.status(200).json(dataToSave);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Get por usuario y contrasenia
module.exports.login = async (req, res) => {
  try {
    const { usuario, password } = req.body;
    const pass = Buffer.from(password, "base64").toString();
    const user = await Usuario.findOne({
      usuario,
    });
    const passValidated = await user.comparePassword(pass);
    if (!passValidated) {
      return res.status(401).json({ auth: "Fallo", token: null });
    }
    let {contrasenia, admin, ...clean} = user._doc    
    return res.json(clean);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
