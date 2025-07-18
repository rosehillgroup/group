# i18n Implementation Reference for Rosehill Group Website

## Overview
This document provides a comprehensive reference for implementing the internationalization (i18n) system across all pages of the Rosehill Group website. It covers all issues encountered and solutions implemented during the about.html implementation.

## Core System Files
- **i18n.js**: Main internationalization library (already exists)
- **rtl.css**: Right-to-left styling for Arabic (already exists)
- **languages/**: Translation files for en.json, fr.json, es.json, ar.json (already exists)

## Step-by-Step Implementation Process

### 1. Add Core i18n Files to Page Head
```html
<script src="https://cdn.tailwindcss.com"></script>
<link rel="stylesheet" href="rtl.css">
<script src="i18n.js"></script>
```

### 2. Add Language Switcher to Navigation

#### Desktop Navigation (after search button, before Get Quote)
```html
<!-- Language Switcher -->
<div class="language-switcher">
    <button class="language-switcher-btn" aria-expanded="false">
        <span class="current-language">🇬🇧 English</span>
        <svg class="language-switcher-icon w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
    </button>
    <div class="language-switcher-dropdown" role="listbox">
        <button class="language-option" role="option" data-language="en">🇬🇧 English</button>
        <button class="language-option" role="option" data-language="fr">🇫🇷 Français</button>
        <button class="language-option" role="option" data-language="es">🇪🇸 Español</button>
        <button class="language-option" role="option" data-language="ar">🇸🇦 العربية</button>
    </div>
</div>
```

### 3. Add Language Switcher CSS (before closing </body> tag)
```html
<!-- Language Switcher Styles -->
<style>
    .language-switcher {
        position: relative !important;
        display: inline-block !important;
    }
    
    .language-switcher-dropdown {
        position: absolute !important;
        top: 100% !important;
        right: 0 !important;
        background: white !important;
        border: 1px solid #d1d5db !important;
        border-radius: 8px !important;
        box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
        z-index: 1000 !important;
        min-width: 160px !important;
        margin-top: 4px !important;
        opacity: 0 !important;
        visibility: hidden !important;
        transform: translateY(-10px) !important;
        transition: all 0.2s ease !important;
    }
    
    .language-switcher-dropdown.show {
        opacity: 1 !important;
        visibility: visible !important;
        transform: translateY(0) !important;
    }
    
    .language-option {
        display: block !important;
        width: 100% !important;
        padding: 0.75rem 1rem !important;
        text-align: left !important;
        background: none !important;
        border: none !important;
        cursor: pointer !important;
        font-size: 0.875rem !important;
        transition: background-color 0.2s ease !important;
    }
    
    .language-option:hover {
        background-color: #f3f4f6 !important;
    }
    
    .language-switcher-btn {
        display: flex !important;
        align-items: center !important;
        padding: 8px 12px !important;
        border: 1px solid #d1d5db !important;
        border-radius: 6px !important;
        background: #f8f9fa !important;
        color: #374151 !important;
        cursor: pointer !important;
        transition: all 0.2s ease !important;
    }
    
    .language-switcher-btn:hover {
        background-color: #e2e8f0 !important;
        border-color: #9ca3af !important;
        color: #FF6B35 !important;
    }
    
    .language-switcher-icon {
        margin-left: 0.25rem !important;
        transition: transform 0.2s ease !important;
    }
    
    .language-switcher-btn[aria-expanded="true"] .language-switcher-icon {
        transform: rotate(180deg) !important;
    }
</style>
```

### 4. Add Language Switcher JavaScript (before closing </body> tag)
```html
<!-- Initialize i18n -->
<script>
    document.addEventListener('DOMContentLoaded', async function() {
        const i18n = new RosehillI18n();
        window.i18n = i18n;
        
        // Set up language switcher
        const langSwitcherBtn = document.querySelector('.language-switcher-btn');
        const langSwitcherDropdown = document.querySelector('.language-switcher-dropdown');
        const langOptions = document.querySelectorAll('.language-option');
        const currentLangSpan = document.querySelector('.current-language');
        
        if (langSwitcherBtn && langSwitcherDropdown) {
            // Toggle dropdown
            langSwitcherBtn.addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                
                const isExpanded = langSwitcherBtn.getAttribute('aria-expanded') === 'true';
                langSwitcherBtn.setAttribute('aria-expanded', !isExpanded);
                langSwitcherDropdown.classList.toggle('show');
                
                // Force inline styles as fallback
                if (langSwitcherDropdown.classList.contains('show')) {
                    langSwitcherDropdown.style.cssText = 'opacity: 1 !important; visibility: visible !important; transform: translateY(0) !important; display: block !important; position: absolute !important; top: 100% !important; right: 0 !important; z-index: 999999 !important; background: white !important; border: 1px solid #d1d5db !important; border-radius: 8px !important; box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important; min-width: 160px !important; margin-top: 4px !important;';
                } else {
                    langSwitcherDropdown.style.cssText = 'opacity: 0 !important; visibility: hidden !important; transform: translateY(-10px) !important; position: absolute !important; top: 100% !important; right: 0 !important; z-index: 999999 !important; background: white !important; border: 1px solid #d1d5db !important; border-radius: 8px !important; box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important; min-width: 160px !important; margin-top: 4px !important;';
                }
            });
            
            // Handle language selection
            langOptions.forEach(option => {
                option.addEventListener('click', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    
                    const lang = this.getAttribute('data-language');
                    i18n.setLanguage(lang);
                    
                    // Update current language display
                    currentLangSpan.textContent = this.textContent;
                    
                    // Close dropdown
                    langSwitcherBtn.setAttribute('aria-expanded', 'false');
                    langSwitcherDropdown.classList.remove('show');
                    langSwitcherDropdown.style.opacity = '0';
                    langSwitcherDropdown.style.visibility = 'hidden';
                });
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function() {
                langSwitcherBtn.setAttribute('aria-expanded', 'false');
                langSwitcherDropdown.classList.remove('show');
                langSwitcherDropdown.style.opacity = '0';
                langSwitcherDropdown.style.visibility = 'hidden';
            });
        }
        
        // Initialize i18n and update language display on load
        await i18n.init();
        
        // Update current language display after initialization
        if (currentLangSpan && i18n.currentLanguage) {
            const languageMap = {
                'en': '🇬🇧 English',
                'fr': '🇫🇷 Français',
                'es': '🇪🇸 Español',
                'ar': '🇸🇦 العربية'
            };
            currentLangSpan.textContent = languageMap[i18n.currentLanguage] || '🇬🇧 English';
        }
    });
</script>
```

## Critical Issues and Solutions

### Issue 1: Mega Menu Arrows Missing
**Problem**: Dropdown arrows disappeared from Solutions/Products menus
**Solution**: Wrap menu text in `<span>` with `data-i18n`, not the entire `<a>` tag
```html
<!-- WRONG -->
<a href="solutions.html" data-i18n="navigation.solutions">Solutions</a>

<!-- CORRECT -->
<a href="solutions.html">
    <span data-i18n="navigation.solutions">Solutions</span>
    <svg>...</svg>
</a>
```

### Issue 2: Language Switcher Button Not Updating
**Problem**: Button always shows "English" regardless of selected language
**Solution**: 
1. Add JavaScript to update `currentLangSpan.textContent` on language change
2. Add language mapping object to show correct flag and text
3. Update display on page load based on saved language preference

### Issue 3: Dropdown Not Appearing
**Problem**: Dropdown arrow rotates but dropdown doesn't show
**Solution**: Use inline styles to force dropdown visibility
```javascript
// Force inline styles as fallback
if (langSwitcherDropdown.classList.contains('show')) {
    langSwitcherDropdown.style.cssText = 'opacity: 1 !important; visibility: visible !important; transform: translateY(0) !important; display: block !important; position: absolute !important; top: 100% !important; right: 0 !important; z-index: 999999 !important; background: white !important; border: 1px solid #d1d5db !important; border-radius: 8px !important; box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important; min-width: 160px !important; margin-top: 4px !important;';
}
```

### Issue 4: Footer Address Text Justification
**Problem**: Address lines spreading across column width
**Solution**: 
1. Remove `data-i18n` attributes from address components
2. Use plain text with `<br>` tags like homepage
3. Don't translate company addresses - they remain the same in all languages

## Complete Navigation Translation Structure

### Desktop Navigation Links
```html
<a href="index.html" data-i18n="navigation.home">Home</a>
<a href="about.html" data-i18n="navigation.about">About</a>
<a href="solutions.html">
    <span data-i18n="navigation.solutions">Solutions</span>
    <svg>...</svg>
</a>
<a href="products.html">
    <span data-i18n="navigation.products">Products</span>
    <svg>...</svg>
</a>
<a href="projects.html" data-i18n="navigation.projects">Projects</a>
<a href="contact.html" data-i18n="navigation.contact">Contact</a>
<a href="contact.html" data-i18n="navigation.getQuote">Get Quote</a>
```

### Mobile Navigation Links
```html
<a href="index.html" data-i18n="navigation.home">Home</a>
<a href="about.html" data-i18n="navigation.about">About</a>
<a href="solutions.html" data-i18n="navigation.solutions">Solutions</a>
<a href="products.html" data-i18n="navigation.products">Products</a>
<a href="projects.html" data-i18n="navigation.projects">Projects</a>
<a href="contact.html" data-i18n="navigation.contact">Contact</a>
<a href="contact.html" class="contact-btn" data-i18n="navigation.getQuote">Get Quote</a>
```

### Solutions Mega Menu
```html
<h3 data-i18n="navigation.solutionsBySector">Solutions by Sector</h3>
<a href="solutions.html">
    <span data-i18n="navigation.viewAll">View all</span>
    <svg>...</svg>
</a>

<!-- Solutions Cards -->
<h4 data-i18n="navigation.roadSafety">Road Safety</h4>
<p data-i18n="navigation.trafficManagement">Traffic management systems</p>

<h4 data-i18n="navigation.railInfrastructure">Rail Infrastructure</h4>
<p data-i18n="navigation.railwaySystems">Railway systems & safety</p>

<h4 data-i18n="navigation.defenceSecurity">Defence & Security</h4>
<p data-i18n="navigation.hvmBallistic">HVM & Ballistic protection</p>

<h4 data-i18n="navigation.energySubsea">Energy & Subsea</h4>
<p data-i18n="navigation.marineOffshore">Marine & offshore solutions</p>

<h4 data-i18n="navigation.sportsRecreation">Sports & Recreation</h4>
<p data-i18n="navigation.rubberSurfacing">Rubber surfacing solutions</p>

<h4 data-i18n="navigation.drainageSolutions">Drainage Solutions</h4>
<p data-i18n="navigation.waterManagement">Water management systems</p>
```

### Products Mega Menu
```html
<h3 data-i18n="navigation.completeProductRange">Complete Product Range</h3>

<!-- Road Safety Products -->
<h4 data-i18n="navigation.roadSafetySolutions">Road Safety Solutions</h4>
<a href="..." data-i18n="navigation.cycleLaneDefenders">Cycle Lane Defenders</a>
<a href="..." data-i18n="navigation.ncldLite">NCLD Lite</a>
<a href="..." data-i18n="navigation.laneSeparators">Lane Separators</a>
<a href="..." data-i18n="navigation.trafficIslands">Traffic Islands</a>
<a href="..." data-i18n="navigation.pedestrianRefuges">Pedestrian Refuges</a>
<a href="..." data-i18n="navigation.speedCushions">Speed Cushions</a>
<a href="..." data-i18n="navigation.chicanes">Chicanes</a>
<a href="..." data-i18n="navigation.raisedTablesZebraCrossings">Raised Tables & Zebra Crossings</a>
<a href="..." data-i18n="navigation.speedCalmers">Speed Calmers</a>

<!-- Rail Infrastructure Products -->
<h4 data-i18n="navigation.railInfrastructureProducts">Rail Infrastructure</h4>
<a href="..." data-i18n="navigation.connectSystem">Connect System</a>
<a href="..." data-i18n="navigation.baseplatedSystem">Baseplated System</a>
<a href="..." data-i18n="navigation.linkSystem">Link System</a>
<a href="..." data-i18n="navigation.interlockingSystem">Interlocking System</a>

<!-- Defence & Security Products -->
<h4 data-i18n="navigation.defenceSecurityProducts">Defence & Security</h4>
<a href="..." data-i18n="navigation.rapidDefender">Rapid Defender</a>
<a href="..." data-i18n="navigation.impaktDefender">Impakt Defender</a>
<a href="..." data-i18n="navigation.ballisticBlocks">Ballistic Blocks</a>
<a href="..." data-i18n="navigation.ballisticTiles">Ballistic Tiles</a>

<!-- Energy & Subsea Products -->
<h4 data-i18n="navigation.energySubseaProducts">Energy & Subsea</h4>
<a href="..." data-i18n="navigation.castablePolyurethanes">Castable Polyurethanes</a>
<a href="..." data-i18n="navigation.cableProtection">Cable Protection</a>

<!-- Rail Safety & Access Products -->
<h4 data-i18n="navigation.railSafetyAccess">Rail Safety & Access</h4>
<a href="..." data-i18n="navigation.titanHeavyDutyCrossing">Titan Heavy Duty Crossing</a>
<a href="..." data-i18n="navigation.antiTrespassPanels">Anti-Trespass Panels</a>
<a href="..." data-i18n="navigation.walkwayPanels">Walkway Panels</a>
<a href="..." data-i18n="navigation.edgeBeams">Edge Beams</a>

<!-- Sports & Recreation Products -->
<h4 data-i18n="navigation.sportsRecreationProducts">Sports & Recreation</h4>
<a href="..." data-i18n="navigation.playgroundSurfaces">Playground Surfaces</a>
<a href="..." data-i18n="navigation.multiUseGamesAreas">Multi-use Games Areas</a>
<a href="..." data-i18n="navigation.runningTracks">Running Tracks</a>
<a href="..." data-i18n="navigation.sportsPitches">Sports Pitches</a>
<a href="..." data-i18n="navigation.footpaths">Footpaths</a>
<a href="..." data-i18n="navigation.splashParks">Splash Parks</a>
<a href="..." data-i18n="navigation.poolSurrounds">Pool Surrounds</a>
<a href="..." data-i18n="navigation.turfInfill">Turf Infill</a>
<a href="..." data-i18n="navigation.flexilonBinders">Flexilon Binders</a>

<!-- Drainage Solutions Products -->
<h4 data-i18n="navigation.drainageSolutionsProducts">Drainage Solutions</h4>
<a href="..." data-i18n="navigation.troughStackerSystem">Trough & Stacker System</a>
<a href="..." data-i18n="navigation.drainageMats">Drainage Mats</a>

<!-- Browse All Products -->
<a href="products.html">
    <span data-i18n="navigation.browseProductCatalog">Browse Product Catalog</span>
    <svg>...</svg>
</a>
```

## Footer Translation Structure

### Footer Sections
```html
<!-- About Section -->
<h4 data-i18n="footer.about">About</h4>
<a href="about.html" data-i18n="footer.links.aboutRosehill">About Rosehill</a>
<a href="projects.html" data-i18n="footer.links.ourProjects">Our Projects</a>
<a href="contact.html" data-i18n="footer.links.contactUs">Contact Us</a>
<a href="products.html" data-i18n="footer.links.allProducts">All Products</a>

<!-- Our Solutions Section -->
<h4 data-i18n="footer.ourSolutions">Our Solutions</h4>
<a href="..." data-i18n="navigation.roadSafety">Road Safety</a>
<a href="..." data-i18n="navigation.railInfrastructure">Rail Infrastructure</a>
<a href="..." data-i18n="navigation.defenceSecurity">Defence & Security</a>
<a href="..." data-i18n="navigation.energySubsea">Energy & Subsea</a>
<a href="..." data-i18n="navigation.sportsRecreation">Sports & Recreation</a>
<a href="..." data-i18n="navigation.drainageSolutions">Drainage Solutions</a>

<!-- Contact Section -->
<h4 data-i18n="footer.getInTouch">Get in touch</h4>
<p data-i18n="footer.madeInUK">All Rosehill products are manufactured...</p>

<!-- Address (NO TRANSLATION) -->
<p class="flex items-start">
    <svg>...</svg>
    Rosehill Group<br>
    Beech Road<br>
    Sowerby Bridge<br>
    HX6 2JT
</p>

<!-- Legal Links -->
<a href="privacy-policy.html" data-i18n="footer.links.privacyPolicy">Privacy Policy</a>
<a href="terms-of-use.html" data-i18n="footer.links.termsOfUse">Terms of Use</a>
<a href="cookie-policy.html" data-i18n="footer.links.cookiePolicy">Cookie Policy</a>
<a href="#" data-i18n="footer.links.cookieSettings">Cookie Settings</a>
<a href="sitemap.html" data-i18n="footer.links.sitemap">Sitemap</a>

<!-- Copyright -->
<p data-i18n="footer.copyright">&copy; 2025 Rosehill Group. All rights reserved.</p>
<p data-i18n="footer.companyInfo.line1">Rosehill Polymers Ltd | Company No: 02283308 | VAT No: GB516206181</p>
<p data-i18n="footer.companyInfo.line2">Registered Address: Rose Hill Mill, Beech Road, Sowerby Bridge, West Yorkshire, HX6 2JT, United Kingdom</p>
```

## Translation Files Structure

All translation keys are already available in:
- `/languages/en.json`
- `/languages/fr.json`
- `/languages/es.json`
- `/languages/ar.json`

The translation files contain:
- `navigation.*` - All navigation and menu items
- `footer.*` - All footer content
- Page-specific translations (e.g., `about.*`, `contact.*`, etc.)

## Testing Checklist

After implementing on each page, verify:
1. ✅ Language switcher appears in navigation
2. ✅ Dropdown arrow rotates on click
3. ✅ Dropdown menu appears with all 4 languages
4. ✅ Button text updates when language is selected
5. ✅ All navigation items translate correctly
6. ✅ All mega menu items translate correctly
7. ✅ All footer items translate correctly
8. ✅ Page content translates correctly
9. ✅ Arabic displays RTL correctly
10. ✅ Language choice persists across page navigation

## Common Pitfalls to Avoid

1. **Don't translate addresses** - Company addresses should remain unchanged
2. **Use `<span>` for mega menu text** - Don't add data-i18n to the entire `<a>` tag
3. **Force inline styles for dropdown** - CSS classes alone don't work reliably
4. **Update button text with JavaScript** - The i18n system doesn't handle this automatically
5. **Initialize i18n properly** - Use the complete JavaScript implementation
6. **Don't forget mobile menu** - Add data-i18n attributes to mobile navigation too

This reference should provide everything needed to implement the i18n system consistently across all remaining pages.