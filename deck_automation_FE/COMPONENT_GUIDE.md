# Component Architecture Guide

## 🏗️ Project Structure

```
deck_automation_FE/
├── src/
│   ├── components/          # Reusable components
│   │   ├── ui/             # shadcn/ui base components
│   │   ├── DataTable.jsx   # Main data display
│   │   ├── ExcelUpload.jsx # File upload
│   │   ├── FilterPanel.jsx # Data filtering
│   │   ├── Navbar.jsx      # Navigation
│   │   ├── ToastProvider.jsx # Notifications
│   │   └── ValidationModal.jsx # Error display
│   ├── context/            # Global state
│   │   └── AuthContext.jsx # Authentication
│   ├── data/               # Mock data & utilities
│   │   └── mockData.js     # Sample data + validation
│   ├── lib/                # Utilities
│   │   └── utils.js        # Helper functions
│   ├── pages/              # Route pages
│   │   ├── Login.jsx       # Authentication page
│   │   ├── Dashboard.jsx   # Main app page
│   │   └── PPTPreview.jsx  # Preview page
│   ├── App.jsx             # Router setup
│   ├── main.jsx            # React entry
│   └── index.css           # Global styles
├── public/                 # Static assets
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
└── jsconfig.json          # Path aliases
```

## 📦 Component Details

### 1. UI Components (`src/components/ui/`)

#### Button (`button.jsx`)
```jsx
<Button variant="default" size="lg">Click Me</Button>
```
**Variants**: default, destructive, outline, secondary, ghost, link
**Sizes**: default, sm, lg, icon
**Props**: className, onClick, disabled, type

#### Input (`input.jsx`)
```jsx
<Input type="text" placeholder="Enter text" />
```
**Types**: text, password, email, date, number
**Props**: className, value, onChange, disabled

#### Select (`select.jsx`)
```jsx
<Select value={value} onChange={handleChange}>
  <option value="1">Option 1</option>
</Select>
```
**Props**: className, value, onChange, disabled

#### Card (`card.jsx`)
```jsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

#### Table (`table.jsx`)
```jsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Column</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Data</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

#### Dialog (`dialog.jsx`)
```jsx
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent onClose={handleClose}>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

#### Label (`label.jsx`)
```jsx
<Label htmlFor="input-id">Label Text</Label>
```

#### Toast (`toast.jsx`)
```jsx
<Toast variant="success" onClose={handleClose}>
  Message here
</Toast>
```
**Variants**: default, success, destructive

---

### 2. Custom Components (`src/components/`)

#### Navbar (`Navbar.jsx`)
**Purpose**: Top navigation with branding and user info

**Features**:
- Singlife logo and app name
- User profile display
- Logout button
- Animated entrance

**Usage**:
```jsx
<Navbar />
```

**State**: Uses `useAuth()` hook

---

#### ExcelUpload (`ExcelUpload.jsx`)
**Purpose**: File upload with drag-and-drop

**Props**:
- `onDataParsed(data)` - Success callback
- `onValidationError(data)` - Error callback

**Features**:
- Drag-and-drop zone
- File type validation (.xlsx, .xls)
- Excel parsing (XLSX library)
- Visual upload states
- File preview
- Remove file option

**Usage**:
```jsx
<ExcelUpload
  onDataParsed={handleData}
  onValidationError={handleError}
/>
```

**States**:
- `null` - Initial
- `uploading` - Processing
- `success` - Valid data
- `warning` - Has errors
- `error` - Failed to parse

---

#### FilterPanel (`FilterPanel.jsx`)
**Purpose**: Multi-criteria data filtering

**Props**:
- `onFilterApply(filters)` - Apply callback
- `onFilterReset()` - Reset callback

**Features**:
- Date range picker (from/to)
- Manager dropdown
- Team dropdown
- Apply/Reset buttons
- Animated interactions

**Usage**:
```jsx
<FilterPanel
  onFilterApply={handleFilter}
  onFilterReset={handleReset}
/>
```

**Filter Object**:
```js
{
  dateFrom: '2024-01-01',
  dateTo: '2024-01-31',
  manager: 'Mary',
  team: 'Web'
}
```

---

#### DataTable (`DataTable.jsx`)
**Purpose**: Display data in PPT-style layout

**Props**:
- `data` - Array of task objects
- `validationErrors` - Array of error objects

**Features**:
- Grouped by team lead
- Sections with colored bars
- Sprint information headers
- Color-coded status badges
- Error highlighting (red cells)
- Empty state
- Responsive layout

**Usage**:
```jsx
<DataTable
  data={uploadedData}
  validationErrors={errors}
/>
```

**Data Structure**:
```js
{
  jira: 'SING-1234',
  date: '2024-01-15',
  description: 'Task description',
  status: 'Completed',
  hours: 8,
  team: 'Web',
  manager: 'Mary',
  teamLead: 'Mary Clare Delos Reyes',
  sprint: 'Sprint #12',
  sprintStart: '2024-01-08',
  sprintEnd: '2024-01-22',
  section: 'BACK END'
}
```

---

#### ValidationModal (`ValidationModal.jsx`)
**Purpose**: Display validation errors in modal

**Props**:
- `open` - Boolean state
- `onClose()` - Close callback
- `errors` - Array of error objects

**Features**:
- Error list with row numbers
- Missing field details
- Animated entries
- Scrollable content
- Click outside to close

**Usage**:
```jsx
<ValidationModal
  open={showModal}
  onClose={handleClose}
  errors={validationErrors}
/>
```

**Error Object**:
```js
{
  row: 2,
  fields: ['jira', 'description'],
  data: { /* row data */ }
}
```

---

#### ToastProvider (`ToastProvider.jsx`)
**Purpose**: Global toast notification system

**Features**:
- Auto-dismiss (4 seconds)
- Manual close button
- Stacked toasts
- Animated slide-in/out
- Multiple variants

**Usage**:
```jsx
// In App.jsx
<ToastProvider>
  {children}
</ToastProvider>

// In any component
const { showToast } = useToast()
showToast('Success message', 'success')
showToast('Error message', 'destructive')
```

---

### 3. Context Providers (`src/context/`)

#### AuthContext (`AuthContext.jsx`)
**Purpose**: Global authentication state

**State**:
- `user` - User object or null
- `isAuthenticated` - Boolean

**Methods**:
- `login(email, password)` - Returns `{success, error?}`
- `logout()` - Clears user state

**Usage**:
```jsx
const { user, isAuthenticated, login, logout } = useAuth()

// Login
const result = login('email', 'password')
if (result.success) { /* navigate */ }

// Logout
logout()

// User info
console.log(user.name) // "Shyaam"
console.log(user.role) // "Frontend Developer"
```

---

### 4. Pages (`src/pages/`)

#### Login (`Login.jsx`)
**Route**: `/`

**Features**:
- Email/Employee ID field
- Password field
- Validation
- Error display
- Animated card
- Success toast
- Auto-redirect to dashboard

**State**:
- `email` - Input value
- `password` - Input value
- `error` - Error message

---

#### Dashboard (`Dashboard.jsx`)
**Route**: `/dashboard` (protected)

**Features**:
- Excel upload section
- Filter panel
- Data preview table
- Validation modal
- Mock data loader
- Preview PPT button

**State**:
- `uploadedData` - Raw uploaded data
- `filteredData` - Filtered data
- `validationErrors` - Error list
- `showValidationModal` - Modal visibility

**Flow**:
1. Upload Excel → Parse → Validate
2. Apply filters → Update view
3. Preview PPT → Navigate with data

---

#### PPTPreview (`PPTPreview.jsx`)
**Route**: `/ppt-preview` (protected)

**Features**:
- Slide-style layout
- One slide per team lead
- Section organization
- Task cards
- Summary statistics
- Generate button (mock)
- Download button (mock)
- Back navigation

**State**:
- `isGenerating` - Loading state
- Data from `location.state`

**Layout**:
- Header: Team lead name, sprint info
- Sections: Colored vertical bars
- Tasks: Grid layout with all details
- Footer: Task and hour summaries

---

### 5. Utilities & Data

#### utils.js
**Purpose**: Helper functions

**Functions**:
- `cn(...inputs)` - Merges className strings with tailwind-merge

**Usage**:
```jsx
<div className={cn("base-class", isActive && "active-class", className)} />
```

---

#### mockData.js
**Purpose**: Sample data and validation logic

**Exports**:
- `managers` - Array of manager names
- `teams` - Array of team names
- `mockExcelData` - Sample valid data (8 tasks)
- `mockInvalidData` - Sample invalid data (2 tasks with errors)
- `validateExcelData(data)` - Validation function

**Validation Function**:
```js
const result = validateExcelData(data)
// Returns:
{
  isValid: boolean,
  errors: [
    { row: number, fields: string[], data: object }
  ]
}
```

---

## 🎨 Styling System

### Tailwind Classes

**Colors**:
- `bg-singlife-red` - #E31E24
- `bg-singlife-blue` - #0066CC
- `bg-singlife-dark` - #1A1A1A
- `bg-singlife-gray` - #F5F5F5

**Common Patterns**:
```jsx
// Card
className="rounded-lg border bg-white shadow-sm p-6"

// Button Primary
className="bg-singlife-red hover:bg-singlife-red/90 text-white"

// Input
className="h-10 w-full rounded-md border px-3 py-2"

// Badge Success
className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs"
```

### Framer Motion Patterns

**Page Entrance**:
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
```

**Hover Effect**:
```jsx
<motion.div
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
```

**Loading Spinner**:
```jsx
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
/>
```

---

## 🔄 State Flow

### Authentication Flow
```
Login Page → AuthContext.login()
  ↓ success
Dashboard (protected route)
  ↓ logout
Navbar.logout() → AuthContext.logout() → Login Page
```

### Data Flow
```
Dashboard
  ↓
ExcelUpload → parse Excel → validate
  ↓ success
Update uploadedData & filteredData
  ↓
DataTable renders grouped data
  ↓ user clicks "Preview PPT"
Navigate to PPTPreview with data in location.state
  ↓
PPTPreview renders slides
```

### Filter Flow
```
FilterPanel → user sets filters → clicks Apply
  ↓
Dashboard.handleFilterApply(filters)
  ↓
Filter uploadedData → update filteredData
  ↓
DataTable re-renders with filtered data
```

---

## 🧪 Testing Components

### Manual Test Checklist

**Login**:
- [ ] Enter credentials and submit
- [ ] See error with empty fields
- [ ] See success toast on login
- [ ] Redirect to dashboard

**Upload**:
- [ ] Drag and drop file
- [ ] Click to browse file
- [ ] See upload animation
- [ ] See success state
- [ ] Load mock data works

**Validation**:
- [ ] Upload invalid data
- [ ] See validation modal
- [ ] Red cells in table
- [ ] Error list displays

**Filters**:
- [ ] Apply date filter
- [ ] Apply manager filter
- [ ] Apply team filter
- [ ] Reset filters
- [ ] See toast feedback

**Preview**:
- [ ] Navigate to preview
- [ ] See slide layout
- [ ] Click generate
- [ ] See loading state
- [ ] Back button works

---

## 💡 Customization Guide

### Add New Manager
```js
// src/data/mockData.js
export const managers = [
  'Carlo', 'Jan Isaac', 'Mary', 'Jahir', 'Julie',
  'New Manager' // Add here
]
```

### Add New Status
```jsx
// src/components/DataTable.jsx
<span className={`
  ${row.status === 'New Status' ? 'bg-purple-100 text-purple-700' : ''}
`}>
```

### Change Brand Colors
```js
// tailwind.config.js
singlife: {
  red: "#E31E24",    // Change primary
  blue: "#0066CC",   // Change secondary
  // ...
}
```

### Add New Route
```jsx
// src/App.jsx
<Route
  path="/new-page"
  element={
    <ProtectedRoute>
      <NewPage />
    </ProtectedRoute>
  }
/>
```

---

## 📚 Best Practices Used

1. **Component Composition**: Small, reusable components
2. **Context for Global State**: Auth and Toast
3. **Custom Hooks**: useAuth, useToast
4. **Prop Drilling Avoided**: Context API
5. **Consistent Naming**: PascalCase for components
6. **File Organization**: Grouped by type
7. **Responsive Design**: Mobile-first approach
8. **Accessibility**: Semantic HTML, aria labels
9. **Error Handling**: Try-catch, validation
10. **Loading States**: Better UX during async ops

---

## 🎓 Learning Path

If you're new to the codebase:

1. **Start**: `src/App.jsx` - Understanding routing
2. **Context**: `src/context/AuthContext.jsx` - State management
3. **Pages**: `src/pages/Login.jsx` - Simple page structure
4. **Components**: `src/components/ExcelUpload.jsx` - Complex component
5. **UI**: `src/components/ui/button.jsx` - Base components
6. **Utilities**: `src/lib/utils.js` - Helper functions
7. **Data**: `src/data/mockData.js` - Data structures

---

This guide should help you understand and maintain the codebase!

