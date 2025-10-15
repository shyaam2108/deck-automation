# Getting Started Guide

## 🚀 Quick Start

### 1. Installation
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 3. Login
- Open your browser and navigate to `http://localhost:5173`
- Enter any email/employee ID and password (dummy validation)
- Click "Sign In"

## 📖 User Guide

### Dashboard Workflow

#### Step 1: Upload Excel File
Two options:
1. **Drag & Drop**: Drag your .xlsx or .xls file into the upload area
2. **Browse**: Click "Choose File" to browse for your Excel file
3. **Demo Data**: Click "Load Demo Data" button to use sample data

#### Step 2: Review Upload Status
- ✅ **Success**: Green indicator, proceed to filtering
- ⚠️ **Warning**: Yellow indicator, validation errors detected
- ❌ **Error**: Red indicator, file could not be parsed

#### Step 3: Handle Validation Errors (if any)
If validation errors are detected:
1. A modal will appear showing missing fields
2. Review the errors listed by row number
3. Fix the Excel file and re-upload
4. The data table will highlight missing cells in red

#### Step 4: Apply Filters (Optional)
Filter your data:
- **Date Range**: Select From/To dates
- **Manager**: Choose from Carlo, Jan Isaac, Mary, Jahir, Julie
- **Team**: Choose from Mobile, Web, Build, TechOps, Testing
- Click "Apply Filter" to see filtered results
- Click "Reset Filter" to clear all filters

#### Step 5: Review Data Preview
The data table shows:
- Grouped by Team Lead
- Organized by sections (BACK END, FRONT END, etc.)
- Color-coded status indicators:
  - 🟢 Green: Completed
  - 🔵 Blue: In Progress
  - 🟡 Yellow: Testing
- Missing data highlighted in red

#### Step 6: Generate PPT Preview
1. Click "Preview PPT" button (disabled if validation errors exist)
2. Review the presentation layout
3. Click "Generate PPT" to simulate generation
4. Click "Download PPT" (placeholder - frontend only)

### PPT Preview Page

Features:
- **Slide View**: Each team lead gets a separate slide
- **Section Organization**: Tasks grouped by section with color-coded bars
- **Summary Stats**: Total slides, tasks, and hours
- **Navigation**: Back to dashboard or download options

## 📊 Excel File Format

### Required Columns
Your Excel file must include these columns:

| Column | Type | Example | Required |
|--------|------|---------|----------|
| jira | String | SING-1234 | ✅ Yes |
| date | Date | 2024-01-15 | ✅ Yes |
| description | String | Implement user auth | ✅ Yes |
| status | String | Completed | ✅ Yes |
| hours | Number | 8 | ✅ Yes |
| team | String | Web | ✅ Yes |
| manager | String | Mary | ✅ Yes |

### Optional Columns (for better formatting)
| Column | Type | Example |
|--------|------|---------|
| teamLead | String | Mary Clare Delos Reyes |
| sprint | String | Sprint #12 |
| sprintStart | Date | 2024-01-08 |
| sprintEnd | Date | 2024-01-22 |
| section | String | BACK END |

### Valid Values

**Status Options:**
- Completed
- In Progress
- Testing

**Team Options:**
- Mobile
- Web
- Build
- TechOps
- Testing

**Manager Options:**
- Carlo
- Jan Isaac
- Mary
- Jahir
- Julie

**Section Options:**
- BACK END
- FRONT END
- MOBILE
- DEVOPS
- TESTING

## 🎨 UI Features

### Animations
- **Page Transitions**: Smooth fade-in effects
- **Toast Notifications**: Slide-in from top-right
- **Modal Animations**: Scale and fade effects
- **Hover Effects**: Interactive button and card states

### Color Coding
- **Red (#E31E24)**: Primary actions, warnings, hours
- **Blue (#0066CC)**: Secondary actions, JIRA numbers
- **Green**: Completed status
- **Yellow**: Warning status, Testing
- **Gray**: Background, neutral elements

### Responsive Design
- Optimized for desktop (1280px and above)
- Tablet support (768px - 1279px)
- Basic mobile support (below 768px)

## ⚠️ Troubleshooting

### Upload Issues
**Problem**: Excel file won't upload
- **Solution**: Ensure file is .xlsx or .xls format
- **Solution**: Check file isn't corrupted
- **Solution**: Try "Load Demo Data" to test functionality

### Validation Errors
**Problem**: Red validation errors appear
- **Solution**: Check the validation modal for specific rows
- **Solution**: Ensure all required fields have values
- **Solution**: Verify data types match requirements

### Filter Not Working
**Problem**: Filters don't show results
- **Solution**: Check date format is YYYY-MM-DD
- **Solution**: Ensure manager/team names match exactly
- **Solution**: Click "Reset Filter" and try again

### PPT Preview Empty
**Problem**: No slides show in preview
- **Solution**: Ensure data was uploaded successfully
- **Solution**: Check filters aren't excluding all data
- **Solution**: Return to dashboard and reload data

## 🔧 Development

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

## 📞 Support

For issues or questions:
1. Check this guide first
2. Review the main README.md
3. Contact the development team

## 🎯 Tips for Best Experience

1. **Use Demo Data First**: Click "Load Demo Data" to understand the format
2. **Check Validation**: Always review validation errors before proceeding
3. **Use Filters**: Narrow down large datasets for easier review
4. **Review Preview**: Always check PPT preview before generating
5. **Keep Excel Clean**: Ensure no empty rows or columns in your Excel file

## 📝 Notes

- This is a **frontend-only** application
- All PPT generation is simulated (no actual files created)
- Download button is a placeholder
- Data is not persisted (page refresh clears data)
- Authentication is for demo purposes only

