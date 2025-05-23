import React, { createContext, useState, useEffect } from 'react';
import { getLocalStorage } from '../utils/localStorage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeData = () => {
            try {
                const data = getLocalStorage();
                const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
                
                if (loggedInUser) {
                    if (loggedInUser.role === 'admin') {
                        setUserData({
                            ...data,
                            role: 'admin'
                        });
                    } else {
                        const employee = data.employees.find(emp => emp.id === loggedInUser.id);
                        if (employee) {
                            setUserData({
                                role: 'employee',
                                ...employee,
                                employees: data.employees
                            });
                        }
                    }
                }
            } catch (error) {
                alert('Error initializing data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        initializeData();
    }, []);

    useEffect(() => {
        if (userData && userData.employees) {
            localStorage.setItem('employees', JSON.stringify(userData.employees));
        }
    }, [userData]);

    const updateUserData = (newData) => {
        setUserData(newData);
        if (newData && newData.employees) {
            localStorage.setItem('employees', JSON.stringify(newData.employees));
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-screen">
            <div className="text-2xl font-semibold">Loading...</div>
        </div>;
    }

    return (
        <AuthContext.Provider value={[userData, updateUserData]} >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;