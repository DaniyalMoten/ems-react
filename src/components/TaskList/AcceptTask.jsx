import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AcceptTask = ({ task }) => {
    const [userData, setUserData] = useContext(AuthContext);

    const handleTaskStatus = (status) => {
        try {
            // Get current data
            const employees = JSON.parse(localStorage.getItem('employees'));
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

            if (!employees || !loggedInUser) {
                console.error('Missing data:', { employees, loggedInUser });
                return;
            }

            // Find the employee who owns this task
            const employee = employees.find(emp => emp.tasks.some(t => t.id === task.id));
            if (!employee) {
                console.error('Could not find employee with this task');
                return;
            }

            // Update the task status
            const updatedEmployees = employees.map(emp => {
                if (emp.id === employee.id) {
                    const updatedTasks = emp.tasks.map(t => {
                        if (t.id === task.id) {
                            return {
                                ...t,
                                active: false,
                                completed: status === 'completed',
                                failed: status === 'failed',
                                newTask: false
                            };
                        }
                        return t;
                    });
                    return {
                        ...emp,
                        tasks: updatedTasks
                    };
                }
                return emp;
            });

            // Update localStorage
            localStorage.setItem('employees', JSON.stringify(updatedEmployees));

            // Update AuthContext
            if (userData) {
                setUserData({
                    ...userData,
                    employees: updatedEmployees
                });
            }

            alert(`Task marked as ${status}!`);

        } catch (error) {
           
            alert('Error updating task status. Please try again.');
        }
    };

    return (
        <div className="h-full flex-shrink-0 w-[300px] bg-cyan-500 rounded-xl ">
            <div className="flex justify-between p-5 items-center">
                <h3 className='text-sm bg-red-600 rounded-xl mt-2 px-3 py-1 '>{task.category}</h3>
                <h4 className='text-sm'>{task.date}</h4>
            </div>

            <h2 className='mt-5 px-5 text-xl font-semibold'>{task.title}</h2>
            <p className='text-sm px-5'>{task.description}</p>
            <div className='mb-2 flex justify-between gap-1'>
                <button 
                    onClick={() => handleTaskStatus('completed')}
                    className='mx-5 overflow-hidden w-[100%] text-centre text-bold bg-green-500 text-white py-2 rounded-md text-nowrap mt-5 hover:bg-green-600 transition-colors'
                > 
                    COMPLETED
                </button>
                <button 
                    onClick={() => handleTaskStatus('failed')}
                    className='mx-5 overflow-hidden w-[100%] text-center text-bold bg-red-500 text-white py-2 rounded-md text-nowrap mt-5 hover:bg-red-600 transition-colors'
                > 
                    FAILED
                </button>
            </div>
        </div>
    )
}       

export default AcceptTask;