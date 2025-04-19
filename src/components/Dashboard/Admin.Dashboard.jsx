import React from 'react'
import Header from '../other/Header'
import CreateTask from '../other/CreateTask'
import AllTask from '../TaskList/AllTask'

const AdminDashboard = ({ handleLogout, user }) => {
    // Early return if user or required props are missing
    if (!user || !handleLogout) {
        console.log("Missing required props in AdminDashboard");
        return null;
    }

    return (
        <div className='h-screen p-7 w-full'>
            <Header handleLogout={handleLogout} user={user} />
            <CreateTask />
            <AllTask />
        </div>
    )
}

// Add prop validation
AdminDashboard.defaultProps = {
    handleLogout: () => console.warn('handleLogout not provided'),
    user: null
}

export default AdminDashboard;