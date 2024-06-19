import questions from '../../../assets/questions.json';
import MultipleChoice from '../MultipleChoice';
import StraightAnswer from '../StraightAnswer';
import MusicRound from '../MusicRound';

function Question(props) {
  return (
    <>
      <MultipleChoice
        inUse={
          questions[props.questionNumber].questionType === 'Multiple Choice'
        }
        question={props.questionNumber}
        finished={props.finished}
      />
      <StraightAnswer
        inUse={
          questions[props.questionNumber].questionType === 'Straight Answer'
        }
        question={props.questionNumber}
        finished={props.finished}
      />
      <MusicRound
        inUse={questions[props.questionNumber].questionType === 'Music Round'}
        question={props.questionNumber}
        finished={props.finished}
      />
    </>
  );
}

export default Question;
