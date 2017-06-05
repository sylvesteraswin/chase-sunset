import React from 'react';
import { Article } from 'react-weui';

const Damn = () => {
  return (
    <Article className="static-page">
      <h1>Please try in Messager App</h1>
      <section className="static-page-subtitle">
        <p>
          This experience has been designed to work within the Messenger app
          on iOS or Android. Please try again there (rather than in a
          browser).
        </p>
      </section>
    </Article>
  );
};

export default Damn;
