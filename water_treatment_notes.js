// Water Treatment Plant Data Notes - Structure for Vertical Organization
// Based on Excel sheets: File Eaux, File Boues & Biogaz, Bassins Biologiques, Clarificateurs
// Date Range: 15/09/2025 - 19/09/2025

class WaterTreatmentNotes {
    constructor() {
        this.dateRange = "15/09/2025 - 19/09/2025";
        this.lastUpdated = new Date();
        
        // Initialize data structure organized by columns (categories) and rows (dates/measurements)
        this.data = {
            fileEaux: this.initializeFileEaux(),
            fileBouesBiogaz: this.initializeFileBouesBiogaz(),
            bassins: this.initializeBassins(),
            clarificateurs: this.initializeClarificateurs()
        };
    }

    // Initialize File Eaux structure - organized vertically by measurement categories
    initializeFileEaux() {
        const categories = [
            "Volume d'eau brute (m³)",
            "Volume des eaux en sortie de poste toutes eaux (m³)",
            "Volume des eaux by-passées STEP (m³)", 
            "Volume des eaux clarifiée (m³) (SCADA)",
            "Volume des eaux clarifiées EXTENSION (m³)",
            "Volume de l'eau en entrée du traitement tertiaire (m³)",
            "Volume de l'eau de service du traitement tertiaire (m³)",
            "Volume de l'eau de lavage du traitement tertiaire (m³)",
            "Total de l'eau sortie de traitement tertiaire (m³)"
        ];
        
        const dates = ["2025-09-15", "2025-09-16", "2025-09-17", "2025-09-18", "2025-09-19"];
        
        let structure = {};
        categories.forEach(category => {
            structure[category] = {};
            dates.forEach(date => {
                structure[category][date] = {
                    value: null,
                    total: null,
                    notes: "",
                    unit: "m³"
                };
            });
        });
        
        return structure;
    }

    // Initialize File Boues & Biogaz structure
    initializeFileBouesBiogaz() {
        const bouesCategories = [
            "Volume des boues primaires en entrée des epaisisseurs (m³)",
            "Volume des boues primaires extraites du décanteur D (m³)",
            "Volume des boues primaires épaissies en sortie de la fosse de mélange (m³)",
            "Volume des boues secondaires extraites PHASE 2 (m³)",
            "Volume des boues secondaires recirculées PHASE 2 (m³)",
            "Volume des boues secondaires flottantes biologiques PHASE 2 (m³)",
            "Volume des boues secondaires extraites EXTENSION (m³)",
            "Volume des boues secondaires recirculées EXTENSION (m³)",
            "Volume des boues secondaires en sortie de la fosse d'homogénisation (m³)",
            "Volume des boues flottées (m³)",
            "Volume des boues en entrée des digesteurs (m³)",
            "Alimentation déshydratation (m³)"
        ];
        
        const biogazCategories = [
            "Production biogaz digesteurs PHASE 1 (Nm³)",
            "Production biogaz digesteurs PHASE 2 (Nm³)",
            "Production biogaz digesteur EXTENSION (Nm³)",
            "Cogénération PHASE 1 - énergie active (MWh)",
            "Cogénération PHASE 1 - énergie reactive (MVArh)",
            "Cogénération PHASE 1 - biogaz consommé (Nm³)",
            "Cogénération PHASE 2 - énergie active (MWh)",
            "Cogénération PHASE 2 - énergie reactive (MVArh)",
            "Cogénération PHASE 2 - biogaz consommé (Nm³)"
        ];
        
        const dates = ["2025-09-15", "2025-09-16", "2025-09-17", "2025-09-18", "2025-09-19"];
        
        let structure = {
            boues: {},
            biogaz: {}
        };
        
        // Initialize boues structure
        bouesCategories.forEach(category => {
            structure.boues[category] = {};
            dates.forEach(date => {
                structure.boues[category][date] = {
                    valueA: null,
                    valueB: null,
                    valueC: null,
                    total: null,
                    notes: "",
                    unit: "m³"
                };
            });
        });
        
        // Initialize biogaz structure
        biogazCategories.forEach(category => {
            structure.biogaz[category] = {};
            dates.forEach(date => {
                structure.biogaz[category][date] = {
                    value1: null,
                    value2: null,
                    total: null,
                    notes: "",
                    unit: category.includes("Nm³") ? "Nm³" : category.includes("MWh") ? "MWh" : "MVArh"
                };
            });
        });
        
        return structure;
    }

    // Initialize Bassins Biologiques structure
    initializeBassins() {
        const basinNumbers = [1, 2, 3, 4, 5, 6];
        const locations = ["Sélecteur", "Dégazeur", "Entrée de l'aération", "Sortie de l'aération"];
        const measurements = [
            "Redox (mV)",
            "Concentration MES (g/l)", 
            "Concentration Oxygène 1 (mg/l)",
            "Concentration Oxygène 2 (mg/l)"
        ];
        const dates = ["2025-09-15", "2025-09-16", "2025-09-17", "2025-09-18", "2025-09-19"];
        
        let structure = {};
        
        basinNumbers.forEach(basinNum => {
            structure[`basin_${basinNum}`] = {};
            locations.forEach(location => {
                structure[`basin_${basinNum}`][location] = {};
                measurements.forEach(measurement => {
                    structure[`basin_${basinNum}`][location][measurement] = {};
                    dates.forEach(date => {
                        structure[`basin_${basinNum}`][location][measurement][date] = {
                            time: null,
                            value: null,
                            guarantee: measurement.includes("MES") ? "≤ 5g/l" : measurement.includes("Oxygène") ? "≥ 2mg/l" : null,
                            notes: "",
                            unit: measurement.includes("mV") ? "mV" : measurement.includes("g/l") ? "g/l" : "mg/l"
                        };
                    });
                });
            });
        });
        
        return structure;
    }

    // Initialize Clarificateurs structure
    initializeClarificateurs() {
        const clarifierNumbers = [1, 2, 3, 4, 5, 6, 7];
        const dates = ["2025-09-15", "2025-09-16", "2025-09-17", "2025-09-18", "2025-09-19"];
        
        let structure = {};
        
        clarifierNumbers.forEach(clarifierNum => {
            structure[`clarifier_${clarifierNum}`] = {
                "Voile de boues (m)": {}
            };
            dates.forEach(date => {
                structure[`clarifier_${clarifierNum}`]["Voile de boues (m)"][date] = {
                    terrain: null,
                    notes: "",
                    unit: "m"
                };
            });
        });
        
        return structure;
    }

    // Method to add a note vertically (by category and date)
    addNote(section, category, date, data) {
        if (this.data[section] && this.data[section][category] && this.data[section][category][date]) {
            Object.assign(this.data[section][category][date], data);
            this.lastUpdated = new Date();
            console.log(`Note added to ${section} > ${category} > ${date}`);
        } else {
            console.error("Invalid path for note addition");
        }
    }

    // Method to get all notes for a specific date (horizontal view)
    getNotesByDate(date) {
        let notesByDate = {};
        
        Object.keys(this.data).forEach(section => {
            notesByDate[section] = {};
            Object.keys(this.data[section]).forEach(category => {
                if (this.data[section][category][date]) {
                    notesByDate[section][category] = this.data[section][category][date];
                }
            });
        });
        
        return notesByDate;
    }

    // Method to get all notes for a specific category (vertical view)
    getNotesByCategory(section, category) {
        if (this.data[section] && this.data[section][category]) {
            return this.data[section][category];
        }
        return null;
    }

    // Method to export notes as JSON
    exportNotes() {
        return JSON.stringify(this.data, null, 2);
    }

    // Method to import notes from JSON
    importNotes(jsonData) {
        try {
            this.data = JSON.parse(jsonData);
            this.lastUpdated = new Date();
            console.log("Notes imported successfully");
        } catch (error) {
            console.error("Error importing notes:", error);
        }
    }

    // Method to get a summary of all notes
    getSummary() {
        let summary = {
            totalSections: Object.keys(this.data).length,
            lastUpdated: this.lastUpdated,
            dateRange: this.dateRange,
            sections: {}
        };

        Object.keys(this.data).forEach(section => {
            let categoryCount = Object.keys(this.data[section]).length;
            summary.sections[section] = {
                categories: categoryCount,
                structure: Object.keys(this.data[section])
            };
        });

        return summary;
    }
}

// Example usage:
const waterNotes = new WaterTreatmentNotes();

// Example of adding a note vertically (organized by category and date)
waterNotes.addNote('fileEaux', "Volume d'eau brute (m³)", '2025-09-15', {
    value: 212093586,
    total: 143606,
    notes: "Initial measurement for water treatment process"
});

// Example of adding a note to bassins
waterNotes.addNote('bassins', 'basin_1', '2025-09-15', {
    'Sélecteur': {
        'Redox (mV)': {
            '2025-09-15': {
                time: '10:49:00',
                value: -432,
                notes: 'Redox measurement within expected range'
            }
        }
    }
});

console.log("Water Treatment Notes system initialized");
console.log("Summary:", waterNotes.getSummary());

// Export the class for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WaterTreatmentNotes;
}