# HealthyRat · Frontend

Interfaz web de HealthyRat: permite buscar productos alimenticios, filtrarlos por categoría y comparar su información nutricional lado a lado. Construida con **React 18 + Vite**, **Tailwind CSS** y **MUI**.

Consume la API del repositorio `backend/`.

## Puesta en marcha

```bash
cp .env.example .env   # ajusta VITE_BACKEND_API
npm install
npm run dev            # http://localhost:5173
```

| Variable | Descripción |
|---|---|
| `VITE_BACKEND_API` | URL base del backend (por defecto `http://localhost:3000`) |

## Páginas

- **`/`** — Catálogo: buscador por nombre y filtros por categoría.
- **`/product?id=<id>`** — Comparador: tabla de nutrientes (energía, proteínas, grasas, colesterol, hidratos, azúcares, sodio) con valores por 100 g y por porción, resaltando el más alto y el más bajo. Se pueden añadir más productos a la comparación desde un modal.

## Estructura

```
src/
├── api/          cliente axios
├── pages/        Listing (catálogo) y Products (comparador)
├── components/   layout, listado, filtros y tabla comparativa
└── router/       rutas de la app
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
```
