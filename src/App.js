import './App.css';
import React, {useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Grid} from '@mui/material';

function App() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("stars");
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.github.com/search/repositories?q=${search}&sort=${sort}`
    )
      .then((response) => response.json())
      .then((data) => setRepos(data.items));
  }, [search, sort]);

  const styles = {
    media: {
      width: "50%",
      maxheight: "100px",
      marginTop:'30'
    }
};

  return (
    <div className='search-page'>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
      />
      <select className='selectElement' value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="stars">Stars</option>
        <option value="watchers">Watchers</option>
        <option value="score">Score</option>
        <option value="name">Name</option>
        <option value="created">Created</option>
        <option value="updated">Updated</option>
      </select>
      <Grid container spacing={1} className='list'>
        {repos && repos.map((repo) => (
          
            <Card sx={{ width: 345, height:400, margin:2 }} variant='outlined'>
              <CardMedia
                component="img" 
                image={repo.owner.avatar_url}
                alt="Chevrolet"
                style={styles.media}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {repo.name}
                </Typography>
                
                <Typography> {repo.description} </Typography>

                <Typography> Language: {repo.language} </Typography>
                <Typography> Stars: {repo.stargazers_count} </Typography>
              </CardContent>
            </Card>
          
        ))}
      </Grid>
    </div>
  );

}

export default App;
