import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Results } from "./components/Results";
import { TestPage } from "./components/TestPage";

type Word = {
  word: string;
  translate: string;
  id: number;
};

function App() {
  const [word, setWord] = useState("");
  const [translate, setTranslate] = useState("");
  const [words, setWords] = useState<Word[]>([]);
  const [wordsToCheck, setWordsToCheck] = useState<Word[]>([]);

  const handleWord: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setWord(event.target.value);
  };

  const handleTranslate: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setTranslate(event.target.value);
  };

  const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();
    
    setWords([

      ...words,
      {
        word,
        translate,
        id: words.length + 1,
      },
    ]);
  };

  return (
    <div className="App">
      <form className="App-header" onSubmit={handleSubmitForm}>
        <input type="text" value={word} onChange={handleWord} />
        <input type="text" value={translate} onChange={handleTranslate} />
        <input type="submit" value="ADD"  />
      </form>
      <button onClick={()=>setWords([])}>Delete all words</button>
      <Link to="/test">Repeat words</Link>
      <Link to="/results">Show Results</Link>
      <Link to="/">Home</Link>
      <ol>
        {words.map(word=>(
          <li key={word.id}>{word.word} - {word.translate} </li>
        ))}
      </ol>

      <Routes>
        <Route path="/test" element={<TestPage/>}/>
        <Route path="/results" element={<Results/>}/>
      </Routes>
    </div>
  );
}

export default App;
