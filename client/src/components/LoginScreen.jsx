import { useState } from 'react';
import Login from './Login';

function LoginScreen() {

  const [activeTab, setActiveTab] = useState('login');

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  }

  return (
    <div className='flex justify-center items-center h-screen flex-col space-y-4  o'>
      <div className='flex space-x-5'>
        <button className='py-2 px-4 bg-secondaryColor1 rounded-md hover:bg-secondaryColor2 transition duration-500 ease-in-out' onClick={() => handleTabChange('login')}>Login</button>
        <button className='py-2 px-4 bg-secondaryColor1 rounded-md hover:bg-secondaryColor2 transition duration-500 ease-in-out' onClick={() => handleTabChange('register')}>Register</button>
        <div className='w-full h-2 bg-black shadow-md'></div>
      </div>

      <div className=''>
        {activeTab === 'login' ? <Login /> : 'Register'}
      </div>
    </div>
  )
}

export default LoginScreen;
