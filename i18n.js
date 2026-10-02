// Translations: English (source), French, Arabic. Tech names and numbers stay as-is.
const en = {
  'meta.title': 'Bessem Kortas — Frontend Team Lead & Design-System Architect',
  'meta.desc': 'Portfolio of Bessem Kortas — Senior Software Engineer, Frontend Team Lead. Design systems, SDKs and frontend architecture for banking platforms.',
  'aria.palette': 'Open command palette', 'aria.theme': 'Toggle dark / light mode',
  'nav.profile': 'Profile', 'nav.experience': 'Experience', 'nav.system': 'System', 'nav.lab': 'Lab', 'nav.skills': 'Skills', 'nav.contact': 'Contact',
  'hero.eyebrow': 'Available for technical leadership roles · Tunisia',
  'hero.lede': 'I build the systems other engineers build on — <em>design systems, SDKs and frontend architecture</em> for banking, insurance and fintech platforms.',
  'hero.cta1': 'Enter the system', 'hero.cta2': 'Download CV', 'hero.scroll': 'scroll to fly',
  roles: ['Frontend Team Lead', 'Design-System Architect', 'SDK Builder', 'Full-Stack Capable', 'AI-Assisted Engineer'],

  'profile.kicker': '01 — Profile',
  'profile.h2': 'Seven years of shipping<br>banking-grade frontends.',
  'profile.p1': "Senior Software Engineer and Frontend Team Lead since 2023. I specialise in frontend architecture — React, React Native, Angular, TypeScript — and in building design systems and SDKs. I own architecture proposals, implementation decisions and merge review for a multi-application banking product, and I'm growing my full-stack range through Node.js, NestJS and Spring Boot projects.",
  'profile.p2': 'Day to day I use AI-assisted tooling (GitHub Copilot, Claude Code) — structuring context and skills to get better results with fewer tokens.',
  'profile.m1': 'years in banking, insurance &amp; fintech',
  'profile.m2': 'faster delivery with the design-system SDK',
  'profile.m3': 'banking projects on the SDK',
  'profile.m4': 'projects reusing internal SDKs via Nexus',
  'profile.m5': 'engineers led, plus 3 integration departments',
  'profile.m6': 'sectors, one codebase: retail, corporate, microfinance',
  'profile.note': '↳ The ~30% figure comes from an internal post-delivery person-day cost analysis.',

  'exp.kicker': '02 — Experience',
  'exp.h2': 'From individual contributor<br>to leading the platform.',
  'exp.j1.title': 'Frontend Team Lead', 'exp.j1.when': '2023 — Present', 'exp.j1.org': 'Proxym · R&amp;D · Bankerise product',
  'exp.j1.b1': 'Kept architecture and code quality consistent across <b>4 apps</b> — end-user, bank-agent, admin dashboard, business — through architecture proposals and merge review.',
  'exp.j1.b2': 'Cut delivery time by <b>~30%</b> by rolling out a modular design-system SDK (theming, tokens, dark/light) across 5+ banking projects.',
  'exp.j1.b3': 'Published internal SDKs to Nexus — including analytics and HTTP handling — driving reuse across ~12 banking projects.',
  'exp.j1.b4': 'Made one platform serve <b>retail, corporate and microfinance</b>; helped introduce a new API Gateway with reworked error handling.',
  'exp.j1.b5': 'Closed a banking-API security gap: <b>Keycloak</b>, request signing for trusted device/app, and Facia AI for OCR + facial recognition.',
  'exp.j1.b6': 'Run sprint planning, QA handoff, GitLab CI pipelines and onboarding workshops for new engineers.',
  'exp.j2.title': 'Senior Software Engineer', 'exp.j2.org': 'Proxym · banking, insurance &amp; corporate-banking engagements',
  'exp.j2.b1': 'Led a <b>5-developer team</b> building an agent dashboard, journey tracking and a 360° customer view.',
  'exp.j2.b2': 'Migrated a large codebase from <b>Angular to React</b> and from multi-repo to a monorepo (Nx + Lerna).',
  'exp.j2.b3': 'Introduced Redux Saga, led the move to Keycloak, adopted Chakra UI as the design system.',
  'exp.j2.b4': 'Delivered transfers and beneficiary management for <b>Barwa Bank / Dukhan Bank</b>, collaborating remotely with the core-banking team in Qatar.',
  'exp.j2.b5': 'Built a FullCalendar scheduling platform; recommended NgRx and extracted Android/iOS builds via Cordova.',
  'exp.j3.title': 'Software Developer', 'exp.j3.d': 'Led the integration of a mobile app into a gamified web platform for students aged 6–12, their parents and teachers.',
  'exp.j4.title': 'Intern', 'exp.j4.d': 'Contributed to a working to-do web application in a small development team.',

  'sys.kicker': '03 — The Bankerise system',
  'sys.h2': 'One platform. Four apps.<br>Hover to fly to one.',
  'sys.body': 'The scene behind you is the product I architect: a configurable platform core, four applications in orbit, and a ring of internal SDKs published to Nexus. Signed requests pulse along each link.',
  'sys.a0.n': 'End-user', 'sys.a0.d': 'The customer-facing banking app.',
  'sys.a1.n': 'Bank agent', 'sys.a1.d': 'The agent-side application.',
  'sys.a2.n': 'Admin dashboard', 'sys.a2.d': 'Back-office administration.',
  'sys.a3.n': 'Business', 'sys.a3.d': 'The corporate / business application.',
  'sys.u1.t': 'Design-system SDK', 'sys.u1.d': 'Modular theming, tokens, dark/light mode',
  'sys.u2.t': 'Security layer',
  'sys.u3.t': 'Platform layer', 'sys.u3.d': 'Configurable for retail, corporate, microfinance · API Gateway',

  'lab.kicker': '04 — The lab',
  'lab.h2': 'Full-stack, built on my own time.',
  'lab.body': 'Self-directed projects to develop hands-on backend and full-stack range. Hover a card to inspect the model.',
  'lab.p0.t': 'Real-time chat', 'lab.p0.d': 'A working messaging app: React frontend, Node.js/Express + WebSocket backend, MongoDB for persistence.',
  'lab.p1.t': 'Task manager', 'lab.p1.s': 'Jira-style', 'lab.p1.d': 'Delivered solo: task creation and assignment, estimation, sprints and status tracking.',
  'lab.p2.t': 'Vehicle dashboard', 'lab.p2.d': 'Three-developer team — I owned the frontend build.',
  'lab.note': '↳ Also: Docker images, and Kubernetes fundamentals — ingress configuration, ArgoCD dashboard, pod/log inspection.',

  'skills.kicker': '05 — Skills',
  'skills.h2': 'A sphere of tools.<br>Hover a group to light it up.',
  'cat.0': 'Frontend', 'cat.1': 'Architecture', 'cat.2': 'Mobile', 'cat.3': 'Backend', 'cat.4': 'Security', 'cat.5': 'Quality', 'cat.6': 'DevOps', 'cat.7': 'Platforms', 'cat.8': 'AI-assisted',

  'contact.kicker': '06 — Contact',
  'contact.h2': "Let's build the next<br>platform <em>together.</em>",
  'contact.cv': 'CV (PDF)',
  'contact.e1': 'National Diploma in Software Engineering — EPI',
  'contact.e2': "Bachelor's in Computer Sciences — ISSAT",
  'contact.e3': 'High School Degree in Computer Sciences',
  'contact.lang': 'Lang', 'contact.langs': 'English · French · Arabic',
  'contact.foot': '© 2026 Bessem Kortas · Tunisia · Built with Three.js',

  'pal.ph': 'Jump to…  (type, ↑ ↓, Enter)',
  'pal.hero': 'Hero', 'pal.profile': 'Profile', 'pal.experience': 'Experience', 'pal.system': 'The Bankerise system', 'pal.lab': 'The lab (projects)', 'pal.skills': 'Skills', 'pal.contact': 'Contact',
  'pal.theme': 'Toggle dark / light', 'pal.cv': 'Download CV', 'pal.mail': 'Send an email', 'pal.li': 'Open LinkedIn', 'pal.gh': 'Open GitHub',
  'pal.k.section': 'section', 'pal.k.theme': 'theme', 'pal.k.file': 'file', 'pal.k.contact': 'contact', 'pal.k.link': 'link',
};

const fr = {
  'meta.title': 'Bessem Kortas — Frontend Team Lead & Architecte Design System',
  'meta.desc': 'Portfolio de Bessem Kortas — Ingénieur logiciel senior, Frontend Team Lead. Design systems, SDK et architecture frontend pour les plateformes bancaires.',
  'aria.palette': 'Ouvrir la palette de commandes', 'aria.theme': 'Basculer entre mode sombre et clair',
  'nav.profile': 'Profil', 'nav.experience': 'Expérience', 'nav.system': 'Système', 'nav.lab': 'Labo', 'nav.skills': 'Compétences', 'nav.contact': 'Contact',
  'hero.eyebrow': 'Disponible pour des rôles de leadership technique · Tunisie',
  'hero.lede': 'Je construis les systèmes sur lesquels les autres ingénieurs s’appuient — <em>design systems, SDK et architecture frontend</em> pour les plateformes bancaires, d’assurance et fintech.',
  'hero.cta1': 'Entrer dans le système', 'hero.cta2': 'Télécharger le CV', 'hero.scroll': 'défiler pour voler',
  roles: ['Responsable d’équipe Frontend', 'Architecte Design System', 'Concepteur de SDK', 'Profil Full-Stack', 'Ingénieur augmenté par l’IA'],

  'profile.kicker': '01 — Profil',
  'profile.h2': 'Sept ans à livrer des<br>frontends de niveau bancaire.',
  'profile.p1': "Ingénieur logiciel senior et Frontend Team Lead depuis 2023. Je me spécialise dans l'architecture frontend — React, React Native, Angular, TypeScript — ainsi que dans la création de design systems et de SDK. Je porte les propositions d'architecture, les décisions d'implémentation et la revue de merge d'un produit bancaire multi-applications, et j'élargis mon profil full-stack grâce à des projets en Node.js, NestJS et Spring Boot.",
  'profile.p2': "Au quotidien, j'utilise des outils assistés par IA (GitHub Copilot, Claude Code) — en structurant le contexte et les skills pour de meilleurs résultats avec moins de tokens.",
  'profile.m1': "ans dans la banque, l'assurance et la fintech",
  'profile.m2': 'de livraison plus rapide grâce au SDK design system',
  'profile.m3': 'projets bancaires sur le SDK',
  'profile.m4': 'projets réutilisant des SDK internes via Nexus',
  'profile.m5': "ingénieurs encadrés, plus 3 départements d'intégration",
  'profile.m6': 'secteurs, une seule base de code : retail, corporate, microfinance',
  'profile.note': "↳ Le chiffre de ~30 % provient d'une analyse interne des coûts en jours-homme après livraison.",

  'exp.kicker': '02 — Expérience',
  'exp.h2': 'De contributeur individuel<br>à leader de la plateforme.',
  'exp.j1.title': 'Frontend Team Lead', 'exp.j1.when': "2023 — Aujourd'hui", 'exp.j1.org': 'Proxym · R&amp;D · produit Bankerise',
  'exp.j1.b1': "Cohérence de l'architecture et de la qualité du code sur <b>4 applications</b> — end-user, agent bancaire, dashboard admin, business — via propositions d'architecture et revues de merge.",
  'exp.j1.b2': "Réduction du temps de livraison d'environ <b>30 %</b> grâce au déploiement d'un SDK design system modulaire (thèmes, tokens, dark/light) sur plus de 5 projets bancaires.",
  'exp.j1.b3': 'Publication de SDK internes sur Nexus — dont analytics et gestion HTTP — favorisant la réutilisation sur ~12 projets bancaires.',
  'exp.j1.b4': "Une seule plateforme pour <b>retail, corporate et microfinance</b> ; participation à l'introduction d'une nouvelle API Gateway avec une gestion d'erreurs repensée.",
  'exp.j1.b5': "Correction d'une faille de sécurité des API bancaires : <b>Keycloak</b>, signature des requêtes pour appareil/app de confiance, et Facia AI pour l'OCR et la reconnaissance faciale.",
  'exp.j1.b6': "Pilotage du sprint planning, du passage de relais QA, des pipelines GitLab CI et des ateliers d'onboarding des nouveaux ingénieurs.",
  'exp.j2.title': 'Ingénieur logiciel senior', 'exp.j2.org': 'Proxym · missions bancaires, assurance et corporate banking',
  'exp.j2.b1': "Direction d'une <b>équipe de 5 développeurs</b> : dashboard agent, suivi de parcours et vue client 360°.",
  'exp.j2.b2': "Migration d'une grande base de code d'<b>Angular vers React</b> et du multi-repo vers un monorepo (Nx + Lerna).",
  'exp.j2.b3': "Introduction de Redux Saga, pilotage de la migration vers Keycloak, adoption de Chakra UI comme design system.",
  'exp.j2.b4': "Livraison des modules virements et gestion des bénéficiaires pour <b>Barwa Bank / Dukhan Bank</b>, en collaboration à distance avec l'équipe core-banking au Qatar.",
  'exp.j2.b5': "Création d'une plateforme de planification FullCalendar ; recommandation de NgRx et génération des versions Android/iOS via Cordova.",
  'exp.j3.title': 'Développeur logiciel', 'exp.j3.d': "Pilotage de l'intégration d'une application mobile dans une plateforme web ludique pour les élèves de 6 à 12 ans, leurs parents et leurs enseignants.",
  'exp.j4.title': 'Stagiaire', 'exp.j4.d': "Contribution à une application web de to-do fonctionnelle au sein d'une petite équipe.",

  'sys.kicker': '03 — Le système Bankerise',
  'sys.h2': "Une plateforme. Quatre apps.<br>Survolez pour voler vers l'une d'elles.",
  'sys.body': "La scène derrière vous est le produit dont je suis l'architecte : un cœur de plateforme configurable, quatre applications en orbite et un anneau de SDK internes publiés sur Nexus. Les requêtes signées pulsent le long de chaque lien.",
  'sys.a0.n': 'Utilisateur final', 'sys.a0.d': "L'application bancaire destinée aux clients.",
  'sys.a1.n': 'Agent bancaire', 'sys.a1.d': "L'application côté agent.",
  'sys.a2.n': 'Dashboard admin', 'sys.a2.d': 'Administration back-office.',
  'sys.a3.n': 'Business', 'sys.a3.d': "L'application corporate / entreprises.",
  'sys.u1.t': 'SDK design system', 'sys.u1.d': 'Thèmes modulaires, tokens, mode dark/light',
  'sys.u2.t': 'Couche sécurité',
  'sys.u3.t': 'Couche plateforme', 'sys.u3.d': 'Configurable pour retail, corporate, microfinance · API Gateway',

  'lab.kicker': '04 — Le labo',
  'lab.h2': 'Du full-stack, construit sur mon temps libre.',
  'lab.body': 'Projets personnels pour développer mon expérience backend et full-stack. Survolez une carte pour inspecter le modèle.',
  'lab.p0.t': 'Chat temps réel', 'lab.p0.d': 'Une vraie application de messagerie : frontend React, backend Node.js/Express + WebSocket, MongoDB pour la persistance.',
  'lab.p1.t': 'Gestionnaire de tâches', 'lab.p1.s': 'style Jira', 'lab.p1.d': 'Réalisé en solo : création et assignation de tâches, estimation, sprints et suivi des statuts.',
  'lab.p2.t': 'Dashboard véhicule', 'lab.p2.d': "Équipe de trois développeurs — j'ai pris en charge le frontend.",
  'lab.note': "↳ Aussi : images Docker et bases de Kubernetes — configuration d'ingress, dashboard ArgoCD, inspection des pods/logs.",

  'skills.kicker': '05 — Compétences',
  'skills.h2': "Une sphère d'outils.<br>Survolez un groupe pour l'illuminer.",
  'cat.0': 'Frontend', 'cat.1': 'Architecture', 'cat.2': 'Mobile', 'cat.3': 'Backend', 'cat.4': 'Sécurité', 'cat.5': 'Qualité', 'cat.6': 'DevOps', 'cat.7': 'Plateformes', 'cat.8': 'Assisté par IA',

  'contact.kicker': '06 — Contact',
  'contact.h2': 'Construisons la prochaine<br>plateforme <em>ensemble.</em>',
  'contact.cv': 'CV (PDF)',
  'contact.e1': "Diplôme national d'ingénieur en génie logiciel — EPI",
  'contact.e2': 'Licence en sciences informatiques — ISSAT',
  'contact.e3': 'Baccalauréat en sciences informatiques',
  'contact.lang': 'Langues', 'contact.langs': 'Anglais · Français · Arabe',
  'contact.foot': '© 2026 Bessem Kortas · Tunisie · Créé avec Three.js',

  'pal.ph': 'Aller à…  (taper, ↑ ↓, Entrée)',
  'pal.hero': 'Accueil', 'pal.profile': 'Profil', 'pal.experience': 'Expérience', 'pal.system': 'Le système Bankerise', 'pal.lab': 'Le labo (projets)', 'pal.skills': 'Compétences', 'pal.contact': 'Contact',
  'pal.theme': 'Basculer sombre / clair', 'pal.cv': 'Télécharger le CV', 'pal.mail': 'Envoyer un e-mail', 'pal.li': 'Ouvrir LinkedIn', 'pal.gh': 'Ouvrir GitHub',
  'pal.k.section': 'section', 'pal.k.theme': 'thème', 'pal.k.file': 'fichier', 'pal.k.contact': 'contact', 'pal.k.link': 'lien',
};

const es = {
  'meta.title': 'Bessem Kortas — Frontend Team Lead y Arquitecto de Design Systems',
  'meta.desc': 'Portfolio de Bessem Kortas — Ingeniero de software sénior, Frontend Team Lead. Design systems, SDK y arquitectura frontend para plataformas bancarias.',
  'aria.palette': 'Abrir la paleta de comandos', 'aria.theme': 'Cambiar entre modo oscuro y claro',
  'nav.profile': 'Perfil', 'nav.experience': 'Experiencia', 'nav.system': 'Sistema', 'nav.lab': 'Laboratorio', 'nav.skills': 'Habilidades', 'nav.contact': 'Contacto',
  'hero.eyebrow': 'Disponible para roles de liderazgo técnico · Túnez',
  'hero.lede': 'Construyo los sistemas sobre los que otros ingenieros construyen — <em>design systems, SDK y arquitectura frontend</em> para plataformas bancarias, de seguros y fintech.',
  'hero.cta1': 'Entrar al sistema', 'hero.cta2': 'Descargar CV', 'hero.scroll': 'desplázate para volar',
  roles: ['Frontend Team Lead', 'Arquitecto de Design Systems', 'Creador de SDK', 'Perfil Full-Stack', 'Ingeniero asistido por IA'],

  'profile.kicker': '01 — Perfil',
  'profile.h2': 'Siete años entregando<br>frontends de nivel bancario.',
  'profile.p1': 'Ingeniero de software sénior y Frontend Team Lead desde 2023. Me especializo en arquitectura frontend — React, React Native, Angular, TypeScript — y en la creación de design systems y SDK. Me encargo de las propuestas de arquitectura, las decisiones de implementación y la revisión de merge de un producto bancario multiaplicación, y amplío mi perfil full-stack con proyectos en Node.js, NestJS y Spring Boot.',
  'profile.p2': 'En mi día a día uso herramientas asistidas por IA (GitHub Copilot, Claude Code), estructurando el contexto y las skills para obtener mejores resultados con menos tokens.',
  'profile.m1': 'años en banca, seguros y fintech',
  'profile.m2': 'más rápido en la entrega con el SDK del design system',
  'profile.m3': 'proyectos bancarios sobre el SDK',
  'profile.m4': 'proyectos que reutilizan SDK internos vía Nexus',
  'profile.m5': 'ingenieros a cargo, más 3 departamentos de integración',
  'profile.m6': 'sectores, una sola base de código: retail, corporate, microfinanzas',
  'profile.note': '↳ La cifra de ~30 % proviene de un análisis interno de costes en personas-día tras la entrega.',

  'exp.kicker': '02 — Experiencia',
  'exp.h2': 'De contribuidor individual<br>a líder de la plataforma.',
  'exp.j1.title': 'Frontend Team Lead', 'exp.j1.when': '2023 — Actualidad', 'exp.j1.org': 'Proxym · I+D · producto Bankerise',
  'exp.j1.b1': 'Coherencia de arquitectura y calidad de código en <b>4 aplicaciones</b> — usuario final, agente bancario, panel de administración, business — mediante propuestas de arquitectura y revisiones de merge.',
  'exp.j1.b2': 'Reducción del tiempo de entrega en <b>~30 %</b> al desplegar un SDK modular de design system (temas, tokens, dark/light) en más de 5 proyectos bancarios.',
  'exp.j1.b3': 'Publicación de SDK internos en Nexus — incluidos analytics y gestión HTTP — que impulsan la reutilización en ~12 proyectos bancarios.',
  'exp.j1.b4': 'Una sola plataforma para <b>retail, corporate y microfinanzas</b>; participación en la introducción de un nuevo API Gateway con una gestión de errores rediseñada.',
  'exp.j1.b5': 'Cierre de una brecha de seguridad en las API bancarias: <b>Keycloak</b>, firma de peticiones para dispositivo/app de confianza y Facia AI para OCR y reconocimiento facial.',
  'exp.j1.b6': 'Dirección del sprint planning, el traspaso a QA, los pipelines de GitLab CI y los talleres de onboarding para nuevos ingenieros.',
  'exp.j2.title': 'Ingeniero de software sénior', 'exp.j2.org': 'Proxym · proyectos de banca, seguros y banca corporativa',
  'exp.j2.b1': 'Dirección de un <b>equipo de 5 desarrolladores</b>: panel para agentes, seguimiento de trámites y vista de cliente 360°.',
  'exp.j2.b2': 'Migración de una gran base de código de <b>Angular a React</b> y de multi-repo a monorepo (Nx + Lerna).',
  'exp.j2.b3': 'Introducción de Redux Saga, liderazgo de la migración a Keycloak y adopción de Chakra UI como design system.',
  'exp.j2.b4': 'Entrega de los módulos de transferencias y gestión de beneficiarios para <b>Barwa Bank / Dukhan Bank</b>, colaborando en remoto con el equipo de core banking en Catar.',
  'exp.j2.b5': 'Creación de una plataforma de citas con FullCalendar; recomendación de NgRx y generación de versiones Android/iOS con Cordova.',
  'exp.j3.title': 'Desarrollador de software', 'exp.j3.d': 'Dirección de la integración de una app móvil en una plataforma web gamificada para estudiantes de 6 a 12 años, sus padres y sus profesores.',
  'exp.j4.title': 'Prácticas', 'exp.j4.d': 'Contribución a una aplicación web de tareas (to-do) en un pequeño equipo de desarrollo.',

  'sys.kicker': '03 — El sistema Bankerise',
  'sys.h2': 'Una plataforma. Cuatro apps.<br>Pasa el cursor para volar a una.',
  'sys.body': 'La escena a tu espalda es el producto cuya arquitectura diseño: un núcleo de plataforma configurable, cuatro aplicaciones en órbita y un anillo de SDK internos publicados en Nexus. Las peticiones firmadas pulsan a lo largo de cada enlace.',
  'sys.a0.n': 'Usuario final', 'sys.a0.d': 'La app bancaria para clientes.',
  'sys.a1.n': 'Agente bancario', 'sys.a1.d': 'La aplicación del lado del agente.',
  'sys.a2.n': 'Panel de administración', 'sys.a2.d': 'Administración back-office.',
  'sys.a3.n': 'Business', 'sys.a3.d': 'La aplicación corporativa / de empresas.',
  'sys.u1.t': 'SDK del design system', 'sys.u1.d': 'Temas modulares, tokens, modo dark/light',
  'sys.u2.t': 'Capa de seguridad',
  'sys.u3.t': 'Capa de plataforma', 'sys.u3.d': 'Configurable para retail, corporate, microfinanzas · API Gateway',

  'lab.kicker': '04 — El laboratorio',
  'lab.h2': 'Full-stack, construido en mi tiempo libre.',
  'lab.body': 'Proyectos personales para desarrollar experiencia práctica en backend y full-stack. Pasa el cursor sobre una tarjeta para inspeccionar el modelo.',
  'lab.p0.t': 'Chat en tiempo real', 'lab.p0.d': 'Una app de mensajería funcional: frontend en React, backend Node.js/Express + WebSocket y MongoDB para la persistencia.',
  'lab.p1.t': 'Gestor de tareas', 'lab.p1.s': 'estilo Jira', 'lab.p1.d': 'Entregado en solitario: creación y asignación de tareas, estimación, sprints y seguimiento de estados.',
  'lab.p2.t': 'Panel de vehículo', 'lab.p2.d': 'Equipo de tres desarrolladores — me encargué del frontend.',
  'lab.note': '↳ También: imágenes Docker y fundamentos de Kubernetes — configuración de ingress, panel de ArgoCD, inspección de pods/logs.',

  'skills.kicker': '05 — Habilidades',
  'skills.h2': 'Una esfera de herramientas.<br>Pasa el cursor sobre un grupo para iluminarlo.',
  'cat.0': 'Frontend', 'cat.1': 'Arquitectura', 'cat.2': 'Móvil', 'cat.3': 'Backend', 'cat.4': 'Seguridad', 'cat.5': 'Calidad', 'cat.6': 'DevOps', 'cat.7': 'Plataformas', 'cat.8': 'Asistido por IA',

  'contact.kicker': '06 — Contacto',
  'contact.h2': 'Construyamos la próxima<br>plataforma <em>juntos.</em>',
  'contact.cv': 'CV (PDF)',
  'contact.e1': 'Diploma nacional de ingeniería de software — EPI',
  'contact.e2': 'Grado en Ciencias de la Computación — ISSAT',
  'contact.e3': 'Bachillerato en Ciencias de la Computación',
  'contact.lang': 'Idiomas', 'contact.langs': 'Inglés · Francés · Árabe',
  'contact.foot': '© 2026 Bessem Kortas · Túnez · Hecho con Three.js',

  'pal.ph': 'Ir a…  (escribe, ↑ ↓, Enter)',
  'pal.hero': 'Inicio', 'pal.profile': 'Perfil', 'pal.experience': 'Experiencia', 'pal.system': 'El sistema Bankerise', 'pal.lab': 'El laboratorio (proyectos)', 'pal.skills': 'Habilidades', 'pal.contact': 'Contacto',
  'pal.theme': 'Cambiar oscuro / claro', 'pal.cv': 'Descargar CV', 'pal.mail': 'Enviar un correo', 'pal.li': 'Abrir LinkedIn', 'pal.gh': 'Abrir GitHub',
  'pal.k.section': 'sección', 'pal.k.theme': 'tema', 'pal.k.file': 'archivo', 'pal.k.contact': 'contacto', 'pal.k.link': 'enlace',
};

const DICT = { en, fr, es };
export const LANGS = ['en', 'fr', 'es'];
let lang = 'en';
const listeners = [];

export const getLang = () => lang;
export const t = k => DICT[lang][k] ?? en[k] ?? k;
export const onLang = fn => listeners.push(fn);

export function detectLang() {
  let s = null; try { s = localStorage.getItem('lang'); } catch { }
  if (LANGS.includes(s)) return s;
  return 'en';
}

export function setLang(l, persist = true) {
  if (!LANGS.includes(l)) return;
  lang = l;
  const root = document.documentElement;
  root.lang = l;
  if (persist) { try { localStorage.setItem('lang', l); } catch { } }
  document.querySelectorAll('[data-i18n]').forEach(el => { el.innerHTML = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    el.dataset.i18nAttr.split(';').forEach(pair => { const [a, k] = pair.split(':'); el.setAttribute(a, t(k)); });
  });
  document.title = t('meta.title');
  document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.desc'));
  document.querySelectorAll('.lang button').forEach(b => b.classList.toggle('on', b.dataset.lang === l));
  listeners.forEach(fn => fn(l));
}
