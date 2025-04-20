import React, { useContext, useEffect, useState } from 'react'
import AcceptTask from './AcceptTask'   
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'
import NewTask from './NewTask'
import { AuthContext } from '../../context/AuthProvider'

const TaskList = () => {
    const [userData] = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = () => {
            try {
                const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
                if (!loggedInUser) return;

                if (userData && userData.tasks) {
                    setTasks(userData.tasks);
                    return;
                }

                const employees = JSON.parse(localStorage.getItem('employees')) || [];
                const employee = employees.find(emp => emp.id === loggedInUser.id);
                if (employee && employee.tasks) {
                    setTasks(employee.tasks);
                }
            } catch (error) {
                alert('Error fetching tasks. Please try again.');
            }
        };

        fetchTasks();
    }, [userData]);

    if (!tasks || tasks.length === 0) {
        return (
            <div className='h-[53%] overflow-x-auto w-full mt-5 sm:mt-10 flex-nowrap py-5 flex justify-center items-center'>
                <p className='text-white'>No tasks available</p>
            </div>
        );
    }

    return (
        <div className='px-2 sm:px-0'>
            <div id='taskList' className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5 sm:mt-10'>
                {tasks.map((task) => {
                    if (task.newTask) {
                        return (
                            <div key={task.id} className="w-full">
                                <NewTask task={task} />
                            </div>
                        );
                    }
                    if (task.active) {
                        return (
                            <div key={task.id} className="w-full">
                                <AcceptTask task={task} />
                            </div>
                        );
                    }
                    if (task.completed) {
                        return (
                            <div key={task.id} className="w-full">
                                <CompleteTask task={task} />
                            </div>
                        );
                    }
                    if (task.failed) {
                        return (
                            <div key={task.id} className="w-full">
                                <FailedTask task={task} />
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
}

export default TaskList