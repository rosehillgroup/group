/**
 * GDPR/UK GDPR Compliant Cookie Consent Banner
 * Rosehill Group - 2025
 */

class CookieConsent {
    constructor() {
        this.cookieName = 'rh_cookie_consent';
        this.cookieExpiry = 365; // days
        this.preferencesName = 'rh_cookie_preferences';
        
        this.defaultPreferences = {
            essential: true,
            analytics: false,
            marketing: false,
            functional: false
        };
        
        this.init();
    }
    
    init() {
        // Check if user has already consented
        if (!this.hasConsented()) {
            this.showBanner();
        } else {
            this.applyPreferences();
        }
        
        // Add event listener for settings management
        this.addSettingsListener();
    }
    
    hasConsented() {
        return this.getCookie(this.cookieName) !== null;
    }
    
    showBanner() {
        const banner = this.createBanner();
        document.body.appendChild(banner);
        
        // Add event listeners
        this.addBannerEventListeners();
        
        // Show banner with animation
        setTimeout(() => {
            banner.classList.add('show');
        }, 100);
    }
    
    createBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.className = 'cookie-consent-banner';
        banner.innerHTML = `
            <div class="cookie-consent-content">
                <div class="cookie-consent-text">
                    <h3>🍪 We use cookies</h3>
                    <p>We use cookies to enhance your browsing experience, provide personalised content, and analyse our traffic. By clicking "Accept All", you consent to our use of cookies.</p>
                </div>
                <div class="cookie-consent-actions">
                    <button id="cookie-accept-all" class="cookie-btn cookie-btn-primary">Accept All</button>
                    <button id="cookie-reject-all" class="cookie-btn cookie-btn-secondary">Reject All</button>
                    <button id="cookie-manage" class="cookie-btn cookie-btn-link">Manage Preferences</button>
                </div>
            </div>
        `;
        
        return banner;
    }
    
    createPreferencesModal() {
        const modal = document.createElement('div');
        modal.id = 'cookie-preferences-modal';
        modal.className = 'cookie-preferences-modal';
        modal.innerHTML = `
            <div class="cookie-preferences-overlay"></div>
            <div class="cookie-preferences-content">
                <div class="cookie-preferences-header">
                    <h2>Cookie Preferences</h2>
                    <button id="close-preferences" class="cookie-close-btn">&times;</button>
                </div>
                <div class="cookie-preferences-body">
                    <p>We use different types of cookies to optimise your experience on our website. You can choose which categories you want to allow.</p>
                    
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h3>Essential Cookies</h3>
                            <label class="cookie-toggle">
                                <input type="checkbox" id="essential-cookies" checked disabled>
                                <span class="cookie-slider"></span>
                            </label>
                        </div>
                        <p>These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you such as setting your privacy preferences, logging in or filling in forms.</p>
                    </div>
                    
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h3>Analytics Cookies</h3>
                            <label class="cookie-toggle">
                                <input type="checkbox" id="analytics-cookies">
                                <span class="cookie-slider"></span>
                            </label>
                        </div>
                        <p>These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. We use Google Analytics to improve our website performance.</p>
                    </div>
                    
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h3>Marketing Cookies</h3>
                            <label class="cookie-toggle">
                                <input type="checkbox" id="marketing-cookies">
                                <span class="cookie-slider"></span>
                            </label>
                        </div>
                        <p>These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.</p>
                    </div>
                    
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h3>Functional Cookies</h3>
                            <label class="cookie-toggle">
                                <input type="checkbox" id="functional-cookies">
                                <span class="cookie-slider"></span>
                            </label>
                        </div>
                        <p>These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third-party providers whose services we have added to our pages.</p>
                    </div>
                </div>
                <div class="cookie-preferences-footer">
                    <button id="save-preferences" class="cookie-btn cookie-btn-primary">Save Preferences</button>
                    <button id="accept-all-preferences" class="cookie-btn cookie-btn-secondary">Accept All</button>
                </div>
            </div>
        `;
        
        return modal;
    }
    
    addBannerEventListeners() {
        document.getElementById('cookie-accept-all').addEventListener('click', () => {
            this.acceptAll();
        });
        
        document.getElementById('cookie-reject-all').addEventListener('click', () => {
            this.rejectAll();
        });
        
        document.getElementById('cookie-manage').addEventListener('click', () => {
            this.showPreferences();
        });
    }
    
    addPreferencesEventListeners() {
        document.getElementById('close-preferences').addEventListener('click', () => {
            this.closePreferences();
        });
        
        document.getElementById('save-preferences').addEventListener('click', () => {
            this.savePreferences();
        });
        
        document.getElementById('accept-all-preferences').addEventListener('click', () => {
            this.acceptAllFromPreferences();
        });
        
        // Close modal when clicking overlay
        document.querySelector('.cookie-preferences-overlay').addEventListener('click', () => {
            this.closePreferences();
        });
    }
    
    showPreferences() {
        const modal = this.createPreferencesModal();
        document.body.appendChild(modal);
        
        // Load current preferences
        this.loadPreferencesIntoModal();
        
        // Add event listeners
        this.addPreferencesEventListeners();
        
        // Show modal
        setTimeout(() => {
            modal.classList.add('show');
        }, 100);
    }
    
    loadPreferencesIntoModal() {
        const preferences = this.getPreferences();
        
        document.getElementById('analytics-cookies').checked = preferences.analytics;
        document.getElementById('marketing-cookies').checked = preferences.marketing;
        document.getElementById('functional-cookies').checked = preferences.functional;
    }
    
    closePreferences() {
        const modal = document.getElementById('cookie-preferences-modal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }
    
    acceptAll() {
        const preferences = {
            essential: true,
            analytics: true,
            marketing: true,
            functional: true
        };
        
        this.saveConsentAndPreferences(preferences);
        this.hideBanner();
        this.applyPreferences();
    }
    
    rejectAll() {
        const preferences = {
            essential: true,
            analytics: false,
            marketing: false,
            functional: false
        };
        
        this.saveConsentAndPreferences(preferences);
        this.hideBanner();
        this.applyPreferences();
    }
    
    savePreferences() {
        const preferences = {
            essential: true,
            analytics: document.getElementById('analytics-cookies').checked,
            marketing: document.getElementById('marketing-cookies').checked,
            functional: document.getElementById('functional-cookies').checked
        };
        
        this.saveConsentAndPreferences(preferences);
        this.closePreferences();
        this.hideBanner();
        this.applyPreferences();
    }
    
    acceptAllFromPreferences() {
        document.getElementById('analytics-cookies').checked = true;
        document.getElementById('marketing-cookies').checked = true;
        document.getElementById('functional-cookies').checked = true;
        this.savePreferences();
    }
    
    saveConsentAndPreferences(preferences) {
        // Save consent
        this.setCookie(this.cookieName, 'true', this.cookieExpiry);
        
        // Save preferences
        this.setCookie(this.preferencesName, JSON.stringify(preferences), this.cookieExpiry);
    }
    
    hideBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(() => {
                banner.remove();
            }, 300);
        }
    }
    
    applyPreferences() {
        const preferences = this.getPreferences();
        
        // Apply analytics cookies
        if (preferences.analytics) {
            this.enableAnalytics();
        } else {
            this.disableAnalytics();
        }
        
        // Apply marketing cookies
        if (preferences.marketing) {
            this.enableMarketing();
        } else {
            this.disableMarketing();
        }
        
        // Apply functional cookies
        if (preferences.functional) {
            this.enableFunctional();
        } else {
            this.disableFunctional();
        }
    }
    
    getPreferences() {
        const saved = this.getCookie(this.preferencesName);
        return saved ? JSON.parse(saved) : this.defaultPreferences;
    }
    
    enableAnalytics() {
        // Enable Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                analytics_storage: 'granted'
            });
        }
        
        // Set analytics enabled flag
        window.analyticsEnabled = true;
    }
    
    disableAnalytics() {
        // Disable Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                analytics_storage: 'denied'
            });
        }
        
        // Set analytics disabled flag
        window.analyticsEnabled = false;
        
        // Clear analytics cookies
        this.clearGoogleAnalyticsCookies();
    }
    
    enableMarketing() {
        // Enable marketing cookies
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                ad_storage: 'granted'
            });
        }
        
        window.marketingEnabled = true;
    }
    
    disableMarketing() {
        // Disable marketing cookies
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                ad_storage: 'denied'
            });
        }
        
        window.marketingEnabled = false;
    }
    
    enableFunctional() {
        window.functionalEnabled = true;
    }
    
    disableFunctional() {
        window.functionalEnabled = false;
    }
    
    clearGoogleAnalyticsCookies() {
        // Clear Google Analytics cookies
        const gaCookies = ['_ga', '_ga_', '_gid', '_gat'];
        gaCookies.forEach(cookie => {
            this.deleteCookie(cookie);
            this.deleteCookie(cookie, '.' + window.location.hostname);
        });
    }
    
    addSettingsListener() {
        // Add listener for cookie settings link
        document.addEventListener('click', (e) => {
            if (e.target && e.target.id === 'cookie-settings-link') {
                e.preventDefault();
                this.showPreferences();
            }
        });
    }
    
    // Utility methods
    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict;Secure`;
    }
    
    getCookie(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    
    deleteCookie(name, domain = '') {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; ${domain ? 'domain=' + domain : ''}`;
    }
    
    // Public methods
    resetConsent() {
        this.deleteCookie(this.cookieName);
        this.deleteCookie(this.preferencesName);
        this.clearGoogleAnalyticsCookies();
        location.reload();
    }
    
    getCurrentPreferences() {
        return this.getPreferences();
    }
}

// Initialize cookie consent when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.cookieConsent = new CookieConsent();
});

// CSS Styles
const styles = `
.cookie-consent-banner {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(26, 54, 93, 0.95);
    backdrop-filter: blur(10px);
    color: white;
    padding: 20px;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.2);
    transform: translateY(100%);
    transition: transform 0.3s ease;
    z-index: 10000;
}

.cookie-consent-banner.show {
    transform: translateY(0);
}

.cookie-consent-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
}

.cookie-consent-text h3 {
    margin: 0 0 8px 0;
    font-size: 1.2em;
    font-weight: 600;
}

.cookie-consent-text p {
    margin: 0;
    font-size: 0.9em;
    line-height: 1.4;
    opacity: 0.9;
}

.cookie-consent-actions {
    display: flex;
    gap: 10px;
    flex-shrink: 0;
}

.cookie-btn {
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    font-size: 0.9em;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
}

.cookie-btn-primary {
    background: #FF6B35;
    color: white;
}

.cookie-btn-primary:hover {
    background: #E55A2B;
    transform: translateY(-1px);
}

.cookie-btn-secondary {
    background: transparent;
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.cookie-btn-secondary:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
}

.cookie-btn-link {
    background: none;
    color: #FF6B35;
    text-decoration: underline;
    padding: 12px 16px;
}

.cookie-btn-link:hover {
    color: white;
}

.cookie-preferences-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10001;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.cookie-preferences-modal.show {
    opacity: 1;
    visibility: visible;
}

.cookie-preferences-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
}

.cookie-preferences-content {
    position: relative;
    background: white;
    max-width: 600px;
    margin: 50px auto;
    border-radius: 12px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    transform: translateY(20px);
    transition: transform 0.3s ease;
    max-height: 80vh;
    overflow-y: auto;
}

.cookie-preferences-modal.show .cookie-preferences-content {
    transform: translateY(0);
}

.cookie-preferences-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    border-bottom: 1px solid #e0e0e0;
}

.cookie-preferences-header h2 {
    margin: 0;
    color: #1A365D;
    font-size: 1.5em;
}

.cookie-close-btn {
    background: none;
    border: none;
    font-size: 2em;
    color: #666;
    cursor: pointer;
    line-height: 1;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cookie-close-btn:hover {
    color: #FF6B35;
}

.cookie-preferences-body {
    padding: 24px;
}

.cookie-preferences-body > p {
    margin: 0 0 24px 0;
    color: #666;
    line-height: 1.6;
}

.cookie-category {
    margin-bottom: 24px;
    padding: 16px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
}

.cookie-category-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.cookie-category-header h3 {
    margin: 0;
    color: #1A365D;
    font-size: 1.1em;
}

.cookie-category p {
    margin: 0;
    color: #666;
    font-size: 0.9em;
    line-height: 1.5;
}

.cookie-toggle {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
}

.cookie-toggle input {
    opacity: 0;
    width: 0;
    height: 0;
}

.cookie-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    border-radius: 24px;
    transition: 0.3s;
}

.cookie-slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    border-radius: 50%;
    transition: 0.3s;
}

.cookie-toggle input:checked + .cookie-slider {
    background-color: #FF6B35;
}

.cookie-toggle input:checked + .cookie-slider:before {
    transform: translateX(26px);
}

.cookie-toggle input:disabled + .cookie-slider {
    background-color: #4CAF50;
    cursor: not-allowed;
}

.cookie-preferences-footer {
    padding: 24px;
    border-top: 1px solid #e0e0e0;
    display: flex;
    gap: 12px;
    justify-content: flex-end;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
    .cookie-consent-content {
        flex-direction: column;
        align-items: stretch;
        gap: 16px;
    }
    
    .cookie-consent-actions {
        flex-direction: column;
    }
    
    .cookie-preferences-content {
        margin: 20px;
        max-height: 90vh;
    }
    
    .cookie-preferences-header,
    .cookie-preferences-body,
    .cookie-preferences-footer {
        padding: 16px;
    }
    
    .cookie-preferences-footer {
        flex-direction: column;
    }
}
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);