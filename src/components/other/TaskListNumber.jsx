import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const TaskListNumber = () => {
    const [userData] = useContext(AuthContext);
    const [taskCounts, setTaskCounts] = useState({ 
        newTasks: 0, 
        failedTasks: 0, 
        completedTasks: 0, 
        activeTasks: 0 
    });
    
    useEffect(() => {
        const getLoggedInUserTasks = () => {
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
            if (!loggedInUser) return;

            const employees = userData?.employees || JSON.parse(localStorage.getItem('employees')) || [];
            
            if (!employees || !Array.isArray(employees)) return;

            let counts = { 
                newTasks: 0, 
                failedTasks: 0, 
                completedTasks: 0, 
                activeTasks: 0 
            };

            // If admin, count all tasks
            if (loggedInUser.role === 'admin') {
                employees.forEach(employee => {
                    if (employee?.tasks) {
                        employee.tasks.forEach(task => {
                            if (task.newTask) counts.newTasks++;
                            if (task.failed) counts.failedTasks++;
                            if (task.completed) counts.completedTasks++;
                            if (task.active) counts.activeTasks++;
                        });
                    }
                });
            } else {
                // For employee, count only their tasks
                const employee = employees.find(emp => emp?.id === loggedInUser.id);
                if (employee?.tasks) {
                    employee.tasks.forEach(task => {
                        if (task.newTask) counts.newTasks++;
                        if (task.failed) counts.failedTasks++;
                        if (task.completed) counts.completedTasks++;
                        if (task.active) counts.activeTasks++;
                    });
                }
            }
            
            setTaskCounts(counts);
        };

        getLoggedInUserTasks();
    }, [userData]); // Re-run when userData changes

    return (
        <div className='flex flex-col sm:flex-row mt-5 sm:mt-10 gap-3 sm:gap-5 px-2 sm:px-0' >   
            <div className='rounded-xl w-full sm:w-[35%] py-4 sm:py-6 px-6 sm:px-10 bg-yellow-400'>
                <h2 className='text-xl sm:text-2xl font-semibold'>{taskCounts.newTasks}</h2>
                <h3 className='text-lg sm:text-xl font-medium'>New Tasks</h3>
            </div>
            <div className='rounded-xl w-full sm:w-[35%] py-4 sm:py-6 px-6 sm:px-10 bg-red-400'>
                <h2 className='text-xl sm:text-2xl font-semibold'>{taskCounts.failedTasks}</h2>
                <h3 className='text-lg sm:text-xl font-medium'>Failed Tasks</h3>
            </div>
            <div className='rounded-xl w-full sm:w-[35%] py-4 sm:py-6 px-6 sm:px-10 bg-lime-400'>
                <h2 className='text-xl sm:text-2xl font-semibold'>{taskCounts.completedTasks}</h2>
                <h3 className='text-lg sm:text-xl font-medium'>Completed Tasks</h3>
            </div>
            <div className='rounded-xl w-full sm:w-[35%] py-4 sm:py-6 px-6 sm:px-10 bg-cyan-500'>
                <h2 className='text-xl sm:text-2xl font-semibold'>{taskCounts.activeTasks}</h2>
                <h3 className='text-lg sm:text-xl font-medium'>Active Tasks</h3>
            </div>
        </div>
    )
}

export default TaskListNumber