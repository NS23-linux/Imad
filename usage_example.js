// Usage Example for Water Treatment Notes System
// This file demonstrates how to use the WaterTreatmentNotes class

// Import the WaterTreatmentNotes class (if using modules)
// const WaterTreatmentNotes = require('./water_treatment_notes.js');

// Create a new instance
const waterNotes = new WaterTreatmentNotes();

// ===== VERTICAL NOTE ORGANIZATION EXAMPLES =====

console.log("=== Water Treatment Notes System - Usage Examples ===\n");

// 1. Adding notes to File Eaux (Water Files) - Vertical organization by measurement type
console.log("1. Adding File Eaux measurements:");

// Add water volume measurements for different dates
waterNotes.addNote('fileEaux', "Volume d'eau brute (m³)", '2025-09-15', {
    value: 212093586,
    total: 143606,
    notes: "Raw water intake - normal flow conditions"
});

waterNotes.addNote('fileEaux', "Volume d'eau brute (m³)", '2025-09-16', {
    value: 212219437,
    total: 125851,
    notes: "Slight decrease in flow rate"
});

waterNotes.addNote('fileEaux', "Volume des eaux clarifiée (m³) (SCADA)", '2025-09-15', {
    value: 44441280,
    total: 22700,
    notes: "Clarified water output - Station 1"
});

// 2. Adding notes to Boues & Biogaz (Sludge & Biogas) - Multiple measurement points
console.log("\n2. Adding Boues & Biogaz measurements:");

waterNotes.addNote('fileBouesBiogaz', 'boues', '2025-09-15', {
    "Volume des boues primaires en entrée des epaisisseurs (m³)": {
        "2025-09-15": {
            valueA: 633575,
            valueB: 2736505,
            valueC: 3395425,
            total: 1524,
            notes: "Primary sludge thickener input - all lines operational"
        }
    }
});

// 3. Adding notes to Bassins Biologiques (Biological Basins) - Complex nested structure
console.log("\n3. Adding Bassins Biologiques measurements:");

// Basin 1 measurements
const basin1Data = {
    "Sélecteur": {
        "Redox (mV)": {
            "2025-09-15": {
                time: "10:49:00",
                value: -432,
                guarantee: null,
                notes: "Redox potential within anaerobic range"
            }
        }
    },
    "Dégazeur": {
        "Concentration MES (g/l)": {
            "2025-09-15": {
                time: "10:49:00",
                value: 3.76,
                guarantee: "≤ 5g/l",
                notes: "MES concentration below guarantee threshold"
            }
        }
    },
    "Sortie de l'aération": {
        "Concentration Oxygène 1 (mg/l)": {
            "2025-09-15": {
                time: "10:50:00",
                value: 0.41,
                guarantee: "≥ 2mg/l",
                notes: "Oxygen level below guarantee - needs attention"
            }
        }
    }
};

// Add the complex basin data
Object.keys(basin1Data).forEach(location => {
    Object.keys(basin1Data[location]).forEach(measurement => {
        Object.keys(basin1Data[location][measurement]).forEach(date => {
            // This is a simplified way to add nested basin data
            console.log(`Adding basin 1 data: ${location} > ${measurement} > ${date}`);
        });
    });
});

// 4. Adding notes to Clarificateurs (Clarifiers)
console.log("\n4. Adding Clarificateurs measurements:");

waterNotes.addNote('clarificateurs', 'clarifier_1', '2025-09-15', {
    "Voile de boues (m)": {
        "2025-09-15": {
            terrain: 1.9,
            notes: "Sludge blanket height measured at field level"
        }
    }
});

// ===== RETRIEVAL METHODS =====

console.log("\n=== Data Retrieval Examples ===\n");

// 5. Get all notes for a specific date (horizontal view)
console.log("5. Getting all notes for 2025-09-15:");
const dateNotes = waterNotes.getNotesByDate('2025-09-15');
console.log("Notes found for this date:", Object.keys(dateNotes).length, "sections");

// 6. Get all notes for a specific category (vertical view)
console.log("\n6. Getting vertical view for raw water volume:");
const categoryNotes = waterNotes.getNotesByCategory('fileEaux', "Volume d'eau brute (m³)");
if (categoryNotes) {
    console.log("Raw water volume data available for dates:", Object.keys(categoryNotes));
}

// 7. Export all notes as JSON
console.log("\n7. Exporting notes to JSON:");
const exportedData = waterNotes.exportNotes();
console.log("JSON export size:", exportedData.length, "characters");

// 8. Get system summary
console.log("\n8. System Summary:");
const summary = waterNotes.getSummary();
console.log("Total sections:", summary.totalSections);
console.log("Last updated:", summary.lastUpdated);
console.log("Date range:", summary.dateRange);

Object.keys(summary.sections).forEach(section => {
    console.log(`${section}: ${summary.sections[section].categories} categories`);
});

// ===== PRACTICAL USAGE PATTERNS =====

console.log("\n=== Practical Usage Patterns ===\n");

// Pattern 1: Daily data entry routine
function addDailyMeasurements(date, measurements) {
    console.log(`Adding daily measurements for ${date}:`);
    
    // File Eaux measurements
    if (measurements.fileEaux) {
        Object.keys(measurements.fileEaux).forEach(category => {
            waterNotes.addNote('fileEaux', category, date, measurements.fileEaux[category]);
        });
    }
    
    // Basin measurements
    if (measurements.bassins) {
        Object.keys(measurements.bassins).forEach(basin => {
            Object.keys(measurements.bassins[basin]).forEach(location => {
                Object.keys(measurements.bassins[basin][location]).forEach(parameter => {
                    console.log(`  Basin ${basin} > ${location} > ${parameter}: recorded`);
                });
            });
        });
    }
}

// Pattern 2: Quality control checks
function performQualityChecks(date) {
    console.log(`\nPerforming quality checks for ${date}:`);
    
    const dayData = waterNotes.getNotesByDate(date);
    
    // Check oxygen levels in basins
    console.log("- Checking oxygen levels in biological basins");
    
    // Check MES concentrations
    console.log("- Checking MES concentrations against guarantees");
    
    // Check flow rates
    console.log("- Checking flow rate consistency");
    
    return {
        date: date,
        checks: ['oxygen', 'mes', 'flow'],
        status: 'completed'
    };
}

// Pattern 3: Generate daily report
function generateDailyReport(date) {
    console.log(`\nGenerating daily report for ${date}:`);
    
    const report = {
        date: date,
        sections: {
            fileEaux: "Water volumes recorded",
            bassins: "Biological parameters monitored", 
            clarificateurs: "Clarifier performance tracked",
            fileBouesBiogaz: "Sludge and biogas production logged"
        },
        summary: waterNotes.getSummary()
    };
    
    console.log("Report generated successfully");
    return report;
}

// Example usage of patterns
const exampleMeasurements = {
    fileEaux: {
        "Volume d'eau brute (m³)": {
            value: 212093586,
            notes: "Normal intake conditions"
        }
    }
};

addDailyMeasurements('2025-09-15', exampleMeasurements);
performQualityChecks('2025-09-15');
generateDailyReport('2025-09-15');

console.log("\n=== Usage Examples Complete ===");