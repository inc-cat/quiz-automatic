# Quiz Automatic V1

A simple pub quiz format for whatever occasion you need it. This will act as the quiz master, all you need to do is put the questions in and it will do the rest. When all questions are answered and sent over, watch the scores go up as you go through the answers together with interactive updating graphs.

## How does it work?

Question and answer data is read and from a file and creates a document for you to answer your questions depending on what type of question is being asked. There are three types of qustions.

### Multiple Choice

Multiple choice questions have several answer options. Only one of these options is correct, while the others are meerly distractions.

### Straight Answer

Participants will need to type their answers instead of choosing from multiple-choice options. Each question will require you to come up with the correct answer on your own.

### Music Round

A short part of a song will be played and you have to type the arists and title of the song in question. If there are multiple artists, seperate them by using <b>;</b> and seperate the artists and title by using a <b>¬</b> symbol with a space either side.

## Setting up

Questions are in the JSON format and in the `src/assets` folder. This file will be a list of objects/dictrionaries. \
Example:

```json
[
  {
    "questionType": "Multiple Choice",
    "question": "Farrokh Bulsara is the birth name of which celebrity?",
    "options": ["Frank Sinatra", "Freddie Mercury", "Skrillex", "Tiger Woods"],
    "correctAnswer": 1
  },
  {
    "questionType": "Straight Answer",
    "question": "Which archnemesis of Mario first appeard in the 1992 Super Mario Land 2: 6 Golden Coins as the final boss?",
    "correctAnswer": "Wario"
  },
  {
    "questionType": "Music Round",
    "artists": ["Mac Demarco"],
    "title": "Chamber of Reflection",
    "alternativeTitles": [],
    "alternativeArtists": {}
  }
]
```

All question objects will have a `questionType` key which should either be `Multiple Choice`, `Straight Answer` or `Music Round`.
Options for multiple choice questions should be in a list/array format and the answer should correspond to the index of what answer is correct (starting from 0)
\
All sound files should go in the `public` folder and should be named the number of the question it corresponds to. (Question 12 should be 12.mp3)
As there can be multiple ways to spell an artist or track title, there are

```json
{
  "questionType": "Music Round",
  "artists": ["Lil Nas X"],
  "title": "MONTERO (Call me by your name)",
  "alternativeTitles": ["Montero", "Call me by your name"],
  "alternativeArtists": { "Lil Nas X": ["Lil' Nas X", "Lil Nas", "Lil' Nas"] }
}
```

`alternativeTitles` should be list/array format and should contrain strings and `alternativeArtists` should be object/dictionary format with keys corresponding to the artist in question with list/array values containing strings.
\
When questions are formatted, run `python scripts/control.py` with the argument `check` to check if questions are formatted correctly, this will show you question statistics and run error handling. Use the `export` argument to create a template question sheet which will be put in the `output` folder which will be made in the scripts folder.

\
There is an example JSON file with questions to demonstrate formatting.

run `npm run dev` to start the application.

### After all questions are answered

Collect all \*txt files from all patricipants (should be renamed to their actual name) and put them in the `answers` folder. Run `python scripts/handleAnswers.py` and transfer the answer_data file from `scripts/output` to `src/assets` and in your browser go to `localhost:5173/answers`. There has been a few pathing issues with Windows which I am looking to fix, works perfectly everywhere else.

Powered by React + Vite
Updates coming
