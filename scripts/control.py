import json
import sys
import os


class CheckQuestions:
    def __init__(self):
        # load json file of questions
        json_file = open(os.path.join(os.path.dirname(os.path.dirname(__file__)), "src/assets/questions.json"))
        data = json.load(json_file)
        self.questions = []
        for ind in data:
            self.questions.append(ind)

        self.information = []
        self.categories = [
            "Multiple Choice",
            "Straight Answer",
            "Music Round",
        ]
        self.errors = {
            "question type": "Incorrect question type.",
            "question type key": "questionType key not available.",
            "missing question option field": "question or option key not available.",
            "question option empty": "Either question/option field is empty or there is an invalid amout of options.",
            "empty question": "Empty question field.",
            "no question": "Question field unavailable.",
            "not string": "String in title/question key.",
            "not list": "artists keys should be lists.",
            "missing music field": "Empty music field",
            "correct value wrong": "correctAnswer should be an integer representing the index of the correct answer.",
            "correct value bounds": "correctAnswer is outside of the correct answer range.",
            "question string": "question field should be a string.",
            "answer int or string": "correctAnswer should either be a string or integer.",
            "alternative aritsts": "Keys for alternativeArtists should correspond to the artists values and should be in dictionary/object format.",
            "missing music keys": "Keys missing for Music Round.",
            "missing straight keys": "Keys missing for Straight Answer.",
            "alt artists dict": "alternativeArtist keys should be dict type.",
            "alt artists list": "alternativeArtist values should be list type.",
            "string for alt artist list": "values within alternativeArtists keys should be strings only."
            
        }

    def question_types(self):
        index = 0
        for question_entry in self.questions:
            try:
                if question_entry["questionType"] not in self.categories:
                    self.pseudo_error(index, "question type")
            except KeyError:
                self.pseudo_error(index, "question type key")
            self.information.append(
                {"index": index, "type": question_entry["questionType"]}
            )
            index += 1

    def check_choice(self, entry):
        try:
            if (
                not self.questions[entry]["question"]
                or not 1 < len(self.questions[entry]["options"]) < 5
            ):
                self.pseudo_error(entry, "question option empty")

            if not isinstance(self.questions[entry]["correctAnswer"], int):
                self.pseudo_error(entry, "correct value wrong")

            if (
                not len(self.questions[entry]["options"])
                > self.questions[entry]["correctAnswer"]
                >= 0
            ):
                self.pseudo_error(entry, "correct value bounds")

        except KeyError:
            self.pseudo_error(entry, "missing question option field")

    def check_straight(self, entry):
        try:
            if not (self.questions[entry]["question"], str):
                self.pseudo_error(entry, "question string")

            is_str = not isinstance(self.questions[entry]["correctAnswer"], str)

            is_int = not isinstance(self.questions[entry]["correctAnswer"], int)

            if [is_str, is_int].count(False) == 2:
                self.pseudo_error(entry, "answer int or string")

            if not self.questions[entry]["question"]:
                self.pseudo_error(entry, "empty question")
        except KeyError:
            self.pseudo_error(entry, "missing straight keys")

    def check_music(self, entry):
        try:
            should_be_lists = [
                "artists",
                "alternativeTitles",
            ]
            for list_check in should_be_lists:
                if not isinstance(self.questions[entry][list_check], list):
                    self.pseudo_error(entry, "not list")

                if not isinstance(self.questions[entry]["alternativeArtists"], dict):
                    self.pseudi_error(entry, "alternative aritsts")

            if not isinstance(self.questions[entry]["title"], str):
                self.pseudo_error(entry, "not string")

            artists_alt = list(self.questions[entry]["alternativeArtists"].keys())

            for check_values in artists_alt:
                if check_values not in self.questions[entry]["artists"]:
                    self.pseudo_error(entry, "alternative aritsts")

                if not isinstance(self.questions[entry]["alternativeArtists"][check_values], list):
                    self.pseudo_error(entry, "alt artists list")

                for alt_str in self.questions[entry]["alternativeArtists"][check_values]:
                    if not isinstance(alt_str, str):
                        self.pseudo_error(entry, "string for alt artist list")


        except KeyError:
            self.pseudo_error(entry, "missing music keys")

    def pseudo_error(self, entry, err):
        print(f"Error: {self.errors[err]} Index: {entry}")
        exit()

    def audit_questions(self):
        for information_entry in self.information:
            question_index = information_entry["index"]
            if information_entry["type"] == "Multiple Choice":
                self.check_choice(question_index)
            elif information_entry["type"] == "Straight Answer":
                self.check_straight(question_index)
            elif information_entry["type"] == "Music Round":
                self.check_music(question_index)

        print("All questions checked, no problems!")

    def statistics(self):
        print("--STATS--")
        print(f"Total questions: {len(self.questions)} \n")

        def question_type(entry):
            return entry["questionType"]

        print("--Type statistics--")

        type_list = list(map(question_type, self.questions))

        type_strings = [
            f"Multiple Choice: {type_list.count("Multiple Choice")}",
            f"Straight Answer: {type_list.count("Straight Answer")}",
            f"Music Round: {type_list.count("Music Round")}",
        ]
        for show_types in type_strings:
            print(show_types)

        print("\n--Multiple Choice Stats--")
        multiple_index = [i for i, x in enumerate(type_list) if x == "Multiple Choice"]
        number_conversion = {0: "A", 1: "B", 2: "C", 3: "D"}
        answers = {"A": 0, "B": 0, "C": 0, "D": 0}

        for options_check in multiple_index:
            answers[
                number_conversion[self.questions[options_check]["correctAnswer"]]
            ] += 1

        multiple_strings = [
            f"A: {answers["A"]}",
            f"B: {answers["B"]}",
            f"C: {answers["C"]}",
            f"D: {answers["D"]}",
        ]

        for show_options in multiple_strings:
            print(show_options)

    def export(self):
        text_document = ""
        for question in range(len(self.questions)):
            if (
                self.questions[question]["questionType"] == "Multiple Choice"
                or self.questions[question]["questionType"] == "Straight Answer"
            ):
                text_document += f"{question + 1}. \n"
            elif self.questions[question]["questionType"] == "Music Round":
                text_document += f"{question + 1}. Artist(s) ¬ Title \n"

        txt_file = open("questionTemplate.txt", "a")
        txt_file.write(text_document)
        txt_file.close()
        print("Successfully created template.")



add = CheckQuestions()
try:
    if sys.argv[1] == "check":
        add.question_types()
        add.audit_questions()
        add.statistics()
    elif sys.argv[1] == "export":
        add.question_types()
        add.audit_questions()
        add.export()
except IndexError:
    print("--Please type 'python control.py *--")
    print("*check: checks the questions to make sure questions.json is compatible and shows statistics.")
    print("*export: exports questions into txt format for users.")