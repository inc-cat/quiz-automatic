function MusicRound(props) {
  if (props.finished) {
    return;
  } else if (props.inUse) {
    return (
      <>
        <h1>{props.question + 1}: What song is this? Who is it by?</h1>
        <audio controls key={props.question}>
          <source src={props.question + 1 + '.mp3'} type="audio/mpeg" />
        </audio>
      </>
    );
  } else {
    return;
  }
}

export default MusicRound;
