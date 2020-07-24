import React from 'react';
import Weather from './component/weather.component'
import Form from './component/form.component'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

const api_key= "9c7bc722cc89dd73b40ab374c3aea1af"


class App extends React.Component{
  constructor(){
    super()
    this.state= {
      city:undefined,
      country:undefined,
      celsius:undefined,
      temp_max:undefined,
      temp_min:undefined,
      description:"",
      error:false
    }
  }
//converting the temperature to celsius
  calCelsius(temp){
    let cel= Math.floor(temp-273.15)
    return cel
  }

  getWeather= async(e) => {

    e.preventDefault()

    const city= e.target.elements.city.value
    const country= e.target.elements.country.value

    if (city&&country){
      const api_call= await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}uk&appid=${api_key}`)
    const response= await api_call.json()
    //see the data fetched from the api
    console.log(response)

    this.setState({
      city: `${response.name},${response.sys.country}`,
      celsius: this.calCelsius(response.main.temp),
      temp_max: this.calCelsius(response.main.temp_max),
      temp_min: this.calCelsius(response.main.temp_min),
      description: response.weather[0].description,
      error:false
    })

    }else{
      this.setState({error:true})
    }
  }


  render(){
    return(
      <div className="App">

        <Form loadweather={this.getWeather} error={this.state.error} />
        <Weather 
        city={this.state.city} 
        country={this.state.country} 
        temp_celsius={this.state.celsius}
        temp_max= {this.state.temp_max}
        temp_min= {this.state.temp_min}
        description= {this.state.description}
        />
        
      </div>
    )
  }
}

export default App