import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { Button } from './ui/button'
import { LogOut, User } from 'lucide-react'
import { useToast } from './ToastProvider'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { showToast } = useToast()

  const handleLogout = () => {
    logout()
    showToast('Logged out successfully', 'success')
    navigate('/')
  }

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white border-b border-gray-200 shadow-sm"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-singlife-red rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-singlife-dark">
                Singlife ODC Deck Automation
              </h1>
              <p className="text-xs text-muted-foreground">
                Weekly Deck Preparation System
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {user && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center space-x-3 px-4 py-2 bg-singlife-gray rounded-lg"
              >
                <div className="w-8 h-8 bg-singlife-blue rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-singlife-dark">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.role}</p>
                </div>
              </motion.div>
            )}
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-singlife-red text-singlife-red hover:bg-singlife-red hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar

