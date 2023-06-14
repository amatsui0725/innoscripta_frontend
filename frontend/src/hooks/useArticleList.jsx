import { useState, useEffect } from "react";
import axios from "../axios";

// This hook is for getting all articles
const useArticleList = (url) => {
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [articlesInfo, setArticleInfo] = useState({
    currentPage: 0,
    lastPage: 0,
    totalCount: 0,
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axios.get(url);
        if (response.data) {
          setArticles([...response.data.articles]);
          setArticleInfo({
            currentPage: response.data.page,
            lastPage: response.data.lastPage,
            totalCount: response.data.total,
          });
          console.log(response.data);
        }
      } catch (error) {
        console.error(error);
        setError(true);
      }
      setLoading(false);
    })();
  }, [url]);

  return { loading, error, articles, articlesInfo };
};

export default useArticleList;
