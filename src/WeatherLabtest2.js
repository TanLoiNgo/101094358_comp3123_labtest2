import React, { Component } from 'react';
import axios from 'axios'

const APIKey = '700cfa360e06e9d534790b35d7192655';

export default class WeatherLabtest2 extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            weather: []
        }
    }
    //Component Lifecycle Callback

    componentDidMount() {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=${APIKey}`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    data: res.data,
                    weather: res.data.weather
                })
            })
            .catch(error => console.log(error))
    }

    getTime = () => {

        let UNIX_timestamp = this.state.data.dt
        var d = new Date(UNIX_timestamp * 1000);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var day = days[d.getDay()];
        var month = months[d.getMonth()];
        var date = d.getDate();
        var hour = d.getHours();
        var min = d.getMinutes();
        var sec = d.getSeconds();
        var time = day + '., ' + month + ',. ' + date + ' | ' + hour + ':' + min + ':' + sec;
        return time;
    }


    render() {
        return (
            <div>
                {
                    this.state.weather.map(w => (
                        <div>

                            <div></div>
                            <div class="container border ">
                                <div>
                                    <h5 class="pt-3 ">{this.state.data.name} | CURRENT WEATHER  </h5>
                                    <h5 >{this.getTime()}</h5>
                                </div>
                                <div class="text-center">
                                    <div class="h1 justify-content-md-center">
                                        {w.main}
                                    </div>
                                </div>
                                <div class="row justify-content-md-center">
                                    <div class="col col-lg-2 display-3">
                                        {(this.state.data.main.temp - 273.15).toFixed(0)} °C
                                    </div>
                                    <div class="col-md-auto">
                                        <img src={`http://openweathermap.org/img/wn/${w.icon}@2x.png`} alt={'icon'}></img>
                                    </div>

                                </div>
                                <div class="row justify-content-md-center">
                                    <div class="col col-lg-2 h5">
                                        Feel Like: {(this.state.data.main.feels_like - 273.15).toFixed(0)} °C
                                    </div>
                                    <div class="col-md-auto h4">
                                        {w.description}
                                    </div>
                                </div>

                                <div class="row pt-4">
                                    <div class="col">
                                    Wind Degree: {this.state.data.wind.deg} meter/sec
                                    </div>
                                    <div class="col">
                                    Humidity: {this.state.data.main.humidity} %
                                    </div>
                                    <div class="col">
                                    Visbility: {this.state.data.visibility} meter
                                    </div>
                                </div>

                                <div class="row pt-4">
                                    <div class="col">
                                    Wind Gust: {this.state.data.wind.gust} meter/sec
                                    </div>
                                    <div class="col">
                                    Pressure:{this.state.data.main.pressure} hPa
                                    </div>
                                    <div class="col">
                                    Clouds : {this.state.data.clouds.all}%
                                    </div>
                                </div>
                            </div>



                        </div>
                    ))
                }
            </div>

        )
    }
}