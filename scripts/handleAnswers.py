import json
import os
import re


class HandleAnswers:
    def __init__(self):
        json_file = open(os.path.join(os.path.dirname(os.path.dirname(__file__)), "src/assets/questions.json"))
        data = json.load(json_file)
        self.questions = []
        for ind in data:
            self.questions.append(ind)

        self.ospath = os.path.join(os.path.dirname(os.path.dirname(__file__)), "answers")
        cwd = os.listdir(self.ospath)

        txt_only = ".*\\.txt$"

        def txt_filter(file_name):
            return re.search(txt_only, file_name)

        correct_files = list(filter(txt_filter, cwd))

        def remove_txt(file_name):
            return re.sub(r"\.txt$", "", file_name)

        self.names = list(map(remove_txt, correct_files))

        self.answers = []

        for get_answers in correct_files:
            txt = open(os.path.join(self.ospath, get_answers), "r")
            raw_text = txt.read()
            breaks = list(raw_text).count("\n")
            while True:
                if breaks < len(self.questions):
                    raw_text += "\n"
                else:
                    break
            split_answers = raw_text.split("\n")
            self.answers.append(split_answers[:-1])

    def format_questions(self, entry):
        return re.sub(r"^[^.]*\.", "", entry).strip()

    def music_format(self, entry):
        split_answer = re.sub(r"^[^.]*\.", "", entry).strip().split(" ¬ ")
        split_answer[0] = split_answer[0].split(";")

        def strip_end(artist):
            return artist.strip()

        split_answer[0] = list(map(strip_end, split_answer[0]))
        return split_answer

    def split_answers(self):
        self.final_answers = []
        user_count = 0
        for person in self.answers:
            current_user = self.names[user_count]
            user_answers = []
            question_count = 0
            for answer in person:
                if (
                    self.questions[question_count]["questionType"] == "Multiple Choice"
                    or self.questions[question_count]["questionType"]
                    == "Straight Answer"
                ):
                    user_answers.append((self.format_questions(answer)))

                elif self.questions[question_count]["questionType"] == "Music Round":
                    user_answers.append(self.music_format(answer))

                question_count += 1

            self.final_answers.append({current_user: user_answers})
            user_count += 1

    def multiple_choice(self, correct_answer, player_answer):
        letters_numbers = {"A": 0, "B": 1, "C": 2, "D": 3}

        try:
            if letters_numbers[player_answer] == correct_answer:
                return 1
            else:
                return 0
        except KeyError:
            return 0

    def straight_answer(self, correct_answer, player_answer):
        if player_answer == correct_answer:
            return 1
        else:
            return 0

    def music_round(self, correct_answer, player_answer):
        music_score = 0

        def convert_lower(inp):
            return inp.lower()

        if player_answer[1].lower() == correct_answer["title"].lower():
            music_score += 1
        else:
            formatted_titles = list(
                map(convert_lower, correct_answer["alternative_titles"])
            )
            if player_answer[1].lower() in formatted_titles:
                music_score += 1
        lower_artists_user = list(map(convert_lower, player_answer[0]))
        temporary_dicts = {}
        for artist_find in correct_answer["artists"]:

            if artist_find.lower() in lower_artists_user:
                music_score += 1

                if artist_find in correct_answer["alternative_artists"]:

                    temporary_dicts.update(
                        {
                            artist_find: correct_answer["alternative_artists"][
                                artist_find
                            ]
                        }
                    )
                    del correct_answer["alternative_artists"][artist_find]

        alt_artists = list(correct_answer["alternative_artists"].keys())

        for check_alts in alt_artists:
            if set(player_answer[0]).intersection(
                set(correct_answer["alternative_artists"][check_alts])
            ):
                music_score += 1

        correct_answer["alternative_artists"].update(temporary_dicts)

        return music_score

    def calculate_scores(self):

        self.outcomes = []
        player_index = 0
        for player in self.final_answers:
            current_player = self.names[player_index]
            player_outcome = []
            for question in range(len(self.questions)):
                if self.questions[question]["questionType"] == "Multiple Choice":
                    player_outcome.append(
                        self.multiple_choice(
                            self.questions[question]["correctAnswer"],
                            player[current_player][question].upper(),
                        )
                    )

                elif self.questions[question]["questionType"] == "Straight Answer":
                    player_outcome.append(
                        self.straight_answer(
                            self.questions[question]["correctAnswer"].upper(),
                            player[current_player][question].upper(),
                        )
                    )

                elif self.questions[question]["questionType"] == "Music Round":
                    correct_answers = {
                        "artists": self.questions[question]["artists"],
                        "title": self.questions[question]["title"],
                        "alternative_titles": self.questions[question][
                            "alternativeTitles"
                        ],
                        "alternative_artists": self.questions[question][
                            "alternativeArtists"
                        ],
                    }
                    player_outcome.append(
                        self.music_round(
                            correct_answers, player[current_player][question]
                        )
                    )

            self.outcomes.append({current_player: player_outcome})

            player_index += 1


        


handle = HandleAnswers()
handle.split_answers()
handle.calculate_scores()
