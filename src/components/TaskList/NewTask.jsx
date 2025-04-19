import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const NewTask = ({ task }) => {
  const [userData, setUserData] = useContext(AuthContext);

  const handleAcceptTask = () => {
    try {
      // Get current data
      const employees = JSON.parse(localStorage.getItem('employees'));
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

      if (!employees || !loggedInUser) {
        console.error('Missing data:', { employees, loggedInUser });
        return;
      }

      console.log('Current task:', task);
      console.log('LoggedInUser:', loggedInUser);

      // Find the employee who owns this task
      const employee = employees.find(emp => emp.tasks.some(t => t.id === task.id));
      if (!employee) {
        console.error('Could not find employee with this task');
        return;
      }

      // Find and update the task
      const updatedEmployees = employees.map(emp => {
        if (emp.id === employee.id) {
          const updatedTasks = emp.tasks.map(t => {
            if (t.id === task.id) {
              return {
                ...t,
                active: true,
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

      alert('Task accepted successfully!');
      
    } catch (error) {
      console.error('Error accepting task:', error);
      alert('Error accepting task. Please try again.');
    }
  };

  return (
    <div className="h-full flex-shrink-0 w-[300px] bg-yellow-400 rounded-xl ">
      <div className="flex justify-between p-5 items-center">
        <h3 className='text-sm bg-red-600 rounded-xl mt-2 px-3 py-1 '>{task.category}</h3>
        <h4 className='text-sm'>{task.date}</h4>
      </div>

      <h2 className='mt-5 px-5 text-xl font-semibold'>{task.title}</h2>
      <p className='text-sm px-5'>{task.description}</p>
      <button 
        onClick={handleAcceptTask}
        className='mb-2 mx-5 w-[80%] text-center text-bold bg-green-500 text-white px-4 py-2 rounded-md mt-3 hover:bg-green-600 transition-colors'
      >
        ACCEPT TASK
      </button>
    </div>
  )
}

export default NewTask