import './App.css';
import { useState } from 'react';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import QuestionTime from './components/QuestionTime';
import Home from './components/home';
import Answers from './components/Answers';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <h1></h1>

        <Routes>
          <Route path="/answers" element={<Answers />} />
          <Route path="/questiontime" element={<QuestionTime />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
