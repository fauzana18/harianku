import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native'


export class add extends Component {
    constructor({navigation}){
        super();
        this.state = {
            nav: navigation,
            amalan: [],
            nama: '',
            deskripsi: '',
            satuan: '',
        }
    }

    store = () => {
        let satuan = this.state.satuan.split(",")
        let x = 0
        for(let i = 0; i < this.state.amalan.length; i++){
            if(this.state.nama == this.state.amalan[i].nama){
                x++
            }
        }
        if( x == 0 ){
            this.patchData(this.state.nama, this.state.deskripsi, satuan);
            this.fetchData();
            this.inputNama.clear()
            this.inputDeskripsi.clear()
            this.inputSatuan.clear()
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        const response = await fetch("https://harianku-13r18.firebaseio.com/amalan.json");
        const json = await response.json();
        this.setState({ amalan: json });
      };
    
      patchData = async (nama, deskripsi, satuan) => {
          let a = this.state.amalan.length
          let addData = {
            [a] : {
                id:a,
                nama : nama,
                deskripsi: deskripsi,
                satuan: satuan,
            }
          }
        const response = await fetch("https://harianku-13r18.firebaseio.com/amalan/.json",
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
                    <View style={styles.menu}>
                        <TouchableOpacity onPress={ () => this.state.nav.toggleDrawer()}>
                            <Image source={require('./images/menu.png')}/>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>TAMBAH AMALAN</Text>
                </View>

                <View style={styles.body}>
                    <View style={styles.box}>
                        <View style={styles.input}>
                            <Text style={styles.text}>Nama Amalan</Text>
                            <TextInput style={styles.textInput} 
                            onChangeText={(text) => this.setState({ nama: text })}
                            ref={input => { this.inputNama = input }}
                            />
                        </View>
                        <View style={styles.input}>
                            <Text style={styles.text}>Deskripsi</Text>
                            <TextInput style={[styles.textInput, {height: 70}]} 
                            multiline={true}
                            numberOfLines={3}
                            onChangeText={(text) => this.setState({ deskripsi: text })}
                            ref={input => { this.inputDeskripsi = input }}
                            />
                        </View>
                        <View style={styles.input}>
                            <Text style={styles.text}>Satuan</Text>
                            <TextInput style={styles.textInput} 
                            placeholder= 'pisahkan dengan koma jika lebih dari 1'
                            onChangeText={(text) => this.setState({ satuan: text })}
                            ref={input => { this.inputSatuan = input }}
                            />
                        </View>

                        <TouchableOpacity onPress={this.store}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Tambah</Text>
                            </View>
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
        height: 600,
        backgroundColor: 'white',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10
    },
    box: {
        marginTop: 50
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
        width: 300,
        height: 35,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#350B49',
        fontFamily: 'Montserrat',
        color: '#350B49'
    },
    button: {
        backgroundColor: '#350B49',
        width: 300,
        height: 35,
        borderRadius: 5,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Montserrat',
        color: 'white'
    },
})