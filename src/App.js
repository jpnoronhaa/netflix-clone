import { div } from 'prelude-ls';
import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';

import MovieRow from './components/MovieRow.js';
import FeatureMovie from './components/FeatureMovie.js';
import Header from './components/Header.js';

const App = () => {

  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

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

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  return (
    <div className="page">

      <Header black={blackHeader}/>

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

      <footer>
        Feito com <span role="img" aria-label="coração">❤️</span> pela B7Web com o JP <br/>
        Direitos de imagem para Netflix <br />
        Dados pegos do site Themoviedb.org
      </footer>

      {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://img.wattpad.com/5dfe4fbd326b14b1895ac287cbd281710210b343/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f546537666b566e4345795f3759673d3d2d313033373037333237322e313637643837366237333532366533313939373633363034353936332e676966" alt="loading" />
        </div>
      }
    </div>
  );
};

export default App;