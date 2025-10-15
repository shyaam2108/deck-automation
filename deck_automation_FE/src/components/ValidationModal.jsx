import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'

const ValidationModal = ({ open, onClose, errors }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent onClose={onClose} className="max-w-2xl">
        <DialogHeader>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4"
          >
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </motion.div>
          <DialogTitle className="text-center text-xl">
            Validation Errors Detected
          </DialogTitle>
          <DialogDescription className="text-center">
            Some cells are empty. Please fix the following errors and re-upload.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <div className="max-h-96 overflow-y-auto space-y-3">
            {errors.map((error, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 bg-red-50 border border-red-200 rounded-lg"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {error.row}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-red-800 mb-1">
                      Row {error.row}
                    </p>
                    <p className="text-sm text-red-700">
                      Missing fields: <span className="font-semibold">{error.fields.join(', ')}</span>
                    </p>
                    {error.data && (
                      <div className="mt-2 text-xs text-red-600 bg-white p-2 rounded border border-red-200">
                        <p className="font-mono">
                          JIRA: {error.data.jira || '❌'} | 
                          Date: {error.data.date || '❌'} | 
                          Desc: {error.data.description ? '✓' : '❌'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <Button onClick={onClose} className="bg-singlife-red hover:bg-singlife-red/90">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ValidationModal

