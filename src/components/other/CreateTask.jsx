import React, { useState, useContext } from 'react' 
import { AuthContext } from '../../context/AuthProvider';

const CreateTask = () => {
    const [userData, setUserData] = useContext(AuthContext);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [taskAssignTo, setTaskAssignTo] = useState('');
    const [taskCategory, setTaskCategory] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();

        try {
            const newTask = {
                id: `t${Date.now()}`,
                title: taskTitle,
                date: taskDate,
                category: taskCategory,
                description: taskDescription,
                active: false,
                completed: false,
                failed: false,
                newTask: true
            };

            const employees = JSON.parse(localStorage.getItem('employees')) || [];
            
            const employeeIndex = employees.findIndex(
                emp => emp.firstName.toLowerCase() === taskAssignTo.toLowerCase()
            );

            if (employeeIndex === -1) {
                alert('Employee not found! Please check the name.');
                return;
            }

            if (!employees[employeeIndex].tasks) {
                employees[employeeIndex].tasks = [];
            }

            employees[employeeIndex].tasks.push(newTask);

            localStorage.setItem('employees', JSON.stringify(employees));

            if (userData) {
                const updatedUserData = {
                    ...userData,
                    employees: [...employees]
                };
                setUserData(updatedUserData);
            }

            setTaskTitle('');
            setTaskDate('');
            setTaskAssignTo('');
            setTaskCategory('');
            setTaskDescription('');

            alert('Task created successfully!');
        } catch (error) {
            alert('Error creating task. Please try again.');
        }
    }
    
    return (
        <div className='p-3 sm:p-5 bg-[#1C1C1C] mt-5 rounded border-2'>
            <form className='flex flex-col lg:flex-row w-full gap-4 lg:gap-8' onSubmit={submitHandler}>
                <div className='flex flex-col w-full lg:w-1/2 gap-4'>
                    <div className='space-y-4'>
                        <div>
                            <h3 className='text-sm text-gray-300 mb-1'>Task</h3>
                            <input 
                                value={taskTitle} 
                                onChange={(e) => setTaskTitle(e.target.value)} 
                                required 
                                className='text-sm border-2 border-gray-300 py-2 px-3 w-full bg-transparent text-white outline-none rounded' 
                                type="text" 
                                placeholder='Task Title' 
                            /> 
                        </div>  
                        <div>
                            <h3 className='text-sm text-gray-300 mb-1'>Date</h3>
                            <input 
                                value={taskDate} 
                                onChange={(e) => setTaskDate(e.target.value)} 
                                required 
                                className='text-sm border-2 border-gray-300 py-2 px-3 w-full bg-transparent text-white outline-none rounded' 
                                type="date" 
                            />
                        </div>
                        <div>
                            <h3 className='text-sm text-gray-300 mb-1'>Assign to</h3>
                            <input 
                                value={taskAssignTo} 
                                onChange={(e) => setTaskAssignTo(e.target.value)} 
                                required 
                                className='text-sm border-2 border-gray-300 py-2 px-3 w-full bg-transparent text-white outline-none rounded' 
                                type="text" 
                                placeholder='Employee Name' 
                            />
                        </div>
                        <div>
                            <h3 className='text-sm text-gray-300 mb-1'>Category</h3>
                            <input 
                                value={taskCategory} 
                                onChange={(e) => setTaskCategory(e.target.value)} 
                                required 
                                className='text-sm border-2 border-gray-300 py-2 px-3 w-full bg-transparent text-white outline-none rounded' 
                                type="text" 
                                placeholder='Design, Development, etc' 
                            />
                        </div>
                    </div>
                </div>
                
                <div className='w-full lg:w-1/2 space-y-4'>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-1'>Description</h3>
                        <textarea 
                            value={taskDescription} 
                            onChange={(e) => setTaskDescription(e.target.value)}
                            required
                            className='text-sm border-2 border-gray-300 py-2 px-3 w-full h-40 lg:h-48 bg-transparent text-white outline-none resize-none rounded' 
                            placeholder='Enter task description...'
                        />
                    </div>
                    <button 
                        className='w-full bg-orange-400 text-white px-4 py-3 rounded hover:bg-orange-600 transition-colors text-sm font-medium' 
                        type='submit'
                    >
                        Add Task
                    </button>
                </div>
            </form>
        </div>  
    )
}

export default CreateTask