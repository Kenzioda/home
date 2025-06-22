// Language Selector and i18n logic

const currentLangButton = document.getElementById('current-lang-button');
const currentLangFlag = document.getElementById('current-lang-flag');
const currentLangName = document.getElementById('current-lang-name');
const langDropdown = document.getElementById('lang-dropdown');

const languages = [
    { code: 'vi', name: 'Vietnamese', flag: '🇻🇳' },
    { code: 'cy', name: 'Welsh', flag: '🏴' },
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
].sort((a, b) => a.name.localeCompare(b.name)); // Alphabetical ascending order

// ...translations object (copy the entire translations object here, unchanged)...

let currentLang = 'en'; // Default language

async function translateTextWithLLM(text, targetLangCode) {
    // ...existing code for translateTextWithLLM...
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

    document.querySelectorAll('[data-i18n-key]').forEach(element => {
        const key = element.getAttribute('data-i18n-key');
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
