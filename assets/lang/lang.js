// Language Selector and i18n logic

const currentLangButton = document.getElementById('current-lang-button');
const currentLangFlag = document.getElementById('current-lang-flag');
const currentLangName = document.getElementById('current-lang-name');
const langDropdown = document.getElementById('lang-dropdown');

const currentLangButtonMobile = document.getElementById('current-lang-button-mobile');
const currentLangFlagMobile = document.getElementById('current-lang-flag-mobile');
const currentLangNameMobile = document.getElementById('current-lang-name-mobile');
const langDropdownMobile = document.getElementById('lang-dropdown-mobile');

const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧', country: 'GB' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸', country: 'ES' },
    { code: 'fr', name: 'French', flag: '🇫🇷', country: 'FR' },
    { code: 'de', name: 'German', flag: '🇩🇪', country: 'DE' },
    { code: 'it', name: 'Italian', flag: '🇮🇹', country: 'IT' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹', country: 'PT' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺', country: 'RU' },
    { code: 'zh-Hans', name: 'Chinese (Simplified)', flag: '🇨🇳', country: 'CN' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵', country: 'JP' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷', country: 'KR' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦', country: 'SA' },
    { code: 'tr', name: 'Turkish', flag: '🇹🇷', country: 'TR' },
    { code: 'nl', name: 'Dutch', flag: '🇳🇱', country: 'NL' },
    { code: 'pl', name: 'Polish', flag: '🇵🇱', country: 'PL' },
    { code: 'sv', name: 'Swedish', flag: '🇸🇪', country: 'SE' },
    { code: 'fi', name: 'Finnish', flag: '🇫🇮', country: 'FI' },
    { code: 'no', name: 'Norwegian', flag: '🇳🇴', country: 'NO' },
    { code: 'da', name: 'Danish', flag: '🇩🇰', country: 'DK' },
    { code: 'cs', name: 'Czech', flag: '🇨🇿', country: 'CZ' },
    { code: 'el', name: 'Greek', flag: '🇬🇷', country: 'GR' },
    { code: 'hu', name: 'Hungarian', flag: '🇭🇺', country: 'HU' },
    { code: 'ro', name: 'Romanian', flag: '🇷🇴', country: 'RO' },
    { code: 'bg', name: 'Bulgarian', flag: '🇧🇬', country: 'BG' },
    { code: 'uk', name: 'Ukrainian', flag: '🇺🇦', country: 'UA' },
    { code: 'sk', name: 'Slovak', flag: '🇸🇰', country: 'SK' },
    { code: 'sl', name: 'Slovenian', flag: '🇸🇮', country: 'SI' },
    { code: 'hr', name: 'Croatian', flag: '🇭🇷', country: 'HR' },
    { code: 'et', name: 'Estonian', flag: '🇪🇪', country: 'EE' },
    { code: 'lt', name: 'Lithuanian', flag: '🇱🇹', country: 'LT' },
    { code: 'lv', name: 'Latvian', flag: '🇱🇻', country: 'LV' },
    { code: 'ms', name: 'Malay', flag: '🇲🇾', country: 'MY' },
    { code: 'id', name: 'Indonesian', flag: '🇮🇩', country: 'ID' },
    { code: 'th', name: 'Thai', flag: '🇹🇭', country: 'TH' },
    { code: 'vi', name: 'Vietnamese', flag: '🇻🇳', country: 'VN' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳', country: 'IN' },
    { code: 'he', name: 'Hebrew', flag: '🇮🇱', country: 'IL' },
    { code: 'sq', name: 'Albanian', flag: '🇦🇱', country: 'AL' },
    { code: 'ga', name: 'Irish', flag: '🇮🇪', country: 'IE' },
    { code: 'cy', name: 'Welsh', flag: '🏴', country: 'CY' }
].sort((a, b) => a.name.localeCompare(b.name)); // Alphabetical ascending order

// ...translations object (copy the entire translations object here, unchanged)...

let currentLang = 'en'; // Default language

async function translateTextWithLLM(text, targetLangCode) {
    // ...existing code for translateTextWithLLM...
}

// Only show these languages in the dropdown
const visibleDropdownLangs = languages.filter(lang => ['en', 'id'].includes(lang.code));

// --- SYNC BOTH DROPDOWNS ---

// Populate both dropdowns
function populateLangDropdowns() {
    // Desktop
    langDropdown.innerHTML = '';
    // Mobile
    langDropdownMobile.innerHTML = '';
    visibleDropdownLangs.forEach(lang => {
        // Desktop item
        const langItem = document.createElement('li');
        langItem.className = 'dropdown-item';
        langItem.style.cursor = 'pointer';
        langItem.innerHTML = `
            <span class="lang-flag">(${lang.country})</span>
            <span class="text-sm font-medium text-slate-700 ms-2">${lang.name}</span>
        `;
        langItem.addEventListener('click', () => {
            loadTranslation(lang.code);
            langDropdown.classList.add('hidden');
            langDropdownMobile.classList.add('hidden');
        });
        langDropdown.appendChild(langItem);
        // Mobile item
        const langItemMobile = langItem.cloneNode(true);
        langItemMobile.addEventListener('click', () => {
            loadTranslation(lang.code);
            langDropdown.classList.add('hidden');
            langDropdownMobile.classList.add('hidden');
        });
        langDropdownMobile.appendChild(langItemMobile);
    });
}
populateLangDropdowns();

// Toggle dropdowns
currentLangButton.addEventListener('click', (event) => {
    langDropdown.classList.toggle('hidden');
    langDropdownMobile.classList.add('hidden');
    event.stopPropagation();
});
currentLangButtonMobile.addEventListener('click', (event) => {
    langDropdownMobile.classList.toggle('hidden');
    langDropdown.classList.add('hidden');
    event.stopPropagation();
});
// Close both when clicking outside
function closeLangDropdowns(e) {
    if (!langDropdown.contains(e.target) && !currentLangButton.contains(e.target)) {
        langDropdown.classList.add('hidden');
    }
    if (!langDropdownMobile.contains(e.target) && !currentLangButtonMobile.contains(e.target)) {
        langDropdownMobile.classList.add('hidden');
    }
}
document.addEventListener('click', closeLangDropdowns);

// Update both language buttons
function setLanguage(langCode) {
    currentLang = langCode;
    const langData = translations[langCode] || translations['en'];
    const langObj = languages.find(l => l.code === langCode);
    // Desktop
    currentLangFlag.textContent = langObj.flag;
    currentLangName.textContent = langObj.name;
    // Mobile
    currentLangFlagMobile.textContent = langObj.flag;
    currentLangNameMobile.textContent = langObj.name;
    document.documentElement.lang = langCode;
    // Update all elements with data-lang or data-lang-key
    document.querySelectorAll('[data-lang], [data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang') || element.getAttribute('data-lang-key');
        if (langData[key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = langData[key];
            } else {
                element.textContent = langData[key];
            }
        } else if (translations['en'][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations['en'][key];
            } else {
                element.textContent = translations['en'][key];
            }
        }
    });

    // Optionally, trigger any dynamic content updates here (e.g., populateSuccessFactors, populateFeatures)
    if (typeof populateSuccessFactors === 'function') populateSuccessFactors();
    if (typeof populateFeatures === 'function') populateFeatures();
}

// Auto-detect browser/system language and set if available
window.addEventListener('DOMContentLoaded', () => {
    let browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    // Map browserLang to our language codes
    let match = languages.find(l => browserLang.startsWith(l.code.toLowerCase()));
    if (!match && browserLang.includes('-')) {
        // Try to match base language (e.g., zh for zh-Hans)
        let base = browserLang.split('-')[0];
        match = languages.find(l => l.code.toLowerCase().startsWith(base));
    }
    if (match && match.code !== currentLang) {
        setLanguage(match.code);
    }
});

// Online translation fallback (Microsoft Translator API example)
async function translateOnline(texts, targetLang) {
    // Replace with your real API key and endpoint
    const apiKey = 'YOUR_MICROSOFT_TRANSLATOR_API_KEY';
    const endpoint = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0';
    const url = `${endpoint}&to=${targetLang}`;
    const body = texts.map(t => ({ Text: t }));
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Ocp-Apim-Subscription-Key': apiKey,
            'Ocp-Apim-Subscription-Region': 'YOUR_RESOURCE_REGION', // e.g., 'westeurope'
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const data = await response.json();
    return data.map(item => item.translations[0].text);
}

// Modified loadTranslation to use online fallback for all available languages
async function loadTranslation(langCode) {
    if (!translations[langCode]) {
        try {
            const response = await fetch(`assets/lang/${langCode}.json`);
            if (response.ok) {
                const data = await response.json();
                translations[langCode] = data;
                setLanguage(langCode);
                return;
            }
        } catch (e) {
            // continue to online fallback
        }
        // Online fallback for any language
        const elements = document.querySelectorAll('[data-lang], [data-lang-key]');
        const keys = Array.from(elements).map(el => el.getAttribute('data-lang') || el.getAttribute('data-lang-key'));
        const enData = translations['en'] || {};
        const texts = keys.map(k => enData[k] || k);
        // Show loading indicator (optional)
        document.body.style.cursor = 'wait';
        try {
            const translated = await translateOnline(texts, langCode);
            // Build translation object
            const obj = {};
            keys.forEach((k, i) => { obj[k] = translated[i]; });
            translations[langCode] = obj;
            setLanguage(langCode);
        } catch (err) {
            setLanguage('en');
        } finally {
            document.body.style.cursor = '';
        }
    } else {
        setLanguage(langCode);
    }
}
// To use dynamic loading, replace setLanguage(langCode) with loadTranslation(langCode) in the language dropdown click handler if you want to load from file.
