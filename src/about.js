import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, Linking } from 'react-native'

export class about extends Component {
    constructor({navigation}){
        super();
        this.state = {
            nav: navigation
        }
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <View style={styles.menu}>
                        <TouchableOpacity onPress={ () => this.state.nav.toggleDrawer()}>
                            <Image source={require('./images/menu.png')}/>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>TENTANG</Text>
                </View>

                <View style={styles.body}>
                    <Text style={styles.text}>HARIANKU adalah aplikasi untuk 
                    membantu pendataan mutaba’ah 
                    yaumiyah. Mutaba’ah yaumiyah adalah
                    evaluasi ibadah harian baik itu ibadah
                    wajib maupun ibadah sunnah. 
                    Semoga bermanfaat.
                    </Text>
                    <Text style={styles.by}>Dikembangkan oleh:</Text>
                    <Image source={require('./images/foto.png')}/>
                    <Text style={styles.name}>Ahmad Fauzan Maulana</Text>
                    <View style={styles.socmed}>
                        <TouchableOpacity onPress={ () => Linking.openURL('https://github.com/fauzana18') }>
                            <Image source={require('./images/github.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ () => Linking.openURL('https://www.instagram.com/fauzana18/') }>
                            <Image source={require('./images/ig.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ () => Linking.openURL('https://www.linkedin.com/in/fauzana18/') }>
                            <Image source={require('./images/linkedin.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        backgroundColor: '#350B49'
    },
    header: {
        alignItems: 'center',
        flex: 1
    },
    menu: {
        width: 35,
        height: 30,
        alignSelf:'flex-start',
        marginLeft: 10,
        paddingTop: 15,
    },
    title: {
        fontFamily: 'Montserrat',
        fontSize: 36,
        color: 'white',
        paddingTop: 60,
        marginBottom: 30
    },
    body: {
        alignItems: 'center',
        height: 650,
        backgroundColor: 'white',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10
    },
    text: {
        fontFamily: 'Montserrat',
        fontSize: 18,
        color: '#350B49',
        textAlign: 'justify',
        marginTop: 70,
        marginBottom: 20
    },
    by: {
        fontFamily: 'Montserrat',
        fontSize: 18,
        color: '#350B49',
        marginBottom: 20
    },
    name: {
        fontFamily: 'Montserrat',
        fontSize: 18,
        color: '#350B49',
        marginTop: 20
    },
    socmed: {
        flexDirection: 'row',
        marginTop: 20,
        width: 220,
        justifyContent: 'space-between'
    }
})