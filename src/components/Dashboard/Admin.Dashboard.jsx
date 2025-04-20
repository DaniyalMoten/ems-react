import React from 'react'
import Header from '../other/Header'
import CreateTask from '../other/CreateTask'
import AllTask from '../TaskList/AllTask'

const AdminDashboard = ({ handleLogout, user }) => {
    if (!user || !handleLogout) {
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

AdminDashboard.defaultProps = {
    handleLogout: () => console.warn('handleLogout not provided'),
    user: null
}

export default AdminDashboard;