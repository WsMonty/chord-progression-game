import * as React from 'react';
import type { HeadFC } from 'gatsby';
import '../styles/main.scss';
import Game from '../components/game';

const IndexPage = () => {
  return (
    <main>
      <Game />
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>Jazz Chordle</title>
  </>
);
