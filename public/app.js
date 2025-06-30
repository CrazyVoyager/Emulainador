const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Conexión a MongoDB (ajusta el nombre si tu base de datos no es "emulainador")
mongoose.connect('mongodb://localhost:27017/emulainador', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// Middleware
app.use(cors()); // permite conexiones desde otros orígenes (como tu index.html local)
app.use(express.json());


// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
