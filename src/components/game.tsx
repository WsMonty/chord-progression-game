import React, { useEffect, useState } from 'react';
import { entryHandler } from '../game_components/entryHandler';

const Game = () => {
  const [currentField, setCurrentField] = useState(1);
  const [currentRow, setCurrentRow] = useState(1);
  const [userSolution, setUserSolution] = useState([]);

  const createField = (rows: number, columns: number) => {
    const field = document.querySelector('.field');
    for (let r = 1; r <= rows; r++) {
      const row = document.createElement('ul');
      row.className = 'field_list';

      for (let c = 1; c <= columns; c++) {
        const column = document.createElement('li');
        column.className = 'field_bar';
        column.dataset.bar = c + '';
        column.dataset.row = r + '';
        row.appendChild(column);
      }
      field.appendChild(row);
    }
  };

  useEffect(() => {
    createField(5, 8);
  }, []);

  let allBars: NodeListOf<HTMLElement>;

  useEffect(() => {
    allBars = document.querySelectorAll('.field_bar');

    allBars.forEach((bar) => {
      if (
        bar.dataset.row === currentRow + '' &&
        bar.dataset.bar === currentField + ''
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
    const allBars: NodeListOf<HTMLElement> =
      document.querySelectorAll('.field_bar');

    let currentBar: HTMLElement;
    allBars.forEach((bar) => {
      bar.classList.remove('active');
      if (
        bar.dataset.row === currentRow + '' &&
        bar.dataset.bar === currentField + ''
      ) {
        currentBar = bar;
      }
    });

    const userSelection = getUserSelection();

    const entry = entryHandler(userSelection.degree, userSelection.chord);

    currentBar.textContent = entry;
    setUserSolution([...userSolution, entry]);

    setCurrentField(currentField + 1);
  };

  const submitSolution = () => {
    const clonedSolution = testSolution.slice();
    userSolution.map((chord, i) => {
      // is correct
      if (clonedSolution.indexOf(chord) > -1) {
        allBars.forEach((bar) => {
          // and in correct place
          if (
            bar.dataset.row === currentRow + '' &&
            bar.dataset.bar === i + 1 + '' &&
            testSolution[i] === userSolution[i]
          ) {
            bar.classList.add('isCorrect');
            clonedSolution.splice(clonedSolution.indexOf(chord), 1);
            return;
          }

          // but not in correct place
          if (
            bar.dataset.row === currentRow + '' &&
            bar.dataset.bar === i + 1 + '' &&
            clonedSolution[i] !== userSolution[i]
          ) {
            bar.classList.add('notRightPlace');
            clonedSolution.splice(clonedSolution.indexOf(chord), 1);
            return;
          }
        });
        return;
      }

      // is false
      if (clonedSolution.indexOf(chord) === -1) {
        allBars.forEach((bar) => {
          if (
            bar.dataset.row === currentRow + '' &&
            bar.dataset.bar === i + 1 + ''
          )
            bar.classList.add('isFalse');
          return;
        });
      }
    });

    if (clonedSolution.length === 0) {
      const winEl = document.querySelector('.win');
      winEl.classList.remove('hidden');
      const overlay = document.querySelector('.win_overlay');
      const escEvent = (e: KeyboardEvent) => {
        if (e.key === 'Escape') winEl.classList.add('hidden');

        window.removeEventListener('keydown', escEvent);
      };

      const clickEvent = () => {
        winEl.classList.add('hidden');
        overlay.removeEventListener('click', clickEvent);
      };
      window.addEventListener('keydown', escEvent);
      overlay.addEventListener('click', clickEvent);
      return;
    }

    setCurrentField(1);
    setCurrentRow(currentRow + 1);
  };

  return (
    <div className="game">
      <div className="field"></div>
      <div className="win hidden">
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
        {currentField < 9 ? (
          <button
            className="game_entry_btn game_entry_submitbtn"
            onClick={submitChord}
          >
            Submit Chord
          </button>
        ) : (
          <button
            className="game_entry_btn game_entry_submitbtn"
            onClick={submitSolution}
          >
            Submit Solution
          </button>
        )}
      </div>
    </div>
  );
};

const testSolution = [
  'IMaj',
  'IMaj',
  'IMaj',
  'IMaj',
  'IMaj',
  'IMaj',
  'IMaj',
  'IMaj',
];

const chords = ['Major', 'Minor', 'Dominant', 'Diminished', 'Augmented'];
const degrees = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

export default Game;
