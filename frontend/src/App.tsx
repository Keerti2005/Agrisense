import {useAuth } from "@clerk/clerk-react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './Dashboard/Dashboard';
import CropDoctor from './CropDoctor/CropDoctor';
import Home from './Home/Home';
import Fieldbot from './Fieldbot/Fieldbot';
import CropAi from './CropAi/CropAi';
import AnimalDeduction from './AnimalDeduction/AnimalDeduction';
import PestManagement from './PestManagement/PestManagement';
import Pricing from './Pricing/Pricing';
import Alert from './Alert/Alert';
import Chatbot from './Chatbot/Chatbot';
import Login from "./Login/Login";
import Loading from "./Component/Loading";


export default function App() {
  const {isLoaded } = useAuth();
  
  if (!isLoaded) {
    return <Loading/>;
  }

  return (
      <Router>
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/cropdoctor" element={<PrivateRoute><CropDoctor /></PrivateRoute>} />
          <Route path="/fieldbot" element={<PrivateRoute><Fieldbot /></PrivateRoute>} />
          <Route path="/cropai" element={<PrivateRoute><CropAi /></PrivateRoute>} />
          <Route path="/animaldetection" element={<PrivateRoute><AnimalDeduction/></PrivateRoute>} />
          <Route path="/pestmanagement" element={<PrivateRoute><PestManagement /></PrivateRoute>} />
          <Route path="/pricing" element={<PrivateRoute><Pricing /></PrivateRoute>} />
          <Route path="/alert" element={<PrivateRoute><Alert /></PrivateRoute>} />
          <Route path="/chatbot" element={<PrivateRoute><Chatbot /></PrivateRoute>} />

          <Route path="*" element={<Login/>} />
        </Routes>
      </Router>
  );
}

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Navigate to="/login" />;
  }
  return children;
}