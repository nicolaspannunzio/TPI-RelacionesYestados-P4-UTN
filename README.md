# TP Integrador — Relaciones y Estado · Unidad 6

**Materia:** Programación IV — Tecnicatura Universitaria en Programación a Distancia (UTN)  

Aplicación **Full Stack** completa que implementa el **CRUD de Categorías** desde una interfaz de usuario interactiva en React consumiendo una API en FastAPI mediante `fetch` nativo, junto con el **CRUD de Productos** y la relación muchos-a-muchos ($N:M$ entre `Producto` y `Categoria`) documentada y validada mediante peticiones REST Client.

---

## 🏗️ Estructura del Repositorio

```text
TP_Unidad6_FullStack/
├── fastapi-productos/            # Backend (FastAPI + SQLModel + PostgreSQL)
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py               # Instancia de FastAPI, routers y CORS
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   └── database.py       # Conexión Engine, session y creación de tablas
│   │   ├── categoria/
│   │   │   ├── __init__.py
│   │   │   ├── model.py          # Modelo SQLModel Categoria
│   │   │   ├── schema.py         # Schemas de validación Pydantic
│   │   │   ├── service.py        # Lógica de negocio y persistencia
│   │   │   └── router.py         # Endpoints CRUD /categorias
│   │   └── producto/
│   │       ├── __init__.py
│   │       ├── model.py          # Modelos Producto y tabla intermedia ProductoCategoria
│   │       ├── schema.py         # Schemas ProductoCreate, Update y Response
│   │       ├── service.py        # Lógica CRUD y vinculación N:M
│   │       └── router.py         # Endpoints CRUD /productos
│   ├── .env                      # Configuración de DATABASE_URL
│   ├── requirements.txt          # Dependencias de Python
│   └── test_endpoints.http       # Suite de pruebas con extensión REST Client
│
├── tp-categorias/                # Frontend (React 18/19 + TypeScript + Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx        # Encabezado de la aplicación
│   │   │   ├── CategoriaCard.tsx # Renderizado individual con acciones Editar/Eliminar
│   │   │   ├── CategoriaList.tsx # Listado y renderizado condicional
│   │   │   └── CategoriaModal.tsx# Formulario controlado de alta y edición
│   │   ├── types/
│   │   │   └── categoria.ts      # Tipado TypeScript estricto de la entidad
│   │   ├── App.tsx               # Estado global, ciclo de vida (useEffect) y fetch nativo
│   │   └── main.tsx
│   ├── package.json
│   └── tailwind.config.js
│
├── .gitignore                    # Reglas de exclusión para Python, Node y entorno
└── README.md
```

---

## 🛠️ Tecnologías Aplicadas

- **Backend:** Python 3.13, FastAPI (Standard), SQLModel / SQLAlchemy, PostgreSQL (`psycopg`), Pydantic v2.
- **Frontend:** React, TypeScript, Vite, Tailwind CSS v3.
- **Integración & Pruebas:** Consumo nativo mediante `fetch` (asíncrono con `async/await`), políticas de CORS configuradas, REST Client (`test_endpoints.http`).

---

## 🚀 Puesta en Marcha

### 1. Backend (`fastapi-productos`)

1. Navegar al directorio del backend:
   ```bash
   cd fastapi-productos
   ```

2. Crear y activar el entorno virtual:
   - **En Windows (PowerShell):**
     ```powershell
     python -m venv .venv
     .\.venv\Scripts\Activate.ps1
     ```
   - **En Linux / macOS:**
     ```bash
     python -m venv .venv
     source .venv/bin/activate
     ```

3. Instalar dependencias:
   ```bash
   pip install -r requirements.txt
   ```

4. Configurar la variable de entorno en el archivo `.env`:
   ```env
   DATABASE_URL=postgresql://usuario:password@localhost:5432/productos_db
   ```
   *(Asegurarse de tener la base de datos `productos_db` creada en PostgreSQL).*

5. Iniciar el servidor en modo desarrollo:
   ```bash
   python -m fastapi dev app/main.py
   ```

- **Servidor local:** `http://127.0.0.1:8000`
- **Documentación Swagger UI interactiva:** `http://127.0.0.1:8000/docs`

---

### 2. Frontend (`tp-categorias`)

1. En una nueva terminal, ubicarse en la carpeta del frontend:
   ```bash
   cd tp-categorias
   ```

2. Instalar los paquetes mediante `pnpm`:
   ```bash
   pnpm install
   ```

3. Ejecutar el servidor de desarrollo:
   ```bash
   pnpm dev
   ```

- **Aplicación web:** `http://localhost:5173`

---

## 🧪 Pruebas de Endpoints y Relación N:M

Los endpoints del modelo `Producto` y su asociación relacional con `Categoria` se prueban mediante el archivo `test_endpoints.http` ubicado en la raíz del backend:

1. Instalar la extensión **REST Client** de VS Code (`humao.rest-client`).
2. Abrir `fastapi-productos/test_endpoints.http`.
3. Presionar sobre cada enlace **`Send Request`** para validar la creación de categorías, asociación múltiple de categorías a un producto y listado con relaciones resueltas.

---

## ✅ Verificación de Compilación y Tipado

Para comprobar que el proyecto compila estrictamente bajo las reglas de TypeScript sin errores en tiempo de empaquetado:

```bash
cd tp-categorias
pnpm build
```

---

## 👤 Autor

**Nicolás A. Pannunzio**  
- 💼 [Perfil en LinkedIn](https://www.linkedin.com)  
- 📂 Repositorio: [TPI-RelacionesYestados-P4-UTN](https://github.com/nicolaspannunzio/TPI-RelacionesYestados-P4-UTN)