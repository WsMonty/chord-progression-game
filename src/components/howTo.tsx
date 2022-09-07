import React from 'react';

const HowTo = () => {
  return (
    <div className="howTo">
      <h1 className="howTo_title">How to play the Chord Progression Game</h1>
      <p className="howTo_answer">
        Each square represents one bar of a well know Jazz Standard. Your goal
        is to find out the first 8 bars of that random Jazz Standard. You have 5
        tries (5 rows) to guess one standard.
        <br />
        <br />
        Important note: if the chord goes on for 2 bars you'll need to enter it
        twice. If there is a II-V in one bar, you'll only need to enter the V!
      </p>
      <p className="howTo_answer">
        This is a wordle style game (or mastermind). You'll have to guess a
        whole row and when submitting the solution, all the chords will change
        color!
      </p>
      <p className="howTo_answer">
        Correct chord = <span className="green">green</span>
        <br />
        Chord is not in the right place = <span className="yellow">yellow</span>
        <br />
        Wrong chord = <span className="red">red</span>
      </p>
      <h1 className="howTo_title">How to enter chords</h1>
      <p className="howTo_answer">
        If it is a normal degree, you select the root (e.g. II) and then the
        chord quality (e.g. min). In that case the guessed chord will appear
        iimin. (Another example: you want the dominant: press V and then
        dominant. It will appear as V7)
      </p>
      <br />
      <h3 className="howTo_subtitle">
        Secondary dominants and tritone substitutions:{' '}
      </h3>
      <p className="howTo_answer">
        For a secondary dominant click on '/' and select if it is the
        subdominant (II) or dominant (V) you want (A menu will appear to select
        that). The target chord is the one you select in the first row. Example:
        you want the secondary dominant to the 2nd degree: from top to bottom
        rows: press II, press dominant, press / and select V. It will appear as
        V/II.
      </p>
      <p className="howTo_answer">
        For a tritone substitution it works exactly as for a secondary dominant.
        Example: you want the SUBV of V (in C Major: Ab7): press V, press
        dominant, press SUB and select V. It will appear as SUBV/V.
      </p>
      <p className="howTo_answer"></p>
    </div>
  );
};

export default HowTo;
