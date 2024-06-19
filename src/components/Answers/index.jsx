import questions from '../../assets/questions.json';
import answerData from '../../assets/answer_data.json';
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function Answers() {
  let [question, setQuestion] = useState(0);
  const names = Object.keys(answerData.outcome_data);
  console.log(names);

  const nextQuestion = function () {
    setQuestion((question += 1));
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
      <h1>Answers page!</h1>
      <Bar data={scoreData} />
      <button onClick={nextQuestion}>Next</button>
    </>
  );
}

export default Answers;
