import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { actions } from "../features/utils";
import reserve from "./adds/words.json";
import { Word } from "../types/Word";

const starter: Word[] = [
  {
    "word": "Wall",
    "translate": [
      { "answer": "Стіна", "isCorrect": true },
      { "answer": "Замок", "isCorrect": false },
      { "answer": "Клітка", "isCorrect": false },
      { "answer": "Береза", "isCorrect": false }
    ],
    "id": 12
  },
  {
    "word": "Tree",
    "translate": [
      { "answer": "Дерево", "isCorrect": true },
      { "answer": "Каток", "isCorrect": false },
      { "answer": "Сітка", "isCorrect": false },
      { "answer": "Фреза", "isCorrect": false }
    ],
    "id": 20
  },
  {
    "word": "Oak",
    "translate": [
      { "answer": "Дуб", "isCorrect": true },
      { "answer": "Клас", "isCorrect": false },
      { "answer": "Біда", "isCorrect": false },
      { "answer": "Відро", "isCorrect": false }
    ],
    "id": 30
  },
  {
    "word": "Call",
    "translate": [
      { "answer": "Дзвінок", "isCorrect": true },
      { "answer": "Стіл", "isCorrect": false },
      { "answer": "Стул", "isCorrect": false },
      { "answer": "Центр", "isCorrect": false }
    ],
    "id": 40
  },
  {
    "word": "Ball",
    "translate": [
      { "answer": "Мяч", "isCorrect": true },
      { "answer": "Магазин", "isCorrect": false },
      { "answer": "Скрипка", "isCorrect": false },
      { "answer": "Ранок", "isCorrect": false }
    ],
    "id": 50
  },
  {
    "word": "Mall",
    "translate": [
      { "answer": "Супермаркет", "isCorrect": true },
      { "answer": "Рана", "isCorrect": false },
      { "answer": "Операція", "isCorrect": false },
      { "answer": "Танк", "isCorrect": false }
    ],
    "id": 56
  },
  {
    "word": "Walk",
    "translate": [
      { "answer": "Прогулянка", "isCorrect": true },
      { "answer": "Ящик", "isCorrect": false },
      { "answer": "Будка", "isCorrect": false },
      { "answer": "Береза", "isCorrect": false }
    ],
    "id": 68
  },
  {
    "word": "Air",
    "translate": [
      { "answer": "Повітря", "isCorrect": true },
      { "answer": "Уклін", "isCorrect": false },
      { "answer": "Верста", "isCorrect": false },
      { "answer": "Метр", "isCorrect": false }
    ],
    "id": 78
  },
  {
    "word": "Yacht",
    "translate": [
      { "answer": "Яхта", "isCorrect": true },
      { "answer": "Йод", "isCorrect": false },
      { "answer": "Бак", "isCorrect": false },
      { "answer": "Берег", "isCorrect": false }
    ],
    "id": 88
  },
  {
    "word": "Movie",
    "translate": [
      { "answer": "Кіно", "isCorrect": true },
      { "answer": "Блеф", "isCorrect": false },
      { "answer": "Клітка", "isCorrect": false },
      { "answer": "Береза", "isCorrect": false }
    ],
    "id": 98
  },
  {
    "word": "Colaborate",
    "translate": [
      { "answer": "Співпрацювати", "isCorrect": true },
      { "answer": "Вакансія", "isCorrect": false },
      { "answer": "Клітка", "isCorrect": false },
      { "answer": "Береза", "isCorrect": false }
    ],
    "id": 107
  },
  {
    "word": "War",
    "translate": [
      { "answer": "Війна", "isCorrect": true },
      { "answer": "Акація", "isCorrect": false },
      { "answer": "Коло", "isCorrect": false },
      { "answer": "Берешінь", "isCorrect": false }
    ],
    "id": 117
  },
  {
    "word": "Fight",
    "translate": [
      { "answer": "Боротьба", "isCorrect": true },
      { "answer": "Кобзар", "isCorrect": false },
      { "answer": "Клітка", "isCorrect": false },
      { "answer": "Береза", "isCorrect": false }
    ],
    "id": 127
  }
]


export const AddWordPage = () => {
  const dispatch = useAppDispatch();
  const { words } = useAppSelector((state) => state.words);
  const [added, setAdded] = useState(false);
  const [word, setWord] = useState("");
  const [label, setLabel] = useState("");
  const [translate, setTranslate] = useState("");

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const handleWord: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setWord(event.target.value);
  };

  const handleTranslate: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setAdded(false);
    setTranslate(event.target.value);
  };

  const handleStarter = () => {
    dispatch(actions.setWords([...words, ...starter]));
  };

  const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
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
          id: words.length + 1,
        },
      ])
    );
    setLabel(capitalizeFirstLetter(word));
    setWord("");
    setTranslate("");
    setAdded(true);
  };

  return (
    <div>
      AddWordPage
      <form className="App-header" onSubmit={handleSubmitForm}>
        <input type="text" value={word} onChange={handleWord} />
        <input type="text" value={translate} onChange={handleTranslate} />
        <input type="submit" value="ADD" />
      </form>
      {added && <h3>{label} successfully added!</h3>}
      <button onClick={handleStarter}>You can add starter pack!</button>
    </div>
  );
};
