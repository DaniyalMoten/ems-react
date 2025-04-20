import React from 'react'
import Header from '../other/Header'
import TaskListNumber from '../other/TaskListNumber'
import TaskList from '../TaskList/TaskList'

const EmpDashboard = ({ handleLogout, user }) => {
    if (!user || !handleLogout) {
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

EmpDashboard.defaultProps = {
    handleLogout: () => console.warn('handleLogout not provided'),
    user: null
}

export default EmpDashboard 