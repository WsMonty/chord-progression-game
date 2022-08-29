import React, { useEffect, useState } from 'react';
import { entryHandler } from '../game_components/entryHandler';
import Field from '../game_components/field';
import {
  store,
  selectCurrentField,
  selectUserSolution,
  selectWin,
} from '../store';
import { nextField, nextRow } from '../reducers/counter';
import { addToSolution, wipeSolution } from '../reducers/userSolution';
import { gameWon } from '../reducers/win';
import { useSelector } from 'react-redux';

const Game = () => {
  const currentField = useSelector(selectCurrentField);
  const userSolution = useSelector(selectUserSolution).solution;
  const win = useSelector(selectWin).win;

  const currentBar = currentField.field;
  const currentRow = currentField.row;

  const [showSolutionBtn, setShowSolutionBtn] = useState(false);

  let allBars: NodeListOf<HTMLElement>;

  useEffect(() => {
    allBars = document.querySelectorAll('.field_bar');

    allBars.forEach((bar) => {
      bar.classList.remove('active');
      if (
        bar.dataset.row === currentRow + '' &&
        bar.dataset.bar === currentBar + ''
      )
        bar.classList.add('active');
    });
  }, [currentField]);

  const entryDegreeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    document
      .querySelectorAll('.game_degreeEntry_btn')
      .forEach((el) => el.classList.remove('selected'));
    const element = e.currentTarget;
    element.classList.add('selected');
  };

  const entryChordHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    document
      .querySelectorAll('.game_chordEntry_btn')
      .forEach((el) => el.classList.remove('selected'));
    const element = e.currentTarget;
    element.classList.add('selected');
  };

  const getUserSelection = () => {
    const userInput = document.querySelectorAll('.selected');

    const selection = {
      degree: userInput[0].textContent,
      chord: userInput[1].textContent,
    };
    return selection;
  };

  const submitChord = () => {
    if (currentBar === 8) {
      setShowSolutionBtn(true);
    }
    store.dispatch(nextField());
    const allBars: NodeListOf<HTMLElement> =
      document.querySelectorAll('.field_bar');

    let currentBarEl: HTMLElement;
    allBars.forEach((bar) => {
      bar.classList.remove('active');
      if (
        bar.dataset.row === currentRow + '' &&
        bar.dataset.bar === currentBar + ''
      ) {
        currentBarEl = bar;
      }
    });

    const userSelection = getUserSelection();

    const entry = entryHandler(userSelection.degree, userSelection.chord);

    currentBarEl.textContent = entry;
    store.dispatch(addToSolution(entry));
  };

  const findBar = (row: number, column: number) => {
    const bar: HTMLElement = document.querySelector(
      `[data-row='${row}'][data-bar='${column}']`
    );
    return bar;
  };

  // Cloned solution array to not mutate the original one
  const clonedSolution = testSolution.slice();
  let correctAnswers = 0;

  const isCorrect = () => {
    console.log('1st');
    userSolution.map((chord, i) => {
      const bar = findBar(currentRow, i + 1);

      if (clonedSolution[i] === chord) {
        bar.classList.add('isCorrect');
        clonedSolution.splice(i, 1, '');
        correctAnswers++;
      }
    });
    return;
  };

  const isNotInRightPlace = () => {
    console.log('2nd');
    userSolution.map((chord, i) => {
      const bar = findBar(currentRow, i + 1);

      if (clonedSolution.indexOf(chord) > -1 && clonedSolution[i] !== chord) {
        bar.classList.add('notRightPlace');
        clonedSolution.splice(clonedSolution.indexOf(chord), 1, '');
      }
    });
    return;
  };

  const isFalse = () => {
    console.log('3rd');
    userSolution.map((chord, i) => {
      const bar = findBar(currentRow, i + 1);

      if (
        clonedSolution.indexOf(chord) === -1 &&
        bar.classList.value === 'field_bar'
      ) {
        bar.classList.add('isFalse');
        return;
      }
    });
  };

  const submitSolution = async () => {
    setShowSolutionBtn(false);

    isCorrect();
    isNotInRightPlace();
    isFalse();

    // WIN GAME
    if (correctAnswers === 8) {
      store.dispatch(gameWon(true));
      //   const escEvent = (e: KeyboardEvent) => {
      //   if (e.key === 'Escape') store.dispatch(gameWon(false));

      //   window.removeEventListener('keydown', escEvent);
      // };

      // const clickEvent = () => {
      //   winEl.classList.add('hidden');
      //   overlay.removeEventListener('click', clickEvent);
      // };
      // window.addEventListener('keydown', escEvent);
      // overlay.addEventListener('click', clickEvent);
      //   // return;
      // }
      // }
    }
    store.dispatch(wipeSolution());
    store.dispatch(nextRow());
    store.dispatch(nextField());
  };

  return (
    <div className="game">
      <Field />
      {win ? (
        <div className="win">
          <div className="win_overlay"></div>
          <div className="win_container">
            <h1 className="win_title">Congratulations, you won!</h1>
            <h3 className="win_subtitle">Solution:</h3>
            {testSolution.map((chord, i) =>
              i === testSolution.length - 1 ? chord : chord + ' - '
            )}
            <p className="win_message">
              Come back tomorrow for a new chord progression!
            </p>
          </div>
        </div>
      ) : (
        ''
      )}
      <div className="entries">
        <ul className="game_degreeEntriesList game_entryList">
          {degrees.map((degree, i) => {
            return (
              <li key={`degree_${i}`} className="game_degreeEntry game_entry">
                <button
                  onClick={(e) => entryDegreeHandler(e)}
                  className="game_degreeEntry_btn game_entry_btn"
                  data-degree={degree}
                >
                  {degree}
                </button>
              </li>
            );
          })}
        </ul>
        <ul className="game_chordEntriesList game_entryList">
          {chords.map((chord, i) => {
            return (
              <li key={`chord_${i}`} className="game_chordEntry game_entry">
                <button
                  onClick={(e) => entryChordHandler(e)}
                  className="game_chordEntry_btn game_entry_btn"
                  data-degree={chord}
                >
                  {chord}
                </button>
              </li>
            );
          })}
        </ul>
        {showSolutionBtn ? (
          <button
            className="game_entry_btn game_entry_submitbtn"
            onClick={submitSolution}
          >
            Submit Solution
          </button>
        ) : (
          <button
            className="game_entry_btn game_entry_submitbtn"
            onClick={submitChord}
          >
            Submit Chord
          </button>
        )}
      </div>
    </div>
  );
};

const testSolution = [
  'IMaj',
  'vimin',
  'iimin',
  'V7',
  'iiimin',
  'vimin',
  'iimin',
  'V7',
];

const chords = ['Major', 'Minor', 'Dominant', 'Diminished', 'Augmented'];
const degrees = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

export default Game;
