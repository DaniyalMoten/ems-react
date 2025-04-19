import React from 'react'

const Header = ({ handleLogout, user }) => {
  // Add safety check for user prop
  if (!user) return null;
  
  // For debugging
  
  
  const userName = user.firstName || 'User'

  return (
    <div className='flex justify-between items-end text-white'>
        <h1 className='text-2xl font-medium'> Hello <br /> 
          <span className='text-4xl font-bold'>{userName} 👋</span>
        </h1> 
        
        <button 
          onClick={handleLogout}
          className='bg-red-600 font-medium text-lg text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors'>
          Logout
        </button>
    </div>
  )
}

export default Header