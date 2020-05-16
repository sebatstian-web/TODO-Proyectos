const Sequelize = require('sequelize');
const bcrypt = require('bcrypt-node');
const db = require('../config/db');
const Proyectos = require('../models/Proyectos');

const Usuarios = db.define(
  'usuarios',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING(60),
      allowNull: false, // El campo no puede estar vacío
      validate: {
        isEmail: {
          msg: 'Debe ingresar un email válido',
        },
        notEmpty: {
          msg: 'El email es necesario',
        },
      },
      unique: {
        args: true,
        msg: 'El email ya existe',
      },
    },
    password: {
      type: Sequelize.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'La contraseña es necesaria',
        },
      },
    },
  },
  {
    hooks: {
      beforeCreate(usuario) {
        usuario.password = bcrypt.hashSync(
          usuario.password,
          bcrypt.genSaltSync(10)
        );
      },
    },
  }
);

// Los usuarios puede crear multiples proyectos
// Usuarios.hasMany(Proyectos);

module.exports = Usuarios;