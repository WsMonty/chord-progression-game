import * as React from 'react';
import type { HeadFC } from 'gatsby';
import '../styles/main.scss';
import Game from '../components/game';

const IndexPage = () => {
  return (
    <main>
      <Game />
      <div className="mobile">
        <h1 className="mobile_message">
          This game is currently only available on desktop. Mobile version will
          be up soon! (Probably late september) Sorry, for the inconvenience.
        </h1>
      </div>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Chord Progression Game</title>;
