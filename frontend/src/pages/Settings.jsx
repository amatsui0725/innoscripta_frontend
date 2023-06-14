import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Card,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import useFilterSettings from "../hooks/useFilterSettings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import axios from "../axios";
import Loading from "../components/Loading";

const Setting = () => {
  const { storageData } = useAuth();
  const { sources, authors, categories } = useFilterSettings();
  const [loading, setLoading] = useState(false);
  const userId = storageData.user.id;
  const [checkSource, setCheckSource] = useState([]);
  const [checkAuthor, setCheckAuthor] = useState([]);
  const [checkCategory, setCheckCategory] = useState([]);
  const [showSetting, setShowSetting] = useState(1);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axios.get(`api/getSetting?user=${userId}`);
        setCheckSource(response.data.sources.map((item) => item.name));
        setCheckAuthor(response.data.authors.map((item) => item.name));
        setCheckCategory(response.data.categories.map((item) => item.name));
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, [userId]);

  const handleCheckbox = async (event) => {
    const checkedVal = event.target.value;
    const nameVal = event.target.name;

    if (checkCategory.includes(checkedVal))
      setCheckCategory(checkCategory.filter((item) => item !== checkedVal));
    else setCheckCategory([...checkCategory, checkedVal]);

    if (checkAuthor.includes(checkedVal))
      setCheckAuthor(checkAuthor.filter((item) => item !== checkedVal));
    else setCheckAuthor([...checkAuthor, checkedVal]);

    if (checkSource.includes(checkedVal))
      setCheckSource(checkSource.filter((item) => item !== checkedVal));
    else setCheckSource([...checkSource, checkedVal]);

    if (event.target.checked)
      await axios.post("api/addSetting", {
        user_id: userId,
        name: checkedVal,
        type: nameVal,
      });
    else
      await axios.post("api/deleteSetting", {
        user_id: userId,
        name: checkedVal,
        type: nameVal,
      });
  };

  return (
    <Container sx={{ mt: 3 }}>
      {loading && <Loading />}
      <Grid container justifyContent="center" spacing={3} sx={{ mt: 2 }}>
        <Grid item md={3}>
          <List>
            <ListItemButton onClick={() => setShowSetting(1)}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Account" />
            </ListItemButton>
            <ListItemButton onClick={() => setShowSetting(2)}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Feed Settings" />
            </ListItemButton>
          </List>
        </Grid>
        <Grid item md={9}>
          {showSetting === 1 ? (
            <Card elevation={10} sx={{ p: 3 }}>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ mb: 2 }}
                fontFamily="sans-serif"
              >
                Account Settings
              </Typography>
              <p>Name: {storageData.user.name}</p>
              <p>Email: {storageData.user.email}</p>
              <p>
                Account Created:{" "}
                {new Date(storageData.user.created_at).toLocaleDateString()}
              </p>
            </Card>
          ) : (
            <Card elevation={10} sx={{ p: 3 }}>
              <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
                Feed settings
              </Typography>
              <Grid container>
                <Grid item md={3}>
                  <Typography variant="h5">Main Sources</Typography>
                  {sources &&
                    sources.map((source, index) => (
                      <div key={index} className="p-1">
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={checkSource.includes(source.api)}
                              name="source"
                              color="primary"
                            />
                          }
                          label={source.api}
                          value={source.api}
                          onChange={handleCheckbox}
                        />
                      </div>
                    ))}
                </Grid>
                <Grid item md={6}>
                  <Typography variant="h5">Authors</Typography>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {authors &&
                      authors.map((author, index) => (
                        <div key={index} className="p-1">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checkAuthor.includes(author.author)}
                                name="author"
                                color="primary"
                              />
                            }
                            label={author.author}
                            value={author.author}
                            onChange={handleCheckbox}
                          />
                        </div>
                      ))}
                  </div>
                </Grid>
                <Grid item md={3}>
                  <Typography variant="h5">Category</Typography>
                  {categories &&
                    categories.map((category, index) => (
                      <div key={index} className="p-1">
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={checkCategory.includes(
                                category.category
                              )}
                              name="category"
                              color="primary"
                            />
                          }
                          label={category.category}
                          value={category.category}
                          onChange={handleCheckbox}
                        />
                      </div>
                    ))}
                </Grid>
              </Grid>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Setting;
