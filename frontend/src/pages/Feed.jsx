import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Link,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import useArticleList from "../hooks/useArticleList";
import Loading from "../components/Loading";
import axios from "../axios";

function Feed() {
  const { storageData } = useAuth();
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const userId = storageData.user.id;

  const api = `api/articles?&category=${selectedCategories.join(
    ";"
  )}&source=${selectedSources.join(";")}&author=${selectedAuthors.join(";")}`;

  const { articles, loading } = useArticleList(api);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`api/getSetting?user=${userId}`);
        setSelectedSources(response.data.sources.map((item) => item.name));
        setSelectedAuthors(response.data.authors.map((item) => item.name));
        setSelectedCategories(
          response.data.categories.map((item) => item.name)
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userId]);

  return (
    <div className="bg-light" style={{ minHeight: "100vh", width: "100vw" }}>
      <Container sx={{ mt: 3, pr: 5 }}>
        {loading && <Loading />}
        <Grid container spacing={3} sx>
          <Grid item xs={12}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" fontWeight="bold">
                Feed
              </Typography>
              <Typography variant="body1">
                Here you can see the News Feed according to your preference for
                Source, Author, and Categories.
              </Typography>
            </Box>
            <hr />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      Your preferences
                    </Typography>
                    <Typography variant="body1">
                      <label>Main Source: </label>
                      {selectedSources.map((source) => (
                        <Chip key={source} label={source} color="success" />
                      ))}
                      <br />
                      <label>Authors: </label>
                      {selectedAuthors.map((author) => (
                        <Chip key={author} label={author} color="warning" />
                      ))}
                      <br />
                      <label>Categories: </label>
                      {selectedCategories.map((category) => (
                        <Chip key={category} label={category} color="primary" />
                      ))}
                      <br />
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={9}>
                {articles.map((article) => (
                  <Grid key={article.id} item xs={12}>
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        flexWrap: "wrap",
                        mb: 3,
                      }}
                      elevation={20}
                    >
                      <Box sx={{ m: "auto", borderRadius: 3, p: 1 }}>
                        <img
                          src={article.url_to_image}
                          alt="article"
                          variant="bottom"
                          height={250}
                          loading="lazy"
                          style={{ borderRadius: "10px" }}
                        />
                      </Box>
                      <CardContent sx={{ flex: 1 }}>
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{ fontWeight: "bold" }}
                        >
                          {article.title}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          color="textSecondary"
                          sx={{ fontWeight: "bold" }}
                        >
                          <p>Author: {article.author.split(","[0])}</p>
                          <p>
                            Published:{" "}
                            {new Date(article.published_at).toDateString()}
                          </p>
                          <p>Category: {article.category}</p>
                          <p>Source: {article.source_name}</p>
                        </Typography>
                        <Typography variant="body2">
                          {article.description.slice(0, 250) + "..."}
                          <Link
                            href={article.url}
                            target="_blank"
                            variant="body2"
                          >
                            Read more
                          </Link>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
                {articles.length === 0 && (
                  <Card>
                    <CardContent>
                      <Typography variant="body1">No Feed Data</Typography>
                    </CardContent>
                  </Card>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Feed;
