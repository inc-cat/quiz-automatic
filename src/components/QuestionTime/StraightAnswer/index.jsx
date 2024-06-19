import questions from '../../../assets/questions.json';

function StraightAnswer(props) {
  if (props.inUse) {
    return (
      <h1>
        {props.question + 1}: {questions[props.question].question}
      </h1>
    );
  } else {
    return;
  }
}

export default StraightAnswer;
