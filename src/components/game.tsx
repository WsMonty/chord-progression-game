import React, { useEffect, useState } from 'react';
import { entryHandler } from '../game_components/entryHandler';
import Field from '../game_components/field';
import {
  store,
  selectCurrentField,
  selectUserSolution,
  selectWin,
  selectSolutionNumber,
} from '../store';
import {
  nextField,
  nextRow,
  newTry,
  resetField,
  setField,
} from '../reducers/counter';
import {
  addToSolution,
  wipeSolution,
  deleteLastEntry,
} from '../reducers/userSolution';
import { gameWon, gameLost } from '../reducers/win';
import { useSelector } from 'react-redux';
import { solutionObj, songs } from '../game_components/solutions';
import { getNewSolution } from '../reducers/solutionChooser';
import { BsQuestionCircle } from 'react-icons/bs';
import { ImStatsBars } from 'react-icons/im';
import { IoCloseCircleOutline } from 'react-icons/io5';
import HowTo from './howTo';
import Highscore from '../game_components/highscore';
import { updateHighscore } from '../reducers/highscoreReducer';

const Game = () => {
  const currentField = useSelector(selectCurrentField);
  const userSolution = useSelector(selectUserSolution).solution;
  const win = useSelector(selectWin).win;
  const loose = useSelector(selectWin).loose;
  const tries = useSelector(selectCurrentField).tries;
  const solutionNumber = useSelector(selectSolutionNumber).solutionNumber;

  const solution = solutionObj[solutionNumber];

  const currentBar = currentField.field;
  const currentRow = currentField.row;

  const [showSolutionBtn, setShowSolutionBtn] = useState(false);
  const [overlayActive, setOverlayActive] = useState(false);
  const [showHint, setShowHint] = useState(false);

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

  const entrySymbolHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const element = e.currentTarget;
    const allSymbols = document.querySelectorAll('.game_symbolEntry_btn');
    allSymbols.forEach((el) =>
      el !== element ? el.classList.remove('selected') : null
    );
    element.classList.toggle('selected');
    if (
      allSymbols[0].classList.contains('selected') ||
      allSymbols[1].classList.contains('selected')
    )
      document
        .querySelector('.game_degreeBaseEntriesList')
        .classList.remove('hidden');
    else
      document
        .querySelector('.game_degreeBaseEntriesList')
        .classList.add('hidden');
  };

  const getUserSelection = () => {
    const userInput = document.querySelectorAll('.selected');
    const base =
      (document.getElementById('degreeBase') as HTMLInputElement) || null;

    const selection = {
      degree: userInput[0].textContent,
      chord: userInput[1]?.textContent,
      symbol: userInput[2]?.textContent,
      base: base.value,
    };
    return selection;
  };

  const checkIfCorrectlySelected = () => {
    let check1 = false;
    let check2 = false;

    document.querySelectorAll('.game_degreeEntry_btn').forEach((degree) => {
      if (degree.classList.contains('selected')) check1 = true;
    });
    document.querySelectorAll('.game_chordEntry_btn').forEach((degree) => {
      if (degree.classList.contains('selected')) check2 = true;
    });

    return check1 && check2;
  };

  const submitChord = () => {
    if (!checkIfCorrectlySelected())
      return alert('You must select a degree and chord quality!');
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

    const entry = entryHandler(
      userSelection.degree,
      userSelection.chord,
      userSelection.symbol,
      userSelection.base
    );

    const pElement = document.createElement('span');
    pElement.textContent = entry;

    currentBarEl.appendChild(pElement);
    store.dispatch(addToSolution(entry));
  };

  const findBar = (row: number, column: number) => {
    const bar: HTMLElement = document.querySelector(
      `[data-row='${row}'][data-bar='${column}']`
    );
    return bar;
  };

  // Cloned solution array to not mutate the original one
  let clonedSolution = solution.slice();
  let correctAnswers = 0;

  const isCorrect = () => {
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
    userSolution.map((chord, i) => {
      const bar = findBar(currentRow, i + 1);

      if (
        clonedSolution.indexOf(chord) > -1 &&
        clonedSolution[i] !== chord &&
        bar.classList.value === 'field_bar'
      ) {
        bar.classList.add('notRightPlace');
        clonedSolution.splice(clonedSolution.indexOf(chord), 1, '');
      }
    });
    return;
  };

  const isFalse = () => {
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
    clonedSolution = solution.slice();
    setShowSolutionBtn(false);

    store.dispatch(newTry());

    isCorrect();
    isNotInRightPlace();
    isFalse();

    // WIN GAME
    if (correctAnswers === 8) {
      store.dispatch(gameWon(true));
      setOverlayActive(true);
      const guesses = 5 - tries;
      showHint
        ? store.dispatch(updateHighscore(['winWithHint', guesses]))
        : store.dispatch(updateHighscore(['win', guesses]));
    }
    store.dispatch(wipeSolution());
    store.dispatch(nextRow());
    store.dispatch(nextField());

    // LOSE GAME
    if (tries === 0 && !win) {
      store.dispatch(gameLost(true));
      store.dispatch(updateHighscore(['loose']));
      setOverlayActive(true);
    }
  };

  const playAgainBtnHandler = () => {
    allBars = document.querySelectorAll('.field_bar');
    allBars.forEach((bar) => {
      bar.classList.value = 'field_bar';
      bar.textContent = '';
    });
    store.dispatch(gameWon(false));
    store.dispatch(gameLost(false));
    setOverlayActive(false);
    store.dispatch(resetField());
    store.dispatch(getNewSolution());
    setShowHint(false);
  };

  const goBackHandler = () => {
    if (currentBar === 1) return;
    if (currentBar === 9) setShowSolutionBtn(false);
    store.dispatch(setField(currentBar - 1));
    store.dispatch(deleteLastEntry());
    const bar = findBar(currentRow, currentBar - 1);
    bar.textContent = '';
  };

  const howToPlayBtnHandler = () => {
    document.querySelector('.game_highscore').classList.add('hidden');
    const howTo = document.querySelector('.game_howTo');

    howTo.classList.toggle('hidden');
    howTo.classList.toggle('howTo_animation');
    howTo.classList.contains('hidden')
      ? setOverlayActive(false)
      : setOverlayActive(true);
  };

  const highscoreBtnHandler = () => {
    document.querySelector('.game_howTo').classList.add('hidden');
    const highscore = document.querySelector('.game_highscore');

    highscore.classList.toggle('hidden');
    highscore.classList.contains('hidden') && !loose && !win
      ? setOverlayActive(false)
      : setOverlayActive(true);
  };

  const getHintHandler = () => {
    document.querySelector('.game_hint').classList.remove('hidden');

    setOverlayActive(true);
  };

  const closeHintHandler = () => {
    document.querySelector('.game_hint').classList.add('hidden');

    setOverlayActive(false);
  };

  return (
    <div className="game">
      <button className="game_highscoreBtn" onClick={highscoreBtnHandler}>
        <ImStatsBars />
      </button>
      <div className="game_highscore hidden">
        <Highscore />
      </div>
      <button className="game_howToBtn" onClick={howToPlayBtnHandler}>
        <BsQuestionCircle />
      </button>
      <div className="game_howTo hidden">
        <HowTo />
      </div>
      <Field />
      {win ? (
        <div className="win">
          <div className="win_container">
            <h1 className="win_title">Congratulations, you won!</h1>
            <h3 className="win_subtitle">Solution:</h3>
            {solution.map((chord, i) =>
              i === solution.length - 1 ? chord : chord + ' - '
            )}
            <h4>{`Song: '${songs[solutionNumber]}'`}</h4>
            <button className="win_btn" onClick={playAgainBtnHandler}>
              Play again!
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
      {loose ? (
        <div className="loose">
          <div className="loose_container">
            <h1 className="loose_title">Sorry, you lost!</h1>
            <h3 className="loose_subtitle">The Solution is:</h3>
            {solution.map((chord, i) =>
              i === solution.length - 1 ? chord : chord + ' - '
            )}
            <h4>{`Song: '${songs[solutionNumber]}'`}</h4>
            <button className="win_btn" onClick={playAgainBtnHandler}>
              Play again!
            </button>
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
        <ul className="game_symbolEntriesList game_entryList">
          {specialSymbols.map((symbol, i) => {
            return (
              <li key={`symbol_${i}`} className="game_symbolEntry game_entry">
                <button
                  onClick={(e) => entrySymbolHandler(e)}
                  className="game_symbolEntry_btn game_entry_btn"
                  data-degree={symbol}
                >
                  {symbol}
                </button>
              </li>
            );
          })}
          <select
            defaultValue={'V'}
            id="degreeBase"
            className="game_degreeBaseEntriesList hidden"
          >
            <option value={''} hidden>
              ii or V
            </option>
            {roots.map((degree, i) => {
              return (
                <option
                  value={degree}
                  key={`degree_base_${i}`}
                  className="game_degreeBaseEntry"
                >
                  {degree}
                </option>
              );
            })}
          </select>
        </ul>
        <div className="game_entry_buttons">
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
          <button
            className="game_entry_btn game_entry_submitbtn"
            onClick={goBackHandler}
          >
            Go Back one bar
          </button>
          <button
            className="game_entry_btn game_entry_submitbtn"
            onClick={getHintHandler}
          >
            Get a hint
          </button>
        </div>
        <div className="game_hint hidden">
          <button className="game_hint_close_btn" onClick={closeHintHandler}>
            <IoCloseCircleOutline />
          </button>
          {!showHint ? (
            <div className="game_hint_sure">
              {tries < 2 ? (
                <>
                  <h2>
                    Are you sure you want to see a hint? (Title of the song)
                  </h2>
                  <p>You will not get a full win when using the hint!</p>
                  <button
                    className="game_hint_showHint_btn"
                    onClick={() => setShowHint(true)}
                  >
                    Yes, show Hint!
                  </button>
                </>
              ) : (
                <>
                  <h2>Hint is only available from guess 4!</h2>
                  <p>The hint will be the title of the song.</p>
                </>
              )}
            </div>
          ) : (
            <div className="game_hint_songtitle_container">
              <h3 className="game_hint_songtitle">
                Title of the song: {songs[solutionNumber]}
              </h3>
            </div>
          )}
        </div>
      </div>
      <div className={overlayActive ? 'overlay' : 'overlay hidden'}></div>
    </div>
  );
};

const chords = ['Major', 'Minor', 'Dominant', 'Diminished', 'Augmented'];
const degrees = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
const specialSymbols = ['/', 'SUB'];
const roots = ['II', 'V'];

export default Game;
