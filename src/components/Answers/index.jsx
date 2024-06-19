import questions from '../../assets/questions.json';
import answerData from '../../assets/answer_data.json';
import Finished from './Finished';
import { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
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
  const names = Object.keys(answerData.outcome_data);
  console.log(names);

  const nextQuestion = function () {
    if (question < questions.length - 1) {
      setQuestion((question += 1));
    } else {
      setFinished(true);
    }
  };

  let scoreData = {
    labels: names,
    datasets: [
      {
        label: 'Scores',
        data: names.map(function (name) {
          return answerData.outcome_data[name][question];
        }),
      },
    ],
  };

  return (
    <>
      <h3>Answers page!</h3>
      <Question questionNumber={question} finished={finished} />
      <Finished inUse={finished} />
      <Bar data={scoreData} />

      <button onClick={nextQuestion}>Next</button>
    </>
  );
}

export default Answers;
