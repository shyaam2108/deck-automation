# Demo Credentials & Quick Access

## 🔐 Login Information

Since this is a frontend-only demo with dummy validation, you can use **any** credentials to log in.

### Example Credentials

**Option 1: Email**
- Email: `shyaam@singlife.com`
- Password: `password123`

**Option 2: Employee ID**
- Employee ID: `EMP001`
- Password: `demo`

**Option 3: Any credentials**
- Email/ID: `anything`
- Password: `anything`

> **Note**: All credentials are accepted. The system will log you in as "Shyaam | Frontend Developer"

## 🎮 Demo Features Access

### Quick Start Workflow

1. **Access Application**
   - Open: `http://localhost:5173`
   - Login with any credentials

2. **Load Demo Data**
   - Click "Load Demo Data" button on dashboard
   - Or upload your own Excel file

3. **Try Filters**
   - Select manager: "Mary"
   - Select team: "Web"
   - Click "Apply Filter"

4. **View PPT Preview**
   - Click "Preview PPT" button
   - Navigate through the slide-style layout

## 📝 Sample Data Included

The demo includes data for:

### Managers
- Carlo (Mobile team)
- Jan Isaac (Build team)
- Mary (Web team)
- Jahir (TechOps team)
- Julie (Testing team)

### Teams
- Mobile
- Web
- Build
- TechOps
- Testing

### Sprint Information
- Sprint #12
- Start: 2024-01-08
- End: 2024-01-22

### Task Sections
- BACK END
- FRONT END
- MOBILE
- DEVOPS
- TESTING

## 🎯 Test Scenarios

### Scenario 1: Successful Upload
1. Load demo data
2. See success toast
3. View data in table
4. Preview PPT

### Scenario 2: Validation Errors
1. Create Excel with missing fields
2. Upload file
3. See validation modal
4. Review red-highlighted cells

### Scenario 3: Filtering
1. Load demo data
2. Apply filter: Manager = "Mary"
3. See filtered results (2-3 tasks)
4. Reset filter

### Scenario 4: PPT Preview
1. Load demo data
2. Click "Preview PPT"
3. See slide layout
4. Click "Generate PPT"
5. See success toast

## 🔧 Development Server

```bash
# Start server
npm run dev

# Access at
http://localhost:5173

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📊 Mock API Endpoints (Not Implemented)

These endpoints are referenced in the code but not functional (frontend-only):

- `POST /api/upload-excel` - Excel upload
- `POST /api/validate-data` - Data validation
- `POST /api/generate-ppt` - PPT generation
- `GET /api/users` - User authentication

## 🎨 UI Testing

### Test Components

**Buttons**
- Primary: Red (#E31E24)
- Secondary: Gray
- Outline: Border only
- Disabled: Grayed out

**Toast Notifications**
- Success: Green with checkmark
- Error: Red with alert icon
- Info: Default gray

**Modals**
- Validation errors
- Click outside to close
- Press ESC to close

**Animations**
- Page transitions
- Hover effects
- Loading spinners
- Toast slide-ins

## 💡 Pro Tips

1. **Fast Testing**: Use "Load Demo Data" instead of uploading files
2. **See Validation**: Check `mockInvalidData` in mockData.js
3. **View All Features**: Follow the complete workflow at least once
4. **Test Responsiveness**: Resize browser window
5. **Check Animations**: Watch for smooth transitions on all actions

## 📱 Browser Compatibility

Tested on:
- ✅ Chrome 120+
- ✅ Firefox 121+
- ✅ Safari 17+
- ✅ Edge 120+

## 🐛 Known Limitations (By Design)

1. **No Backend**: All actions are simulated
2. **No File Generation**: PPT download is a placeholder
3. **No Persistence**: Data clears on page refresh
4. **Mock Authentication**: All logins succeed
5. **Frontend Only**: No actual API calls

## 🎓 Learning Resources

If you want to understand the code:

1. **Start with**: `src/App.jsx` (routing)
2. **Then check**: `src/pages/Dashboard.jsx` (main logic)
3. **UI Components**: `src/components/ui/` folder
4. **Custom Components**: `src/components/` folder
5. **Data & Logic**: `src/data/mockData.js`

## 📞 Need Help?

Refer to:
1. `README.md` - Project overview
2. `GETTING_STARTED.md` - Detailed usage guide
3. `FEATURES.md` - Complete feature list
4. This file - Quick access info

