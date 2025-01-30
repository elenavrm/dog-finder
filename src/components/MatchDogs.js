import React from 'react';
import styles from './DogSearch/DogSearch.module.scss';

const MatchDogs = ({ match, dogs }) => {
  return (
    <div className={styles.matchDogsContainer}>
      {match && (
        <div className={styles.matchDetails}>
          <h2 className={styles.title}>Match Found</h2>
          {dogs
            .filter((dog) => dog.id === match)
            .map((dog) => (
              <div key={dog.id} className={styles.dogCard}>
                <img src={dog.img} alt={dog.name} className={styles.dogImage} />
                <p className={styles.dogName}>Name: {dog.name}</p>
                <p className={styles.dogBreed}>Breed: {dog.breed}</p>
                <p className={styles.dogAge}>Age: {dog.age}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default MatchDogs;