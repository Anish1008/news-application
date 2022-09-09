import React from 'react'
import { Pagination } from "@mui/material";
import usePagination from "./Pagination";
import { useEffect, useState } from 'react';
import NewsCard from "./News-Card";
import Header from "./Header";
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'none',
        color: 'text.primary',
        borderRadius: 1,
        p: 1,
      }}
    >
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
}


function Archives() {
  const [articles, setArticles] = useState([]);
  useEffect(()=>{
    let temp = JSON.parse(localStorage.getItem('favourites'));
    if(temp){
      temp = temp.map((article)=>{
        article['favourite'] = true;
      return article;});
      setArticles(temp);
    }
  },[]);
  let [page, setPage] = useState(1);
  const PER_PAGE = 12;
  let count = 0;
  let _DATA = [];
  count = Math.ceil(articles.length / PER_PAGE);
  _DATA = usePagination(articles, PER_PAGE, page);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
    <Header theme={<MyApp/>}/>
    <div className="archive-container" style={mode==="dark" ? ({backgroundColor:"black"}):({}) }>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
        style={
          mode === "dark"
            ? { color: "white" }
            : { color: "" }
        }
      >
        <h2>ARCHIVED NEWS</h2>
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
      </ThemeProvider>
      </ColorModeContext.Provider>
  );
}

export default Archives