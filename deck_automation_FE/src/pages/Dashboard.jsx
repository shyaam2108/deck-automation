import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import ExcelUpload from '../components/ExcelUpload'
import FilterPanel from '../components/FilterPanel'
import DataTable from '../components/DataTable'
import ValidationModal from '../components/ValidationModal'
import { Button } from '../components/ui/button'
import { FileDown, Eye } from 'lucide-react'
import { mockExcelData, validateExcelData } from '../data/mockData'
import { useToast } from '../components/ToastProvider'

const Dashboard = () => {
  const [uploadedData, setUploadedData] = useState(null)
  const [filteredData, setFilteredData] = useState(null)
  const [validationErrors, setValidationErrors] = useState([])
  const [showValidationModal, setShowValidationModal] = useState(false)
  const navigate = useNavigate()
  const { showToast } = useToast()

  const handleDataParsed = (data) => {
    // Use mock data with proper structure if uploaded data doesn't have it
    const enrichedData = data.map((item, index) => ({
      ...mockExcelData[index % mockExcelData.length],
      ...item
    }))
    
    setUploadedData(enrichedData)
    setFilteredData(enrichedData)
    
    const validation = validateExcelData(enrichedData)
    if (!validation.isValid) {
      setValidationErrors(validation.errors)
    } else {
      setValidationErrors([])
    }
  }

  const handleValidationError = (data) => {
    const validation = validateExcelData(data)
    setValidationErrors(validation.errors)
    setShowValidationModal(true)
    setUploadedData(data)
    setFilteredData(data)
  }

  const handleFilterApply = (filters) => {
    if (!uploadedData) return

    let filtered = [...uploadedData]

    if (filters.dateFrom) {
      filtered = filtered.filter(item => item.date >= filters.dateFrom)
    }
    if (filters.dateTo) {
      filtered = filtered.filter(item => item.date <= filters.dateTo)
    }
    if (filters.manager) {
      filtered = filtered.filter(item => item.manager === filters.manager)
    }
    if (filters.team) {
      filtered = filtered.filter(item => item.team === filters.team)
    }

    setFilteredData(filtered)
    showToast(`Filter applied: ${filtered.length} records found`, 'success')
  }

  const handleFilterReset = () => {
    setFilteredData(uploadedData)
    showToast('Filters reset', 'success')
  }

  const handleGeneratePPT = () => {
    if (validationErrors.length > 0) {
      showToast('Please fix validation errors before generating PPT', 'destructive')
      setShowValidationModal(true)
      return
    }
    navigate('/ppt-preview', { state: { data: filteredData || uploadedData } })
  }

  const handleUseMockData = () => {
    setUploadedData(mockExcelData)
    setFilteredData(mockExcelData)
    setValidationErrors([])
    showToast('Mock data loaded successfully', 'success')
  }

  const isGenerateDisabled = !uploadedData || validationErrors.length > 0

  return (
    <div className="min-h-screen bg-singlife-gray">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-singlife-dark">Dashboard</h2>
              <p className="text-muted-foreground mt-1">
                Upload and manage your weekly deck data
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleUseMockData}
                variant="outline"
                className="border-singlife-blue text-singlife-blue"
              >
                Load Demo Data
              </Button>
              <Button
                onClick={handleGeneratePPT}
                disabled={isGenerateDisabled}
                className="bg-singlife-red hover:bg-singlife-red/90"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview PPT
              </Button>
            </div>
          </div>

          {/* Upload Section */}
          <ExcelUpload
            onDataParsed={handleDataParsed}
            onValidationError={handleValidationError}
          />

          {/* Filters Section */}
          {uploadedData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <FilterPanel
                onFilterApply={handleFilterApply}
                onFilterReset={handleFilterReset}
              />
            </motion.div>
          )}

          {/* Data Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <DataTable
              data={filteredData}
              validationErrors={validationErrors}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Validation Modal */}
      <ValidationModal
        open={showValidationModal}
        onClose={() => setShowValidationModal(false)}
        errors={validationErrors}
      />
    </div>
  )
}

export default Dashboard

