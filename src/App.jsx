import './App.css';
import { useState } from 'react';
import QuestionTime from './components/QuestionTime';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import Home from './components/home';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <h1></h1>

        <Routes>
          <Route path="/questiontime" element={<QuestionTime />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
