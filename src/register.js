import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { RootContext } from './context';

export class register extends Component {
    constructor({navigation}){
        super();
        this.state = {
            nav: navigation,
            user: [],
            name: '',
            username: '',
            gender: '',
            password: '',
            confirm: ''
        }
    }

    static contextType = RootContext
    
    store = () => {
        if(this.state.name!='' && this.state.username!='' && this.state.password!='' && this.state.password === this.state.confirm){
            this.patchData(this.state.name, this.state.password, this.state.username, this.state.gender);
            this.state.nav.pop(); this.state.nav.replace("Home");
            this.context.handleUser(this.state.user.length)
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        const response = await fetch("https://harianku-13r18.firebaseio.com/user.json");
        const json = await response.json();
        this.setState({ user: json });
      };
    
      patchData = async (name, pass, uname, gender) => {
          let a = this.state.user.length
          let addData = {
            [a] : {
                id:a,
                nama : name,
                password: pass,
                username: uname,
                gender: gender
            }
          }
        const response = await fetch("https://harianku-13r18.firebaseio.com/user/.json",
        {
            method: 'PATCH', 
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(addData)
        });
        const json = await response.json();
      }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>BUAT AKUN</Text>
                </View>

                <View style={styles.body}>
                    <View style={styles.groupInput}>
                        <View style={styles.input}>
                            <Text style={styles.text}>Nama Lengkap</Text>
                            <TextInput style={styles.textInput}
                            onChangeText={(text) => this.setState({ name: text })}
                            />
                        </View>
                        <View style={styles.input}>
                            <Text style={styles.text}>Username</Text>
                            <TextInput style={styles.textInput}
                            onChangeText={(text) => this.setState({ username: text })}
                            />
                        </View>
                        <View style={styles.input}>
                            <Text style={styles.text}>Jenis Kelamin</Text>
                            <DropDownPicker 
                                items={[
                                    {label: 'Pria', value: 'Pria'},
                                    {label: 'Wanita', value: 'Wanita'},
                                ]}
                                defaultValue={this.state.gender}
                                placeholder={'Pilih jenis kelamin'}
                                placeholderStyle={styles.placeholder}
                                containerStyle={styles.containerDropdown}
                                style={styles.dropdown}
                                dropDownStyle={styles.dropdown2}
                                labelStyle={styles.label}
                                onChangeItem={item => this.setState({gender: item.value})}
                            />
                        </View>
                        <View style={styles.input}>
                            <Text style={styles.text}>Password</Text>
                            <TextInput style={styles.textInput}
                            onChangeText={(text) => this.setState({ password: text })}
                            secureTextEntry={true}
                            />
                        </View>
                        <View style={styles.input}>
                            <Text style={styles.text}>Konfirmasi Password</Text>
                            <TextInput style={styles.textInput}
                            onChangeText={(text) => this.setState({ confirm: text })}
                            secureTextEntry={true}
                            />
                        </View>
                    </View>
                    <TouchableOpacity onPress={ this.store }>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Daftar</Text>
                        </View>
                    </TouchableOpacity>
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
        borderTopStartRadius: 50,
        borderTopEndRadius: 50
    },
    groupInput: {
        marginTop: 70,
        marginBottom: 50
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
    dropdown: {
        width: 200,
        height: 35,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#350B49'
    },
    placeholder: {
        fontFamily: 'Montserrat',
        color: '#350B49',
        fontSize: 14
    },
    containerDropdown: {
        height: 35, 
        width:200,
    },
    dropdown2: {
        width: 200,
        height: 70,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#350B49'
    },
    label: {
        fontFamily: 'Montserrat',
        color: '#350B49',
        fontSize: 14
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
})