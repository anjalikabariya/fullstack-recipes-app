import { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_URL || 'http://localhost:8000';

const useFetchHelloFreshBox = (page) => {
  const [recipes, setFetchedRecipes] = useState([]);
  const [fetchedProduct, setFetchedProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/recipes?page=${page}`, { signal: signal });
        const result = await response.json();
        const { recipes, product, hasMore } = result;
        setFetchedRecipes((prevData) => {
          return [...prevData, ...recipes];
        });
        setHasMore(hasMore);
        setFetchedProduct(product);
        setLoading(false);
      } catch (error) {
        if (signal.aborted) return;
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    return () => controller.abort();
  }, [page]);

  return { recipes, fetchedProduct, loading, hasMore };
};

export default useFetchHelloFreshBox;
