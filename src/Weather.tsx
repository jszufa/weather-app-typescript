import React, { useState, useEffect, useRef } from 'react';
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
    const [filteredWeatherList, setFilteredWeatherList] = useState<CityWeather[]>([])
    const [inputData, setInputData] = useState<string>('')

    useEffect(() => { getWeatherData(); }, []);
    useEffect(() => { filterWeatherList(); }, [inputData]);

    const getWeatherData = (): void => {

        axios.get('https://danepubliczne.imgw.pl/api/data/synop')
            .then((response): void => {
                console.log(response.data);
                setWeatherList(response.data);

                //Wyświetlanie pełnej listy przy uruchomieniu aplikacji
                setFilteredWeatherList(response.data);
            })
    }

    const filterWeatherList = (): void => {

        //filtrowanie case insensitive
        let newFilteredWeatherList: CityWeather[] = weatherList.filter(miejsce => miejsce.stacja.toLowerCase().includes(inputData.toLowerCase()))

        setFilteredWeatherList(newFilteredWeatherList);
    }

    //poniższy krok można pominąć i przekazywać wartość z inputa (e.target.value) bezpośrednio jako parametr funkcji filterWeatherList
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {

        setInputData(e.target.value);
    }

    return (
        <div className="Weather">
            <h1>Lista stacji pomiarowych</h1>
            <label>Szukaj: </label>
            <input type='text' name='search' onChange={(e) => handleInputChange(e)} />

            <WeatherList weatherList={filteredWeatherList} />
        </div>
    );
}

export default Weather;
