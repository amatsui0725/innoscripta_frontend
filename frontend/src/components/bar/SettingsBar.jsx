import React, { useState } from "react";
import useFilterSettings from "../../hooks/useFilterSettings";
import {
  Box,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

const SettingsBar = ({
  handleSetDate,
  handleSetSources,
  handleSetCategories,
}) => {
  const { sources, categories } = useFilterSettings();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [allCategories, setAllCategories] = useState(true);
  const [allSources, setAllSources] = useState(true);

  const handleSelectCategories = (e, index) => {
    let newCategoryList = e.target.checked
      ? [...selectedCategories, categories[index].category]
      : selectedCategories.filter(
          (category) => category !== categories[index].category
        );
    setSelectedCategories(newCategoryList);
    newCategoryList.length > 0
      ? setAllCategories(false)
      : setAllCategories(true);
    handleSetCategories(newCategoryList);
  };
  const handleSelectedSources = (e, index) => {
    let newSourcesList = e.target.checked
      ? [...selectedSources, sources[index].api]
      : selectedSources.filter((source) => source !== sources[index].api);
    setSelectedSources(newSourcesList);
    newSourcesList.length > 0 ? setAllSources(false) : setAllSources(true);
    handleSetSources(newSourcesList);
  };
  const handleSelectAllCategories = () => {
    setAllCategories(!allCategories);
    setSelectedCategories([]);
    handleSetCategories([]);
  };
  const handleSelectAllSources = (e) => {
    setAllSources(!allSources);
    setSelectedSources([]);
    handleSetSources([]);
  };
  const handleSelectedDate = (value) => {
    setSelectedDate(value);
    handleSetDate(value);
  };

  return (
    <Box sx={{ pt: 4 }}>
      <form>
        <DatePicker
          label="Select date"
          value={selectedDate}
          onChange={(value) => handleSelectedDate(value)}
          sx={{ mb: 3 }}
        />
      </form>
      <FormGroup>
        <Typography
          variant="h5"
          component="div"
          sx={{ mb: 1 }}
          color="initial"
          fontFamily="monospace"
        >
          Categories
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={allCategories}
              id="category"
              onChange={handleSelectAllCategories}
            />
          }
          label="All categories"
        />
        {categories &&
          categories.map((category, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={selectedCategories.includes(category.category)}
                  onChange={(e) => handleSelectCategories(e, index)}
                  id="category"
                />
              }
              label={category.category}
            />
          ))}
      </FormGroup>
      <FormGroup>
        <Typography
          variant="h5"
          component="div"
          sx={{ mb: 1, mt: 3 }}
          color="initial"
          fontFamily="monospace"
        >
          Sources
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={allSources}
              id="source"
              onChange={handleSelectAllSources}
            />
          }
          label="All categories"
        />
        {sources &&
          sources.map((source, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={selectedSources.includes(source.api)}
                  onChange={(e) => handleSelectedSources(e, index)}
                  id="source"
                />
              }
              label={source.api}
            />
          ))}
      </FormGroup>
    </Box>
  );
};

export default SettingsBar;
