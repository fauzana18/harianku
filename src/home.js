import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity, SafeAreaView } from 'react-native'
import { RootContext } from './context';

let time = new Date()
let year = time.getFullYear()
let month = time.getMonth()+1
let date = time.getDate()
let day = time.getDay()+1
let tanggal = `${date}-${month}-${year}`

let namaBulan
switch(month){
    case 1: { namaBulan = "Januari"; break; }
    case 2: { namaBulan = "Februari"; break; }
    case 3: { namaBulan = "Maret"; break; }
    case 4: { namaBulan = "April"; break; }
    case 5: { namaBulan = "Mei"; break; }
    case 6: { namaBulan = "Juni"; break; }
    case 7: { namaBulan = "Juli"; break; }
    case 8: { namaBulan = "Agustus"; break; }
    case 9: { namaBulan = "September"; break; }
    case 10: { namaBulan = "Oktober"; break; }
    case 11: { namaBulan = "November"; break; }
    case 12: { namaBulan = "Desember"; break; } 
}

let namaHari
switch(day){
    case 1: { namaHari = "AHAD"; break; }
    case 2: { namaHari = "SENIN"; break; }
    case 3: { namaHari = "SELASA"; break; }
    case 4: { namaHari = "RABU"; break; }
    case 5: { namaHari = "KAMIS"; break; }
    case 6: { namaHari = "JUM'AT"; break; }
    case 7: { namaHari = "SABTU"; break; }
}

export class home extends Component {
    constructor({navigation, route}){
        super();
        this.state = {
            nav: navigation,
            hijriah: [],
            monthHijriah: [],
            amalan: []
        }
    }

    static contextType = RootContext

    componentDidMount() {
        this.fetchData();
        this.fetchData2();
    }

    componentDidUpdate() {
       this.fetchData2()
    }

    componentWillUnmount() {
        this.fetchData();
        this.fetchData2();
    }
    
      fetchData = async () => {
        const response = await fetch(`http://api.aladhan.com/v1/gToH?date=${date}-${month}-${year}`);
        const json = await response.json();
        this.setState({ hijriah: json.data.hijri });
        this.setState({ monthHijriah: json.data.hijri.month})
      };

      fetchData2 = async () => {
        const response = await fetch("https://harianku-13r18.firebaseio.com/amalan.json");
        const json = await response.json();
        this.setState({ amalan: json });
      };

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <View style={styles.menu}>
                        <TouchableOpacity onPress={ () => this.state.nav.toggleDrawer()}>
                            <Image source={require('./images/menu.png')}/>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>{namaHari}</Text>
                    <Text style={styles.sub1}>{ this.state.hijriah.day } { this.state.monthHijriah.en } { this.state.hijriah.year }</Text>
                    <Text style={styles.sub2}>{`${date} ${namaBulan} ${year}`}</Text>
                </View>

                <View style={styles.body}>
                    <View style={styles.list}>
                        <FlatList
                            data={this.state.amalan}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({item}) =>
                                    <TouchableOpacity onPress={ () => this.state.nav.push("Detail", {id: item.id})}>
                                    <View style={styles.button}>
                                        <Text style={styles.buttonText}>{`${item.nama}`}</Text>
                                    </View>
                                    </TouchableOpacity>
                                }
                            ItemSeparatorComponent={()=><View style={styles.separator}/>}
                        />
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
        marginLeft: 10,
        paddingTop: 15,
        alignSelf:'flex-start'
    },
    title: {
        fontFamily: 'Montserrat',
        fontSize: 36,
        color: 'white',
        paddingTop: 55
    },
    sub1: {
        fontFamily: 'Montserrat',
        fontSize: 18,
        color: 'white',
    },
    sub2: {
        fontFamily: 'Montserrat',
        fontSize: 12,
        color: 'white',
    },
    body: {
        alignItems: 'center',
        height: 600,
        backgroundColor: 'white',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10
    },
    button: {
        width: 340,
        height: 35,
        borderRadius: 5,
        backgroundColor: '#EAE3F1',
        borderWidth: 1,
        borderColor: '#350B49',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    buttonText: {
        fontFamily: 'Montserrat',
        fontSize: 18,
        color: '#350B49'
    },
    list: {
        marginTop: 100
    },
    separator: {
        height:25,
        backgroundColor:'white'
    }
})