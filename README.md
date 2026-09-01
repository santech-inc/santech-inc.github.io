# SanTech Inc Landing

Landing one-page bilingue (ES/EN) implementada con HTML, CSS y JavaScript estatico, usando una arquitectura modular sin framework.

## Estructura

- index.html: shell semantico, puntos de montaje y plantilla del build.
- css/: tokens, base, fondo, header y estilos por seccion.
- data/content.js: fuente unica de contenido ES/EN.
- js/components/: renderizadores modulares por seccion.
- js/utils/escape.js: escape de HTML para interpolar contenido de forma segura.
- js/main.js: orquestacion, i18n, hidratacion y metadata dinamica.
- scripts/build.mjs: pre-render estatico por idioma hacia dist/.
- .github/skills/: skills especializados para desarrollo y optimizacion.
- .github/agents/: agentes especializados para arquitectura UI, contenido bilingue y rendimiento.

## Personalizacion rapida

1. Editar textos y enlaces en data/content.js.
2. Actualizar colores de marca en css/variables.css.
3. Ajustar composicion de secciones en css/sections.css.
4. Reemplazar enlaces placeholders de descargas y WhatsApp.

## Secciones incluidas

- Hero + propuesta de valor
- Servicios
- Casos / Portafolio
- Proceso
- Tecnologias
- Testimonios
- Zona de descargas de apps
- CTA + Contacto
- Footer

## i18n

El idioma se controla con botones ES/EN en header y se persiste en localStorage bajo la clave santech-locale.

## Ejecucion local

- Desarrollo rapido: abre `index.html` directamente; el contenido se renderiza en cliente.
- Salida de produccion: `npm run build` genera `dist/` con el HTML pre-renderizado por
  idioma (`dist/index.html` en ES, `dist/en/index.html` en EN), metadata SEO/Open Graph,
  `canonical` y `hreflang`. `npm run dev` construye y sirve `dist/`.
- Despliega el contenido de `dist/`. Ajusta `SITE_URL` en `scripts/build.mjs` al dominio real.
- Tarjetas Open Graph: `npm run og` regenera `assets/og-es.png` / `assets/og-en.png`
  (1200x630) desde `scripts/og.mjs`; requiere ImageMagick. Commitea los PNG resultantes.
