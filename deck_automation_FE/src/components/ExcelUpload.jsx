import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { Upload, FileSpreadsheet, CheckCircle, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { useToast } from './ToastProvider'
import * as XLSX from 'xlsx'

const ExcelUpload = ({ onDataParsed, onValidationError }) => {
  const [uploadStatus, setUploadStatus] = useState(null)
  const [fileName, setFileName] = useState('')
  const { showToast } = useToast()

  const parseExcelFile = (file) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const data = e.target.result
        const workbook = XLSX.read(data, { type: 'binary' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const jsonData = XLSX.utils.sheet_to_json(worksheet)

        if (jsonData.length === 0) {
          showToast('Excel file is empty', 'destructive')
          setUploadStatus('error')
          return
        }

        // Simulate validation
        const hasErrors = jsonData.some(row => {
          return !row.jira || !row.date || !row.description || !row.status || !row.hours
        })

        if (hasErrors) {
          setUploadStatus('warning')
          onValidationError(jsonData)
          showToast('⚠️ Missing data found. Please review and correct.', 'destructive')
        } else {
          setUploadStatus('success')
          onDataParsed(jsonData)
          showToast('✅ Excel uploaded successfully', 'success')
        }
      } catch (error) {
        console.error('Error parsing Excel:', error)
        showToast('Error parsing Excel file', 'destructive')
        setUploadStatus('error')
      }
    }

    reader.readAsBinaryString(file)
  }

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      setFileName(file.name)
      setUploadStatus('uploading')
      
      // Simulate upload delay
      setTimeout(() => {
        parseExcelFile(file)
      }, 500)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    multiple: false
  })

  return (
    <Card className="border-2 border-dashed hover:border-singlife-blue transition-colors">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5 text-singlife-red" />
          Excel Upload
        </CardTitle>
        <CardDescription>
          Upload your weekly deck Excel file (.xlsx or .xls)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          {...getRootProps()}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={`
            p-8 border-2 border-dashed rounded-lg cursor-pointer transition-all
            ${isDragActive ? 'border-singlife-blue bg-blue-50' : 'border-gray-300 hover:border-singlife-blue'}
            ${uploadStatus === 'success' ? 'bg-green-50 border-green-500' : ''}
            ${uploadStatus === 'warning' ? 'bg-yellow-50 border-yellow-500' : ''}
            ${uploadStatus === 'error' ? 'bg-red-50 border-red-500' : ''}
          `}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            {uploadStatus === 'success' ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-green-600"
              >
                <CheckCircle className="w-16 h-16 mx-auto mb-2" />
                <p className="font-semibold">Upload Successful!</p>
                <p className="text-sm text-muted-foreground">{fileName}</p>
              </motion.div>
            ) : uploadStatus === 'warning' ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-yellow-600"
              >
                <AlertTriangle className="w-16 h-16 mx-auto mb-2" />
                <p className="font-semibold">Validation Warnings</p>
                <p className="text-sm text-muted-foreground">{fileName}</p>
              </motion.div>
            ) : (
              <>
                <Upload className={`w-16 h-16 ${isDragActive ? 'text-singlife-blue' : 'text-gray-400'}`} />
                <div>
                  <p className="text-lg font-semibold">
                    {isDragActive ? 'Drop your file here' : 'Drag & drop your Excel file'}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    or click to browse
                  </p>
                </div>
                <Button type="button" variant="outline" className="mt-2">
                  Choose File
                </Button>
              </>
            )}
          </div>
        </motion.div>
        {fileName && uploadStatus !== 'uploading' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center justify-between p-3 bg-singlife-gray rounded-lg"
          >
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-singlife-blue" />
              <span className="text-sm font-medium">{fileName}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                setFileName('')
                setUploadStatus(null)
              }}
            >
              Remove
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

export default ExcelUpload

