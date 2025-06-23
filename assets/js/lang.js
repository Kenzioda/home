// Language Selector and i18n logic

const currentLangButton = document.getElementById('current-lang-button');
const currentLangFlag = document.getElementById('current-lang-flag');
const currentLangName = document.getElementById('current-lang-name');
const langDropdown = document.getElementById('lang-dropdown');

const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', country: 'US' },
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

// Populate language dropdown
langDropdown.innerHTML = '';
languages.forEach(lang => {
    const langItem = document.createElement('li');
    langItem.className = 'dropdown-item';
    langItem.style.cursor = 'pointer';
    langItem.innerHTML = `
        <span class="lang-flag">${lang.flag}</span>
        <span class="text-sm font-medium text-slate-700 ms-2">( ${lang.country} ) ${lang.name}</span>
    `;
    langItem.addEventListener('click', () => {
        loadTranslation(lang.code); // Use dynamic loading
        langDropdown.classList.add('hidden');
    });
    langDropdown.appendChild(langItem);
});

// Toggle language dropdown
currentLangButton.addEventListener('click', (event) => {
    langDropdown.classList.toggle('hidden');
    event.stopPropagation();
});

// Close dropdown when clicking outside
document.addEventListener('click', (event) => {
    if (!langDropdown.contains(event.target) && !currentLangButton.contains(event.target)) {
        langDropdown.classList.add('hidden');
    }
});

function setLanguage(langCode) {
    currentLang = langCode;
    const langData = translations[langCode] || translations['en'];

    currentLangFlag.textContent = languages.find(l => l.code === langCode).flag;
    currentLangName.textContent = languages.find(l => l.code === langCode).name;
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

// Dynamic loading of translation files (example for large projects)
async function loadTranslation(langCode) {
    if (!translations[langCode]) {
        try {
            const response = await fetch(`assets/lang/${langCode}.json`); // updated path from assets/i18n/ to assets/lang/
            if (response.ok) {
                const data = await response.json();
                translations[langCode] = data;
                setLanguage(langCode);
            }
        } catch (e) {
            // fallback to English
            setLanguage('en');
        }
    } else {
        setLanguage(langCode);
    }
}
// To use dynamic loading, replace setLanguage(langCode) with loadTranslation(langCode) in the language dropdown click handler if you want to load from file.
