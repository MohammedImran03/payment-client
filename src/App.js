// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Payment from "./Payment";

function App() {
  return (
    <BrowserRouter>
    <Routes>
     <Route path="/home/:data" element={<Payment />} />
     {/* <Route path="/editor" element={<Editor />} /> */}
     </Routes>
    </BrowserRouter>
 
  );
}

export default App;
