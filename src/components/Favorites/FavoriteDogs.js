import React from 'react';
import styles from '../DogSearch/DogSearch.module.scss';

const FavoriteDogs = ({ favorites, dogs }) => {
  return (
    <div className={styles.favoriteDogsContainer}>
      <h2 className={styles.title}>Favorite Dogs</h2>
      {favorites.length > 0 ? (
        <div className={styles.dogList}>
          {favorites.map((favoriteId) => {
            const dog = dogs.find((dog) => dog.id === favoriteId);
            return (
              dog && (
                <div key={dog.id} className={styles.dogCard}>
                  <img src={dog.img} alt={dog.name} className={styles.dogImage} />
                  <p className={styles.dogName}>Name: {dog.name}</p>
                  <p className={styles.dogBreed}>Breed: {dog.breed}</p>
                </div>
              )
            );
          })}
        </div>
      ) : (
        <p>No favorites yet.</p>
      )}
    </div>
  );
};

export default FavoriteDogs;