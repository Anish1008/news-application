import * as React from 'react';
import ReactDOM from 'react-dom/client';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';

export default function MediaCard(props) {
  const data = props.data;
  const handleFavourite = (index) => {
    let element = document.getElementById(index);
    let temp = JSON.parse(localStorage.getItem('favourites'));
    if (temp===null) {
      temp = [];
    }
    if(element.className === "unfilled"){
      const root = ReactDOM.createRoot(element);
      element.className = "filled";
      root.render(
        <StarIcon/>
      );
         let obj;
      if(temp)
      obj = temp.find((o, i) => o.title===data[index].title);
      if(obj){
        temp.splice(temp.indexOf(obj), 1);
      }
      temp.push(data[index]);
      console.log(temp);
      localStorage.setItem('favourites', JSON.stringify(temp));
    }
    else{
      const root = ReactDOM.createRoot(element);
      element.className = "unfilled";
      root.render(
        <StarOutlineIcon/>
      );
      console.log("yo");
        let obj = temp.find((o, i) => o.title===data[index].title);
      if(obj){
        temp.splice(temp.indexOf(obj), 1);
      }
      localStorage.setItem('favourites', JSON.stringify(temp));
    }
  };
  console.log(localStorage.getItem('favourites'));

  return (
    data.map((item,index)=>(<Card className='news-card' key={index} sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={item.urlToImage}
        alt="News Image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        {
          item.favourite?
          <button style={{backgroundColor:"transparent", border:"none"}} id={index} className="filled" onClick={()=>handleFavourite(index)}><StarIcon/></button>:
        <button style={{backgroundColor:"transparent", border:"none"}} size="small" id={index} className="unfilled" onClick={()=>{handleFavourite(index)}}><StarOutlineIcon/></button>
        }
        <Button size="small"><a href={item.url} rel="noreferrer" target="_blank">Learn More</a></Button>
        <Button size="small"  onClick={()=>navigator.clipboard.writeText(item.url)}>Copy Link</Button>
      </CardActions>
    </Card>)
  ));
}