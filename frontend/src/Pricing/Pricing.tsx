import React from 'react';
import Navbar from '../Component/Navbar';
import '../Pricing/Pricing.css';
import Footer from '../Component/Footer';
import { useUser } from '@clerk/clerk-react';

interface RazorpayOptions {
  key: string;
  key_secret: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: {
    address: string;
  };
  theme: {
    color: string;
  };
}

const Pricing: React.FC = () => {
  const {user} = useUser();
  const handleSubmit = (amount: number) => {
    if (amount === 0) {
      alert('Please enter an amount');
    } else {
      const options: RazorpayOptions = {
        key: 'rzp_test_sz6vXhYYcZATwz',
        key_secret: 'Z4OjloVh5GUOpbya26cCKMt7',
        amount: amount * 100,
        currency: 'INR',
        name: 'AgriSense',
        description: 'for testing purpose',
        prefill: {
          name: user?.fullName || 'Unknown',
          email: user?.primaryEmailAddressId || 'Unknown',
          contact: user?.primaryPhoneNumberId || 'Unknown',
        },
        notes: {
          address: 'Razorpay Corporate office',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const pay = new (window as any).Razorpay(options);
      pay.open();
    }
  };

  const handleAmount = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSubmit(1599);
  };


  const handleAmount1 = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSubmit(2999);
  };

  const handleAmount2 = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSubmit(3999);
  };

  return (
    <div>
      <Navbar />
      <div className="products1">
      <h2>Pricing</h2>
      <p>Best features and monitoring system in affordable price</p>
        <div className="products2">
          <div className="products3">
            <div>
              <h2>Startup</h2>
              <div className="products4">
                <h3>₹1,599.00</h3>
              </div>
              <p>Everything you need to get started</p>
              <div>
                <ul>
                  <li>
                    <i className="fa fa-check" style={{ fontSize: '18px' }}></i>
                    <span>Basic Monitoring</span>
                  </li>
                  <li>
                    <i className="fa fa-check" style={{ fontSize: '18px' }}></i>
                    <span>Limited Sensor Support</span>
                  </li>
                  <li>
                    <i className="fa fa-check" style={{ fontSize: '18px' }}></i>
                    <span>Standard Customer Support</span>
                  </li>
                  <li>
                    <i className="fa fa-check" style={{ fontSize: '18px' }}></i>
                    <span>Affordable Pricing</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="products5">
              <button onClick={handleAmount}>Order Now</button>
            </div>
          </div>

 
          <div className="products3">
            <div>
              <h2>Enterprises</h2>
              <div className="products4">
                <h3>₹2,999.00</h3>
              </div>
              <p>Everything in the Startup plan plus</p>
              <div>
                <ul>
                  <li>
                    <i className="fa fa-check" style={{ fontSize: '18px' }}></i>
                    Expanded Monitoring
                  </li>
                  <li>
                    <i className="fa fa-check" style={{ fontSize: '18px' }}></i>
                    Support for a variety of sensors
                  </li>
                  <li>
                    <i className="fa fa-check" style={{ fontSize: '18px' }}></i>
                    Advanced Data Analytics
                  </li>
                  <li>
                    <i className="fa fa-check" style={{ fontSize: '18px' }}></i>
                    Priority Customer Support
                  </li>
                </ul>
              </div>
            </div>
            <div className="products5">
              <button onClick={handleAmount1}>Order Now</button>
            </div>
          </div>


          <div className="products3">
            <div>
              <h2>Premium</h2>
              <div className="products4">
                <h3>₹3,999.00</h3>
              </div> 
              <p>Everything in the Enterprises plan plus</p>
              <div className="products6">
                <ul>
                  <li>
                    <i className="fa fa-check" style={{ fontSize: '18px' }}></i>
                    Comprehensive Monitoring
                  </li>
                  <li>
                    <i className="fa fa-check" style={{ fontSize: '18px' }}></i>
                    Enhanced Sensor Support
                  </li>
                  <li>
                    <i className="fa fa-check" style={{ fontSize: '18px' }}></i>
                    Advanced Data Analysis
                  </li>
                  <li>
                    <i className="fa fa-check" style={{ fontSize: '18px' }}></i>
                    Enhanced Data Security
                  </li>
                </ul>
              </div>
            </div>
            <div className="products5">
              <button onClick={handleAmount2}>Order Now</button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Pricing;
