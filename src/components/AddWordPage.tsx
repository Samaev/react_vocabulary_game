import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { actions } from "../features/utils";
import reserve from "./adds/words.json";
import { Word } from "../types/Word";
import { nanoid } from "nanoid";

const starter: Word[] = [
  {
    word: "Wall",
    translate: [
      { answer: "Стіна", isCorrect: true },
      { answer: "Замок", isCorrect: false },
      { answer: "Клітка", isCorrect: false },
      { answer: "Береза", isCorrect: false },
    ],
    id: 12,
  },
  {
    word: "Tree",
    translate: [
      { answer: "Дерево", isCorrect: true },
      { answer: "Каток", isCorrect: false },
      { answer: "Сітка", isCorrect: false },
      { answer: "Фреза", isCorrect: false },
    ],
    id: 20,
  },
  {
    word: "Oak",
    translate: [
      { answer: "Дуб", isCorrect: true },
      { answer: "Клас", isCorrect: false },
      { answer: "Біда", isCorrect: false },
      { answer: "Відро", isCorrect: false },
    ],
    id: 30,
  },
  {
    word: "Call",
    translate: [
      { answer: "Дзвінок", isCorrect: true },
      { answer: "Стіл", isCorrect: false },
      { answer: "Стул", isCorrect: false },
      { answer: "Центр", isCorrect: false },
    ],
    id: 40,
  },
  {
    word: "Ball",
    translate: [
      { answer: "Мяч", isCorrect: true },
      { answer: "Магазин", isCorrect: false },
      { answer: "Скрипка", isCorrect: false },
      { answer: "Ранок", isCorrect: false },
    ],
    id: 50,
  },
  {
    word: "Mall",
    translate: [
      { answer: "Супермаркет", isCorrect: true },
      { answer: "Рана", isCorrect: false },
      { answer: "Операція", isCorrect: false },
      { answer: "Танк", isCorrect: false },
    ],
    id: 56,
  },
  {
    word: "Walk",
    translate: [
      { answer: "Прогулянка", isCorrect: true },
      { answer: "Ящик", isCorrect: false },
      { answer: "Будка", isCorrect: false },
      { answer: "Береза", isCorrect: false },
    ],
    id: 68,
  },
  {
    word: "Air",
    translate: [
      { answer: "Повітря", isCorrect: true },
      { answer: "Уклін", isCorrect: false },
      { answer: "Верста", isCorrect: false },
      { answer: "Метр", isCorrect: false },
    ],
    id: 78,
  },
  {
    word: "Yacht",
    translate: [
      { answer: "Яхта", isCorrect: true },
      { answer: "Йод", isCorrect: false },
      { answer: "Бак", isCorrect: false },
      { answer: "Берег", isCorrect: false },
    ],
    id: 88,
  },
  {
    word: "Movie",
    translate: [
      { answer: "Кіно", isCorrect: true },
      { answer: "Блеф", isCorrect: false },
      { answer: "Клітка", isCorrect: false },
      { answer: "Береза", isCorrect: false },
    ],
    id: 98,
  },
  {
    word: "Colaborate",
    translate: [
      { answer: "Співпрацювати", isCorrect: true },
      { answer: "Вакансія", isCorrect: false },
      { answer: "Клітка", isCorrect: false },
      { answer: "Береза", isCorrect: false },
    ],
    id: 107,
  },
  {
    word: "War",
    translate: [
      { answer: "Війна", isCorrect: true },
      { answer: "Акація", isCorrect: false },
      { answer: "Коло", isCorrect: false },
      { answer: "Берешінь", isCorrect: false },
    ],
    id: 117,
  },
  {
    word: "Fight",
    translate: [
      { answer: "Боротьба", isCorrect: true },
      { answer: "Кобзар", isCorrect: false },
      { answer: "Клітка", isCorrect: false },
      { answer: "Береза", isCorrect: false },
    ],
    id: 127,
  },
];

export const AddWordPage = () => {
  const dispatch = useAppDispatch();
  const { words } = useAppSelector((state) => state.words);
  const [added, setAdded] = useState(false);
  const [word, setWord] = useState("");
  const [wordError, setWordError] = useState(false);
  const [translateError, setTranslateError] = useState(false);
  const [label, setLabel] = useState("");
  const [translate, setTranslate] = useState("");

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const handleWord: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setWordError(false);
    setWord(event.target.value);
  };

  const handleTranslate: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setAdded(false);
    setTranslateError(false);
    setTranslate(event.target.value);
  };

  const handleStarter = () => {
    dispatch(actions.setWords([...words, ...starter]));
  };

  const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (word.trim().length === 0) {
      setWordError(true);
      return;
    }

    if (translate.trim().length === 0) {
      setTranslateError(true);
      return;
    }

    dispatch(
      actions.setWords([
        ...words,
        {
          word: capitalizeFirstLetter(word),
          translate: [
            { answer: capitalizeFirstLetter(translate), isCorrect: true },
            {
              answer: capitalizeFirstLetter(
                reserve[Math.floor(Math.random() * (reserve.length - 1))]
              ),
              isCorrect: false,
            },
            {
              answer: capitalizeFirstLetter(
                reserve[Math.floor(Math.random() * (reserve.length - 1))]
              ),
              isCorrect: false,
            },
            {
              answer: capitalizeFirstLetter(
                reserve[Math.floor(Math.random() * (reserve.length - 1))]
              ),
              isCorrect: false,
            },
          ],
          id: nanoid(),
        },
      ])
    );
    setLabel(capitalizeFirstLetter(word));
    setWord("");
    setTranslate("");
    setAdded(true);
  };

  return (
    <div className="box">
      <form className="field" onSubmit={handleSubmitForm}>
        <label className="label">Enter English word</label>
        <div className="control">
          <input
            className="input has-text-centered"
            type="text"
            value={word}
            onChange={handleWord}
          />
          {wordError && <p className="notification is-danger">Enter a word!</p>}
        </div>
        <label className="label">Enter correct Ukrainian translation</label>
        <div className="contr">
          <input
            className="input has-text-centered"
            type="text"
            value={translate}
            onChange={handleTranslate}
          />
          {translateError && (
            <p className="notification is-danger">Enter a translation!</p>
          )}
        </div>
        <input type="submit" className="button" value="ADD" />
      </form>
      <div className="notification">
        {added && <h3 className="title">{label} successfully added!</h3>}
      </div>
      <button className="button is-success is-outlined" onClick={handleStarter}>
        You can add starter pack!
      </button>
    </div>
  );
};
