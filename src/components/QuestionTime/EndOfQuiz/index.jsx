function EndOfQuiz(props) {
  if (props.inUse) {
    return (
      <>
        <h1>No further questions!</h1>
        <h2>Please submit your answers!</h2>
      </>
    );
  } else {
    return;
  }
}

export default EndOfQuiz;
