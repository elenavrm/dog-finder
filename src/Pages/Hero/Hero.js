import React from 'react';
import styles from './Hero.module.scss'; // Import the module styles

const Hero = () => {
  return (
    <div className={styles.mainPage}> {/* Apply styles using the imported 'styles' object */}
      <h1>Hey! Let's find your perfect dog</h1>
      <p>Browse through our shelter dog database and choose your favorite companions!</p>
    </div>
  );
};

export default Hero;