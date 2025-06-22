document.addEventListener('DOMContentLoaded', function() {
            
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            if(mobileMenu.offsetParent !== null) {
                mobileMenu.classList.add('hidden');
            }
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Language Selector
    const currentLangButton = document.getElementById('current-lang-button');
    const currentLangFlag = document.getElementById('current-lang-flag');
    const currentLangName = document.getElementById('current-lang-name');
    const langDropdown = document.getElementById('lang-dropdown');

    const languages = [
        { code: 'vi', name: 'Vietnamese', flag: '🇻🇳' },
        { code: 'cy', name: 'Welsh', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿' },
        { code: 'uk', name: 'Ukrainian', flag: '🇺🇦' },
        { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
        { code: 'th', name: 'Thai', flag: '🇹🇭' },
        { code: 'sv', name: 'Swedish', flag: '🇸🇪' },
        { code: 'es', name: 'Spanish', flag: '🇪🇸' },
        { code: 'sl', name: 'Slovenian', flag: '🇸🇮' },
        { code: 'sk', name: 'Slovak', flag: '🇸🇰' },
        { code: 'ru', name: 'Russian', flag: '🇷🇺' },
        { code: 'ro', name: 'Romanian', flag: '🇷🇴' },
        { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
        { code: 'pl', name: 'Polish', flag: '🇵🇱' },
        { code: 'no', name: 'Norwegian', flag: '🇳🇴' },
        { code: 'ms', name: 'Malay', flag: '🇲🇾' },
        { code: 'ko', name: 'Korean', flag: '🇰🇷' },
        { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
        { code: 'it', name: 'Italian', flag: '🇮🇹' },
        { code: 'ga', name: 'Irish', flag: '🇮🇪' },
        { code: 'id', name: 'Indonesian', flag: '🇮🇩' },
        { code: 'hu', name: 'Hungarian', flag: '🇭🇺' },
        { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
        { code: 'el', name: 'Greek', flag: '🇬🇷' },
        { code: 'de', name: 'German', flag: '🇩🇪' },
        { code: 'fr', name: 'French', flag: '🇫🇷' },
        { code: 'fi', name: 'Finnish', flag: '🇫🇮' },
        { code: 'et', name: 'Estonian', flag: '🇪🇪' },
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
        { code: 'da', name: 'Danish', flag: '🇩🇰' },
        { code: 'cs', name: 'Czech', flag: '🇨🇿' },
        { code: 'hr', name: 'Croatian', flag: '🇭🇷' },
        { code: 'zh-Hans', name: 'Chinese (Simplified)', flag: '🇨🇳' },
        { code: 'bg', name: 'Bulgarian', flag: '🇧🇬' },
        { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
        { code: 'sq', name: 'Albanian', flag: '🇦🇱' }
    ].sort((a, b) => b.name.localeCompare(a.name)); // Alphabetical descending order

    const translations = {
        'en': {
            'appTitle': 'Interactive Crowdfunding Platform Blueprint',
            'english': 'English',
            'navOverview': 'Overview',
            'navMarket': 'Market Landscape',
            'navPlaybook': 'Success Playbook',
            'navBlueprint': 'Platform Blueprint',
            'navRecommendations': 'Recommendations',
            'overviewSectionTitle': 'Building a Modern Crowdfunding Platform',
            'overviewDescription': 'This interactive report synthesizes key findings on the crowdfunding ecosystem. We\'ll explore dominant platform models, identify critical success factors, and outline the essential features required to build a competitive, user-centric platform. The goal is to provide a clear, actionable blueprint for your project.',
            'nicheIsKeyTitle': 'Niche is Key',
            'nicheIsKeyDesc': 'The market is mature. Success hinges on targeting a specific niche (e.g., sustainable tech, local art) rather than competing with generalist giants.',
            'trustIsEverythingTitle': 'Trust is Everything',
            'trustIsEverythingDesc': 'Transparency, compelling storytelling, and a seamless user experience are paramount for building the trust needed to convert visitors into backers.',
            'mobileFirstTitle': 'Mobile-First Design',
            'mobileFirstDesc': 'A responsive, accessible, and mobile-first approach is non-negotiable for reaching the widest possible audience and ensuring usability.',
            'nicheGeneratorTitle': '✨ Niche Project Idea Generator',
            'nicheGeneratorDesc': 'Stuck on finding a unique crowdfunding niche? Provide an area of interest, and our AI will suggest some fresh ideas!',
            'nicheInterestPlaceholder': 'e.g., sustainable tech, local art, educational games',
            'suggestIdeasBtn': 'Suggest Ideas',
            'generatedIdeasPlaceholder': 'Your generated niche ideas will appear here.',
            'marketSectionTitle': 'Market Landscape Comparison',
            'marketDescription': 'The crowdfunding market is diverse, with platforms specializing in different models and fee structures. This section allows you to visually compare leading platforms based on their success rates and fees. Click the buttons to change the data view, and click on any platform\'s bar to see more details.',
            'viewBySuccessRate': 'View by Success Rate (%)',
            'viewByPlatformFee': 'View by Platform Fee (%)',
            'playbookSectionTitle': 'The Success Playbook',
            'playbookDescription': 'Successful crowdfunding campaigns don\'t happen by accident. They are built on a foundation of strategic principles. Below are the core factors that consistently drive engagement and funding. Hover over each card to see why it\'s critical for success.',
            'blueprintSectionTitle': 'Platform Feature Blueprint',
            'blueprintDescription': 'A robust platform must serve two distinct user groups: the creators launching campaigns and the backers who fund them. This blueprint outlines the essential features for both, organized by category. Click on a category heading to expand or collapse its feature list.',
            'forCreatorsTitle': 'For Creators',
            'forBackersTitle': 'For Backers',
            'pitchGeneratorTitle': '✨ Campaign Pitch Draft Generator',
            'pitchGeneratorDesc': 'Need help crafting a compelling pitch? Enter your project details, and our AI will draft a concise pitch for your campaign.',
            'projectNameLabel': 'Project Name:',
            'projectNamePlaceholder': 'e.g., Eco-Friendly Smart Garden',
            'projectDescriptionLabel': 'Brief Description:',
            'projectDescriptionPlaceholder': 'e.g., A self-watering indoor garden using recycled materials.',
            'targetAudienceLabel': 'Target Audience:',
            'targetAudiencePlaceholder': 'e.g., Urban dwellers, sustainability advocates',
            'draftPitchBtn': 'Draft Pitch',
            'generatedPitchPlaceholder': 'Your generated campaign pitch will appear here.',
            'recommendationsSectionTitle': 'Actionable Recommendations',
            'recommendationsDescription': 'Based on the analysis, here are the top-level strategic recommendations for building a successful crowdfunding platform in the current market.',
            'rec1Number': '1',
            'rec1Strong': 'Define a Clear Niche:',
            'rec1Text': 'Don\'t try to be everything to everyone. Conduct market research to find an underserved industry, community, or project type. This focus will drive your feature set, marketing, and community-building efforts.',
            'rec2Number': '2',
            'rec2Strong': 'Empower Creators:',
            'rec2Text': 'Your platform\'s success is tied to your creators\' success. Provide them with intuitive dashboards, real-time analytics, communication tools, and, crucially, pre-launch support to help them build momentum.',
            'rec3Number': '3',
            'rec3Strong': 'Optimize the Backer Journey:',
            'rec3Text': 'Make project discovery effortless and the contribution process secure and seamless. Encourage social sharing to leverage network effects and build a community around your platform.',
            'rec4Number': '4',
            'rec4Strong': 'Design for Trust and Emotion:',
            'rec4Text': 'Use high-quality visuals, promote compelling storytelling, and be transparent with progress indicators and policies. A trustworthy and emotionally resonant experience converts visitors.',
            'rec5Number': '5',
            'rec5Strong': 'Adopt a Mobile-First, Accessible Strategy:',
            'rec5Text': 'Build with a responsive framework like Bootstrap 5 or Tailwind CSS from the ground up. Ensure your site is accessible to all users to maximize reach and inclusivity.',
            'footerText': 'Interactive Crowdfunding Blueprint | An Interactive Report',
            // Success Factors Descriptions - these are dynamic, so the full text will be translated in the data itself.
            'factor1Desc': 'Connect emotionally with backers by sharing the "why" behind your project using high-quality video and images.',
            'factor2Desc': 'Build confidence with regular updates, clear use of funds, and visible security signals. Trust is your most valuable asset.',
            'factor3Desc': 'Clear, realistic goals with a deadline motivate backers. Progress bars create momentum and a sense of shared purpose.',
            'factor4Desc': 'Build an audience before you launch. Engage with backers through social media and direct communication to create a loyal community.',
            'factor5Desc': 'A high-quality, polished campaign page with clear, jargon-free language builds credibility and reflects the quality of your project.',
            'factor6Desc': 'Offer unique, valuable, and well-priced perks that make backers feel appreciated and part of the journey.',
            // Feature Categories
            'creatorFeatureCategory1': 'Campaign Creation',
            'creatorFeatureCategory2': 'Communication',
            'creatorFeatureCategory3': 'Analytics',
            'backerFeatureCategory1': 'Project Discovery',
            'backerFeatureCategory2': 'Contribution & Trust',
            'backerFeatureCategory3': 'Engagement',
            // Feature Items
            'cc1': 'Intuitive step-by-step campaign builder',
            'cc2': 'High-quality media uploads (images/video)',
            'cc3': 'Reward/perk tier management',
            'cc4': 'Flexible vs. Fixed funding model selection',
            'cc5': 'Draft mode for pre-launch refinement',
            'co1': 'Campaign update announcement system',
            'co2': 'Direct messaging with backers',
            'co3': 'Public comment sections',
            'co4': 'Easy social media sharing tools',
            'an1': 'Real-time dashboard for tracking funds',
            'an2': 'Backer demographic and location data',
            'an3': 'Traffic source analysis',
            'an4': 'Comprehensive data export options',
            'pd1': 'Advanced search and filtering',
            'pd2': 'Well-organized categories and collections',
            'pd3': 'Personalized project recommendations',
            'pd4': 'Staff picks or trending sections',
            'ct1': 'Secure and simple multi-step payment flow',
            'ct2': 'Clear display of project goals and progress',
            'ct3': 'Creator profiles with history and verification',
            'ct4': 'Easy access to campaign updates',
            'en1': 'Personal dashboard to track backed projects',
            'en2': 'Ability to follow creators',
            'en3': 'Social sharing buttons to support campaigns',
            'en4': 'Comment sections for community discussion',
            'keyFeaturesStrong': 'Key Features:',
            'targetAudienceStrong': 'Target Audience:',
            'enterInterestError': 'Please enter an area of interest.',
            'generateIdeasError': 'Could not generate ideas. Please try again.',
            'errorGeneratingIdeas': 'Error generating ideas',
            'fillAllFieldsError': 'Please fill in all project details to generate a pitch.',
            'generatePitchError': 'Could not generate pitch. Please try again.',
            'errorGeneratingPitch': 'Error generating pitch',
            'translationFailed': '(Translation failed, showing original English)'
        },
        'fr': {
            'appTitle': 'Plan de Financement Participatif Interactif',
            'english': 'Anglais',
            'navOverview': 'Aperçu',
            'navMarket': 'Paysage du Marché',
            'navPlaybook': 'Guide de Réussite',
            'navBlueprint': 'Plan de la Plateforme',
            'navRecommendations': 'Recommandations',
            'overviewSectionTitle': 'Construire une Plateforme de Financement Participatif Moderne',
            'overviewDescription': 'Ce rapport interactif synthétise les principales conclusions sur l\'écosystème du financement participatif. Nous explorerons les modèles de plateforme dominants, identifierons les facteurs de succès critiques et décrirons les fonctionnalités essentielles nécessaires pour construire une plateforme compétitive et centrée sur l\'utilisateur. L\'objectif est de fournir un plan clair et exploitable pour votre projet.',
            'nicheIsKeyTitle': 'La Niche est Essentielle',
            'nicheIsKeyDesc': 'Le marché est mature. Le succès dépend du ciblage d\'une niche spécifique (par exemple, la technologie durable, l\'art local) plutôt que de la concurrence avec les géants généralistes.',
            'trustIsEverythingTitle': 'La Confiance est Primordiale',
            'trustIsEverythingDesc': 'La transparence, une narration captivante et une expérience utilisateur fluide sont primordiales pour instaurer la confiance nécessaire afin de convertir les visiteurs en contributeurs.',
            'mobileFirstTitle': 'Conception Mobile-First',
            'mobileFirstDesc': 'Une approche réactive, accessible et mobile-first est non négociable pour atteindre le public le plus large possible et assurer la convivialité.',
            'nicheGeneratorTitle': '✨ Générateur d\'Idées de Projets de Niche',
            'nicheGeneratorDesc': 'En panne d\'inspiration pour trouver une niche unique en financement participatif ? Indiquez un domaine d\'intérêt, et notre IA vous suggérera de nouvelles idées !',
            'nicheInterestPlaceholder': 'ex: technologie durable, art local, jeux éducatifs',
            'suggestIdeasBtn': 'Suggérer des Idées',
            'generatedIdeasPlaceholder': 'Vos idées de niche générées apparaîtront ici.',
            'marketSectionTitle': 'Comparaison du Paysage du Marché',
            'marketDescription': 'Le marché du financement participatif est diversifié, avec des plateformes spécialisées dans différents modèles et structures de frais. Cette section vous permet de comparer visuellement les principales plateformes en fonction de leurs taux de réussite et de leurs frais. Cliquez sur les boutons pour modifier l\'affichage des données, et cliquez sur la barre d\'une plateforme pour voir plus de détails.',
            'viewBySuccessRate': 'Voir par Taux de Réussite (%)',
            'viewByPlatformFee': 'Voir par Frais de Plateforme (%)',
            'playbookSectionTitle': 'Le Guide de Réussite',
            'playbookDescription': 'Les campagnes de financement participatif réussies ne sont pas le fruit du hasard. Elles reposent sur des principes stratégiques. Ci-dessous, les facteurs clés qui génèrent constamment engagement et financement. Passez la souris sur chaque carte pour voir pourquoi c\'est essentiel pour le succès.',
            'blueprintSectionTitle': 'Plan de la Plateforme',
            'blueprintDescription': 'Une plateforme robuste doit servir deux groupes d\'utilisateurs distincts : les créateurs lançant des campagnes et les contributeurs qui les financent. Ce plan décrit les fonctionnalités essentielles pour les deux, organisées par catégorie. Cliquez sur un en-tête de catégorie pour afficher ou masquer sa liste de fonctionnalités.',
            'forCreatorsTitle': 'Pour les Créateurs',
            'forBackersTitle': 'Pour les Contributeurs',
            'pitchGeneratorTitle': '✨ Générateur de Brouillon de Pitch de Campagne',
            'pitchGeneratorDesc': 'Besoin d\'aide pour rédiger un pitch percutant ? Entrez les détails de votre projet, et notre IA rédigera un pitch concis pour votre campagne.',
            'projectNameLabel': 'Nom du Projet :',
            'projectNamePlaceholder': 'ex: Jardin Intelligent Écologique',
            'projectDescriptionLabel': 'Brève Description :',
            'projectDescriptionPlaceholder': 'ex: Un jardin intérieur auto-arrosant utilisant des matériaux recyclés.',
            'targetAudienceLabel': 'Public Cible :',
            'targetAudiencePlaceholder': 'ex: Citadins, défenseurs du développement durable',
            'draftPitchBtn': 'Brouillon de Pitch',
            'generatedPitchPlaceholder': 'Votre pitch de campagne généré apparaîtra ici.',
            'recommendationsSectionTitle': 'Recommandations Actionnables',
            'recommendationsDescription': 'Basé sur l\'analyse, voici les principales recommandations stratégiques pour construire une plateforme de financement participatif réussie sur le marché actuel.',
            'rec1Number': '1',
            'rec1Strong': 'Définir une Niche Claire :',
            'rec1Text': 'N\'essayez pas d\'être tout pour tout le monde. Effectuez une étude de marché pour trouver une industrie, une communauté ou un type de projet mal desservi. Cette orientation guidera votre ensemble de fonctionnalités, votre marketing et vos efforts de création de communauté.',
            'rec2Number': '2',
            'rec2Strong': 'Renforcer les Créateurs :',
            'rec2Text': 'Le succès de votre plateforme est lié au succès de vos créateurs. Fournissez-leur des tableaux de bord intuitifs, des analyses en temps réel, des outils de communication et, surtout, un soutien avant le lancement pour les aider à prendre de l\'élan.',
            'rec3Number': '3',
            'rec3Strong': 'Optimiser le Parcours du Contributeur :',
            'rec3Text': 'Facilitez la découverte des projets et le processus de contribution, en le rendant sécurisé et transparent. Encouragez le partage social pour tirer parti des effets de réseau et bâtir une communauté autour de votre plateforme.',
            'rec4Number': '4',
            'rec4Strong': 'Concevoir pour la Confiance et l\'Émotion :',
            'rec4Text': 'Utilisez des visuels de haute qualité, favorisez une narration captivante et soyez transparent avec les indicateurs de progrès et les politiques. Une expérience digne de confiance et émotionnellement résonnante convertit les visiteurs.',
            'rec5Number': '5',
            'rec5Strong': 'Adopter une Strategie Mobile-First et Accessible :',
            'rec5Text': 'Construisez avec un cadre réactif comme Bootstrap 5 ou Tailwind CSS dès le départ. Assurez-vous que votre site est accessible à tous les utilisateurs pour maximiser la portée et l\'inclusivité.',
            'footerText': 'Plan de Financement Participatif Interactif | Un Rapport Interactif',
            'factor1Desc': 'Connectez-vous émotionnellement avec les contributeurs en partageant le "pourquoi" de votre projet à l\'aide de vidéos et d\'images de haute qualité.',
            'factor2Desc': 'Bâtissez la confiance avec des mises à jour régulières, une utilisation claire des fonds, et des signaux de sécurité visibles. La confiance est votre atout le plus précieux.',
            'factor3Desc': 'Des objectifs clairs et réalistes avec une date limite motivent les contributions. Les barres de progression créent un élan et un sentiment d\'objectif commun.',
            'factor4Desc': 'Bâtissez une audience avant le lancement. Engagez-vous avec les contributeurs via les médias sociaux et la communication directe pour créer une communauté loyale.',
            'factor5Desc': 'Une page de campagne professionnelle et soignée, avec un langage clair et sans jargon, renforce la crédibilité et reflète la qualité de votre projet.',
            'factor6Desc': 'Offrez des avantages uniques, précieux et bien tarifés qui font que les contributeurs se sentent appréciés et partie prenante du projet.',
            'creatorFeatureCategory1': 'Création de Campagne',
            'creatorFeatureCategory2': 'Communication',
            'creatorFeatureCategory3': 'Analyse',
            'backerFeatureCategory1': 'Découverte de Projet',
            'backerFeatureCategory2': 'Contribution et Confiance',
            'backerFeatureCategory3': 'Engagement',
            'cc1': 'Constructeur de campagne intuitif étape par étape',
            'cc2': 'Téléchargements de médias de haute qualité (images/vidéos)',
            'cc3': 'Gestion des niveaux de récompense/avantages',
            'cc4': 'Sélection du modèle de financement (Flexible vs. Fixe)',
            'cc5': 'Mode brouillon pour un raffinement avant le lancement',
            'co1': 'Système d\'annonce des mises à jour de campagne',
            'co2': 'Messagerie directe avec les contributeurs',
            'co3': 'Sections de commentaires publiques',
            'co4': 'Outils de partage facile sur les réseaux sociaux',
            'an1': 'Tableau de bord en temps réel pour le suivi des fonds',
            'an2': 'Données démographiques et de localisation des contributeurs',
            'an3': 'Analyse des sources de trafic',
            'an4': 'Options d\'exportation de données complètes',
            'pd1': 'Recherche et filrage avancés',
            'pd2': 'Catégories et collections bien organisées',
            'pd3': 'Recommandations de projets personnalisées',
            'pd4': 'Sélections de l\'équipe ou sections tendances',
            'ct1': 'Processus de paiement sécurisé et simple en plusieurs étapes',
            'ct2': 'Affichage clair des objectifs et de l\'avancement du projet',
            'ct3': 'Profils de créateurs avec historique et vérification',
            'ct4': 'Accès facile aux mises à jour de campagne',
            'en1': 'Tableau de bord personnel pour suivre les projets soutenus',
            'en2': 'Possibilité de suivre les créateurs',
            'en3': 'Boutons de partage social pour soutenir les campagnes',
            'en4': 'Sections de commentaires pour la discussion communautaire',
            'keyFeaturesStrong': 'Fonctionnalités Clés :',
            'targetAudienceStrong': 'Public Cible :',
            'enterInterestError': 'Veuillez entrer un domaine d\'intérêt.',
            'generateIdeasError': 'Impossible de générer des idées. Veuillez réessayer.',
            'errorGeneratingIdeas': 'Erreur lors de la génération des idées',
            'fillAllFieldsError': 'Veuillez remplir tous les détails du projet pour générer un pitch.',
            'generatePitchError': 'Impossible de générer le pitch. Veuillez réessayer.',
            'errorGeneratingPitch': 'Erreur lors de la génération du pitch',
            'translationFailed': '(Traduction échouée, affichage de l\'original en anglais)'
        },
        'id': {
            'appTitle': 'Cetak Biru Platform Crowdfunding Interaktif',
            'english': 'Inggris',
            'navOverview': 'Gambaran Umum',
            'navMarket': 'Lanskap Pasar',
            'navPlaybook': 'Buku Pedoman Keberhasilan',
            'navBlueprint': 'Cetak Biru Platform',
            'navRecommendations': 'Rekomendasi',
            'overviewSectionTitle': 'Membangun Platform Crowdfunding Modern',
            'overviewDescription': 'Laporan interaktif ini mensintesis temuan-temuan kunci tentang ekosistem crowdfunding. Kami akan menjelajahi model-model platform dominan, mengidentifikasi faktor-faktor keberhasilan kritis, dan menguraikan fitur-fitur penting yang diperlukan untuk membangun platform yang kompetitif dan berpusat pada pengguna. Tujuannya adalah untuk menyediakan cetak biru yang jelas dan dapat ditindaklanjuti untuk proyek Anda.',
            'nicheIsKeyTitle': 'Niche adalah Kunci',
            'nicheIsKeyDesc': 'Pasar sudah matang. Keberhasilan bergantung pada penargetan niche tertentu (misalnya, teknologi berkelanjutan, seni lokal) daripada bersaing dengan raksasa umum.',
            'trustIsEverythingTitle': 'Kepercayaan adalah Segalanya',
            'trustIsEverythingDesc': 'Transparansi, penceritaan yang menarik, dan pengalaman pengguna yang mulus sangat penting untuk membangun kepercayaan yang diperlukan untuk mengubah pengunjung menjadi pendukung.',
            'mobileFirstTitle': 'Desain Prioritas Seluler',
            'mobileFirstDesc': 'Pendekatan yang responsif, mudah diakses, dan prioritas seluler tidak dapat dinegosiasikan untuk menjangkau audiens seluas mungkin dan memastikan kegunaan.',
            'nicheGeneratorTitle': '✨ Generator Ide Proyek Niche',
            'nicheGeneratorDesc': 'Kesulitan menemukan niche crowdfunding yang unik? Berikan area minat, dan AI kami akan menyarankan beberapa ide segar!',
            'nicheInterestPlaceholder': 'misalnya, teknologi berkelanjutan, seni lokal, game edukasi',
            'suggestIdeasBtn': 'Saran Ide',
            'generatedIdeasPlaceholder': 'Ide niche yang Anda hasilkan akan muncul di sini.',
            'marketSectionTitle': 'Perbandingan Lanskap Pasar',
            'marketDescription': 'Pasar crowdfunding beragam, dengan platform yang mengkhususkan diri pada model dan struktur biaya yang berbeda. Bagian ini memungkinkan Anda untuk membandingkan platform terkemuka secara visual berdasarkan tingkat keberhasilan dan biaya mereka. Klik tombol untuk mengubah tampilan data, dan klik pada bilah platform mana pun untuk melihat detail lebih lanjut.',
            'viewBySuccessRate': 'Lihat berdasarkan Tingkat Keberhasilan (%)',
            'viewByPlatformFee': 'Lihat berdasarkan Biaya Platform (%)',
            'playbookSectionTitle': 'Buku Pedoman Keberhasilan',
            'playbookDescription': 'Kampanye crowdfunding yang sukses tidak terjadi secara kebetulan. Mereka dibangun di atas dasar prinsip-prinsip strategis. Di bawah ini adalah faktor-faktor inti yang secara konsisten mendorong keterlibatan dan pendanaan. Arahkan kursor ke setiap kartu untuk melihat mengapa itu penting untuk keberhasilan.',
            'blueprintSectionTitle': 'Cetak Biru Fitur Platform',
            'blueprintDescription': 'Platform yang kuat harus melayani dua kelompok pengguna yang berbeda: pembuat kampanye yang meluncurkan kampanye dan pendukung yang mendanai mereka. Cetak biru ini menguraikan fitur-fitur penting untuk keduanya, diorganisir berdasarkan kategori. Klik pada judul kategori untuk memperluas atau menciutkan daftar fiturnya.',
            'forCreatorsTitle': 'Untuk Pembuat Kampanye',
            'forBackersTitle': 'Untuk Pendukung',
            'pitchGeneratorTitle': '✨ Generator Draf Pitch Kampanye',
            'pitchGeneratorDesc': 'Butuh bantuan menyusun pitch yang menarik? Masukkan detail proyek Anda, dan AI kami akan menyusun pitch singkat untuk kampanye Anda.',
            'projectNameLabel': 'Nama Proyek:',
            'projectNamePlaceholder': 'misalnya, Kebun Pintar Ramah Lingkungan',
            'projectDescriptionLabel': 'Deskripsi Singkat:',
            'projectDescriptionPlaceholder': 'misalnya, Sebuah kebun indoor self-watering yang menggunakan bahan daur ulang.',
            'targetAudienceLabel': 'Target Audiens:',
            'targetAudiencePlaceholder': 'misalnya, Penduduk kota, advokat keberlanjutan',
            'draftPitchBtn': 'Buat Draf Pitch',
            'generatedPitchPlaceholder': 'Pitch kampanye yang Anda hasilkan akan muncul di sini.',
            'recommendationsSectionTitle': 'Rekomendasi yang Dapat Ditindaklanjuti',
            'recommendationsDescription': 'Berdasarkan analisis, berikut adalah rekomendasi strategis tingkat atas untuk membangun platform crowdfunding yang sukses di pasar saat ini.',
            'rec1Number': '1',
            'rec1Strong': 'Definisikan Niche yang Jelas:',
            'rec1Text': 'Jangan mencoba menjadi segalanya bagi semua orang. Lakukan riset pasar untuk menemukan industri, komunitas, atau jenis proyek yang belum terlayani. Fokus ini akan mendorong set fitur, pemasaran, dan upaya pembangunan komunitas Anda.',
            'rec2Number': '2',
            'rec2Strong': 'Berdayakan Pembuat Kampanye:',
            'rec2Text': 'Keberhasilan platform Anda terkait dengan keberhasilan pembuat kampanye Anda. Sediakan mereka dengan dasbor intuitif, analitik real-time, alat komunikasi, dan, yang terpenting, dukungan pra-peluncuran untuk membantu mereka membangun momentum.',
            'rec3Number': '3',
            'rec3Strong': 'Optimalkan Perjalanan Pendukung:',
            'rec3Text': 'Jadikan penemuan proyek mudah dan proses kontribusi aman serta mulus. Dorong berbagi sosial untuk memanfaatkan efek jaringan dan membangun komunitas di sekitar platform Anda.',
            'rec4Number': '4',
            'rec4Strong': 'Design for Trust and Emotion:',
            'rec4Text': 'Use high-quality visuals, promote compelling storytelling, and be transparent with progress indicators and policies. A trustworthy and emotionally resonant experience converts visitors.',
            'rec5Number': '5',
            'rec5Strong': 'Adopt a Mobile-First, Accessible Strategy:',
            'rec5Text': 'Build with a responsive framework like Bootstrap 5 or Tailwind CSS from the ground up. Ensure your site is accessible to all users to maximize reach and inclusivity.',
            'footerText': 'Interactive Crowdfunding Blueprint | An Interactive Report',
            // Success Factors Descriptions - these are dynamic, so the full text will be translated in the data itself.
            'factor1Desc': 'Connect emotionally with backers by sharing the "why" behind your project using high-quality video and images.',
            'factor2Desc': 'Build confidence with regular updates, clear use of funds, and visible security signals. Trust is your most valuable asset.',
            'factor3Desc': 'Clear, realistic goals with a deadline motivate backers. Progress bars create momentum and a sense of shared purpose.',
            'factor4Desc': 'Build an audience before you launch. Engage with backers through social media and direct communication to create a loyal community.',
            'factor5Desc': 'A high-quality, polished campaign page with clear, jargon-free language builds credibility and reflects the quality of your project.',
            'factor6Desc': 'Offer unique, valuable, and well-priced perks that make backers feel appreciated and part of the journey.',
            // Feature Categories
            'creatorFeatureCategory1': 'Campaign Creation',
            'creatorFeatureCategory2': 'Communication',
            'creatorFeatureCategory3': 'Analytics',
            'backerFeatureCategory1': 'Project Discovery',
            'backerFeatureCategory2': 'Contribution & Trust',
            'backerFeatureCategory3': 'Engagement',
            // Feature Items
            'cc1': 'Intuitive step-by-step campaign builder',
            'cc2': 'High-quality media uploads (images/video)',
            'cc3': 'Reward/perk tier management',
            'cc4': 'Flexible vs. Fixed funding model selection',
            'cc5': 'Draft mode for pre-launch refinement',
            'co1': 'Campaign update announcement system',
            'co2': 'Direct messaging with backers',
            'co3': 'Public comment sections',
            'co4': 'Easy social media sharing tools',
            'an1': 'Real-time dashboard for tracking funds',
            'an2': 'Backer demographic and location data',
            'an3': 'Traffic source analysis',
            'an4': 'Comprehensive data export options',
            'pd1': 'Advanced search and filtering',
            'pd2': 'Well-organized categories and collections',
            'pd3': 'Personalized project recommendations',
            'pd4': 'Staff picks or trending sections',
            'ct1': 'Secure and simple multi-step payment flow',
            'ct2': 'Clear display of project goals and progress',
            'ct3': 'Creator profiles with history and verification',
            'ct4': 'Easy access to campaign updates',
            'en1': 'Personal dashboard to track backed projects',
            'en2': 'Ability to follow creators',
            'en3': 'Social sharing buttons to support campaigns',
            'en4': 'Comment sections for community discussion',
            'keyFeaturesStrong': 'Key Features:',
            'targetAudienceStrong': 'Target Audience:',
            'enterInterestError': 'Please enter an area of interest.',
            'generateIdeasError': 'Could not generate ideas. Please try again.',
            'errorGeneratingIdeas': 'Error generating ideas',
            'fillAllFieldsError': 'Please fill in all project details to generate a pitch.',
            'generatePitchError': 'Could not generate pitch. Please try again.',
            'errorGeneratingPitch': 'Error generating pitch',
            'translationFailed': '(Translation failed, showing original English)'
        },
        // Placeholder for other languages (example structure)
        'ar': { 'english': 'العربية' }, 'bg': { 'english': 'Български' }, 'zh-Hans': { 'english': '简体中文' },
        'hr': { 'english': 'Hrvatski' }, 'cs': { 'english': 'Čeština' }, 'da': { 'english': 'Dansk' },
        'nl': { 'english': 'Nederlands' }, 'et': { 'english': 'Eesti' }, 'fi': { 'english': 'Suomi' },
        'de': { 'english': 'Deutsch' }, 'el': { 'english': 'Ελληνικά' }, 'hi': { 'english': 'हिन्दी' },
        'hu': { 'english': 'Magyar' }, 'ga': { 'english': 'Gaeilge' }, 'it': { 'english': 'Italiano' },
        'ja': { 'english': '日本語' }, 'ko': { 'english': '한국어' }, 'ms': { 'english': 'Bahasa Melayu' },
        'no': { 'english': 'Norsk' }, 'pl': { 'english': 'Polski' }, 'pt': { 'english': 'Português' },
        'ro': { 'english': 'Română' }, 'ru': { 'english': 'Русский' }, 'sk': { 'english': 'Slovenčina' },
        'sl': { 'english': 'Slovenščina' }, 'es': { 'english': 'Español' }, 'sv': { 'english': 'Svenska' },
        'th': { 'english': 'ไทย' }, 'tr': { 'english': 'Türkçe' }, 'uk': { 'english': 'Українська' },
        'cy': { 'english': 'Cymraeg' }, 'vi': { 'english': 'Tiếng Việt' }
    };


    let currentLang = 'en'; // Default language

    async function translateTextWithLLM(text, targetLangCode) {
        if (targetLangCode === 'en') return text; // No translation needed for English

        const langName = languages.find(l => l.code === targetLangCode)?.name || 'English';
        try {
            let chatHistory = [];
            const prompt = `Translate the following text into ${langName}. Provide only the translated text, no additional comments or formatting:\n\n${text}`;
            chatHistory.push({ role: "user", parts: [{ text: prompt }] });
            const payload = { contents: chatHistory };
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                return result.candidates[0].content.parts[0].text;
            } else {
                console.error('LLM translation failed:', result);
                return `${text} ${translations[currentLang]['translationFailed'] || translations['en']['translationFailed']}`;
            }
        } catch (error) {
            console.error('Error during LLM translation:', error);
            return `${text} ${translations[currentLang]['translationFailed'] || translations['en']['translationFailed']}`;
        }
    }


    function setLanguage(langCode) {
        currentLang = langCode;
        const langData = translations[langCode] || translations['en']; // Fallback to English

        currentLangFlag.textContent = languages.find(l => l.code === langCode).flag;
        currentLangName.textContent = languages.find(l => l.code === langCode).name;
        document.documentElement.lang = langCode; // Set HTML lang attribute

        document.querySelectorAll('[data-i18n-key]').forEach(element => {
            const key = element.getAttribute('data-i18n-key');
            if (langData[key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = langData[key];
                } else {
                    element.textContent = langData[key];
                }
            } else if (translations['en'][key]) { // Fallback specific keys to English if not found in selected language
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations['en'][key];
                } else {
                    element.textContent = translations['en'][key];
                }
            }
        });

        // Update dynamic content like success factors and features
        populateSuccessFactors();
        populateFeatures();

        // Re-render chart labels if they need translation
        // Note: Chart.js labels are not directly linked to data-i18n-key,
        // so they would need to be updated manually if Chart.js provides translation capabilities
        // For now, we assume chart labels remain English for simplicity or are handled internally by Chart.js.
        // If chart labels need to be translated, the updateChart function would need to be called
        // and the labels in the chartConfig would need to be updated with translated strings.
        // For this example, Chart.js labels are kept static.
    }

    // Populate language dropdown
    languages.forEach(lang => {
        const langItem = document.createElement('div');
        langItem.className = 'flex items-center space-x-2 px-4 py-2 hover:bg-slate-50 cursor-pointer';
        langItem.innerHTML = `
            <span class="lang-flag">${lang.flag}</span>
            <span class="text-sm font-medium text-slate-700">${lang.name}</span>
        `;
        langItem.addEventListener('click', () => {
            setLanguage(lang.code);
            langDropdown.classList.add('hidden');
        });
        langDropdown.appendChild(langItem);
    });

    // Toggle language dropdown
    currentLangButton.addEventListener('click', (event) => {
        langDropdown.classList.toggle('hidden');
        event.stopPropagation(); // Prevent click from propagating to document
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
        if (!langDropdown.contains(event.target) && !currentLangButton.contains(event.target)) {
            langDropdown.classList.add('hidden');
        }
    });

    // Data
    const platformsData = [
        { name: 'Kickstarter', model: 'Reward (All-or-Nothing)', fee: 5, successRate: 36, features: 'Creative projects focus, trusted platform, global backer access.', audience: 'Creative projects, global backers.' },
        { name: 'Indiegogo', model: 'Reward (Fixed/Flexible)', fee: 5, successRate: 17, features: 'Flexibility, InDemand program, analytics integration.', audience: 'Early-stage concepts, broader project range.' },
        { name: 'GoFundMe', model: 'Donation', fee: 0, successRate: null, features: 'Social causes, personal needs, nonprofit fundraising.', audience: 'Social causes, personal fundraising.' },
        { name: 'StartEngine', model: 'Equity', fee: 8.5, successRate: null, features: 'US equity crowdfunding leader, large funding rounds.', audience: 'US startups seeking equity investment.'},
        { name: 'Crowdcube', model: 'Equity', fee: 7, successRate: null, features: 'Europe\'s largest equity platform, bond options.', audience: 'European investors and businesses.' },
        { name: 'Patreon', model: 'Subscription/Donation', fee: 8, successRate: null, features: 'Monthly support model for ongoing content.', audience: 'Artists, content creators.' }
    ];

    const successFactors = [
        { title: 'Compelling Storytelling', descriptionKey: 'factor1Desc', icon: '&#128247;' },
        { title: 'Transparency and Trust', descriptionKey: 'factor2Desc', icon: '&#128274;' },
        { title: 'Urgency and Goals', descriptionKey: 'factor3Desc', icon: '&#9200;' },
        { title: 'Community Engagement', descriptionKey: 'factor4Desc', icon: '&#128101;' },
        { title: 'Professional Presentation', descriptionKey: 'factor5Desc', icon: '&#127912;' },
        { title: 'Rewarding Backers', descriptionKey: 'factor6Desc', icon: '&#127873;' },
    ];
    
    const featuresData = {
        creators: [
            { categoryKey: 'creatorFeatureCategory1', itemsKeys: ['cc1', 'cc2', 'cc3', 'cc4', 'cc5'] },
            { categoryKey: 'creatorFeatureCategory2', itemsKeys: ['co1', 'co2', 'co3', 'co4'] },
            { categoryKey: 'creatorFeatureCategory3', itemsKeys: ['an1', 'an2', 'an3', 'an4'] }
        ],
        backers: [
            { categoryKey: 'backerFeatureCategory1', itemsKeys: ['pd1', 'pd2', 'pd3', 'pd4'] },
            { categoryKey: 'backerFeatureCategory2', itemsKeys: ['ct1', 'ct2', 'ct3', 'ct4'] },
            { categoryKey: 'backerFeatureCategory3', itemsKeys: ['en1', 'en2', 'en3', 'en4'] }
        ]
    };

    // Chart.js Implementation
    const ctx = document.getElementById('platform-comparison-chart').getContext('2d');
    let platformChart;
    
    const chartConfig = {
        type: 'bar',
        data: {
            labels: platformsData.map(p => p.name),
            datasets: [{
                label: 'Success Rate (%)',
                data: platformsData.map(p => p.successRate),
                backgroundColor: 'rgba(13, 148, 136, 0.6)', // teal-600
                borderColor: 'rgba(15, 118, 110, 1)', // teal-700
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(203, 213, 225, 0.5)' // slate-300
                    },
                    ticks: {
                        font: {
                            family: "'Inter', sans-serif"
                        }
                    }
                },
                y: {
                   grid: {
                        display: false
                   },
                   ticks: {
                        font: {
                            family: "'Inter', sans-serif"
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: '#1e293b', // slate-800
                    titleFont: { size: 14, family: "'Inter', sans-serif" },
                    bodyFont: { size: 12, family: "'Inter', sans-serif" },
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.x !== null) {
                                label += context.parsed.x + '%';
                            }
                            return label;
                        }
                    }
                }
            },
            onClick: (event, elements) => {
                if (elements.length > 0) {
                    const chartElement = elements[0];
                    const index = chartElement.index;
                    showDetailCard(platformsData[index]);
                }
            }
        }
    };
    
    platformChart = new Chart(ctx, chartConfig);

    const detailCardContainer = document.getElementById('detail-card-container');

    function updateChart(dataType) {
        const isSuccessRate = dataType === 'success';
        platformChart.data.datasets[0].label = isSuccessRate ? translations[currentLang]['viewBySuccessRate'] : translations[currentLang]['viewByPlatformFee'];
        platformChart.data.datasets[0].data = isSuccessRate 
            ? platformsData.map(p => p.successRate) 
            : platformsData.map(p => p.fee);

        const successBtn = document.getElementById('show-success-rate');
        const feeBtn = document.getElementById('show-platform-fee');
        if (isSuccessRate) {
            successBtn.classList.remove('bg-slate-200', 'text-slate-700', 'hover:bg-slate-300');
            successBtn.classList.add('bg-teal-600', 'text-white', 'hover:bg-teal-700');
            feeBtn.classList.add('bg-slate-200', 'text-slate-700', 'hover:bg-slate-300');
            feeBtn.classList.remove('bg-teal-600', 'text-white', 'hover:bg-teal-700');
        } else {
            feeBtn.classList.remove('bg-slate-200', 'text-slate-700', 'hover:bg-slate-300');
            feeBtn.classList.add('bg-teal-600', 'text-white', 'hover:bg-teal-700');
            successBtn.classList.add('bg-slate-200', 'text-slate-700', 'hover:bg-slate-300');
            successBtn.classList.remove('bg-teal-600', 'text-white', 'hover:bg-teal-700');
        }
        
        platformChart.update();
        detailCardContainer.innerHTML = '';
    }
    
    function showDetailCard(platform) {
        const langData = translations[currentLang] || translations['en'];
        detailCardContainer.innerHTML = `
            <div class="detail-card bg-slate-50 border border-slate-200 rounded-lg p-6 opacity-0">
                <h4 class="text-xl font-bold text-slate-800 mb-2">${platform.name}</h4>
                <p class="text-sm font-medium text-teal-700 mb-4">${platform.model}</p>
                <div class="space-y-3">
                    <div>
                        <strong class="text-slate-600">${langData['keyFeaturesStrong']}</strong>
                        <p class="text-slate-500">${platform.features}</p>
                    </div>
                     <div>
                        <strong class="text-slate-600">${langData['targetAudienceStrong']}</strong>
                        <p class="text-slate-500">${platform.audience}</p>
                    </div>
                </div>
            </div>
        `;
        setTimeout(() => {
            const card = detailCardContainer.querySelector('.detail-card');
            if (card) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        }, 50);
    }

    document.getElementById('show-success-rate').addEventListener('click', () => updateChart('success'));
    document.getElementById('show-platform-fee').addEventListener('click', () => updateChart('fee'));

    // Elements for dynamic content population
    const successGrid = document.getElementById('success-factors-grid');
    const creatorContainer = document.getElementById('creator-features');
    const backerContainer = document.getElementById('backer-features');

    // Populate Success Factors
    function populateSuccessFactors() {
        successGrid.innerHTML = ''; // Clear existing cards
        const langData = translations[currentLang] || translations['en'];
        successFactors.forEach(factor => {
            const card = document.createElement('div');
            card.className = 'bg-white p-6 rounded-xl shadow-md border border-slate-200 transform hover:-translate-y-1 transition-transform duration-300';
            card.innerHTML = `
                <div class="text-3xl mb-4">${factor.icon}</div>
                <h3 class="font-bold text-xl text-slate-800 mb-2">${factor.title}</h3>
                <p class="text-slate-600">${langData[factor.descriptionKey] || translations['en'][factor.descriptionKey]}</p>
            `;
            successGrid.appendChild(card);
        });
    }

    // Populate Features
    function populateFeatures() {
        // Clear existing content safely
        const existingCreatorFeatures = creatorContainer.querySelector('div.space-y-4');
        if (existingCreatorFeatures) existingCreatorFeatures.remove();
        const existingBackerFeatures = backerContainer.querySelector('div.space-y-4');
        if (existingBackerFeatures) existingBackerFeatures.remove();

        const langData = translations[currentLang] || translations['en'];

        const createFeatureSection = (featureSet) => {
            const container = document.createElement('div');
            container.className = 'space-y-4';
            featureSet.forEach(category => {
                const section = document.createElement('div');
                section.className = 'bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden';
                section.innerHTML = `
                    <button class="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 focus:outline-none flex justify-between items-center transition">
                        <h4 class="font-semibold text-slate-700">${langData[category.categoryKey] || translations['en'][category.categoryKey]}</h4>
                        <span class="transform transition-transform text-teal-600">&#9662;</span>
                    </button>
                    <ul class="p-4 text-sm space-y-2 hidden">
                        ${category.itemsKeys.map(itemKey => `<li class="flex items-start"><span class="text-teal-500 mr-2 mt-1">&#10003;</span>${langData[itemKey] || translations['en'][itemKey]}</li>`).join('')}
                    </ul>
                `;
                const button = section.querySelector('button');
                const list = section.querySelector('ul');
                const icon = section.querySelector('button span');
                button.addEventListener('click', () => {
                    list.classList.toggle('hidden');
                    icon.classList.toggle('rotate-180');
                });
                container.appendChild(section);
            });
            return container;
        }

        creatorContainer.appendChild(createFeatureSection(featuresData.creators));
        backerContainer.appendChild(createFeatureSection(featuresData.backers));
    }


    // Initial population of dynamic content
    // The calls to populateSuccessFactors() and populateFeatures() were moved here,
    // after their respective element references are defined.
    populateSuccessFactors();
    populateFeatures();


    // Gemini API Integration - Niche Project Idea Generator
    const nicheInterestInput = document.getElementById('niche-interest-input');
    const generateNicheIdeasButton = document.getElementById('generate-niche-ideas-button');
    const nicheIdeasOutput = document.getElementById('niche-ideas-output');
    const nicheSpinner = document.getElementById('niche-spinner');

    generateNicheIdeasButton.addEventListener('click', async () => {
        const interest = nicheInterestInput.value.trim();
        if (!interest) {
            nicheIdeasOutput.innerHTML = `<p class="text-red-500">${translations[currentLang]['enterInterestError'] || 'Please enter an area of interest.'}</p>`;
            return;
        }

        nicheIdeasOutput.innerHTML = '';
        nicheSpinner.classList.remove('hidden');
        generateNicheIdeasButton.disabled = true;
        generateNicheIdeasButton.querySelector('span').classList.add('hidden');

        try {
            let chatHistory = [];
            const prompt = `Suggest 3 unique and underserved niche project ideas for a crowdfunding platform, specifically within the area of '${interest}'. For each idea, provide a one-sentence description. Format as a numbered list.`;
            chatHistory.push({ role: "user", parts: [{ text: prompt }] });
            const payload = { contents: chatHistory };
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const generatedText = result.candidates[0].content.parts[0].text;
                const translatedText = await translateTextWithLLM(generatedText, currentLang);
                nicheIdeasOutput.innerHTML = `<pre class="whitespace-pre-wrap">${translatedText}</pre>`;
            } else {
                nicheIdeasOutput.innerHTML = `<p class="text-red-500">${translations[currentLang]['generateIdeasError'] || 'Could not generate ideas. Please try again.'}</p>`;
            }
        } catch (error) {
            nicheIdeasOutput.innerHTML = `<p class="text-red-500">${translations[currentLang]['errorGeneratingIdeas'] || 'Error generating ideas'}: ${error.message}</p>`;
        } finally {
            nicheSpinner.classList.add('hidden');
            generateNicheIdeasButton.disabled = false;
            generateNicheIdeasButton.querySelector('span').classList.remove('hidden');
        }
    });


    // Gemini API Integration - Campaign Pitch Draft Generator
    const projectNameInput = document.getElementById('project-name-input');
    const projectDescriptionInput = document.getElementById('project-description-input');
    const targetAudienceInput = document.getElementById('target-audience-input');
    const generatePitchButton = document.getElementById('generate-pitch-button');
    const pitchOutput = document.getElementById('pitch-output');
    const pitchSpinner = document.getElementById('pitch-spinner');

    generatePitchButton.addEventListener('click', async () => {
        const projectName = projectNameInput.value.trim();
        const projectDescription = projectDescriptionInput.value.trim();
        const targetAudience = targetAudienceInput.value.trim();

        if (!projectName || !projectDescription || !targetAudience) {
            pitchOutput.innerHTML = `<p class="text-red-500">${translations[currentLang]['fillAllFieldsError'] || 'Please fill in all project details to generate a pitch.'}</p>`;
            return;
        }

        pitchOutput.innerHTML = '';
        pitchSpinner.classList.remove('hidden');
        generatePitchButton.disabled = true;
        generatePitchButton.querySelector('span').classList.add('hidden');

        try {
            let chatHistory = [];
            const prompt = `Draft a concise and compelling crowdfunding pitch for a project named '${projectName}' that is about '${projectDescription}'. It targets '${targetAudience}'. Focus on its unique selling points and emotional appeal, keeping it under 150 words.`;
            chatHistory.push({ role: "user", parts: [{ text: prompt }] });
            const payload = { contents: chatHistory };
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const generatedText = result.candidates[0].content.parts[0].text;
                const translatedText = await translateTextWithLLM(generatedText, currentLang);
                pitchOutput.innerHTML = `<pre class="whitespace-pre-wrap">${translatedText}</pre>`;
            } else {
                pitchOutput.innerHTML = `<p class="text-red-500">${translations[currentLang]['generatePitchError'] || 'Could not generate pitch. Please try again.'}</p>`;
            }
        } catch (error) {
            pitchOutput.innerHTML = `<p class="text-red-500">${translations[currentLang]['errorGeneratingPitch'] || 'Error generating pitch'}: ${error.message}</p>`;
        } finally {
            pitchSpinner.classList.add('hidden');
            generatePitchButton.disabled = false;
            generatePitchButton.querySelector('span').classList.remove('hidden');
        }
    });
});
