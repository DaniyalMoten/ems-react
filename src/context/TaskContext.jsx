import React, { createContext, useState, useContext } from 'react'

export const TaskContext = createContext(null);

export const useTask = () => {
    return useContext(TaskContext);
};

export const TaskProvider = ({children}) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    const value = {
        tasks,
        setTasks,
        loading,
        setLoading
    };

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskProvider;