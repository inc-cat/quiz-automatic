import questions from '../../assets/questions.json';
import answerData from '../../assets/answer_data.json';
import { useState } from 'react';

function Answers() {
  let [question, setQuestion] = useState();
  const names = Object.keys(answerData.outcome_data);
  console.log(names);

  return (
    <>
      <h1>Answers page!</h1>
    </>
  );
}

export default Answers;
