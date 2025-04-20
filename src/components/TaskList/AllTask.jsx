import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AllTask = () => {
    const [userData] = useContext(AuthContext);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = () => {
            try {
                if (userData && userData.employees) {
                    setEmployees(userData.employees);
                    return;
                }

                const storedEmployees = JSON.parse(localStorage.getItem('employees'));
                if (storedEmployees) {
                    setEmployees(storedEmployees);
                }
            } catch (error) {
                alert('Error fetching employees. Please try again.');
            }
        };

        fetchEmployees();

        const intervalId = setInterval(fetchEmployees, 1000);

        return () => clearInterval(intervalId);
    }, [userData]);

    const getStatusLabel = (task) => {
        if (task.completed) return "Completed";
        if (task.failed) return "Failed";
        if (task.active) return "Active";
        if (task.newTask) return "New";
        return "Pending";
    };

    const getStatusColor = (task) => {
        if (task.completed) return "text-green-500";
        if (task.failed) return "text-red-500";
        if (task.active) return "text-cyan-500";
        if (task.newTask) return "text-yellow-500";
        return "text-gray-500";
    };

    return (
        <div className="bg-[#1C1C1C] mt-5 p-2 sm:p-4 border-2 rounded">
            <div className='hidden sm:flex justify-between mt-3 py-2 px-4 bg-orange-400 text-white mb-3 rounded'>
                <h2 className='w-1/4'>Employee</h2>
                <h3 className='w-1/4'>Task</h3>
                <h3 className='w-1/4'>Date</h3>
                <h5 className='w-1/4'>Status</h5>
            </div>
            
            <div className="max-h-[400px] overflow-y-auto">
                {employees.map((employee) => (
                    employee.tasks?.map((task) => (
                        <div 
                            key={task.id} 
                            className='flex flex-col sm:flex-row justify-between items-start sm:items-center overflow-hidden mt-3 py-2 px-4 text-white border border-orange-400 rounded hover:bg-gray-900 transition-colors'
                        >
                            <div className='flex flex-col w-full sm:hidden mb-2'>
                                <span className='text-xs text-gray-400'>Employee:</span>
                                <h2 className='font-medium'>{employee.firstName}</h2>
                            </div>

                            <h2 className='hidden sm:block w-1/4 truncate'>{employee.firstName}</h2>

                            <div className='flex flex-col w-full sm:hidden mb-2'>
                                <span className='text-xs text-gray-400'>Task:</span>
                                <h3 className='font-medium'>{task.title}</h3>
                            </div>

                            <h3 className='hidden sm:block w-1/4 truncate'>{task.title}</h3>

                            <div className='flex flex-col w-full sm:hidden mb-2'>
                                <span className='text-xs text-gray-400'>Date:</span>
                                <h3 className='font-medium'>{task.date}</h3>
                            </div>

                            <h3 className='hidden sm:block w-1/4 truncate'>{task.date}</h3>

                            <div className='flex flex-col w-full sm:hidden'>
                                <span className='text-xs text-gray-400'>Status:</span>
                                <h5 className={`font-medium ${getStatusColor(task)}`}>
                                    {getStatusLabel(task)}
                                </h5>
                            </div>

                            <h5 className={`hidden sm:block w-1/4 font-medium ${getStatusColor(task)}`}>
                                {getStatusLabel(task)}
                            </h5>
                        </div>
                    ))
                ))}
            </div>
            {(!employees || employees.length === 0) && (
                <div className='text-white text-center py-4'>
                    No tasks available
                </div>
            )}
        </div>
    )
}

export default AllTask