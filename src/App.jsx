import React, { useEffect, useState, useContext } from 'react'
import Login from './components/auth/Login'
import { AuthContext } from './context/AuthProvider'
import EmpDashboard from './components/Dashboard/EmpDashboard'
import AdminDashboard from './components/Dashboard/Admin.Dashboard'
import { getLocalStorage } from './utils/localStorage'

const App = () => {
    const [user, setUser] = useState(null)
    const [userData, setUserData] = useContext(AuthContext)

    const handleLogout = () => {
        // Clear user state
        setUser(null)
        // Remove from localStorage
        localStorage.removeItem('loggedInUser')
    }

    const handleLogin = (email, password) => {
        const { employees, admin } = getLocalStorage()
        
        // Check for admin login
        if (email === 'admin@example.com' && password === '12345') {
            const adminUser = { role: 'admin', email: 'admin@example.com' }
            setUser(adminUser)
            localStorage.setItem('loggedInUser', JSON.stringify(adminUser))
             return <AdminDashboard handleLogout={handleLogout} user={user} />
        }

        // Check for employee login
        const employee = employees.find(emp => emp.email === email && emp.password === password)
        if (employee) {
            const employeeUser = { role: 'employee', ...employee }
            setUser(employeeUser)
            localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', id: employee.id }))
            return
        }

        alert('Invalid credentials')
    }

    useEffect(() => {
        // Check if user is already logged in
        const loggedInUser = localStorage.getItem("loggedInUser")
        if (loggedInUser) {
            try {
                const userData = JSON.parse(loggedInUser)
                if (userData.role === 'admin') {
                    setUser({ role: 'admin', email: 'admin@example.com' })
                    setUserData(userData)
                } else if (userData.role === 'employee') {
                    const { employees } = getLocalStorage()
                    const employee = employees.find(emp => emp.id === userData.id)
                    if (employee) {
                        setUser({ role: 'employee', ...employee })
                        setUserData(userData)
                      }
                }
            } catch (error) {
                console.error('Error parsing user data:', error)
                localStorage.removeItem('loggedInUser')
            }
        }
    }, [])

    // Show loading state while checking authentication
    if (user === undefined) {
        return <div>Loading...</div>
    }

    // Show login if no user
    if (!user) {
        return <Login handleLogin={handleLogin} />
    }

    // Render appropriate dashboard based on user role
    return user.role === 'admin' 
        ? <AdminDashboard handleLogout={handleLogout} user={user} /> 
        : <EmpDashboard handleLogout={handleLogout} user={user} />
}

export default App


