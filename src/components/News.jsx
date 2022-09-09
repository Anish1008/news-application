import React, { useState, useEffect } from "react";
import "./News.css";
import Header from "./Header";
import NewsBackground from "../images/NewsBackground.jpg";
import NewsCard from "./News-Card";
import { Pagination } from "@mui/material";
import usePagination from "./Pagination";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
function News(props) {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  let [page, setPage] = useState(1);
  const PER_PAGE = 12;
  let count = 0;
  let _DATA = [];
  const fetchNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setArticles(data.articles);
  };
  useEffect(() => {
    fetchNews();
  }, []);
  count = Math.ceil(articles.length / PER_PAGE);
  _DATA = usePagination(articles, PER_PAGE, page);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  const handleSearch = async (e) => {
    const url = `https://newsapi.org/v2/everything?q=${search}&sortBy=relevancy&apiKey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    setArticles(data.articles);
  };
  return (
    <div
      style={
        useTheme().palette.mode === "dark"
          ? { backgroundColor: "black" }
          : { backgroundColor: "" }
      }
    >
      <Header
        theme={props.theme}
      />
      <div className="news-landing">
        <img src={NewsBackground} alt="NewsBackground" className="news-image" />
        <p style={{textAlign:"center"}} className="news-landing-text">Welcome to News World</p>
      </div>
      <div className="news-search">
        <Search style={{ width: "20%", border: "1px solid black" }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </Search>
        <button className="news-search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
        style={
          useTheme().palette.mode === "dark" ? { color: "white" } : { color: "" }
        }
      >
        <h2>TOP HEADLINES</h2>
      </Box>
      {_DATA.currentData().length!=0?(<Pagination
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}
      />):(<></>)}
      <div className="news-container">
        <NewsCard data={_DATA.currentData()} />
      </div>
      {_DATA.currentData().length!=0?(<Pagination
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
          marginBottom: "20px",
        }}
      />):(<></>)}
    </div>
  );
}

export default News;
