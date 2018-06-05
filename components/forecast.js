/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Text, Image, View, ImageBackground, StyleSheet, ActivityIndicator, FlatList } from 'react-native';


export default class App extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            weatherData: {
                forecast: [
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
            data.data.forecast.map(function(ele,index){
                if(index == 0){
                    ele.type="类型";
                    ele.date="日期";
                    ele.high ="最高温";
                    ele.fengli="风力";
                    ele.low ="最低温";
                    ele.fengxiang ="风向";
                }else{
                    var todayStart = ele.fengli.indexOf('A[');
                    var todayEnd = ele.fengli.indexOf(']]>')
                    ele.fengli = ele.fengli.slice(todayStart + 2, todayEnd);

                    todayStart = ele.high.indexOf('高温');
                    ele.high = ele.high.slice(todayStart + 2);
                    todayStart = ele.low.indexOf('低温');
                    ele.low = ele.low.slice(todayStart + 2);                    
                }
            })
            this.setState({
                weatherData: data.data,
                animating: false,
            })
        }).catch((e) => {
            this.getWeather();
        })
    }

    componentWillMount() {
        this.getWeather();
    }
    render() {
        if (!this.state.animating) {
            return (
                <FlatList style={{ backgroundColor:'#C7EDCC'}}
                    data={this.state.weatherData.forecast}
                    renderItem={({ item,index }) => 
                       {
                            if(index === 0){
                                return (
                                    <View style={[styles.listStyle, styles.listHeadStyle]}>
                                        <Text style={[styles.listItemStyle, { flex: 0.3 }, styles.listHeadStyle]} >{item.date}</Text>
                                        <Text style={[styles.listItemStyle, styles.listHeadStyle]} >{item.high}</Text>
                                        <Text style={[styles.listItemStyle, styles.listHeadStyle]} >{item.low}</Text>
                                        <Text style={[styles.listItemStyle, styles.listHeadStyle]} >{item.type}</Text>
                                        <Text style={[styles.listItemStyle, styles.listHeadStyle]} >{item.fengxiang}</Text>
                                        <Text style={[styles.listItemStyle, styles.listHeadStyle]} >{item.fengli}</Text>
                                    </View>
                                )
                            } else if (index % 2 !== 0){
                                return (
                                    <View style={[styles.listStyle, { backgroundColor: '#fff' }]}>
                                        <Text style={[styles.listItemStyle, { flex: 0.3 }]} >{item.date}</Text>
                                        <Text style={[styles.listItemStyle]} >{item.high}</Text>
                                        <Text style={styles.listItemStyle} >{item.low}</Text>
                                        <Text style={styles.listItemStyle} >{item.type}</Text>
                                        <Text style={styles.listItemStyle} >{item.fengxiang}</Text>
                                        <Text style={styles.listItemStyle} >{item.fengli}</Text>
                                    </View>
                                )
                            }else{
                                return (
                                    <View style={[styles.listStyle, { backgroundColor: '#F2DEDE' }]}>
                                        <Text style={[styles.listItemStyle, { flex: 0.3 }]} >{item.date}</Text>
                                        <Text style={[styles.listItemStyle]} >{item.high}</Text>
                                        <Text style={styles.listItemStyle} >{item.low}</Text>
                                        <Text style={styles.listItemStyle} >{item.type}</Text>
                                        <Text style={styles.listItemStyle} >{item.fengxiang}</Text>
                                        <Text style={styles.listItemStyle} >{item.fengli}</Text>
                                    </View>
                                )
                            }
                       }
                    }
                />
            )
        } else {
            return (
                <View style={styles.main}>
                    <ActivityIndicator
                        animating={this.state.animating}
                        style={{ height: 200, marginTop: 180, color: "red" }}
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
    listStyle: { 
        flexDirection: 'row', 
        height: 50, 
        lineHeight: 50,
        paddingLeft: 0,
        paddingRight: 10
    },
    listHeadStyle: { 
        marginTop: 0,
        fontSize: 18,
        height: 50,
        lineHeight: 50,
        backgroundColor: '#D9EDF7',
        fontWeight: 'bold'
    },
    listItemStyle:{
        flex: 0.14,
        height: 50, 
        lineHeight: 50,
        fontSize: 18,  
        textAlign: 'center'
    }
   
})

