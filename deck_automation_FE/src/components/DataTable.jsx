import { motion } from 'framer-motion'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { FileText } from 'lucide-react'

const DataTable = ({ data, validationErrors = [] }) => {
  const hasError = (rowIndex, field) => {
    return validationErrors.some(
      error => error.row === rowIndex + 1 && error.fields.includes(field)
    )
  }

  const getRowError = (rowIndex) => {
    return validationErrors.find(error => error.row === rowIndex + 1)
  }

  if (!data || data.length === 0) {
    return (
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-singlife-blue" />
            Data Preview
          </CardTitle>
          <CardDescription>
            Upload an Excel file to preview data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No data to display</p>
            <p className="text-sm text-muted-foreground mt-2">
              Upload an Excel file to see the data preview here
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

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

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-singlife-blue" />
          Data Preview
        </CardTitle>
        <CardDescription>
          Review the formatted data matching PPT structure
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {Object.entries(groupedData).map(([teamLeadKey, group], groupIndex) => (
            <motion.div
              key={teamLeadKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIndex * 0.1 }}
              className="border rounded-lg overflow-hidden"
            >
              {/* Team Lead Header */}
              <div className="bg-singlife-red text-white p-4">
                <h3 className="font-bold text-lg">{group.teamLead}</h3>
                <p className="text-sm opacity-90">
                  {group.sprint} | {group.sprintStart} - {group.sprintEnd}
                </p>
              </div>

              {/* Sections */}
              {Object.entries(group.sections).map(([sectionName, items]) => (
                <div key={sectionName} className="relative">
                  {/* Left vertical bar with section title */}
                  <div className="absolute left-0 top-0 bottom-0 w-12 bg-singlife-blue flex items-center justify-center">
                    <span className="transform -rotate-90 whitespace-nowrap text-white font-bold text-sm">
                      {sectionName}
                    </span>
                  </div>

                  {/* Table */}
                  <div className="ml-12">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-100 hover:bg-gray-100">
                          <TableHead className="font-bold text-singlife-dark w-[15%]">JIRA</TableHead>
                          <TableHead className="font-bold text-singlife-dark w-[12%]">Date</TableHead>
                          <TableHead className="font-bold text-singlife-dark w-[40%]">Description</TableHead>
                          <TableHead className="font-bold text-singlife-dark w-[15%]">Status</TableHead>
                          <TableHead className="font-bold text-singlife-dark w-[10%]">Hours</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {items.map((row, rowIndex) => {
                          const actualRowIndex = data.indexOf(row)
                          const rowError = getRowError(actualRowIndex)
                          return (
                            <TableRow key={rowIndex} className={rowError ? 'bg-red-50' : ''}>
                              <TableCell className={hasError(actualRowIndex, 'jira') ? 'bg-red-100 text-red-700 font-semibold' : ''}>
                                {row.jira || <span className="text-red-500">Missing</span>}
                              </TableCell>
                              <TableCell className={hasError(actualRowIndex, 'date') ? 'bg-red-100 text-red-700 font-semibold' : ''}>
                                {row.date || <span className="text-red-500">Missing</span>}
                              </TableCell>
                              <TableCell className={hasError(actualRowIndex, 'description') ? 'bg-red-100 text-red-700 font-semibold' : ''}>
                                {row.description || <span className="text-red-500">Missing</span>}
                              </TableCell>
                              <TableCell className={hasError(actualRowIndex, 'status') ? 'bg-red-100 text-red-700 font-semibold' : ''}>
                                <span className={`
                                  px-2 py-1 rounded text-xs font-semibold
                                  ${row.status === 'Completed' ? 'bg-green-100 text-green-700' : ''}
                                  ${row.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : ''}
                                  ${row.status === 'Testing' ? 'bg-yellow-100 text-yellow-700' : ''}
                                  ${!row.status ? 'bg-red-100 text-red-700' : ''}
                                `}>
                                  {row.status || 'Missing'}
                                </span>
                              </TableCell>
                              <TableCell className={hasError(actualRowIndex, 'hours') ? 'bg-red-100 text-red-700 font-semibold' : ''}>
                                {row.hours || <span className="text-red-500">Missing</span>}
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
        {validationErrors.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <h4 className="font-semibold text-red-800 mb-2">Validation Errors Found:</h4>
            <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
              {validationErrors.map((error, index) => (
                <li key={index}>
                  Row {error.row}: Missing fields - {error.fields.join(', ')}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

export default DataTable

