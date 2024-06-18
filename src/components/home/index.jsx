import syntax from './syntax.png';

function Home() {
  return (
    <>
      <h1>Welcome to Quiz automatic!</h1>
      <p>
        A simple automated quiz to play in a party online or in person. Answer
        questions, send them in and have the scores calculated with you able to
        follow along as the results unfold!
      </p>

      <h2>How does it work?</h2>
      <p>
        Question and answer data is read and from a file and creates a document
        for you to answer your questions depending on what type of question is
        being asked. There are three types of qustions.
      </p>
      <h3>Multiple choice:</h3>
      <p>
        Multiple choice questions have several answer options. Only one of these
        options is correct, while the others are meerly distractions.{' '}
      </p>
      <h3>Straight answer:</h3>
      <p>
        Participants will need to type their answers instead of choosing from
        multiple-choice options. Each question will require you to come up with
        the correct answer on your own.
      </p>
      <h3>Music Round:</h3>
      <p>
        A short part of a song will be played and you have to type the arists
        and title of the song in question. If there are multiple artists,
        seperate them by using <b>;</b> and seperate the artists and title by
        using a <b>¬</b> symbol with a space either side.
      </p>

      <img
        src={syntax}
        alt="Example question text"
        title="Example question sheet"
      />

      <h3>Please note:</h3>

      <p>
        The question number is mainly for distinguishing what question you are
        on. The questions are read by line and not number so do not delete lines
        or your score will not reflect your answers.
      </p>
      <p>Have fun and enjoy!</p>
    </>
  );
}

export default Home;
