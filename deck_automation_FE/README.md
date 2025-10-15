# Singlife ODC Deck Automation - Frontend

A professional frontend-only application for automating the weekly deck preparation process for Singlife ODC teams.

## 🚀 Features

- **User Authentication**: Login page with dummy validation
- **Excel Upload**: Drag-and-drop or file browser for .xlsx/.xls files
- **Data Validation**: Automatic validation with error highlighting
- **Advanced Filtering**: Filter by date range, manager, and team
- **Data Preview**: Table view matching PPT structure with team leads and sections
- **PPT Preview**: Static presentation layout preview before generation
- **Responsive Design**: Clean, modern UI with Singlife branding
- **Smooth Animations**: Framer Motion transitions throughout

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first styling
- **shadcn/ui** - Reusable component library
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **XLSX** - Excel file parsing
- **Lucide React** - Icon library

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

## 🎯 Usage

### Login
- Use any email/employee ID and password to log in (dummy validation)
- Default user: "Shyaam | Frontend Developer"

### Dashboard
1. **Upload Excel File**: 
   - Drag and drop or click to browse for .xlsx/.xls files
   - Or click "Load Demo Data" to use mock data
   
2. **Apply Filters**:
   - Filter by date range (From/To dates)
   - Select manager (Carlo, Jan Isaac, Mary, Jahir, Julie)
   - Select team (Mobile, Web, Build, TechOps, Testing)
   
3. **Review Data**:
   - View data in PPT-style layout with team leads
   - Missing fields are highlighted in red
   - Validation errors shown in modal

4. **Generate Preview**:
   - Click "Preview PPT" to see the presentation layout
   - Button is disabled if validation errors exist

### PPT Preview
- View static presentation slides grouped by team lead
- Each slide shows tasks organized by section (BACK END, FRONT END, etc.)
- See overall summary with total slides, tasks, and hours
- Mock "Generate PPT" and "Download PPT" actions (frontend-only)

## 📁 Project Structure

```
deck_automation_FE/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── DataTable.jsx    # Data preview table
│   │   ├── ExcelUpload.jsx  # File upload component
│   │   ├── FilterPanel.jsx  # Filtering interface
│   │   ├── Navbar.jsx       # Navigation bar
│   │   ├── ToastProvider.jsx # Toast notifications
│   │   └── ValidationModal.jsx # Error modal
│   ├── context/
│   │   └── AuthContext.jsx  # Authentication state
│   ├── data/
│   │   └── mockData.js      # Mock Excel data
│   ├── lib/
│   │   └── utils.js         # Utility functions
│   ├── pages/
│   │   ├── Dashboard.jsx    # Main dashboard
│   │   ├── Login.jsx        # Login page
│   │   └── PPTPreview.jsx   # PPT preview page
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # App entry point
│   └── index.css            # Global styles
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎨 Design System

### Colors
- **Primary Red**: `#E31E24` - Singlife brand color
- **Primary Blue**: `#0066CC` - Secondary brand color
- **Dark**: `#1A1A1A` - Text color
- **Gray**: `#F5F5F5` - Background color

### Components
All UI components are built with shadcn/ui and customized for the Singlife theme:
- Button, Input, Select, Label
- Card, Dialog, Table
- Toast notifications

## 🔄 Mock API Endpoints (Placeholders)

The following endpoints are referenced but not implemented (frontend-only):
- `POST /api/upload-excel` - Excel file upload
- `POST /api/validate-data` - Data validation
- `POST /api/generate-ppt` - PPT generation

## 📝 Data Structure

Expected Excel columns:
- **JIRA**: Ticket number
- **Date**: Task date (YYYY-MM-DD)
- **Description**: Task description
- **Status**: Completed, In Progress, Testing
- **Hours**: Hours spent (number)
- **Team**: Mobile, Web, Build, TechOps, Testing
- **Manager**: Carlo, Jan Isaac, Mary, Jahir, Julie
- **Team Lead**: Full name of team lead
- **Sprint**: Sprint number and name
- **Sprint Start/End**: Sprint dates
- **Section**: BACK END, FRONT END, MOBILE, DEVOPS, TESTING

## 🚧 Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📄 License

Private project for Singlife ODC internal use.

## 👨‍💻 Developer

Built with ❤️ for the Singlife ODC team

