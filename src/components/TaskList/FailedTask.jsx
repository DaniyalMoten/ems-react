import React from 'react'

const FailedTask = ({ task }) => {
  return (
    <div className="h-full flex-shrink-0 w-[300px] bg-red-400 rounded-xl ">
                <div className="flex justify-between p-5 items-center">
                    <h3 className='text-sm bg-red-600 rounded-xl mt-2 px-3 py-1 '>{task.category}</h3>
                    <h4 className='text-sm'>{task.date}</h4>

                </div>

                <h2 className='mt-5 px-5 text-xl font-semibold'>{task.title}</h2>
                <p className='text-sm px-5'>{task.description}</p>
               
               
        </div>
  )
}

export default FailedTask