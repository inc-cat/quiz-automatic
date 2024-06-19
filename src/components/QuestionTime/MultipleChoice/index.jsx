import questions from '../../../assets/questions.json';

function MultipleChoice(props) {
  if (props.inUse) {
    return (
      <>
        <h1>
          {props.question + 1}: {questions[props.question].question}
        </h1>
        {questions[props.question].options.map(function (option, i) {
          return (
            <h2>
              {{ 0: 'A', 1: 'B', 2: 'C', 3: 'D' }[i]}: {option}
            </h2>
          );
        })}
      </>
    );
  } else {
    return;
  }
}

export default MultipleChoice;
