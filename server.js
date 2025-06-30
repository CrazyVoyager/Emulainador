const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Importar modelo
const Usuario = require('./models/Usuario');

// Función para cargar usuarios desde JSON si la colección está vacía
async function seedUsuariosDesdeArchivo() {
  const yaHayUsuarios = await Usuario.findOne({});
  if (yaHayUsuarios) {
    console.log('✅ Usuarios ya existen, no se cargan nuevamente');
    return;
  }

  const ruta = path.join(__dirname, 'seed', 'usuarios.json');
  const datos = fs.readFileSync(ruta, 'utf-8');
  const usuarios = JSON.parse(datos);

  await Usuario.insertMany(usuarios);
  console.log('✅ Usuarios iniciales cargados desde JSON');
}

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/Emulainador', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(async () => {
    console.log('✅ MongoDB conectadox');
    await seedUsuariosDesdeArchivo(); // cargar usuarios
  })
  .catch(err => console.error('❌ Error al conectar MongoDB:', err));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

app.post('/api/login', async (req, res) => {
  const { usuario, contrasena } = req.body;
  console.log(usuario);
  console.log(contrasena);

  try {
    const usuarioEncontrado = await Usuario.findOne({ usuario });

    if (!usuarioEncontrado) {
      return res.status(401).json({
        exito: false,
        mensaje: 'Usuario no encontrado'
      });
    }

    // Comparación directa (sin bcrypt)
    if (usuarioEncontrado.contrasena !== contrasena) {
      return res.status(401).json({
        exito: false,
        mensaje: 'Contraseña incorrecta'
      });
    }

    // Login exitoso
    res.json({
      exito: true,
      usuario: usuarioEncontrado.usuario
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      error: "Error en el servidor",
      detalle: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
