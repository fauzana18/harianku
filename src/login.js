import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { RootContext } from './context';

export class login extends Component {
    constructor({navigation}){
        super();
        this.state = {
            nav: navigation,
            username: '',
            password: '',
            user: [],
        }
    }

    static contextType = RootContext

    componentDidMount() {
        this.fetchData();
      }
    
      fetchData = async () => {
        const response = await fetch("https://harianku-13r18.firebaseio.com/user.json");
        const json = await response.json();
        this.setState({ user: json });
      };

      login = () => {
        for(let i = 0; i < this.state.user.length; i++){
            if(this.state.username === this.state.user[i].username && this.state.password === this.state.user[i].password){
              this.state.nav.replace("Home")
              this.context.handleUser(this.state.user[i].id)
            }
        }
      }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>HARIANKU</Text>
                </View>

                <View style={styles.body}>
                    <View style={styles.input}>
                        <Text style={styles.text}>Username</Text>
                        <TextInput style={styles.textInput}
                        onChangeText={(text) => this.setState({ username: text })}
                        />
                    </View>
                    <View style={styles.input}>
                        <Text style={styles.text}>Password</Text>
                        <TextInput style={styles.textInput}
                        onChangeText={(text) => this.setState({ password: text })}
                        secureTextEntry={true}
                        />
                    </View>
                    <TouchableOpacity onPress={ this.login }>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Masuk</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.registerBox}>
                    <Text style={styles.register1}>Belum punya akun? </Text>
                    <TouchableOpacity onPress={ () => this.state.nav.push("Register")}>
                        <Text style={styles.register2}>Daftar</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}></View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    header: {
        backgroundColor: '#350B49',
        width: 260,
        height: 180,
        alignSelf: 'center',
        borderBottomEndRadius: 50,
        borderBottomStartRadius: 50,
        alignItems: 'center',
        elevation: 15,
        marginBottom: 60
        },
    title: {
        fontFamily: 'Montserrat',
        fontSize: 36,
        color: 'white',
        paddingTop: 75,

    },
    body: {
        alignItems: 'center',
    },
    input: {
        marginBottom: 15
    },
    text: {
        fontSize: 18,
        fontFamily: 'Montserrat',
        color: '#350B49'
    },
    textInput: {
        width: 200,
        height: 35,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#350B49',
        fontFamily: 'Montserrat',
        color: '#350B49'
    },
    button: {
        backgroundColor: '#350B49',
        width: 200,
        height: 35,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Montserrat',
        color: 'white'
    },
    registerBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 200
    },
    register1: {
        fontFamily: 'Montserrat',
        fontSize: 14,
        color: '#350B49'
    },
    register2: {
        fontFamily: 'Montserrat',
        fontSize: 14,
        color: '#7861D3'
    },
    footer: {
        backgroundColor: '#350B49',
        height: 130,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        
    },
})