import { SignIn } from '@clerk/clerk-react';
import Navbar from '@/Component/Navbar';
import './Login.css';

const Login: React.FC = () => {

  return (
    <div>
      <Navbar />
      <div className='login1'>
        <SignIn />
      </div>
    </div>
  );
};

export default Login;
