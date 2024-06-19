import questions from '../../assets/questions.json';
import Question from './Question';
import EndOfQuiz from './EndOfQuiz';
import { useState } from 'react';

function QuestionTime() {
  let [questionNumber, setQuestionNumber] = useState(0);
  let [finished, setFinished] = useState(false);

  const nextQuestion = function () {
    if (questionNumber < questions.length - 1) {
      setQuestionNumber((questionNumber += 1));
    } else {
      setFinished(true);
    }
  };

  return (
    <>
      <Question questionNumber={questionNumber} finished={finished} />
      <EndOfQuiz inUse={finished} />

      <button onClick={nextQuestion}>Next question</button>
    </>
  );
}
export default QuestionTime;
