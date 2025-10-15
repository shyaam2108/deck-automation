import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { useToast } from '../components/ToastProvider'
import { LogIn } from 'lucide-react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const { showToast } = useToast()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    const result = login(email, password)
    if (result.success) {
      showToast('Login successful! Welcome back.', 'success')
      navigate('/dashboard')
    } else {
      setError(result.error)
      showToast('Login failed. Please check your credentials.', 'destructive')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-singlife-gray via-white to-blue-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-t-4 border-t-singlife-red shadow-xl">
          <CardHeader className="space-y-3 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-16 h-16 bg-singlife-red rounded-full flex items-center justify-center"
            >
              <LogIn className="w-8 h-8 text-white" />
            </motion.div>
            <CardTitle className="text-3xl font-bold text-singlife-dark">
              Singlife ODC
            </CardTitle>
            <CardDescription className="text-base">
              Deck Automation System
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email / Employee ID</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your email or employee ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11"
                />
              </div>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200"
                >
                  {error}
                </motion.div>
              )}
              <Button 
                type="submit" 
                className="w-full h-11 bg-singlife-red hover:bg-singlife-red/90 text-white font-medium"
              >
                Sign In
              </Button>
            </form>
            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Demo credentials: Use any email and password</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default Login

