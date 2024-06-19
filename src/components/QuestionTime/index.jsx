import questions from '../../assets/questions.json';
import MultipleChoice from './MultipleChoice';
import StraightAnswer from './StraightAnswer';
import MusicRound from './MusicRound';
import { useState } from 'react';

function QuestionTime() {
  let [questionNumber, setQuestionNumber] = useState(0);

  const nextQuestion = function () {
    setQuestionNumber((questionNumber += 1));
    console.log(questionNumber);
  };

  return (
    <>
      <MultipleChoice
        inUse={questions[questionNumber].questionType === 'Multiple Choice'}
        question={questionNumber}
      />
      <StraightAnswer
        inUse={questions[questionNumber].questionType === 'Straight Answer'}
        question={questionNumber}
      />
      <MusicRound
        inUse={questions[questionNumber].questionType === 'Music Round'}
        question={questionNumber}
      />
      <button onClick={nextQuestion}>Hello</button>
    </>
  );
}
export default QuestionTime;
