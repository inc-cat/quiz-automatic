import answerData from '../../../assets/answer_data.json';

function Finished(props) {
  if (props.inUse) {
    console.log(answerData['sorted scores']);
    return (
      <>
        <h2>Scores</h2>
        {answerData['sorted scores'].map(function (position, i) {
          return (
            <p>
              {i + 1}. {position[0]}: {position[1]}
            </p>
          );
        })}
      </>
    );
  } else {
    return;
  }
}

export default Finished;
