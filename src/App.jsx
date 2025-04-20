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
        setUser(null)
        localStorage.removeItem('loggedInUser')
    }

    const handleLogin = (email, password) => {
        const { employees, admin } = getLocalStorage()
        
        if (email === 'admin@example.com' && password === '12345') {
            const adminUser = { role: 'admin', email: 'admin@example.com' }
            setUser(adminUser)
            localStorage.setItem('loggedInUser', JSON.stringify(adminUser))
             return <AdminDashboard handleLogout={handleLogout} user={user} />
        }

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
                alert('Error parsing user data. Please try again.')
                localStorage.removeItem('loggedInUser')
            }
        }
    }, [])

    if (user === undefined) {
        return <div>Loading...</div>
    }

    if (!user) {
        return <Login handleLogin={handleLogin} />
    }

    return user.role === 'admin' 
        ? <AdminDashboard handleLogout={handleLogout} user={user} /> 
        : <EmpDashboard handleLogout={handleLogout} user={user} />
}

export default App


