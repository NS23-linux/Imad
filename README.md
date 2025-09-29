# Water Treatment Plant Notes System

A JavaScript-based note-taking system designed for organizing water treatment plant data vertically by categories and dates. This system is specifically structured to handle the complex data from your water treatment Excel sheets.

## 📋 Overview

This note-taking system is based on your Excel file structure containing:
- **File Eaux** (Water Files): Water volume measurements and flow data
- **File Boues & Biogaz** (Sludge & Biogas): Sludge processing and biogas production data
- **Bassins Biologiques** (Biological Basins): Biological treatment parameters
- **Clarificateurs** (Clarifiers): Clarification process measurements

## 🗂️ Vertical Organization Structure

The system organizes data **vertically** with:
- **Columns**: Measurement categories (e.g., "Volume d'eau brute", "Redox (mV)")
- **Rows**: Dates/time entries (2025-09-15, 2025-09-16, etc.)

This matches your preference for vertical note layout organized by columns and rows.

## 📁 Files in Repository

### Core Files
- `water_treatment_notes.js` - Main class with data structure and methods
- `usage_example.js` - Comprehensive usage examples and patterns

### Existing Files  
- `app.js` - Your existing application
- `index.html` - Your existing HTML file
- `styles.css` - Your existing styles

## 🚀 Quick Start

```javascript
// Create a new instance
const waterNotes = new WaterTreatmentNotes();

// Add a water volume measurement
waterNotes.addNote('fileEaux', "Volume d'eau brute (m³)", '2025-09-15', {
    value: 212093586,
    total: 143606,
    notes: "Raw water intake - normal conditions"
});

// Get all notes for a specific date
const dailyNotes = waterNotes.getNotesByDate('2025-09-15');

// Get all notes for a specific measurement category
const volumeData = waterNotes.getNotesByCategory('fileEaux', "Volume d'eau brute (m³)");
```

## 📊 Data Structure

### File Eaux (Water Files)
```javascript
{
  "Volume d'eau brute (m³)": {
    "2025-09-15": { value: null, total: null, notes: "", unit: "m³" },
    "2025-09-16": { value: null, total: null, notes: "", unit: "m³" }
  }
}
```

### File Boues & Biogaz (Sludge & Biogas)
```javascript
{
  boues: {
    "Volume des boues primaires...": {
      "2025-09-15": { valueA: null, valueB: null, valueC: null, total: null, notes: "", unit: "m³" }
    }
  },
  biogaz: {
    "Production biogaz digesteurs PHASE 1 (Nm³)": {
      "2025-09-15": { value1: null, value2: null, total: null, notes: "", unit: "Nm³" }
    }
  }
}
```

### Bassins Biologiques (Biological Basins)
```javascript
{
  "basin_1": {
    "Sélecteur": {
      "Redox (mV)": {
        "2025-09-15": { time: null, value: null, guarantee: null, notes: "", unit: "mV" }
      }
    }
  }
}
```

## 🔧 Key Features

### Vertical Organization
- **Categories as Columns**: Each measurement type forms a column
- **Dates as Rows**: Time series data organized by date
- **Nested Structure**: Complex hierarchy for biological basins and multi-point measurements

### Methods Available
- `addNote()` - Add notes by section, category, and date
- `getNotesByDate()` - Retrieve all notes for a specific date (horizontal view)
- `getNotesByCategory()` - Retrieve all notes for a category (vertical view)
- `exportNotes()` - Export all data as JSON
- `importNotes()` - Import data from JSON
- `getSummary()` - Get system overview and statistics

### Quality Control
- **Guarantee Tracking**: Automatic tracking of guarantee limits (≤ 5g/l for MES, ≥ 2mg/l for Oxygen)
- **Unit Management**: Automatic unit assignment based on measurement type
- **Time Stamping**: Track when measurements were taken and notes were updated

## 💡 Usage Patterns

### Daily Data Entry
```javascript
function addDailyMeasurements(date, measurements) {
    Object.keys(measurements.fileEaux).forEach(category => {
        waterNotes.addNote('fileEaux', category, date, measurements.fileEaux[category]);
    });
}
```

### Quality Control Checks
```javascript
function performQualityChecks(date) {
    const dayData = waterNotes.getNotesByDate(date);
    // Check oxygen levels, MES concentrations, flow rates
    return { date, checks: ['oxygen', 'mes', 'flow'], status: 'completed' };
}
```

### Reporting
```javascript
function generateDailyReport(date) {
    return {
        date: date,
        sections: { /* section summaries */ },
        summary: waterNotes.getSummary()
    };
}
```

## 📋 Data Categories

### File Eaux Categories
- Volume d'eau brute (m³)
- Volume des eaux en sortie de poste toutes eaux (m³)
- Volume des eaux clarifiée (m³) (SCADA)
- Volume des eaux clarifiées EXTENSION (m³)
- Volume de l'eau en entrée du traitement tertiaire (m³)
- Volume de l'eau de service du traitement tertiaire (m³)
- Volume de l'eau de lavage du traitement tertiaire (m³)

### Bassins Biologiques Locations
- Sélecteur (Selector)
- Dégazeur (Degasser)
- Entrée de l'aération (Aeration Input)
- Sortie de l'aération (Aeration Output)

### Measurement Parameters
- Redox (mV)
- Concentration MES (g/l)
- Concentration Oxygène (mg/l)
- Various volume measurements (m³)

## 🎯 Benefits

1. **Matches Your Workflow**: Vertical organization by columns and rows as you prefer
2. **Structured Data**: Clear hierarchy matching your Excel file structure
3. **Flexible**: Easy to add new categories and measurement types
4. **Quality Control**: Built-in guarantee tracking and validation
5. **Export/Import**: JSON format for data backup and sharing
6. **Scalable**: Can handle multiple treatment plants or extended date ranges

## 🔍 Example Usage Scenarios

1. **Daily Operations**: Record measurements as they come in throughout the day
2. **Quality Assurance**: Track guarantee compliance and identify issues
3. **Reporting**: Generate daily, weekly, or monthly summaries
4. **Trend Analysis**: Export data for analysis in other tools
5. **Audit Trail**: Maintain detailed notes for regulatory compliance

This system provides a comprehensive solution for managing your water treatment plant data while maintaining the vertical organization structure you prefer for your notes.