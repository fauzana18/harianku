import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { RootContext } from './context';

let time = new Date()
let year = time.getFullYear()
let month = time.getMonth()+1
let date = time.getDate()
let tanggal = `${date}-${month}-${year}`

export class detail extends Component {
    constructor( {navigation, route}, props ){
        super();
        this.state= {
            nav: navigation,
            route: route.params.id,
            amalan: [],
            satuan: [],
            sat: '',
            x: -1,
            record: [],
            frekuensi: ''
        }
    }

    static contextType = RootContext

    componentDidMount() {
        this.fetchData();
        this.setState({ x: -1 })
        this.fetchData2();
    }

    change = () => {
        let i = this.state.x
        if(i < this.state.satuan.length-1){
            i++;
        }
        else{
            i=0;
        }
        this.setState({ sat: this.state.satuan[i]})
        this.setState({ x: i })
    }

    fetchData = async () => {
        const response = await fetch(`https://harianku-13r18.firebaseio.com/amalan/${this.state.route}.json`);
        const json = await response.json();
        this.setState({ amalan: json });
        this.setState({ satuan: json.satuan })
    };

    fetchData2 = async () => {
        const response = await fetch("https://harianku-13r18.firebaseio.com/record.json");
        const json = await response.json();
        this.setState({ record: json });
      };

    patchData = async (userid, amalid, frekuensi, satuan, tanggal) => {
        let a = this.state.record.length
        let addData = {
          [a] : {
              id:a,
              userid,
              amalid,
              frekuensi,
              satuan,
              tanggal
          }
        }
      const response = await fetch("https://harianku-13r18.firebaseio.com/record/.json",
      {
          method: 'PATCH', 
          headers: {
              'Content-Type' : 'application/json'
          },
          body: JSON.stringify(addData)
      });
      const json = await response.json();
    }

    store = () => {
        if(this.state.sat!='' && this.state.frekuensi!=''){
            this.patchData(this.context.user, this.state.amalan.nama, this.state.frekuensi, this.state.sat, tanggal);
            this.state.nav.pop();
        }
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>{this.state.amalan.nama}</Text>
                </View>

                <View style={styles.body}>
                    <View style={styles.box}>
                        <Text style={styles.text}>Deskripsi:</Text>
                        <Text style={[styles.text, {textAlign: 'justify'}]}>{this.state.amalan.deskripsi}</Text>
                        <View style={styles.box2}>
                            <Text style={styles.text}>Dikerjakan:</Text>
                            <TextInput 
                            style={styles.textInput}
                            onChangeText={(text) => this.setState({ frekuensi: text })}
                            />
                            <View style={styles.box3}>
                                <Text style={styles.text}>{`${this.state.sat}`}</Text>
                                <TouchableOpacity onPress={this.change}>
                                    <View style={styles.arrow}>
                                        <Image source={require('./images/arrow.png')}/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity onPress={ this.store }>
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
    },
    title: {
        fontFamily: 'Montserrat',
        fontSize: 36,
        color: 'white',
        paddingTop: 60,
        marginBottom: 30,
        textAlign: 'center'
    },
    body: {
        alignItems: 'center',
        height: 650,
        backgroundColor: 'white',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10
    },
    box: {
        marginTop: 30,
        marginLeft: 10
    },
    text: {
        fontFamily: 'Montserrat',
        fontSize: 18,
        color: '#350B49',
    },
    box2: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 50,
        marginTop: 50,
        justifyContent: 'flex-start'

    },
    textInput: {
        width: 85,
        height: 35,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#350B49',
        fontFamily: 'Montserrat',
        color: '#350B49',
        marginLeft: 30,
        marginRight: 20
    },
    box3: {
        width:100, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#350B49',
        height: 35,
    },
    arrow: {
        borderLeftWidth: 1,
        borderColor: '#350B49',
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        width: 30
    },
    button: {
        backgroundColor: '#350B49',
        width: 300,
        height: 35,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Montserrat',
        color: 'white'
    },
})