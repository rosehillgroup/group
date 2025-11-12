// ==========================================================================
// BDM Territory Tool - Application Logic
// ==========================================================================

// BDM Data (embedded to avoid CORS issues with file:// protocol)
const bdmAssignments = {
  "Rail": {
    "Dan Rainbird": {
      "regions": ["Europe (except Czechia)"],
      "countries": [
        "AT", "BE", "BG", "HR", "CY", "DK", "EE", "FI", "FR", "DE", "GR", "HU",
        "IS", "IT", "LV", "LT", "LU", "MT", "NL", "XNO", "PL", "PT", "RO", "SK",
        "SI", "ES", "SE", "CH", "GB", "RS", "AL", "BA", "MK", "ME", "UA", "BY",
        "MD", "LI", "MC", "AD", "SM", "VA"
      ]
    },
    "Dan Snell": {
      "regions": ["Rest of World", "Czechia", "Ireland"],
      "countries": [
        "CZ", "IE", "US", "CA", "MX", "BR", "AR", "CL", "CO", "PE", "VE", "EC",
        "BO", "PY", "UY", "GY", "SR", "GF", "CN", "JP", "KR", "IN", "ID", "MY",
        "TH", "VN", "PH", "SG", "BD", "PK", "LK", "MM", "KH", "LA", "NP", "BT",
        "MV", "AU", "NZ", "PG", "FJ", "NC", "ZA", "EG", "NG", "KE", "ET", "GH",
        "TZ", "UG", "DZ", "SD", "MA", "AO", "MZ", "MG", "CM", "CI", "NE", "BF",
        "ML", "MW", "ZM", "ZW", "SN", "SO", "XSO", "TD", "GN", "RW", "BJ", "TN", "BI", "SS",
        "TG", "SL", "LY", "LR", "MR", "CF", "ER", "GM", "BW", "GA", "NA", "LS",
        "GW", "GQ", "MU", "SZ", "DJ", "RE", "KM", "CV", "ST", "SC", "CD", "CG", "SA", "AE",
        "IR", "IQ", "IL", "JO", "LB", "SY", "YE", "OM", "KW", "QA", "BH", "PS",
        "RU", "TR", "KZ", "UZ", "TM", "KG", "TJ", "AM", "AZ", "GE", "AF", "MN"
      ]
    }
  },
  "Highways": {
    "Jack Ellis": {
      "regions": ["United Kingdom"],
      "countries": ["GB"]
    },
    "Dan Rainbird": {
      "regions": ["All of Europe"],
      "countries": [
        "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
        "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "XNO", "PL", "PT",
        "RO", "SK", "SI", "ES", "SE", "CH", "RS", "AL", "BA", "MK", "ME", "UA",
        "BY", "MD", "LI", "MC", "AD", "SM", "VA"
      ]
    },
    "Dan Snell": {
      "regions": ["USA", "Australia", "Middle East", "Asia"],
      "countries": [
        "US", "AU", "NZ", "SA", "AE", "IR", "IQ", "IL", "JO", "LB", "SY", "YE",
        "OM", "KW", "QA", "BH", "PS", "CN", "JP", "KR", "IN", "ID", "MY", "TH",
        "VN", "PH", "SG", "BD", "PK", "LK", "MM", "KH", "LA", "NP", "BT", "MV",
        "MN", "KZ", "UZ", "TM", "KG", "TJ", "AF"
      ]
    }
  },
  "Rosehill TPV": {
    "Dan Fletcher": {
      "regions": ["North America", "Canada", "Australia", "New Zealand"],
      "countries": ["US", "CA", "AU", "NZ"]
    },
    "Dalton Marshall": {
      "regions": ["Mexico", "Central America", "Caribbean", "South America", "Malaysia", "Japan", "Hong Kong"],
      "countries": [
        "MX", "BZ", "GT", "HN", "SV", "NI", "CR", "PA", "CU", "JM", "HT", "DO",
        "PR", "BS", "TT", "BB", "LC", "GD", "VC", "AG", "DM", "KN", "VG", "AI",
        "TC", "KY", "AW", "CW", "SX", "BQ", "MF", "BL", "GP", "MQ",
        "BR", "AR", "CL", "CO", "PE", "VE", "EC", "BO", "PY", "UY", "GY", "SR",
        "GF", "MY", "JP", "HK"
      ]
    },
    "Clare Riley": {
      "regions": ["Western Europe"],
      "countries": [
        "GB", "IE", "FR", "DE", "BE", "NL", "LU", "AT", "CH", "IT", "ES", "PT",
        "DK", "XNO", "SE", "FI", "IS", "LI", "MC", "AD", "SM", "VA"
      ]
    },
    "Josh Jones": {
      "regions": ["Eastern Europe", "Africa", "Middle East", "India"],
      "countries": [
        "PL", "CZ", "SK", "HU", "RO", "BG", "SI", "HR", "BA", "RS", "ME", "AL",
        "MK", "GR", "CY", "EE", "LV", "LT", "BY", "UA", "MD", "MT", "ZA", "EG",
        "NG", "KE", "ET", "GH", "TZ", "UG", "DZ", "SD", "MA", "AO", "MZ", "MG",
        "CM", "CI", "NE", "BF", "ML", "MW", "ZM", "ZW", "SN", "SO", "XSO", "TD", "GN", "RW",
        "BJ", "TN", "BI", "SS", "TG", "SL", "LY", "LR", "MR", "CF", "ER", "GM",
        "BW", "GA", "NA", "LS", "GW", "GQ", "MU", "SZ", "DJ", "RE", "KM", "CV",
        "ST", "SC", "CD", "CG", "SA", "AE", "IR", "IQ", "IL", "JO", "LB", "SY", "YE", "OM",
        "KW", "QA", "BH", "PS", "TR", "IN", "PK", "BD", "LK", "NP", "BT", "MV",
        "AF"
      ]
    }
  },
  "Security": {
    "Dan Rainbird": {
      "regions": ["Worldwide"],
      "countries": ["*"]
    }
  },
  "Energy": {
    "Nadeem Riyazuddin": {
      "regions": ["Worldwide"],
      "countries": ["*"]
    }
  },
  "Chemicals": {
    "Dalton Marshall": {
      "regions": ["Worldwide"],
      "countries": ["*"]
    }
  },
  "Drainage": {
    "Tommy Celik": {
      "regions": ["Worldwide"],
      "countries": ["*"]
    }
  }
};

const bdmProfiles = {
  "Dan Rainbird": {
    "name": "Dan Rainbird",
    "title": "Business Development Manager",
    "email": "dan.rainbird@rosehill.group",
    "phone": "+44 (0)7415 428 133",
    "photo": "images/bdm/dan_rainbird.jpg",
    "divisions": ["Rail", "Highways", "Security"],
    "color": "#1a365d"
  },
  "Dan Snell": {
    "name": "Dan Snell",
    "title": "Business Development Manager",
    "email": "dan.snell@rosehill.group",
    "phone": "+44 (0)7583 082 596",
    "photo": "images/bdm/dan_snell.jpg",
    "divisions": ["Rail", "Highways"],
    "color": "#007bff"
  },
  "Jack Ellis": {
    "name": "Jack Ellis",
    "title": "Business Development Manager - UK Highways",
    "email": "jack.ellis@rosehill.group",
    "phone": "+44 (0)7534 084 216",
    "photo": "images/bdm/jack_ellis.jpg",
    "divisions": ["Highways"],
    "color": "#ff6b35"
  },
  "Dan Fletcher": {
    "name": "Dan Fletcher",
    "title": "Business Development Manager - TPV Americas & Oceania",
    "email": "dan.fletcher@rosehill.group",
    "phone": "+44 (0) 1535 664060",
    "photo": "images/bdm/dan-fletcher.jpg",
    "divisions": ["Rosehill TPV"],
    "color": "#28a745"
  },
  "Dalton Marshall": {
    "name": "Dalton Marshall",
    "title": "Business Development Manager",
    "email": "dalton.marshall@rosehill.group",
    "phone": "+44 (0)7896 299 974",
    "photo": "images/bdm/dalton-marshall.jpg",
    "divisions": ["Rosehill TPV", "Chemicals"],
    "color": "#6f42c1"
  },
  "Clare Riley": {
    "name": "Clare Riley",
    "title": "Business Development Manager - TPV Western Europe",
    "email": "clare.riley@rosehill.group",
    "phone": "+44 (0) 1535 664060",
    "photo": "images/bdm/clare_riley.jpg",
    "divisions": ["Rosehill TPV"],
    "color": "#e83e8c"
  },
  "Josh Jones": {
    "name": "Josh Jones",
    "title": "Business Development Manager - TPV Eastern Europe, Africa, Middle East, India",
    "email": "joshua.jones@rosehill.group",
    "phone": "+44 (0)7818 063 506",
    "photo": "images/bdm/josh_jones.jpg",
    "divisions": ["Rosehill TPV"],
    "color": "#fd7e14"
  },
  "Nadeem Riyazuddin": {
    "name": "Nadeem Riyazuddin",
    "title": "Business Development Manager - Energy",
    "email": "nadeem.riyazuddin@rosehill.group",
    "phone": "+44 (0)7824 830 924",
    "photo": "images/bdm/nadeem-riyazuddin.jpg",
    "divisions": ["Energy"],
    "color": "#20c997"
  },
  "Tommy Celik": {
    "name": "Tommy Celik",
    "title": "Business Development Manager - Drainage",
    "email": "thomas.celik@rosehill.group",
    "phone": "+44 (0)7946 774 310",
    "photo": "images/bdm/tommy-celik.jpg",
    "divisions": ["Drainage"],
    "color": "#17a2b8"
  }
};

// Division color mapping
const divisionColors = {
  'Rail': '#2196F3',      // Bright Blue
  'Highways': '#FF9800',  // Bright Orange
  'Rosehill TPV': '#28a745',  // Green
  'Security': '#dc3545',      // Red
  'Energy': '#ffc107',        // Yellow
  'Chemicals': '#6f42c1',     // Purple
  'Drainage': '#17a2b8'       // Cyan
};

// ==========================================================================
// Pattern Generation for Multi-Division Territories
// ==========================================================================

// Create a striped pattern from multiple colors
function createStripePattern(colors) {
    const size = 32; // Smaller size for better performance
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    if (colors.length === 2) {
        // For 2 colors, create diagonal stripes
        const stripeWidth = 8;
        for (let i = 0; i < size; i += stripeWidth * 2) {
            ctx.fillStyle = colors[0];
            ctx.fillRect(i, 0, stripeWidth, size);
            ctx.fillStyle = colors[1];
            ctx.fillRect(i + stripeWidth, 0, stripeWidth, size);
        }
    } else if (colors.length === 3) {
        // For 3 colors, create thinner stripes
        const stripeWidth = 6;
        let colorIndex = 0;
        for (let i = 0; i < size; i += stripeWidth) {
            ctx.fillStyle = colors[colorIndex % colors.length];
            ctx.fillRect(i, 0, stripeWidth, size);
            colorIndex++;
        }
    } else {
        // For more colors, divide evenly
        const stripeWidth = size / colors.length;
        colors.forEach((color, index) => {
            ctx.fillStyle = color;
            ctx.fillRect(index * stripeWidth, 0, stripeWidth, size);
        });
    }

    return ctx.getImageData(0, 0, size, size);
}

// Add pattern to map
function addPatternToMap(patternId, colors) {
    if (!map || !map.isStyleLoaded()) {
        console.warn('Map not ready for pattern addition');
        return false;
    }

    if (!map.hasImage(patternId)) {
        try {
            const imageData = createStripePattern(colors);
            map.addImage(patternId, imageData, { pixelRatio: 1 });
            console.log(`✓ Added pattern: ${patternId}`);
            return true;
        } catch (error) {
            console.error(`Failed to add pattern ${patternId}:`, error);
            return false;
        }
    }
    return true;
}

// Global State
let map;
let countriesGeoJSON = null;
let currentMode = 'division';
let currentSelection = null;
let countryList = [];

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

// ==========================================================================
// App Initialization
// ==========================================================================

async function initializeApp() {
    try {
        console.log('✓ BDM data embedded');

        // Load countries GeoJSON
        await loadCountriesGeoJSON();

        // Initialize map
        initializeMap();

        // Initialize UI
        initializeFilters();
        populateBDMSelect();
        buildCountryList();

        // Hide loading indicator
        document.getElementById('mapLoading').classList.add('hidden');

    } catch (error) {
        console.error('Error initializing app:', error);
        alert('Error loading map data. Please check your internet connection and refresh the page.');
    }
}

// Load Countries GeoJSON
async function loadCountriesGeoJSON() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson');
        countriesGeoJSON = await response.json();
        console.log('✓ Countries GeoJSON loaded');
    } catch (error) {
        console.error('Error loading countries GeoJSON:', error);
        throw error;
    }
}

// ==========================================================================
// Map Initialization
// ==========================================================================

function initializeMap() {
    map = new maplibregl.Map({
        container: 'map',
        style: {
            version: 8,
            sources: {
                'carto-light': {
                    type: 'raster',
                    tiles: [
                        'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                        'https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                        'https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                        'https://d.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
                    ],
                    tileSize: 256,
                    attribution: '© OpenStreetMap contributors, © CARTO'
                },
                'countries': {
                    type: 'geojson',
                    data: countriesGeoJSON
                }
            },
            layers: [
                {
                    id: 'carto-light',
                    type: 'raster',
                    source: 'carto-light',
                    paint: {
                        'raster-opacity': 1
                    }
                },
                {
                    id: 'countries-fill',
                    type: 'fill',
                    source: 'countries',
                    paint: {
                        'fill-color': '#e0e0e0',
                        'fill-opacity': 0.3
                    }
                },
                {
                    id: 'countries-fill-pattern',
                    type: 'fill',
                    source: 'countries',
                    paint: {
                        'fill-pattern': '',
                        'fill-opacity': 0.7
                    },
                    filter: ['==', 'ISO_A2', '']  // Initially hide this layer
                },
                {
                    id: 'countries-outline',
                    type: 'line',
                    source: 'countries',
                    paint: {
                        'line-color': '#999',
                        'line-width': 1,
                        'line-opacity': 0.6
                    }
                },
                {
                    id: 'countries-hover',
                    type: 'fill',
                    source: 'countries',
                    paint: {
                        'fill-color': '#ff6b35',
                        'fill-opacity': 0
                    },
                    filter: ['==', 'ISO_A2', '']
                }
            ]
        },
        center: [0, 30],
        zoom: 2
    });

    // Add navigation controls
    map.addControl(new maplibregl.NavigationControl(), 'top-right');

    // Add hover effect
    map.on('mousemove', 'countries-fill', (e) => {
        if (e.features.length > 0) {
            map.getCanvas().style.cursor = 'pointer';
        }
    });

    map.on('mouseleave', 'countries-fill', () => {
        map.getCanvas().style.cursor = '';
    });

    // Add click handler
    map.on('click', 'countries-fill', handleCountryClick);
}

// ==========================================================================
// Filter Initialization
// ==========================================================================

function initializeFilters() {
    // Filter tab switching
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const mode = tab.dataset.mode;
            switchFilterMode(mode);
        });
    });

    // Division filter
    document.getElementById('divisionSelect').addEventListener('change', (e) => {
        handleDivisionChange(e.target.value);
    });

    // Country search
    const countrySearch = document.getElementById('countrySearch');
    countrySearch.addEventListener('input', handleCountrySearch);
    countrySearch.addEventListener('focus', () => {
        if (countrySearch.value.length >= 1) {
            document.getElementById('countryDropdown').classList.remove('hidden');
        }
    });

    // BDM filter
    document.getElementById('bdmSelect').addEventListener('change', (e) => {
        handleBDMChange(e.target.value);
    });

    // Reset button
    document.getElementById('resetBtn').addEventListener('click', resetMap);

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#countryFilter')) {
            document.getElementById('countryDropdown').classList.add('hidden');
        }
    });
}

// Switch filter mode
function switchFilterMode(mode) {
    currentMode = mode;

    // Update active tab
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.mode === mode);
    });

    // Show/hide filter sections
    document.getElementById('divisionFilter').classList.toggle('hidden', mode !== 'division');
    document.getElementById('countryFilter').classList.toggle('hidden', mode !== 'country');
    document.getElementById('bdmFilter').classList.toggle('hidden', mode !== 'bdm');

    // Reset
    resetMap();
}

// ==========================================================================
// Division Filter
// ==========================================================================

function handleDivisionChange(division) {
    if (!division) {
        resetMap();
        return;
    }

    currentSelection = { type: 'division', value: division };

    // Get BDMs for this division
    const bdmsForDivision = bdmAssignments[division];
    if (!bdmsForDivision) {
        console.warn(`No BDM assignments found for division: ${division}`);
        return;
    }

    // Color-code countries by BDM
    colorMapByBDMs(division, bdmsForDivision);

    // Show legend
    showLegend(bdmsForDivision);

    // Clear BDM info
    document.getElementById('bdmInfoContainer').innerHTML = '';

    // Show reset button
    document.getElementById('resetBtn').classList.remove('hidden');
}

function colorMapByBDMs(division, bdmsForDivision) {
    // Clear any patterns from BDM mode
    map.setPaintProperty('countries-fill', 'fill-pattern', undefined);
    map.setFilter('countries-fill-pattern', ['==', 'ISO_A2', '']); // Hide pattern layer

    // Check if any BDM has worldwide assignment
    const worldwideBDM = Object.entries(bdmsForDivision).find(([bdmName, bdmData]) =>
        bdmData.countries.includes('*')
    );

    if (worldwideBDM) {
        // If there's a worldwide assignment, color all countries with that BDM's color
        const [bdmName, _] = worldwideBDM;
        const color = bdmProfiles[bdmName]?.color || '#999';
        map.setPaintProperty('countries-fill', 'fill-color', color);
        map.setPaintProperty('countries-fill', 'fill-opacity', 0.6);
        return;
    }

    // Build color expression for MapLibre using case expressions to handle -99 and FR
    const colorCases = [];

    Object.entries(bdmsForDivision).forEach(([bdmName, bdmData]) => {
        const color = bdmProfiles[bdmName]?.color || '#999';
        const countries = bdmData.countries;

        // Add each country code with BDM's color
        countries.forEach(countryCode => {
            if (countryCode === 'XNO') {
                // XNO = Norway (custom code, match by NAME)
                colorCases.push(['==', ['get', 'NAME'], 'Norway'], color);
            } else if (countryCode === 'XSO') {
                // XSO = Somaliland (custom code, match by NAME)
                colorCases.push(['==', ['get', 'NAME'], 'Somaliland'], color);
            } else if (countryCode === 'FR') {
                // FR = France - match by NAME to distinguish from French Guiana
                colorCases.push(['==', ['get', 'NAME'], 'France'], color);
                colorCases.push(['==', ['get', 'ADMIN'], 'France'], color);
            } else if (countryCode === 'GF') {
                // GF = French Guiana - match by NAME
                colorCases.push(['==', ['get', 'NAME'], 'French Guiana'], color);
                colorCases.push(['==', ['get', 'NAME'], 'Guyane française'], color);
            } else {
                // Normal country codes
                colorCases.push(['==', ['get', 'ISO_A2'], countryCode], color);
            }
        });
    });

    // Build the case expression
    const colorExpression = ['case', ...colorCases, '#e0e0e0'];

    // Update map
    map.setPaintProperty('countries-fill', 'fill-color', colorExpression);
    map.setPaintProperty('countries-fill', 'fill-opacity', 0.6);
}

// ==========================================================================
// Country Filter
// ==========================================================================

function buildCountryList() {
    countryList = countriesGeoJSON.features.map(feature => ({
        name: feature.properties.NAME || feature.properties.ADMIN,
        code: feature.properties.ISO_A2
    })).sort((a, b) => a.name.localeCompare(b.name));
}

function handleCountrySearch(e) {
    const query = e.target.value.trim().toLowerCase();
    const dropdown = document.getElementById('countryDropdown');

    if (query.length < 1) {
        dropdown.classList.add('hidden');
        return;
    }

    // Filter countries
    const matches = countryList.filter(country =>
        country.name.toLowerCase().includes(query)
    ).slice(0, 10);

    if (matches.length > 0) {
        dropdown.innerHTML = matches.map(country => `
            <div class="country-option" onclick="selectCountry('${country.code}', '${country.name.replace(/'/g, "\\'")}')">
                <strong>${country.name}</strong>
            </div>
        `).join('');
        dropdown.classList.remove('hidden');
    } else {
        dropdown.classList.add('hidden');
    }
}

function selectCountry(countryCode, countryName) {
    document.getElementById('countrySearch').value = countryName;
    document.getElementById('countryDropdown').classList.add('hidden');

    currentSelection = { type: 'country', value: countryCode, name: countryName };

    // Find all BDMs responsible for this country (pass name for -99 cases)
    const responsibleBDMs = findBDMsForCountry(countryCode, countryName);

    // Highlight country on map (pass name for -99 cases)
    highlightCountry(countryCode, countryName);

    // Show BDM cards
    showBDMCards(responsibleBDMs, countryName);

    // Show reset button
    document.getElementById('resetBtn').classList.remove('hidden');
}

function findBDMsForCountry(countryCode, countryName) {
    const result = [];

    // Get the country name if not provided
    if (!countryName) {
        const feature = countriesGeoJSON.features.find(f => f.properties.ISO_A2 === countryCode);
        countryName = feature ? (feature.properties.NAME || feature.properties.ADMIN || '') : '';
    }

    const isFrenchGuiana = countryName.includes('Guiana') || countryName.includes('Guyane');

    Object.entries(bdmAssignments).forEach(([division, bdms]) => {
        Object.entries(bdms).forEach(([bdmName, bdmData]) => {
            const countries = bdmData.countries;

            // Check if BDM is responsible for this country
            let isResponsible = false;

            if (countries.includes('*')) {
                isResponsible = true;
            } else if (countries.includes(countryCode)) {
                // Special cases
                if (countryCode === 'FR' && isFrenchGuiana) {
                    // French Guiana should only be assigned to BDMs who have GF in their list
                    isResponsible = countries.includes('GF');
                } else {
                    isResponsible = true;
                }
            } else if (countryCode === '-99') {
                // -99 territories: check for custom codes
                if (countryName === 'Norway' && countries.includes('XNO')) {
                    isResponsible = true;
                } else if (countryName === 'Somaliland' && countries.includes('XSO')) {
                    isResponsible = true;
                }
            }

            if (isResponsible) {
                result.push({
                    division,
                    bdmName,
                    bdmData: bdmProfiles[bdmName]
                });
            }
        });
    });

    return result;
}

function highlightCountry(countryCode, countryName) {
    console.log('Highlighting country:', countryName, 'with code:', countryCode);

    // Clear any patterns from BDM mode
    map.setPaintProperty('countries-fill', 'fill-pattern', undefined);
    map.setFilter('countries-fill-pattern', ['==', 'ISO_A2', '']); // Hide pattern layer

    // For -99 (disputed territories), use NAME instead of ISO code
    if (countryCode === '-99') {
        console.log('Using NAME property for highlighting (code is -99)');
        map.setPaintProperty('countries-fill', 'fill-color', [
            'case',
            ['==', ['get', 'NAME'], countryName],
            '#ff6b35',
            ['==', ['get', 'ADMIN'], countryName],
            '#ff6b35',
            '#e0e0e0'
        ]);
        map.setPaintProperty('countries-fill', 'fill-opacity', [
            'case',
            ['==', ['get', 'NAME'], countryName],
            0.7,
            ['==', ['get', 'ADMIN'], countryName],
            0.7,
            0.3
        ]);
    } else {
        // Use ISO code for normal countries
        map.setPaintProperty('countries-fill', 'fill-color', [
            'match',
            ['get', 'ISO_A2'],
            [countryCode],
            '#ff6b35',
            '#e0e0e0'
        ]);
        map.setPaintProperty('countries-fill', 'fill-opacity', [
            'match',
            ['get', 'ISO_A2'],
            [countryCode],
            0.7,
            0.3
        ]);
    }
}

// ==========================================================================
// BDM Filter
// ==========================================================================

function populateBDMSelect() {
    const select = document.getElementById('bdmSelect');
    const bdmNames = Object.keys(bdmProfiles).sort();

    bdmNames.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        select.appendChild(option);
    });
}

function handleBDMChange(bdmName) {
    if (!bdmName) {
        resetMap();
        return;
    }

    currentSelection = { type: 'bdm', value: bdmName };

    // Find all territories for this BDM
    const territories = findTerritoriesForBDM(bdmName);

    // Highlight territories on map
    highlightBDMTerritories(bdmName, territories);

    // Show BDM card with full territory list
    showBDMCard(bdmName, territories);

    // Show reset button
    document.getElementById('resetBtn').classList.remove('hidden');
}

function findTerritoriesForBDM(bdmName) {
    const territories = {};

    Object.entries(bdmAssignments).forEach(([division, bdms]) => {
        if (bdms[bdmName]) {
            territories[division] = bdms[bdmName];
        }
    });

    return territories;
}

function highlightBDMTerritories(bdmName, territories) {
    console.log(`Highlighting territories for ${bdmName}:`, Object.keys(territories));

    // First, get all unique countries from the GeoJSON
    const allWorldCountries = new Set();
    if (countriesGeoJSON) {
        countriesGeoJSON.features.forEach(feature => {
            const code = feature.properties.ISO_A2;
            if (code) allWorldCountries.add(code);
        });
    }

    // Build a map of each country and which divisions cover it
    const countryToDivisions = {}; // countryCode -> [division1, division2, ...]
    const norwayDivisions = []; // Special handling for Norway (XNO)
    const somalilandDivisions = []; // Special handling for Somaliland (XSO)
    const franceDivisions = []; // Special handling for France (XFR)

    // Initialize all countries as empty arrays
    allWorldCountries.forEach(code => {
        countryToDivisions[code] = [];
    });

    // Helper function to check if a country should be excluded
    const shouldExcludeCountry = (code) => {
        // Exclude French Guiana when processing FR (France) assignments
        const feature = countriesGeoJSON.features.find(f => f.properties.ISO_A2 === code);
        if (feature) {
            const name = feature.properties.NAME || feature.properties.ADMIN || '';
            // Exclude French Guiana from France assignments
            if (name.includes('Guiana') || name.includes('Guyane')) {
                return true;
            }
        }
        return false;
    };

    // Now go through each division and add it to the appropriate countries
    Object.entries(territories).forEach(([division, territoryData]) => {
        if (territoryData.countries.includes('*')) {
            // Worldwide - add this division to ALL countries EXCEPT -99 and FR
            // (-99 is shared by Norway/Somaliland, FR may have territories)
            allWorldCountries.forEach(code => {
                if (code !== '-99' && code !== 'FR' && !countryToDivisions[code].includes(division)) {
                    countryToDivisions[code].push(division);
                }
            });
            // For special territories, handle separately
            const minus99Features = countriesGeoJSON.features.filter(f => f.properties.ISO_A2 === '-99');
            minus99Features.forEach(feature => {
                const name = feature.properties.NAME || feature.properties.ADMIN || '';
                if (name === 'Norway') {
                    if (!norwayDivisions.includes(division)) {
                        norwayDivisions.push(division);
                    }
                } else if (name === 'Somaliland') {
                    if (!somalilandDivisions.includes(division)) {
                        somalilandDivisions.push(division);
                    }
                }
            });
            // For France, add to special array
            if (!franceDivisions.includes(division)) {
                franceDivisions.push(division);
            }
        } else {
            // Specific countries - add this division only to listed countries
            territoryData.countries.forEach(assignedCode => {
                if (assignedCode === 'XNO') {
                    // XNO = Norway (has ISO code -99 in GeoJSON, handle separately)
                    if (!norwayDivisions.includes(division)) {
                        norwayDivisions.push(division);
                    }
                } else if (assignedCode === 'XSO') {
                    // XSO = Somaliland (has ISO code -99 in GeoJSON, handle separately)
                    if (!somalilandDivisions.includes(division)) {
                        somalilandDivisions.push(division);
                    }
                } else if (assignedCode === 'FR') {
                    // FR = France - handle separately like Norway/Somaliland
                    if (!franceDivisions.includes(division)) {
                        franceDivisions.push(division);
                    }
                } else {
                    // For all other normal codes, add normally
                    if (countryToDivisions[assignedCode] && !countryToDivisions[assignedCode].includes(division)) {
                        countryToDivisions[assignedCode].push(division);
                    }
                }
            });
        }
    });

    // Remove countries with no divisions assigned and log them
    const unassignedCountries = [];
    Object.keys(countryToDivisions).forEach(code => {
        if (countryToDivisions[code].length === 0) {
            // Find country name from GeoJSON
            const feature = countriesGeoJSON.features.find(f => f.properties.ISO_A2 === code);
            const countryName = feature ? (feature.properties.NAME || feature.properties.ADMIN) : code;
            unassignedCountries.push(`${code} (${countryName})`);
            delete countryToDivisions[code];
        }
    });

    if (unassignedCountries.length > 0) {
        console.warn(`${unassignedCountries.length} countries not assigned to ${bdmName}:`, unassignedCountries.slice(0, 10));
    }

    // Separate countries into single-division and multi-division
    const singleDivisionCountries = {}; // countryCode -> division
    const multiDivisionCountries = {}; // countryCode -> [division1, division2, ...]

    Object.entries(countryToDivisions).forEach(([countryCode, divisions]) => {
        if (divisions.length === 1) {
            singleDivisionCountries[countryCode] = divisions[0];
        } else if (divisions.length > 1) {
            multiDivisionCountries[countryCode] = divisions.sort(); // Sort for consistent pattern IDs
        }
    });

    // Handle Norway, Somaliland, and France separately (use NAME matching, not ISO code)
    if (norwayDivisions.length === 1) {
        singleDivisionCountries['XNO'] = norwayDivisions[0]; // Use XNO as a special marker
    } else if (norwayDivisions.length > 1) {
        multiDivisionCountries['XNO'] = norwayDivisions.sort();
    }

    if (somalilandDivisions.length === 1) {
        singleDivisionCountries['XSO'] = somalilandDivisions[0]; // Use XSO as a special marker
    } else if (somalilandDivisions.length > 1) {
        multiDivisionCountries['XSO'] = somalilandDivisions.sort();
    }

    if (franceDivisions.length === 1) {
        singleDivisionCountries['XFR'] = franceDivisions[0]; // Use XFR as a special marker
    } else if (franceDivisions.length > 1) {
        multiDivisionCountries['XFR'] = franceDivisions.sort();
    }

    console.log(`Single-division countries: ${Object.keys(singleDivisionCountries).length}`);
    console.log(`Multi-division countries: ${Object.keys(multiDivisionCountries).length}`);

    // Log a few examples for debugging
    if (Object.keys(multiDivisionCountries).length > 0) {
        const examples = Object.entries(multiDivisionCountries).slice(0, 3);
        console.log('Multi-division examples:', examples);
    }

    // Debug: Check if France (FR) and Norway (NO) are in the lists
    if (singleDivisionCountries['FR']) {
        console.log('FR (France) - single division:', singleDivisionCountries['FR']);
    }
    if (multiDivisionCountries['FR']) {
        console.log('FR (France) - multi division:', multiDivisionCountries['FR']);
    }
    if (singleDivisionCountries['NO']) {
        console.log('NO (Norway) - single division:', singleDivisionCountries['NO']);
    }
    if (multiDivisionCountries['NO']) {
        console.log('NO (Norway) - multi division:', multiDivisionCountries['NO']);
    }

    // Build combined color/pattern expression
    const allCountryCodes = Object.keys(countryToDivisions);

    if (allCountryCodes.length === 0) {
        // No territories to show
        map.setPaintProperty('countries-fill', 'fill-color', '#e0e0e0');
        map.setPaintProperty('countries-fill', 'fill-opacity', 0.3);
        map.setPaintProperty('countries-fill', 'fill-pattern', undefined);
        return;
    }

    // Check if we have multi-division countries
    const hasMultiDivision = Object.keys(multiDivisionCountries).length > 0;

    if (hasMultiDivision) {
        // Build expressions for both patterns and colors
        const patternMap = {}; // countryCode -> patternId
        const colorMap = {}; // countryCode -> color

        // First, add patterns to map and build pattern mapping
        Object.entries(multiDivisionCountries).forEach(([countryCode, divisions]) => {
            const colors = divisions.map(div => divisionColors[div] || '#999');
            const patternId = `pattern-${divisions.join('-').replace(/\s/g, '_')}`;

            // Try to add pattern to map
            const success = addPatternToMap(patternId, colors);
            if (success) {
                patternMap[countryCode] = patternId;
                // Use first division color as base (pattern will overlay)
                colorMap[countryCode] = colors[0];
            } else {
                // Fall back to solid color if pattern fails
                console.warn(`Pattern failed for ${countryCode}, using first division color`);
                singleDivisionCountries[countryCode] = divisions[0];
            }
        });

        // Build color expression for ALL countries using case for special handling
        const colorExpression = ['case'];

        // Add single-division countries
        Object.entries(singleDivisionCountries).forEach(([countryCode, division]) => {
            colorMap[countryCode] = divisionColors[division] || '#999';
        });

        // Add all colors to expression
        Object.entries(colorMap).forEach(([countryCode, color]) => {
            if (countryCode === 'XNO') {
                // Norway - match by NAME
                colorExpression.push(['==', ['get', 'NAME'], 'Norway'], color);
            } else if (countryCode === 'XSO') {
                // Somaliland - match by NAME
                colorExpression.push(['==', ['get', 'NAME'], 'Somaliland'], color);
            } else if (countryCode === 'XFR') {
                // France - match by NAME to distinguish from French Guiana
                colorExpression.push(['==', ['get', 'NAME'], 'France'], color);
                colorExpression.push(['==', ['get', 'ADMIN'], 'France'], color);
            } else {
                // Normal countries - match by ISO_A2
                colorExpression.push(['==', ['get', 'ISO_A2'], countryCode], color);
            }
        });
        colorExpression.push('#e0e0e0'); // default color

        // Set colors on main layer
        map.setPaintProperty('countries-fill', 'fill-color', colorExpression);
        map.setPaintProperty('countries-fill', 'fill-pattern', undefined); // Clear any patterns from main layer

        // Build and apply pattern layer ONLY if we have patterns
        if (Object.keys(patternMap).length > 0) {
            const patternExpression = ['case'];
            Object.entries(patternMap).forEach(([countryCode, patternId]) => {
                if (countryCode === 'XNO') {
                    patternExpression.push(['==', ['get', 'NAME'], 'Norway'], patternId);
                } else if (countryCode === 'XSO') {
                    patternExpression.push(['==', ['get', 'NAME'], 'Somaliland'], patternId);
                } else if (countryCode === 'XFR') {
                    patternExpression.push(['==', ['get', 'NAME'], 'France'], patternId);
                    patternExpression.push(['==', ['get', 'ADMIN'], 'France'], patternId);
                } else {
                    patternExpression.push(['==', ['get', 'ISO_A2'], countryCode], patternId);
                }
            });
            patternExpression.push(''); // Default

            // Build filter for pattern layer
            const filterConditions = ['any'];
            Object.keys(patternMap).forEach(countryCode => {
                if (countryCode === 'XNO') {
                    filterConditions.push(['==', ['get', 'NAME'], 'Norway']);
                } else if (countryCode === 'XSO') {
                    filterConditions.push(['==', ['get', 'NAME'], 'Somaliland']);
                } else if (countryCode === 'XFR') {
                    filterConditions.push(['==', ['get', 'NAME'], 'France']);
                } else {
                    filterConditions.push(['==', ['get', 'ISO_A2'], countryCode]);
                }
            });
            map.setFilter('countries-fill-pattern', filterConditions);
            map.setPaintProperty('countries-fill-pattern', 'fill-pattern', patternExpression);
        } else {
            // Hide pattern layer
            map.setFilter('countries-fill-pattern', ['==', 'ISO_A2', '']);
        }
    } else {
        // Only single-division countries, use solid colors
        const colorExpression = ['case'];

        Object.entries(singleDivisionCountries).forEach(([countryCode, division]) => {
            const color = divisionColors[division] || '#999';
            if (countryCode === 'XNO') {
                colorExpression.push(['==', ['get', 'NAME'], 'Norway'], color);
            } else if (countryCode === 'XSO') {
                colorExpression.push(['==', ['get', 'NAME'], 'Somaliland'], color);
            } else if (countryCode === 'XFR') {
                colorExpression.push(['==', ['get', 'NAME'], 'France'], color);
                colorExpression.push(['==', ['get', 'ADMIN'], 'France'], color);
            } else {
                colorExpression.push(['==', ['get', 'ISO_A2'], countryCode], color);
            }
        });

        colorExpression.push('#e0e0e0'); // default color

        // Clear patterns from main layer and apply colors
        map.setPaintProperty('countries-fill', 'fill-pattern', undefined);
        map.setPaintProperty('countries-fill', 'fill-color', colorExpression);

        // Hide pattern layer (no multi-division countries)
        map.setFilter('countries-fill-pattern', ['==', 'ISO_A2', '']);
    }

    // Set opacity for all BDM territories
    const opacityExpression = ['case'];
    allCountryCodes.forEach(code => {
        if (code === '-99' || code === 'FR') {
            // Skip -99 and FR since we handle these specially
            return;
        } else {
            // Normal countries - match by ISO_A2
            opacityExpression.push(['==', ['get', 'ISO_A2'], code], 0.7);
        }
    });
    // Add Norway if present
    if (norwayDivisions.length > 0) {
        opacityExpression.push(['==', ['get', 'NAME'], 'Norway'], 0.7);
    }
    // Add Somaliland if present
    if (somalilandDivisions.length > 0) {
        opacityExpression.push(['==', ['get', 'NAME'], 'Somaliland'], 0.7);
    }
    // Add France if present
    if (franceDivisions.length > 0) {
        opacityExpression.push(['==', ['get', 'NAME'], 'France'], 0.7);
    }
    opacityExpression.push(0.3); // default
    map.setPaintProperty('countries-fill', 'fill-opacity', opacityExpression);
}

// ==========================================================================
// BDM Info Cards
// ==========================================================================

function showBDMCards(responsibleBDMs, countryName) {
    const container = document.getElementById('bdmInfoContainer');

    if (responsibleBDMs.length === 0) {
        container.innerHTML = `
            <div class="bdm-card">
                <p class="text-center">No BDM assigned for ${countryName}</p>
            </div>
        `;
        return;
    }

    // Group BDMs by name (combine multiple divisions into one card)
    const groupedBDMs = {};
    responsibleBDMs.forEach(({ division, bdmName, bdmData }) => {
        if (!groupedBDMs[bdmName]) {
            groupedBDMs[bdmName] = {
                bdmData: bdmData,
                divisions: []
            };
        }
        groupedBDMs[bdmName].divisions.push(division);
    });

    // Create one card per BDM with all their divisions
    container.innerHTML = Object.entries(groupedBDMs).map(([bdmName, { bdmData, divisions }]) => {
        return createBDMCard(bdmName, bdmData, divisions, null);
    }).join('');
}

function showBDMCard(bdmName, territories) {
    const container = document.getElementById('bdmInfoContainer');
    const bdmData = bdmProfiles[bdmName];
    const divisions = Object.keys(territories);

    container.innerHTML = createBDMCard(bdmName, bdmData, divisions, territories);
}

function createBDMCard(bdmName, bdmData, divisions, territories) {
    const initials = bdmName.split(' ').map(n => n[0]).join('');

    // Check if photo exists by trying to create an image element
    const photoHTML = bdmData.photo ?
        `<img src="${bdmData.photo}" alt="${bdmData.name}" class="bdm-photo" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
         <div class="bdm-photo-placeholder" style="display: none;">${initials}</div>` :
        `<div class="bdm-photo-placeholder">${initials}</div>`;

    return `
        <div class="bdm-card">
            <div class="bdm-card-header">
                ${photoHTML}
                <div class="bdm-name-section">
                    <h4>${bdmData.name}</h4>
                    <div class="bdm-title">${bdmData.title}</div>
                </div>
            </div>

            <div class="bdm-contact">
                <div class="contact-item">
                    📧 <a href="mailto:${bdmData.email}">${bdmData.email}</a>
                </div>
                <div class="contact-item">
                    📞 ${bdmData.phone}
                </div>
            </div>

            <div class="bdm-divisions">
                <div class="divisions-title">Divisions</div>
                <div class="division-badges">
                    ${divisions.map(div => `<span class="division-badge" style="background: ${divisionColors[div] || '#1a365d'};">${div}</span>`).join('')}
                </div>
            </div>

            ${territories ? createTerritoryList(territories) : ''}
        </div>
    `;
}

function createTerritoryList(territories) {
    return `
        <div class="bdm-territories">
            <div class="territories-title">Responsible Territories</div>
            <div class="territory-list">
                ${Object.entries(territories).map(([division, data]) => {
                    const regions = data.regions.join(', ');
                    return `<strong>${division}:</strong> ${regions}`;
                }).join('<br>')}
            </div>
        </div>
    `;
}

// ==========================================================================
// Legend
// ==========================================================================

function showLegend(bdmsForDivision) {
    const container = document.getElementById('legendContainer');
    const content = document.getElementById('legendContent');

    content.innerHTML = Object.entries(bdmsForDivision).map(([bdmName, bdmData]) => {
        const color = bdmProfiles[bdmName]?.color || '#999';
        return `
            <div class="legend-item">
                <div class="legend-color" style="background: ${color};"></div>
                <span>${bdmName}</span>
            </div>
        `;
    }).join('');

    container.classList.remove('hidden');
}

// ==========================================================================
// Map Interaction
// ==========================================================================

function handleCountryClick(e) {
    if (e.features.length > 0) {
        const feature = e.features[0];
        const countryCode = feature.properties.ISO_A2;
        const countryName = feature.properties.NAME || feature.properties.ADMIN;

        // Switch to country mode first if not already there
        if (currentMode !== 'country') {
            switchFilterMode('country');
        }

        // Then select the country to show BDM details
        selectCountry(countryCode, countryName);
    }
}

// ==========================================================================
// Reset Map
// ==========================================================================

function resetMap() {
    currentSelection = null;

    // Reset map colors and patterns
    map.setPaintProperty('countries-fill', 'fill-color', '#e0e0e0');
    map.setPaintProperty('countries-fill', 'fill-opacity', 0.3);
    map.setPaintProperty('countries-fill', 'fill-pattern', undefined);

    // Hide pattern layer
    map.setFilter('countries-fill-pattern', ['==', 'ISO_A2', '']);

    // Reset filters
    document.getElementById('divisionSelect').value = '';
    document.getElementById('countrySearch').value = '';
    document.getElementById('bdmSelect').value = '';

    // Clear BDM info
    document.getElementById('bdmInfoContainer').innerHTML = '';

    // Hide legend
    document.getElementById('legendContainer').classList.add('hidden');

    // Hide reset button
    document.getElementById('resetBtn').classList.add('hidden');
}
