import questions from '../../assets/questions.json';
import MultipleChoice from './MultipleChoice';
import StraightAnswer from './StraightAnswer';
import MusicRound from './MusicRound';
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
      <MultipleChoice
        inUse={questions[questionNumber].questionType === 'Multiple Choice'}
        question={questionNumber}
        finished={finished}
      />
      <StraightAnswer
        inUse={questions[questionNumber].questionType === 'Straight Answer'}
        question={questionNumber}
        finished={finished}
      />
      <MusicRound
        inUse={questions[questionNumber].questionType === 'Music Round'}
        question={questionNumber}
        finished={finished}
      />

      <EndOfQuiz inUse={finished} />

      <button onClick={nextQuestion}>Next question</button>
    </>
  );
}
export default QuestionTime;
