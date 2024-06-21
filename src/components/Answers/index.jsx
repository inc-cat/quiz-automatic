import './answers.css';
import questions from '../../assets/questions.json';
import answerData from '../../assets/answer_data.json';
import Finished from './Finished';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Question from '../QuestionTime/Question';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function Answers() {
  let [question, setQuestion] = useState(0);
  let [finished, setFinished] = useState(false);
  let [showButton, setShowButton] = useState('Answer?');
  let [buttonNumber, setButtonNumber] = useState(2);
  let [showAnswer, setShowAnswer] = useState('');
  const names = Object.keys(answerData.outcome_data);
  console.log(names);

  const nextQuestion = function () {
    if (question < questions.length - 1) {
      setQuestion((question += 1));
      setButtonNumber(2);
    } else {
      setFinished(true);
    }
  };

  const buttonHandle = function () {
    setButtonNumber(buttonNumber + 1);
    if (buttonNumber % 2 === 0) {
      setShowButton('Show answer');
      setShowAnswer('');
    } else if (buttonNumber % 2 === 1) {
      setShowButton('Hide answer');
      setShowAnswer(numberConversion[questions[question]['correctAnswer']]);
    }
  };

  const AnswerButton = function () {
    console.log(setFinished);
    if (!finished) {
      return (
        <button className="button-next" onClick={nextQuestion}>
          Next answer
        </button>
      );
    } else {
      return;
    }
  };

  const numberConversion = { 0: 'A', 1: 'B', 2: 'C', 3: 'D' };

  let scoreData = {
    labels: names,
    datasets: [
      {
        label: 'Scores',
        data: names.map(function (name) {
          return answerData.outcome_data[name][question];
        }),
        backgroundColor: names.map(function (name) {
          return 'rgba(255, 255, 255, 255)';
        }),
      },
    ],
  };

  return (
    <>
      <h3>Answers page!</h3>
      <Question questionNumber={question} finished={finished} />
      <Finished inUse={finished} />
      <button onClick={buttonHandle}>{showButton}</button>
      <span className="show-answer">{showAnswer}</span>
      <Bar data={scoreData} className="graph" />
      <AnswerButton />
    </>
  );
}

export default Answers;
