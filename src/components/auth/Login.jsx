import React, { useState } from 'react'

const Login = ({handleLogin}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email, password)
        handleLogin(email, password)
        setEmail('')
        setPassword('')
    }

    return (
        <div className='flex items-center justify-center min-h-screen w-full px-4 py-8 bg-black'>
            <div className="w-full max-w-md border-2 border-orange-400 p-6 sm:p-8 md:p-12 rounded-lg">
                <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">Welcome Back</h1>
                <form 
                    onSubmit={handleSubmit}
                    className='flex flex-col w-full gap-4'
                >
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm text-gray-300">Email</label>
                        <input 
                            required 
                            id="email"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className='w-full text-white outline-none bg-transparent border-2 border-orange-400 text-base sm:text-lg py-2 px-4 rounded-md placeholder:text-gray-500 focus:border-orange-500 transition-colors' 
                            placeholder='Enter your email'
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm text-gray-300">Password</label>
                        <input 
                            required 
                            id="password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className='w-full text-white outline-none bg-transparent border-2 border-orange-400 text-base sm:text-lg py-2 px-4 rounded-md placeholder:text-gray-500 focus:border-orange-500 transition-colors' 
                            placeholder='Enter your password'
                        />
                    </div>

                    <button 
                        className='w-full text-white bg-orange-400 py-3 px-5 rounded-md mt-4 text-base sm:text-lg font-medium hover:bg-orange-500 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black' 
                        type='submit'
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login