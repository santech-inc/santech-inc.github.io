# SanTech Inc Landing

Landing one-page bilingue (ES/EN) implementada con HTML, CSS y JavaScript estatico, usando una arquitectura modular sin framework.

## Estructura

- index.html: shell semantico y puntos de montaje.
- css/: tokens, base, fondo y estilos por seccion.
- data/content.js: fuente unica de contenido ES/EN.
- js/components/: renderizadores modulares por seccion.
- js/main.js: orquestacion, i18n y metadata dinamica.
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

Al ser estatico, puedes abrir index.html directamente o servir el directorio con un servidor estatico.
