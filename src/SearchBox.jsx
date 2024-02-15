import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './SearchBox.css';
import { useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export default function SearchBox({updateInfo}){
    let [city,setCity]=useState("");
    let [error,setError]=useState(false);
    const API_URL="https://api.openweathermap.org/data/2.5/weather";
    const API_KEY="32309ff8d129f4ca56cf0a7062e2560a";
    

    let getWeatherInfo=async()=>{
        try{let response=await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        
            let jsonResponse=await response.json();
            let result={
                city: city,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description
            };
            console.log(result);
            return result;
        }catch(err){
            setError(true);
        }
    };

    
    let handleChange=(event)=>{
        setCity(event.target.value);
    }

    let handleSubmit=async(event)=>{
        try{
            event.preventDefault();
            console.log(city);
            setCity("");
            let newInfo=await getWeatherInfo();
            updateInfo(newInfo);
        }catch(err){
            setError(true);
        }
    };

    return(
        <div className="SearchBox">
            <form onSubmit={handleSubmit}>
              <TextField id="city" 
              label="City-Name"
               variant="standard" 
               required 
               value={city}
               onChange={handleChange}/>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button startIcon={<SearchOutlinedIcon/>} id="searchBtn" type="submit" variant="contained" >Search</Button>
              {error && <p style={{color:"red"}}>No such place found!</p>}
            </form>
        </div>
    );
}