/**
 * Rosehill Group Internationalization Library
 * Supports English, French, Spanish, and Arabic with RTL support
 * 2025
 */

class RosehillI18n {
    constructor() {
        this.currentLanguage = 'en';
        this.defaultLanguage = 'en';
        this.translations = {};
        this.supportedLanguages = ['en', 'fr', 'es', 'ar'];
        this.rtlLanguages = ['ar'];
        this.isLoaded = false;
        
        // URL configuration
        this.urlConfig = {
            baseUrl: window.location.origin,
            languagePrefix: true, // Use /en/, /fr/, etc.
            defaultLanguageInUrl: false // Don't show /en/ for English
        };
        
        // Performance optimizations
        this.translationCache = new Map();
        this.loadedLanguages = new Set();
        this.pendingLoads = new Map();
        
        // Don't auto-initialize to avoid double initialization
        // this.init();
    }
    
    async init() {
        // Detect language from URL or localStorage
        this.detectLanguage();
        
        // Load translations
        await this.loadTranslations();
        
        // Apply language
        this.applyLanguage();
        
        // Initialize language switcher
        this.initLanguageSwitcher();
        
        this.isLoaded = true;
        this.dispatchEvent('i18nLoaded');
    }
    
    detectLanguage() {
        // Check URL first
        const urlLang = this.getLanguageFromUrl();
        if (urlLang && this.supportedLanguages.includes(urlLang)) {
            this.currentLanguage = urlLang;
            return;
        }
        
        // Check localStorage
        const savedLang = localStorage.getItem('rosehill_language');
        if (savedLang && this.supportedLanguages.includes(savedLang)) {
            this.currentLanguage = savedLang;
            return;
        }
        
        // Check browser language
        const browserLang = this.getBrowserLanguage();
        if (browserLang && this.supportedLanguages.includes(browserLang)) {
            this.currentLanguage = browserLang;
            return;
        }
        
        // Default to English
        this.currentLanguage = this.defaultLanguage;
    }
    
    getLanguageFromUrl() {
        const path = window.location.pathname;
        const langMatch = path.match(/^\/([a-z]{2})\//);
        return langMatch ? langMatch[1] : null;
    }
    
    getBrowserLanguage() {
        const lang = navigator.language || navigator.userLanguage;
        return lang ? lang.substring(0, 2) : null;
    }
    
    async loadTranslations() {
        // Check if already loaded
        if (this.loadedLanguages.has(this.currentLanguage)) {
            this.translations = this.translationCache.get(this.currentLanguage);
            return;
        }
        
        // Check if already loading
        if (this.pendingLoads.has(this.currentLanguage)) {
            await this.pendingLoads.get(this.currentLanguage);
            this.translations = this.translationCache.get(this.currentLanguage);
            return;
        }
        
        // Start loading
        const loadPromise = this.fetchTranslations(this.currentLanguage);
        this.pendingLoads.set(this.currentLanguage, loadPromise);
        
        try {
            this.translations = await loadPromise;
            this.translationCache.set(this.currentLanguage, this.translations);
            this.loadedLanguages.add(this.currentLanguage);
        } catch (error) {
            console.error('Error loading translations:', error);
            
            // Fallback to English if current language fails
            if (this.currentLanguage !== this.defaultLanguage) {
                this.currentLanguage = this.defaultLanguage;
                
                if (!this.loadedLanguages.has(this.defaultLanguage)) {
                    const fallbackPromise = this.fetchTranslations(this.defaultLanguage);
                    this.translations = await fallbackPromise;
                    this.translationCache.set(this.defaultLanguage, this.translations);
                    this.loadedLanguages.add(this.defaultLanguage);
                } else {
                    this.translations = this.translationCache.get(this.defaultLanguage);
                }
            }
        } finally {
            this.pendingLoads.delete(this.currentLanguage);
        }
    }
    
    async fetchTranslations(language) {
        // Always fetch from the root languages directory, not from language-specific paths
        // Add multiple cache-busting parameters to ensure fresh load
        const cacheBuster = Date.now();
        const randomId = Math.random().toString(36).substring(2, 15);
        const response = await fetch(`/languages/${language}.json?v=${cacheBuster}&r=${randomId}&bust=${Date.now()}`, {
            cache: 'no-cache',
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to load translations for ${language}`);
        }
        const translations = await response.json();
        
        
        return translations;
    }
    
    applyLanguage() {
        // Update document language attributes
        document.documentElement.lang = this.currentLanguage;
        document.documentElement.dir = this.translations.meta.dir;
        
        // Apply RTL class if needed
        if (this.isRTL()) {
            document.documentElement.classList.add('rtl');
            document.documentElement.classList.remove('ltr');
        } else {
            document.documentElement.classList.add('ltr');
            document.documentElement.classList.remove('rtl');
        }
        
        // Update all translatable elements
        this.updateTranslatableElements();
        
        // Update meta tags
        this.updateMetaTags();
        
        // Update hreflang tags
        this.updateHreflangTags();
        
        // Update forms
        this.updateForms();
    }
    
    updateTranslatableElements() {
        // Batch DOM updates for better performance
        const batchStart = performance.now();
        
        // Update text content elements
        const elements = document.querySelectorAll('[data-i18n]');
        const updates = [];
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.get(key);
            
            // Debug logging for contact translations
            
            if (translation && element.textContent !== translation) {
                updates.push({ element, translation });
            }
        });
        
        // Apply updates in a single batch to minimize reflows
        if (updates.length > 0) {
            // Use requestAnimationFrame for smoother updates
            requestAnimationFrame(() => {
                updates.forEach(({ element, translation }) => {
                    element.textContent = translation;
                });
            });
        }
        
        // Update elements with data-i18n-attr (for attributes)
        const attrElements = document.querySelectorAll('[data-i18n-attr]');
        const attrUpdates = [];
        
        attrElements.forEach(element => {
            const attrConfig = element.getAttribute('data-i18n-attr');
            try {
                const config = JSON.parse(attrConfig);
                Object.entries(config).forEach(([attr, key]) => {
                    const translation = this.get(key);
                    if (translation && element.getAttribute(attr) !== translation) {
                        attrUpdates.push({ element, attr, translation });
                    }
                });
            } catch (error) {
                console.error('Error parsing data-i18n-attr:', error);
            }
        });
        
        // Apply attribute updates
        if (attrUpdates.length > 0) {
            requestAnimationFrame(() => {
                attrUpdates.forEach(({ element, attr, translation }) => {
                    element.setAttribute(attr, translation);
                });
            });
        }
        
    }
    
    updateMetaTags() {
        // Update page title
        const titleElement = document.querySelector('title');
        if (titleElement && titleElement.hasAttribute('data-i18n')) {
            const key = titleElement.getAttribute('data-i18n');
            const translation = this.get(key);
            if (translation) {
                titleElement.textContent = translation;
            }
        }
        
        // Update meta description
        const descElement = document.querySelector('meta[name=\"description\"]');
        if (descElement && descElement.hasAttribute('data-i18n')) {
            const key = descElement.getAttribute('data-i18n');
            const translation = this.get(key);
            if (translation) {
                descElement.setAttribute('content', translation);
            }
        }
        
        // Update Open Graph tags
        this.updateOpenGraphTags();
    }
    
    updateOpenGraphTags() {
        const ogTags = document.querySelectorAll('meta[property^=\"og:\"]');
        ogTags.forEach(tag => {
            if (tag.hasAttribute('data-i18n')) {
                const key = tag.getAttribute('data-i18n');
                const translation = this.get(key);
                if (translation) {
                    tag.setAttribute('content', translation);
                }
            }
        });
    }

    updateHreflangTags() {
        // Remove existing hreflang tags
        const existingTags = document.querySelectorAll('link[rel="alternate"][hreflang]');
        existingTags.forEach(tag => tag.remove());

        // Get current path without language prefix
        const currentPath = this.getBasePath();
        
        // Add hreflang tags for each supported language
        this.supportedLanguages.forEach(lang => {
            const link = document.createElement('link');
            link.rel = 'alternate';
            link.hreflang = lang;
            
            // Generate URL for this language
            if (lang === this.defaultLanguage && !this.urlConfig.defaultLanguageInUrl) {
                link.href = `${this.urlConfig.baseUrl}${currentPath}`;
            } else {
                link.href = `${this.urlConfig.baseUrl}/${lang}${currentPath}`;
            }
            
            document.head.appendChild(link);
        });

        // Add x-default hreflang for default language
        const defaultLink = document.createElement('link');
        defaultLink.rel = 'alternate';
        defaultLink.hreflang = 'x-default';
        defaultLink.href = `${this.urlConfig.baseUrl}${currentPath}`;
        document.head.appendChild(defaultLink);
    }

    getBasePath() {
        const path = window.location.pathname;
        const langMatch = path.match(/^\/([a-z]{2})\/(.*)/);
        if (langMatch) {
            return '/' + langMatch[2];
        }
        return path;
    }
    
    updateForms() {
        // Update form labels and placeholders
        const formElements = document.querySelectorAll('input, textarea, select, label');
        formElements.forEach(element => {
            if (element.hasAttribute('data-i18n-placeholder')) {
                const key = element.getAttribute('data-i18n-placeholder');
                const translation = this.get(key);
                if (translation) {
                    element.setAttribute('placeholder', translation);
                }
            }
        });
    }
    
    get(key) {
        const keys = key.split('.');
        let value = this.translations;
        
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return null;
            }
        }
        
        
        return value;
    }
    
    isRTL() {
        return this.rtlLanguages.includes(this.currentLanguage);
    }
    
    async changeLanguage(newLanguage) {
        if (!this.supportedLanguages.includes(newLanguage)) {
            console.error(`Language ${newLanguage} is not supported`);
            return;
        }
        
        if (newLanguage === this.currentLanguage) {
            return;
        }
        
        this.currentLanguage = newLanguage;
        localStorage.setItem('rosehill_language', newLanguage);
        
        // Clear cache for this language to force fresh load
        this.translationCache.delete(newLanguage);
        this.loadedLanguages.delete(newLanguage);
        
        // Load new translations
        await this.loadTranslations();
        
        // Apply new language
        this.applyLanguage();
        
        // Update URL
        this.updateUrl();
        
        // Dispatch event
        this.dispatchEvent('languageChanged', { language: newLanguage });
    }

    // Alias for changeLanguage for compatibility
    async setLanguage(newLanguage) {
        return this.changeLanguage(newLanguage);
    }

    /**
     * Preload language files for better performance
     * @param {string|Array} languages - Language code(s) to preload
     */
    async preloadLanguages(languages) {
        if (typeof languages === 'string') {
            languages = [languages];
        }
        
        const preloadPromises = languages
            .filter(lang => this.supportedLanguages.includes(lang))
            .filter(lang => !this.loadedLanguages.has(lang))
            .map(async (lang) => {
                try {
                    const translations = await this.fetchTranslations(lang);
                    this.translationCache.set(lang, translations);
                    this.loadedLanguages.add(lang);
                    return { lang, success: true };
                } catch (error) {
                    console.warn(`Failed to preload language ${lang}:`, error);
                    return { lang, success: false, error };
                }
            });
        
        return Promise.all(preloadPromises);
    }

    /**
     * Clear language cache to free memory
     * @param {string} excludeLang - Language to keep in cache
     */
    clearCache(excludeLang = this.currentLanguage) {
        this.translationCache.forEach((value, key) => {
            if (key !== excludeLang) {
                this.translationCache.delete(key);
                this.loadedLanguages.delete(key);
            }
        });
    }

    /**
     * Get performance metrics
     */
    getPerformanceMetrics() {
        return {
            cachedLanguages: this.loadedLanguages.size,
            currentCacheSize: this.translationCache.size,
            supportedLanguages: this.supportedLanguages.length,
            currentLanguage: this.currentLanguage,
            cacheHitRate: this.loadedLanguages.size / this.supportedLanguages.length,
            memoryUsage: this.estimateMemoryUsage()
        };
    }

    /**
     * Estimate memory usage of cached translations
     */
    estimateMemoryUsage() {
        let totalSize = 0;
        this.translationCache.forEach((translations) => {
            totalSize += JSON.stringify(translations).length * 2; // Rough UTF-16 estimation
        });
        return {
            bytes: totalSize,
            kb: Math.round(totalSize / 1024),
            mb: Math.round(totalSize / (1024 * 1024))
        };
    }

    /**
     * Cleanup method for memory management
     */
    destroy() {
        this.translationCache.clear();
        this.loadedLanguages.clear();
        this.pendingLoads.clear();
        this.translations = {};
        this.isLoaded = false;
        
        // Remove event listeners
        document.removeEventListener('click', this.handleLanguageSwitcherClick);
        
        // Clear any pending timers or intervals
        if (this.preloadTimer) {
            clearTimeout(this.preloadTimer);
        }
    }
    
    updateUrl() {
        if (!this.urlConfig.languagePrefix) return;
        
        const currentPath = window.location.pathname;
        const currentLang = this.getLanguageFromUrl();
        
        let newPath;
        if (currentLang) {
            // Replace existing language
            newPath = currentPath.replace(`/${currentLang}/`, `/${this.currentLanguage}/`);
        } else {
            // Add language prefix
            newPath = `/${this.currentLanguage}${currentPath}`;
        }
        
        // Don't show /en/ for English if configured
        if (this.currentLanguage === this.defaultLanguage && !this.urlConfig.defaultLanguageInUrl) {
            newPath = currentPath.replace(/^\/[a-z]{2}\//, '/');
        }
        
        // Update URL without page reload
        window.history.pushState(null, '', newPath);
    }
    
    initLanguageSwitcher() {
        // Create language switcher if it doesn't exist
        if (!document.querySelector('.language-switcher')) {
            this.createLanguageSwitcher();
        }
        
        // Add event listeners
        this.addLanguageSwitcherEvents();
    }
    
    createLanguageSwitcher() {
        const switcher = document.createElement('div');
        switcher.className = 'language-switcher';
        switcher.innerHTML = `
            <button class=\"language-switcher-btn\" aria-label=\"${this.get('common.language') || 'Language'}\">
                <span class=\"current-language\">${this.translations.meta.flag} ${this.translations.meta.nativeName}</span>
                <svg class=\"language-switcher-icon\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"currentColor\">
                    <path d=\"M8 11L3 6h10l-5 5z\"/>
                </svg>
            </button>
            <div class=\"language-switcher-dropdown\">
                ${this.supportedLanguages.map(lang => `
                    <button class=\"language-option\" data-language=\"${lang}\">
                        ${this.getLanguageFlag(lang)} ${this.getLanguageName(lang)}
                    </button>
                `).join('')}
            </div>
        `;
        
        // Add to header navigation
        const nav = document.querySelector('nav .hidden.lg\\:flex');
        if (nav) {
            nav.appendChild(switcher);
        }
    }
    
    addLanguageSwitcherEvents() {
        const switcherBtn = document.querySelector('.language-switcher-btn');
        const dropdown = document.querySelector('.language-switcher-dropdown');
        const options = document.querySelectorAll('.language-option');
        
        if (switcherBtn) {
            switcherBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('show');
            });
        }
        
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const language = option.getAttribute('data-language');
                this.changeLanguage(language);
                dropdown.classList.remove('show');
            });
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            dropdown?.classList.remove('show');
        });
    }
    
    getLanguageFlag(lang) {
        const flags = {
            'en': '🇬🇧',
            'fr': '🇫🇷',
            'es': '🇪🇸',
            'ar': '🇸🇦'
        };
        return flags[lang] || '🌐';
    }
    
    getLanguageName(lang) {
        const names = {
            'en': 'English',
            'fr': 'Français',
            'es': 'Español',
            'ar': 'العربية'
        };
        return names[lang] || lang.toUpperCase();
    }
    
    dispatchEvent(eventName, detail = {}) {
        const event = new CustomEvent(eventName, { detail });
        window.dispatchEvent(event);
    }
    
    // Utility methods for dynamic content
    formatNumber(number, options = {}) {
        const formatter = new Intl.NumberFormat(this.currentLanguage, options);
        return formatter.format(number);
    }
    
    formatDate(date, options = {}) {
        const formatter = new Intl.DateTimeFormat(this.currentLanguage, options);
        return formatter.format(date);
    }
    
    formatCurrency(amount, currency = 'GBP', options = {}) {
        const formatter = new Intl.NumberFormat(this.currentLanguage, {
            style: 'currency',
            currency: currency,
            ...options
        });
        return formatter.format(amount);
    }
    
    // Helper method to get current language info
    getCurrentLanguageInfo() {
        return {
            code: this.currentLanguage,
            name: this.translations.meta.name,
            nativeName: this.translations.meta.nativeName,
            direction: this.translations.meta.dir,
            isRTL: this.isRTL()
        };
    }
}

// Initialize i18n system
let i18n;

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        i18n = new RosehillI18n();
        window.i18n = i18n;
    });
} else {
    i18n = new RosehillI18n();
    window.i18n = i18n;
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RosehillI18n;
}