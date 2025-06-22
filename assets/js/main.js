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
