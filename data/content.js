export const content = {
  es: {
    meta: {
      title: "Desarrollo de Apps Móviles y Software a Medida | SanTech Inc",
      description:
        "Más de 50 clientes confían en nosotros: apps iOS y Android con Flutter, Swift y Kotlin, y software de escritorio. Propuesta técnica en menos de 48 horas.",
      ogLocale: "es_ES",
      siteName: "SanTech Inc",
    },
    a11y: {
      navLabel: "Navegación principal",
      langSwitchLabel: "Cambio de idioma",
      navToggleOpen: "Abrir menú",
      navToggleClose: "Cerrar menú",
      homeLabel: "SanTech Inc, inicio",
    },
    nav: [
      { label: "Servicios", href: "#services" },
      { label: "Casos", href: "#portfolio" },
      { label: "Proceso", href: "#process" },
      { label: "FAQ", href: "#faq" },
      { label: "Repo", href: "/repo/" },
      { label: "Contacto", href: "#contact" },
    ],
    hero: {
      badge: "Apps iOS, Android y escritorio",
      title: "Apps móviles y software a medida, listos para crecer.",
      description:
        "Diseñamos y desarrollamos apps iOS y Android, software de escritorio y productos digitales con mentalidad de producto: del diagnóstico al lanzamiento en las tiendas.",
      primaryCta: "Solicitar propuesta",
      secondaryCta: "Ver apps publicadas",
      metrics: [
        { value: "50+", label: "Clientes con apps desarrolladas por SanTech" },
        { value: "5+", label: "Apps propias gratuitas y de acceso público" },
        { value: "5", label: "Plataformas (iOS, Android, Windows, macOS, Linux)" },
      ],
    },
    services: {
      title: "Servicios",
      description: "Desarrollo de apps y software multiplataforma, de la idea al lanzamiento.",
      items: [
        {
          title: "Apps móviles iOS y Android",
          text: "Apps con Flutter desde una sola base de código, o nativas con Swift y Kotlin cuando el producto lo exige. Incluye backend con Firebase y publicación en las tiendas.",
        },
        {
          title: "Software de escritorio multiplataforma",
          text: "Aplicaciones para macOS, Windows y Linux con C++ y Qt: rendimiento nativo, una sola base de código y distribución lista para tus usuarios.",
        },
        {
          title: "Producto y modernización",
          text: "Validamos alcance y riesgo técnico antes de construir, y refactorizamos apps existentes para ganar velocidad, estabilidad y menor costo de mantenimiento.",
        },
      ],
    },
    portfolio: {
      title: "Casos destacados",
      heading: "Nuestras apps públicas, ya en producción",
      note: "Estas son nuestras apps propias, gratuitas y de acceso público. Las apps de más de 50 clientes se desarrollan bajo acuerdo de confidencialidad y no se listan aquí.",
      items: [
        {
          name: "BuMa",
          tag: "Gestión de negocio",
          category: "BusinessApplication",
          impact: "Control integral de inventario, ventas y finanzas en una sola app para pymes.",
          links: [
            { url: "https://play.google.com/store/apps/details?id=com.santech.buma", label: "Ver en Google Play" },
            { url: "https://buma-santech.github.io/", label: "Sitio del proyecto" },
          ],
        },
        {
          name: "Simon in Space",
          tag: "Entretenimiento",
          category: "GameApplication",
          impact: "Juego de memoria estilo arcade con experiencia móvil pulida.",
          links: [
            { url: "https://simon-in-space-game.github.io/", label: "Jugar ahora" },
            { url: "https://play.google.com/store/apps/details?id=com.santech.simon_in_space", label: "Ver en Google Play" },
          ],
        },
        {
          name: "Apple2Google Maps",
          tag: "Utilidades",
          category: "UtilitiesApplication",
          impact: "Convierte enlaces de Apple Maps a Google Maps y Waze, resolviendo la incompatibilidad entre plataformas.",
          links: [
            { url: "https://a2gmapc.github.io/", label: "Sitio del proyecto" },
            { url: "https://play.google.com/store/apps/details?id=org.santech.apple2googlemaps", label: "Apple2Google en Play" },
            { url: "https://play.google.com/store/apps/details?id=org.santech.apple2waze", label: "Apple2Waze en Play" },
          ],
        },
        {
          name: "BigFolderWidget",
          tag: "Utilidades",
          category: "UtilitiesApplication",
          impact: "Widget de carpetas para organizar apps y accesos directos desde la pantalla de inicio en iOS.",
          links: [{ url: "https://big-icon-folder-widget.github.io/", label: "Sitio del proyecto" }],
        },
        {
          name: "PsiphonQt",
          tag: "Open Source",
          category: "DesktopEnhancementApplication",
          impact: "Cliente de escritorio multiplataforma para Psiphon construido con Qt, disponible en macOS, Linux y Windows.",
          links: [{ url: "https://github.com/santech-inc/PsiphonQt", label: "Ver código en GitHub" }],
        },
      ],
    },
    process: {
      title: "Cómo trabajamos",
      heading: "Un proceso claro, del diagnóstico al lanzamiento",
      steps: [
        { title: "Diagnóstico", text: "Mapeamos objetivos, restricciones y métricas de éxito." },
        { title: "Diseño de solución", text: "Definimos arquitectura, roadmap y backlog priorizado." },
        { title: "Entrega incremental", text: "Iteraciones cortas con feedback continuo y visibilidad total." },
        { title: "Optimización continua", text: "Medimos impacto, reducimos deuda y escalamos capacidades." },
      ],
    },
    technology: {
      title: "Stack y capacidades",
      heading: "Tecnología nativa y multiplataforma",
      tags: ["Flutter", "Dart", "Swift", "Kotlin", "C++", "Qt", "Firebase", "iOS", "Android", "macOS"],
    },
    testimonials: {
      title: "Lo que dicen nuestros clientes",
      heading: "Resultados que nuestros clientes notan",
      items: [
        {
          quote:
            "Nos ayudaron a llevar la gestión de nuestro negocio a una sola app, sin fricciones ni curva de aprendizaje larga.",
          author: "Fundador de negocio local",
        },
        {
          quote:
            "La app quedó estable, rápida y con muy buena respuesta de los usuarios desde el primer lanzamiento.",
          author: "Cliente independiente",
        },
      ],
    },
    faq: {
      title: "Preguntas frecuentes",
      heading: "Lo que nos preguntan antes de empezar",
      items: [
        {
          q: "¿Desarrollan apps para iOS y Android?",
          a: "Sí. Usamos Flutter para lanzar en iOS y Android desde una sola base de código, y Swift o Kotlin cuando el proyecto necesita una integración nativa profunda.",
        },
        {
          q: "¿Flutter o desarrollo nativo: qué conviene a mi proyecto?",
          a: "Flutter reduce tiempo y costo cuando necesitas ambas plataformas con la misma experiencia. El desarrollo nativo conviene para funciones muy ligadas al sistema, como widgets o extensiones. Lo definimos contigo en el diagnóstico inicial.",
        },
        {
          q: "¿Cuánto cuesta y cuánto tarda desarrollar una app?",
          a: "Depende del alcance, las integraciones y las plataformas. Después del diagnóstico recibes en menos de 48 horas una propuesta técnica con alcance, plazos y costo.",
        },
        {
          q: "¿También desarrollan software de escritorio?",
          a: "Sí. Construimos aplicaciones para macOS, Windows y Linux con C++ y Qt, como nuestro cliente open source PsiphonQt.",
        },
        {
          q: "¿Me ayudan a publicar la app en Google Play y App Store?",
          a: "Sí. Preparamos la ficha, los recursos gráficos y el envío, y te acompañamos durante la revisión de cada tienda.",
        },
        {
          q: "¿Firman acuerdos de confidencialidad (NDA)?",
          a: "Sí. Hemos desarrollado apps para más de 50 clientes, la mayoría bajo NDA; por eso el portafolio público muestra solo nuestras apps propias.",
        },
        {
          q: "¿Ofrecen mantenimiento después del lanzamiento?",
          a: "Sí. Medimos el impacto, corregimos incidencias, actualizamos dependencias y evolucionamos el producto en iteraciones cortas.",
        },
      ],
    },
    downloads: {
      title: "Zona de descargas",
      description: "Prueba nuestras apps publicadas en Google Play.",
      android: "Perfil de desarrollador en Google Play",
      androidUrl: "https://play.google.com/store/apps/dev?id=7795062710980776466",
    },
    contact: {
      eyebrow: "Contacto",
      title: "Convirtamos tu próxima idea en una app sólida",
      description: "Cuéntanos tu reto y recibe una propuesta técnica en menos de 48 horas, sin compromiso.",
      button: "Escribir a SanTech",
      subject: "Propuesta para mi proyecto",
      email: "sanincdev@gmail.com",
    },
    footer: {
      copy: "SanTech Inc. Desarrollo de apps móviles y software a medida.",
      rights: "Todos los derechos reservados.",
      repoLink: { label: "Repositorio de apps", href: "/repo/" },
    },
    notFound: {
      title: "Página no encontrada",
      text: "La página que buscas no existe o cambió de dirección.",
      cta: "Volver al inicio",
    },
  },
  en: {
    meta: {
      title: "Mobile App & Custom Software Development | SanTech Inc",
      description:
        "Trusted by 50+ clients: iOS and Android apps with Flutter, Swift and Kotlin, plus desktop software. Get a technical proposal in under 48 hours.",
      ogLocale: "en_US",
      siteName: "SanTech Inc",
    },
    a11y: {
      navLabel: "Primary navigation",
      langSwitchLabel: "Language switch",
      navToggleOpen: "Open menu",
      navToggleClose: "Close menu",
      homeLabel: "SanTech Inc, home",
    },
    nav: [
      { label: "Services", href: "#services" },
      { label: "Cases", href: "#portfolio" },
      { label: "Process", href: "#process" },
      { label: "FAQ", href: "#faq" },
      { label: "Repo", href: "/repo/" },
      { label: "Contact", href: "#contact" },
    ],
    hero: {
      badge: "iOS, Android and desktop apps",
      title: "Mobile apps and custom software, built to grow.",
      description:
        "We design and build iOS and Android apps, desktop software, and digital products with a product mindset: from discovery to launch on the app stores.",
      primaryCta: "Request a proposal",
      secondaryCta: "See published apps",
      metrics: [
        { value: "50+", label: "Clients with apps built by SanTech" },
        { value: "5+", label: "Free, publicly available apps of our own" },
        { value: "5", label: "Platforms (iOS, Android, Windows, macOS, Linux)" },
      ],
    },
    services: {
      title: "Services",
      description: "Cross-platform app and software development, from idea to launch.",
      items: [
        {
          title: "iOS and Android mobile apps",
          text: "Flutter apps from a single codebase, or native Swift and Kotlin when the product demands it. Includes a Firebase backend and app store publishing.",
        },
        {
          title: "Cross-platform desktop software",
          text: "macOS, Windows, and Linux applications with C++ and Qt: native performance, one codebase, and distribution ready for your users.",
        },
        {
          title: "Product and modernization",
          text: "We validate scope and technical risk before building, and refactor existing apps for more speed, stability, and lower maintenance costs.",
        },
      ],
    },
    portfolio: {
      title: "Featured cases",
      heading: "Our public apps, already in production",
      note: "These are our own free, publicly available apps. Apps for our 50+ clients are built under confidentiality agreements and are not listed here.",
      items: [
        {
          name: "BuMa",
          tag: "Business management",
          category: "BusinessApplication",
          impact: "Complete inventory, sales, and finance control in a single app for small businesses.",
          links: [
            { url: "https://play.google.com/store/apps/details?id=com.santech.buma", label: "View on Google Play" },
            { url: "https://buma-santech.github.io/", label: "Project site" },
          ],
        },
        {
          name: "Simon in Space",
          tag: "Entertainment",
          category: "GameApplication",
          impact: "Arcade-style memory game with a polished mobile experience.",
          links: [
            { url: "https://simon-in-space-game.github.io/", label: "Play now" },
            { url: "https://play.google.com/store/apps/details?id=com.santech.simon_in_space", label: "View on Google Play" },
          ],
        },
        {
          name: "Apple2Google Maps",
          tag: "Utilities",
          category: "UtilitiesApplication",
          impact: "Converts Apple Maps links to Google Maps and Waze, solving cross-platform compatibility issues.",
          links: [
            { url: "https://a2gmapc.github.io/", label: "Project site" },
            { url: "https://play.google.com/store/apps/details?id=org.santech.apple2googlemaps", label: "Apple2Google on Play" },
            { url: "https://play.google.com/store/apps/details?id=org.santech.apple2waze", label: "Apple2Waze on Play" },
          ],
        },
        {
          name: "BigFolderWidget",
          tag: "Utilities",
          category: "UtilitiesApplication",
          impact: "Folder widget for organizing apps and shortcuts from the iOS home screen.",
          links: [{ url: "https://big-icon-folder-widget.github.io/", label: "Visit site" }],
        },
        {
          name: "PsiphonQt",
          tag: "Open Source",
          category: "DesktopEnhancementApplication",
          impact: "Cross-platform desktop client for Psiphon built with Qt, available on macOS, Linux, and Windows.",
          links: [{ url: "https://github.com/santech-inc/PsiphonQt", label: "View code on GitHub" }],
        },
      ],
    },
    process: {
      title: "How we work",
      heading: "A clear process, from discovery to launch",
      steps: [
        { title: "Discovery", text: "We map goals, constraints, and success metrics." },
        { title: "Solution design", text: "We define architecture, roadmap, and prioritized backlog." },
        { title: "Incremental delivery", text: "Short iterations with continuous feedback and full visibility." },
        { title: "Continuous optimization", text: "We measure impact, reduce debt, and scale capabilities." },
      ],
    },
    technology: {
      title: "Stack and capabilities",
      heading: "Native and cross-platform technology",
      tags: ["Flutter", "Dart", "Swift", "Kotlin", "C++", "Qt", "Firebase", "iOS", "Android", "macOS"],
    },
    testimonials: {
      title: "What our clients say",
      heading: "Results our clients notice",
      items: [
        {
          quote:
            "They helped us bring our business management into a single app, with no friction and a short learning curve.",
          author: "Local business owner",
        },
        {
          quote: "The app was stable, fast, and got great feedback from users right from launch.",
          author: "Independent client",
        },
      ],
    },
    faq: {
      title: "FAQ",
      heading: "What clients ask before we start",
      items: [
        {
          q: "Do you build apps for both iOS and Android?",
          a: "Yes. We use Flutter to ship on iOS and Android from a single codebase, and Swift or Kotlin when the project needs deep native integration.",
        },
        {
          q: "Flutter or native development: which is right for my project?",
          a: "Flutter cuts time and cost when you need both platforms with the same experience. Native development fits features tightly bound to the OS, such as widgets or extensions. We decide together during discovery.",
        },
        {
          q: "How much does an app cost and how long does it take?",
          a: "It depends on scope, integrations, and platforms. After discovery you get a technical proposal with scope, timeline, and cost in under 48 hours.",
        },
        {
          q: "Do you also build desktop software?",
          a: "Yes. We build macOS, Windows, and Linux applications with C++ and Qt, like our open source client PsiphonQt.",
        },
        {
          q: "Will you help me publish the app on Google Play and the App Store?",
          a: "Yes. We prepare the store listing, graphic assets, and submission, and support you through each store's review.",
        },
        {
          q: "Do you sign confidentiality agreements (NDA)?",
          a: "Yes. We have built apps for 50+ clients, most of them under NDA, which is why our public portfolio only shows our own apps.",
        },
        {
          q: "Do you offer maintenance after launch?",
          a: "Yes. We measure impact, fix issues, update dependencies, and evolve the product in short iterations.",
        },
      ],
    },
    downloads: {
      title: "Downloads",
      description: "Try our published apps on Google Play.",
      android: "Developer profile on Google Play",
      androidUrl: "https://play.google.com/store/apps/dev?id=7795062710980776466",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let us turn your next idea into a solid app",
      description: "Tell us your challenge and get a technical proposal in under 48 hours, no strings attached.",
      button: "Contact SanTech",
      subject: "Proposal for my project",
      email: "sanincdev@gmail.com",
    },
    footer: {
      copy: "SanTech Inc. Mobile app and custom software development.",
      rights: "All rights reserved.",
      repoLink: { label: "Apps repo", href: "/repo/" },
    },
    notFound: {
      title: "Page not found",
      text: "The page you are looking for does not exist or has moved.",
      cta: "Back to home",
    },
  },
};

export const site = {
  url: "https://santech-inc.github.io",
  paths: { es: "/", en: "/en/" },
  sameAs: [
    "https://github.com/santech-inc",
    "https://play.google.com/store/apps/dev?id=7795062710980776466",
  ],
};
