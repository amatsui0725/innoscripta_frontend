import React, { useState } from "react";
import {
  TextField,
  Grid,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const Articles = ({ articles, searchSettingsChange }) => {
  const [searchText, setSearchText] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };
  const handleSearch = () => {
    searchSettingsChange(searchText);
  };

  return (
    <Grid container spacing={4}>
      <Grid item>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8} md={9} lg={10}>
            <TextField
              placeholder="Search articles..."
              fullWidth
              value={searchText}
              InputProps={{
                startAdornment: <SearchIcon color="action" />,
              }}
              onChange={handleChange}
              sx={{ py: 1, mt: 3 }}
            />
          </Grid>
          <Grid item xs={4} md={3} lg={2} sx={{ mt: 3 }}>
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Search
            </Button>
          </Grid>
        </Grid>
        {articles.map((article) => (
          <Grid key={article.id} item xs={12}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                mb: 3,
              }}
              elevation={10}
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
              <CardContent sx={{ flex: 1, minWidth: 300 }}>
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
                    Published: {new Date(article.published_at).toDateString()}
                  </p>
                  <p>Category: {article.category}</p>
                  <p>Source: {article.source_name}</p>
                </Typography>
                <Typography variant="body2">
                  {article.description.slice(0, 150) + "..."}
                  <Link href={article.url} target="_blank" variant="body2">
                    Read more
                  </Link>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {articles.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="body1">No Result</Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Articles;
