function MusicRound(props) {
  if (props.finished) {
    return;
  } else if (props.inUse) {
    return (
      <>
        <h1>{props.question + 1}: What song is this? Who is it by?</h1>
        <audio controls>
          <source src={props.question + '.mp3'} type="audio/mpeg" />
        </audio>
      </>
    );
  } else {
    return;
  }
}

export default MusicRound;
