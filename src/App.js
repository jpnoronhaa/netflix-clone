import { div } from 'prelude-ls';
import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow.js';
import FeatureMovie from './components/FeatureMovie.js';


const App = () => {

  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null)

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      let originals = list.filter(item=>item.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeatureData(chosenInfo);
     }

     loadAll();
  }, []);

  return (
    <div className="page">

      {featureData &&
        <FeatureMovie item={featureData} />
      }

      <section className="lists">
        {
          movieList.map((item, key) => (
            <MovieRow key={key} title={item.title} items={item.items}/>
          ))
        }
      </section>
    </div>
  );
};

export default App;