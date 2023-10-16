const Usuario = require("../models/usuario");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config()

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
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY,{
      expiresIn: 60 * 60 * 24
    })
    console.log(token)
    return res.json({auth: true, token: token, rol: user.rol});  
    //return res.json(clean);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
