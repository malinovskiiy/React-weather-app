import React from 'react';
import Info from './components/Info';
import Weather from './components/Weather';
import Form from './components/Form';

const API_KEY = "bce7468be9ad36444bfe777f9188516c";
class App extends React.Component {
    
    state ={
        temp: undefined,
        city: undefined,
        country: undefined,
        sunrise: undefined,
        sunset: undefined,
        error: undefined
    }

    gettingWeather = async (e) =>{
        e.preventDefault();
        let city = e.target.elements.city.value;
        
        
        if (city){

            const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            const data = await api_url.json();

            if(data.cod === '404'){
                return this.setState({
                    temp: undefined,
                    city: undefined,
                    country: undefined,
                    sunrise: undefined,
                    sunset: undefined,
                    error:"City not found"
                });
            }

            let sunset = data.sys.sunset * 1000;
            let date = new Date();
            date.setTime(sunset);
            let sunset_date = date.toLocaleTimeString();


            this.setState({
                temp: data.main.temp,
                city: data.name,
                country: data.sys.country,
                pressure: data.main.pressure,
                sunset: sunset_date,
                error: undefined
            });

        } else {
            this.setState({
                temp: undefined,
                city: undefined,
                country: undefined,
                sunrise: undefined,
                sunset: undefined,
                error: "Введите название города"
            });
        }
        

    }

    render(){
        return (
            <div className="wrapper">
                <div className="main">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5 info">
                                <Info/>
                            </div>
                            <div className="col-lg-7 form">
                                <Form weatherMethod = {this.gettingWeather}/>
                                <Weather
                                    temp={this.state.temp}
                                    city={this.state.city}
                                    country={this.state.country}
                                    pressure={this.state.pressure}
                                    sunset={this.state.sunset}
                                    error={this.state.error}
                                />
                            </div>
                        </div>
                    </div>
                </div> 
            </div>  
        );
    }
}

export default App;
