# Emulainador – Proyecto con Node.js + Express + MongoDB

Este proyecto permite gestionar usuarios y lanzar juegos desde html con Emulatorjs, con carga automática de datos para los usuarios desde un archivo JSON. Ideal para uso local o en Docker.

---

## 📂 Estructura de carpetas

```
EMULAINADOR/                                             # Carpeta raíz del proyecto
├─ models/                                               # Definición de esquemas Mongoose
│ └─ Usuario.js
├─ node_modules/                                         # Módulos instalados por npm
├─ public/ # Archivos públicos (frontend)
│ ├─ css/ # Estilos del login y la interfaz
│ │ ├─ loginstyles.css
│ │ └─ styles.css
│ ├─ img_juegos/                                         # Imágenes de juegos organizadas por consola
│ │ ├─ GBA/
│ │ ├─ N64/
│ │ ├─ NES/
│ │ ├─ PS1/
│ │ └─ SNES/
│ ├─ juegos/                                             # Html organizadas por consola
│ │ ├─ GBA/
│ │ ├─ N64/
│ │ ├─ NES/
│ │ ├─ PS1/
│ │ └─ SNES/
│ ├─ app.js # Lógica del frontend
│ ├─ index.html                                          # Pantalla principal y seleccion de juego
│ └─ login.html                                          # Pantalla de inicio de sesión
├─ seed/                                                 # Datos iniciales para poblar MongoDB
│ └─ usuarios.json                                       # JSON De usuarios 
├─ .gitignore 
├─ docker-compose.yml                                    # Levanta MongoDB en Docker sin autenticación
├─ package.json                                          #Dependencias y scripts npm
├─ package-lock.json
├─ server.js                                             # Punto de entrada del servidor Express
└─ README.md                                             # Documentación (este archivo)
```

---

## ⚙️ Prerrequisitos

* **Node.js** (v14 o superior) y **npm**
* **Docker** y **Docker Compose** (opcional, para MongoDB)

---

## 🚀 Arranque rápido

1. **Clona o descomprime** el proyecto:

   ```bash
   git clone <tu-repo-url>
   cd Emulainador
   ```

2. **Arranca MongoDB**

   * **Con Docker Compose** (recomendado):

     ```bash
     docker-compose up -d
     ```

     Esto levantará un contenedor `mongo` en el puerto **27017**.

   * **Sin Docker**: instala MongoDB en tu sistema y asegúrate de que el servicio esté corriendo.

3. **Instala dependencias**

   ```bash
   npm install
   ```

4. **Carga usuarios desde JSON**
   Al arrancar el servidor, se importan automáticamente los usuarios definidos en `models/usuarios.json` si la colección está vacía.

5. **Inicia el servidor**

   * En modo desarrollo (con recarga automática):

     ```bash
     npm run dev
     ```
   * En modo producción:

     ```bash
     npm start
     ```

6. **Abre la aplicación** en tu navegador:

   * Frontend: `http://localhost:3000/login.html`
   * API REST: `http://localhost:3000/api` (usa Postman, cURL o scripts en `curl/`)

---

## 🔐 Credenciales de prueba

* **admin** / **admin123**
* **usuario** / **1234**

---

## 📦 Scripts útiles

En el apartado `scripts` de tu `package.json` encontrarás:

```jsonc
"scripts": {
  "dev": "nodemon server.js",           // arranque en dev
  "start": "node server.js"            // arranque en prod
}
```

* También puedes ejecutar tus tests de API con los scripts de `curl/`:

  ```bash
  cd curl
  ./get-items.sh
  ./post-item.sh
  ```

---

## 🛠️ Detalles de implementación

* **Express** para rutas REST y servir archivos estáticos.
* **Mongoose** para modelar `Usuario` y `Juego`.
* **Carga inicial de datos**: los usuarios se importan desde `models/usuarios.json`.
* **Docker Compose** levanta MongoDB sin autenticación, exponiendo puerto 27017.

---
