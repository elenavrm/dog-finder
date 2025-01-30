import React from 'react';
import styles from './DogCard.module.scss'; 

const DogCard = ({ dog, onFavorite, isFavorite }) => (
  <li className={styles.dogCard}> 
    <img src={dog.img} alt={dog.name} />
    <p>Name: {dog.name}</p>
    <p>Age: {dog.age}</p>
    <p>Zip Code: {dog.zip_code}</p>
    <p>Breed: {dog.breed}</p>
    <p>City: {dog.locations}</p>
    <button onClick={() => onFavorite(dog.id)}>
      {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
    </button>
  </li>
);

export default DogCard;