import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { ArrowLeft, Download, FileText, CheckCircle } from 'lucide-react'
import { useToast } from '../components/ToastProvider'
import { useState } from 'react'

const PPTPreview = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)
  const data = location.state?.data || []

  // Group data by team lead and section
  const groupedData = data.reduce((acc, item) => {
    const key = item.teamLead || 'Unknown Team Lead'
    if (!acc[key]) {
      acc[key] = {
        teamLead: item.teamLead,
        sprint: item.sprint,
        sprintStart: item.sprintStart,
        sprintEnd: item.sprintEnd,
        sections: {}
      }
    }
    const section = item.section || 'Other'
    if (!acc[key].sections[section]) {
      acc[key].sections[section] = []
    }
    acc[key].sections[section].push(item)
    return acc
  }, {})

  const handleGeneratePPT = () => {
    setIsGenerating(true)
    // Simulate PPT generation
    setTimeout(() => {
      setIsGenerating(false)
      showToast('✅ PPT generated successfully (Preview mode)', 'success')
    }, 2000)
  }

  const handleDownload = () => {
    showToast('Download feature coming soon (Frontend-only demo)', 'default')
  }

  if (data.length === 0) {
    return (
      <div className="min-h-screen bg-singlife-gray">
        <Navbar />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center py-20">
            <FileText className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-700 mb-2">No Data Available</h2>
            <p className="text-muted-foreground mb-6">
              Please upload data from the dashboard first
            </p>
            <Button onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    )
  }

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
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate('/dashboard')}
                variant="outline"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h2 className="text-3xl font-bold text-singlife-dark">PPT Preview</h2>
                <p className="text-muted-foreground mt-1">
                  Review the presentation layout before generating
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleDownload}
                variant="outline"
                className="border-singlife-blue text-singlife-blue"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PPT
              </Button>
              <Button
                onClick={handleGeneratePPT}
                disabled={isGenerating}
                className="bg-singlife-red hover:bg-singlife-red/90"
              >
                {isGenerating ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full"
                    />
                    Generating...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Generate PPT
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* PPT Slides Preview */}
          <div className="space-y-8">
            {Object.entries(groupedData).map(([teamLeadKey, group], slideIndex) => (
              <motion.div
                key={teamLeadKey}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: slideIndex * 0.1 }}
              >
                <Card className="overflow-hidden border-2 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-singlife-red to-red-600 text-white pb-16">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl font-bold mb-2">
                          {group.teamLead}
                        </CardTitle>
                        <p className="text-white/90 text-sm">
                          {group.sprint} | {group.sprintStart} - {group.sprintEnd}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                          <p className="text-xs opacity-80">Slide</p>
                          <p className="text-2xl font-bold">{slideIndex + 1}</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    {Object.entries(group.sections).map(([sectionName, items]) => (
                      <div key={sectionName} className="relative border-b last:border-b-0">
                        {/* Left vertical bar */}
                        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-b from-singlife-blue to-blue-700 flex items-center justify-center shadow-lg">
                          <span className="transform -rotate-90 whitespace-nowrap text-white font-bold text-sm tracking-wider">
                            {sectionName}
                          </span>
                        </div>

                        {/* Content area */}
                        <div className="ml-16 p-6 bg-white">
                          <div className="space-y-4">
                            {items.map((item, itemIndex) => (
                              <motion.div
                                key={itemIndex}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: (slideIndex * 0.1) + (itemIndex * 0.05) }}
                                className="grid grid-cols-12 gap-4 p-4 bg-singlife-gray rounded-lg hover:shadow-md transition-shadow"
                              >
                                <div className="col-span-2">
                                  <p className="text-xs text-muted-foreground mb-1">JIRA</p>
                                  <p className="font-semibold text-singlife-blue">{item.jira}</p>
                                </div>
                                <div className="col-span-2">
                                  <p className="text-xs text-muted-foreground mb-1">Date</p>
                                  <p className="font-medium">{item.date}</p>
                                </div>
                                <div className="col-span-4">
                                  <p className="text-xs text-muted-foreground mb-1">Description</p>
                                  <p className="font-medium text-sm">{item.description}</p>
                                </div>
                                <div className="col-span-2">
                                  <p className="text-xs text-muted-foreground mb-1">Status</p>
                                  <span className={`
                                    inline-block px-3 py-1 rounded-full text-xs font-semibold
                                    ${item.status === 'Completed' ? 'bg-green-100 text-green-700' : ''}
                                    ${item.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : ''}
                                    ${item.status === 'Testing' ? 'bg-yellow-100 text-yellow-700' : ''}
                                  `}>
                                    {item.status}
                                  </span>
                                </div>
                                <div className="col-span-2">
                                  <p className="text-xs text-muted-foreground mb-1">Hours</p>
                                  <p className="font-bold text-singlife-red text-lg">{item.hours}h</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                          {/* Summary */}
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                              <p className="text-sm text-muted-foreground">
                                Total Tasks: <span className="font-semibold text-singlife-dark">{items.length}</span>
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Total Hours: <span className="font-bold text-singlife-red text-lg">
                                  {items.reduce((sum, item) => sum + (item.hours || 0), 0)}h
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-2 border-singlife-blue">
              <CardHeader className="bg-gradient-to-r from-singlife-blue to-blue-600 text-white">
                <CardTitle className="text-xl">Overall Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-singlife-gray rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Total Slides</p>
                    <p className="text-3xl font-bold text-singlife-dark">{Object.keys(groupedData).length}</p>
                  </div>
                  <div className="text-center p-4 bg-singlife-gray rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Total Tasks</p>
                    <p className="text-3xl font-bold text-singlife-blue">{data.length}</p>
                  </div>
                  <div className="text-center p-4 bg-singlife-gray rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Total Hours</p>
                    <p className="text-3xl font-bold text-singlife-red">
                      {data.reduce((sum, item) => sum + (item.hours || 0), 0)}h
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default PPTPreview

