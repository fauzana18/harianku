import React, { Component } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'

export class splash extends Component {
    constructor({navigation}){
        super();
        this.state = {
            nav: navigation
        }
    }

    componentDidMount() {
        setTimeout(()=>{
            this.state.nav.replace('Login')
          }, 1500)
  
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.body}>
                    <Image source={require('./images/logo.png')} style={styles.logo}/>
                    <Text style={styles.title}>HARIANKU</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    body: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
    title: {
        fontFamily: 'Montserrat',
        fontSize: 48,
        color: '#350B49'
    }
})