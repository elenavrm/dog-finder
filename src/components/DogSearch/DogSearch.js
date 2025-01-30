import React, { useState, useEffect } from 'react';
import DogCard from '../DogCard/DogCard';
import Pagination from '../Pagination';
import SortByAge from '../../SortByAge';
import MatchDogs from '../MatchDogs';
import FavoriteDogs from '../Favorites/FavoriteDogs';
import styles from './DogSearch.module.scss';

const DogSearch = () => {
  const [dogs, setDogs] = useState([]);
  const [pagination, setPagination] = useState({ next: '', prev: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [ageSortOrder, setAgeSortOrder] = useState('asc');
  const [favorites, setFavorites] = useState([]);
  const [match, setMatch] = useState(null);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch('https://frontend-take-home-service.fetch.com/dogs/breeds', {
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to fetch breeds');
        const data = await response.json();
        setBreeds(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBreeds();
  }, []);

  useEffect(() => {
    const fetchDogs = async () => {
      if (!selectedBreed) return;
      setLoading(true);
      try {
        const response = await fetch(
          `https://frontend-take-home-service.fetch.com/dogs/search?breeds=${selectedBreed}&size=10`,
          { credentials: 'include' }
        );
        if (!response.ok) throw new Error('Failed to fetch dogs');
        const data = await response.json();
        setPagination({ next: data.next, prev: data.prev });

        const dogDetailsResponse = await fetch('https://frontend-take-home-service.fetch.com/dogs', {
          method: 'POST',
          body: JSON.stringify(data.resultIds),
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        if (!dogDetailsResponse.ok) throw new Error('Failed to fetch dog details');
        const dogDetails = await dogDetailsResponse.json();

        let sortedDogs = dogDetails;

        if (ageSortOrder === 'asc') {
          sortedDogs = sortedDogs.sort((a, b) => a.age - b.age);
        } else {
          sortedDogs = sortedDogs.sort((a, b) => b.age - a.age);
        }

        setDogs(sortedDogs);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDogs();
  }, [selectedBreed, ageSortOrder]);

  const handleAgeSortChange = (value) => {
    setAgeSortOrder(value);
  };

  const handleFavorite = (dogId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(dogId)
        ? prevFavorites.filter((id) => id !== dogId)
        : [...prevFavorites, dogId]
    );
  };

  const handleMatch = async () => {
    try {
      const response = await fetch('https://frontend-take-home-service.fetch.com/dogs/match', {
        method: 'POST',
        body: JSON.stringify(favorites),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Failed to get match');
      const data = await response.json();
      setMatch(data.match);
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePrevPage = async () => {
    if (!pagination.prev) return;
    setLoading(true);
    try {
      const prevUrl = pagination.prev.startsWith("http") ? pagination.prev : `https://frontend-take-home-service.fetch.com${pagination.prev}`;
      const response = await fetch(prevUrl, { credentials: 'include' });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error fetching previous page: ${errorText}`);
      }

      const data = await response.json();
      setDogs(data.resultIds);

      const dogDetailsResponse = await fetch('https://frontend-take-home-service.fetch.com/dogs', {
        method: 'POST',
        body: JSON.stringify(data.resultIds),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (!dogDetailsResponse.ok) throw new Error('Failed to fetch dog details');
      const dogDetails = await dogDetailsResponse.json();
      setDogs(dogDetails);

      setPagination({ next: data.next, prev: data.prev });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = async () => {
    if (!pagination.next) return;
    setLoading(true);
    try {
      const fullUrl = new URL(pagination.next, 'https://frontend-take-home-service.fetch.com');
      const response = await fetch(fullUrl, { credentials: 'include' });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${errorText}`);
      }

      const data = await response.json();
      setDogs(data.resultIds);

      const dogDetailsResponse = await fetch('https://frontend-take-home-service.fetch.com/dogs', {
        method: 'POST',
        body: JSON.stringify(data.resultIds),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (!dogDetailsResponse.ok) throw new Error('Failed to fetch dog details');
      const dogDetails = await dogDetailsResponse.json();
      setDogs(dogDetails);

      setPagination({ next: data.next, prev: data.prev });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.dogSearchWrapper}>
      <h1>Dog Search</h1>
      <div className={styles.dogSearchContainer}>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div>
          <label htmlFor="breed">Breed:</label>
          <select
            id="breed"
            value={selectedBreed}
            onChange={(e) => setSelectedBreed(e.target.value)}
          >
            <option value="">Select Breed</option>
            {breeds.map((breed, index) => (
              <option key={index} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </div>

        <SortByAge onSortChange={handleAgeSortChange} />

        {loading && <p>Loading...</p>}

        <div>
          {dogs.length > 0 ? (
            <ul>
              {dogs.map((dog) => (
                <DogCard
                  key={dog.id}
                  dog={dog}
                  onFavorite={handleFavorite}
                  isFavorite={favorites.includes(dog.id)}
                />
              ))}
            </ul>
          ) : (
            <p>No dogs found.</p>
          )}
        </div>

        <div>
          <button onClick={handleMatch} disabled={favorites.length === 0 || loading}>
            Get Match
          </button>
        </div>

        <Pagination
          pagination={pagination}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
          loading={loading}
        />

<div className={styles.dogSearchBottom}>
        <MatchDogs match={match} dogs={dogs} />

        <FavoriteDogs favorites={favorites} dogs={dogs} />
      </div>
      </div>
    </div>
  );
};

export default DogSearch;