/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Text, Image, View, ImageBackground, StyleSheet, ActivityIndicator } from 'react-native';
// import { Indicator } from 'mint-ui';
// import '../lib/index.js';
// import '../lib/style.css';


export default class App extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            weatherData: {
                forecast: [
                    { high: 'high' },
                    { high: 'high1' },
                ]
            },
            hello: "hello",
            animating: true
        }
        this.getWeather = this.getWeather.bind(this);
    }

    getWeather() {
        fetch('https://www.apiopen.top/weatherApi?city=深圳').then((response) => {
            return response.json()
        }).then((data) => {
            const todayStart = data.data.forecast[0].fengli.indexOf('A[');
            data.data.forecast[0].fengli = data.data.forecast[0].fengli.substr(todayStart + 2, 3);
            this.setState({
                weatherData: data.data,
                animating: false
            })
        }).catch((e) => {
            this.getWeather();
        })
    }


    componentWillMount() {
        this.getWeather();
    }
    render() {
        if(!this.state.animating){
            return(
                <View style={styles.main}>
                    <View>
                        <Text style={styles.todayTitle}>今天天气</Text>
                        <Text style={styles.todayDate}>本月{this.state.weatherData.forecast[0].date}</Text>
                        <Text style={styles.today}>{this.state.weatherData.forecast[0].high}</Text>
                        <Text style={[styles.today, styles.today_black]}>平均温度:{this.state.weatherData.wendu}℃</Text>
                        <Text style={[styles.today, styles.todayLow]}>{this.state.weatherData.forecast[0].low}</Text>

                        <Text style={[styles.today, styles.todayLeixing]}>{this.state.weatherData.forecast[0].type}</Text>
                        <Text style={[styles.today, styles.todayFengxiang]}>风力:{this.state.weatherData.forecast[0].fengli}</Text>
                        <Text style={[styles.today, styles.todayFengxiang]}>{this.state.weatherData.forecast[0].fengxiang}</Text>

                        <Text style={[styles.today, styles.tips]}>{this.state.weatherData.ganmao}</Text>
                        <Text style={[styles.today, styles.jianchi]}>为什么坚持,想一想当初.</Text>
                    </View>
                </View>
            )
        }else{
            return (
                <View style={styles.main}>
                    <ActivityIndicator
                        animating={this.state.animating}
                        style={{ height: 200,marginTop: 180,color: "red" }}
                        size="large" />
                </View>
            );
        }
        
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#C7EDCC'
    },
    todayTitle: {
        fontSize: 56,
        textAlign: 'center',
        marginTop: 80
    },
    todayDate: {
        fontSize: 24,
        lineHeight: 34,
        textAlign: 'center',
        marginBottom: 10,
        color: 'black'
    },
    today: {
        fontSize: 20,
        color: 'red',
        textAlign: 'center'
    },
    today_black: {
        color: 'black'
    },
    todayLow: {
        color: 'blue',
    },
    todayLeixing: {
        marginTop: 15,
        fontSize: 28,
        color: 'black',
        marginBottom: 15
    },
    todayFengxiang: {
        fontSize: 20,
        color: 'skyblue'
    },
    tips:{
        marginTop: 15,
        fontSize: 18,
        color: 'black'
    },
    jianchi: {
        marginTop: 50
    }
})