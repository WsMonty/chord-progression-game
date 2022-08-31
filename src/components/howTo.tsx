import React from 'react';

const HowTo = () => {
  return (
    <div className="howTo">
      <h1 className="howTo_title">How to play the Chord Progression Game</h1>
      <p className="howTo_answer">
        Each square represents one bar of a well know Jazz Standard. Your goal
        is to find out the first 8 bars of that random Jazz Standard. I tried to
        take the most common one and most logical harmonic analysis. You might
        know a song differently, but you can still come to the solution!
        <br />
        <br />
        Important note: if the chord goes on for 2 bars you'll need to enter it
        twice. If there is a II-V for example in one bar, you'll only need to
        enter the V! So everytime there is 2 changes per bar, you'll only enter
        one of them.
      </p>
      <p className="howTo_answer">
        If you guess a correct chord and it is in the right bar, that field will
        change its color to green!
        <br />
        If you guess correct chord but it is not in the right bar, that field
        will change its color to yellow!
        <br />
        If you guess a chord that is not part of the solution, that field will
        change its color to red!
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
