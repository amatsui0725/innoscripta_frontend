import { Container, Grid, Pagination, Box } from "@mui/material";
import React, { useState } from "react";
import useArticleList from "../hooks/useArticleList";
import Loading from "../components/Loading";
import Articles from "../components/Articles";
import SettingsBar from "../components/bar/SettingsBar";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [date, setDate] = useState("");
  const [sources, setSources] = useState([]);
  const [categories, setCategories] = useState([]);

  const threshold = `api/articles?s=${searchText}&source=${sources.join(
    ";"
  )}&category=${categories.join(";")}&page=${currentPage}&date=${date}`;
  const { articles, articlesInfo, loading } = useArticleList(threshold);

  const searchSettingsChange = (value) => {
    setCurrentPage(1);
    setSearchText(value);
  };
  const handleSetDate = (value) => {
    setCurrentPage(1);
    setDate(value);
  };
  const handleSetSources = (value) => {
    setCurrentPage(1);
    setSources(value);
  };
  const handleSetCategories = (value) => {
    setCurrentPage(1);
    setCategories(value);
  };
  const handlePageChange = (event, page) => {
    console.log(page);
    setCurrentPage(page);
  };

  return (
    <Container>
      {loading && !searchText && <Loading />}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <SettingsBar
            handleSetDate={handleSetDate}
            handleSetSources={handleSetSources}
            handleSetCategories={handleSetCategories}
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <Articles
            articles={articles}
            searchSettingsChange={searchSettingsChange}
          />
          {articlesInfo.totalCount > 0 && (
            <Box
              sx={{ display: "flex", justifyContent: "center", mt: 4, pb: 5 }}
            >
              <Pagination
                count={articlesInfo.lastPage}
                color="primary"
                shape="rounded"
                showFirstButton
                showLastButton
                page={currentPage}
                onChange={handlePageChange}
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
