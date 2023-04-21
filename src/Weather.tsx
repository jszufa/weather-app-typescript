import React, { useState, useEffect } from 'react';
import './Weather.css';
import WeatherList from './WeatherList';
import axios from 'axios';

export interface CityWeather {
    cisnienie: string,
    data_pomiaru: string,
    godzina_pomiaru: string,
    id_stacji: string,
    kierunek_wiatru: string,
    predkosc_wiatru: string,
    stacja: string,
    suma_opadu: string,
    temperatura: string,
    wilgotnosc_wzgledna: string,
}

function Weather(): JSX.Element {

    const [weatherList, setWeatherList] = useState<CityWeather[]>([])

    const getWeatherData = () => {

        axios.get('https://danepubliczne.imgw.pl/api/data/synop')
            .then((response) => {
                console.log(response.data);
                setWeatherList(response.data);
            })

    }

    useEffect(() => { getWeatherData(); }, []);


    return (
        <div className="Weather">
            <h1>Lista miast</h1>
            <label>Szukaj
                <input />
            </label>
            <WeatherList weatherList={weatherList}/>
        </div>
    );
}

export default Weather;
