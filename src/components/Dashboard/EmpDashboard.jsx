import React from 'react'
import Header from '../other/Header'
import TaskListNumber from '../other/TaskListNumber'
import TaskList from '../TaskList/TaskList'

const EmpDashboard = ({ handleLogout, user }) => {
    // Early return if user or required props are missing
    if (!user || !handleLogout) {
        console.log("Missing required props in EmpDashboard");
        return null;
    }

    return (
        <div className='text-white bg-[#ICICIC] h-screen p-10'>   
            <Header handleLogout={handleLogout} user={user} />
            <TaskListNumber /> 
            <TaskList />
        </div>
    )
}

// Add prop validation
EmpDashboard.defaultProps = {
    handleLogout: () => console.warn('handleLogout not provided'),
    user: null
}

export default EmpDashboard 