import React from 'react';
import './WeatherList.css';

import { CityWeather } from './Weather';

interface WeatherListProps {
  weatherList: CityWeather[],
}

function WeatherList(props: WeatherListProps): JSX.Element {

  let weatherArray = props.weatherList.map(
    (data) => {
      return (
        <li key={data.id_stacji}>
          <h3>{data.stacja}</h3>
          <p>Temperatura: {data.temperatura} st. C.</p>
          <p>Ciśnienie: {data.cisnienie} hPa</p>
          </li>)
    }
  )

  return (
    <div className="WeatherList">
      <ul>
        {weatherArray}
      </ul>
    </div>
  );
}

export default WeatherList;
