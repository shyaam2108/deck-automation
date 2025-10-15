import { useState } from 'react'
import { motion } from 'framer-motion'
import { Filter, RotateCcw } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Select } from './ui/select'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { managers, teams } from '../data/mockData'

const FilterPanel = ({ onFilterApply, onFilterReset }) => {
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    manager: '',
    team: ''
  })

  const handleApplyFilter = () => {
    onFilterApply(filters)
  }

  const handleResetFilter = () => {
    const resetFilters = {
      dateFrom: '',
      dateTo: '',
      manager: '',
      team: ''
    }
    setFilters(resetFilters)
    onFilterReset()
  }

  return (
    <Card className="border-l-4 border-l-singlife-blue">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-singlife-blue" />
          Filters
        </CardTitle>
        <CardDescription>
          Filter data by date range, manager, or team
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dateFrom">From Date</Label>
            <Input
              id="dateFrom"
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateTo">To Date</Label>
            <Input
              id="dateTo"
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="manager">Manager</Label>
            <Select
              id="manager"
              value={filters.manager}
              onChange={(e) => setFilters({ ...filters, manager: e.target.value })}
            >
              <option value="">All Managers</option>
              {managers.map((manager) => (
                <option key={manager} value={manager}>
                  {manager}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="team">Team</Label>
            <Select
              id="team"
              value={filters.team}
              onChange={(e) => setFilters({ ...filters, team: e.target.value })}
            >
              <option value="">All Teams</option>
              {teams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <motion.div
          className="flex gap-3 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Button
            onClick={handleApplyFilter}
            className="bg-singlife-blue hover:bg-singlife-blue/90 flex-1"
          >
            <Filter className="w-4 h-4 mr-2" />
            Apply Filter
          </Button>
          <Button
            onClick={handleResetFilter}
            variant="outline"
            className="border-gray-300"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  )
}

export default FilterPanel

