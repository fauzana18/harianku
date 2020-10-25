import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import { RootContext } from './context';

export class profil extends Component {
    constructor({navigation}){
        super();
        this.state = {
            nav: navigation,
            user: [],
            record: [],
            amalan: []
        }
    }

    componentDidMount() {
        this.fetchData();
        this.fetchData2();
        this.fetchData3();
    }

    componentDidUpdate(){
        this.fetchData2();
    }

    fetchData = async () => {
        const response = await fetch(`https://harianku-13r18.firebaseio.com/user/${this.context.user}.json`);
        const json = await response.json();
        this.setState({ user: json });
      };

    fetchData2 = async () => {
        const response = await fetch(`https://harianku-13r18.firebaseio.com/record.json`);
        const json = await response.json();
        this.setState({ record: json });
    };
    fetchData3 = async () => {
        const response = await fetch(`https://harianku-13r18.firebaseio.com/amalan.json`);
        const json = await response.json();
        this.setState({ amalan: json });
    };

    static contextType = RootContext

    render() {

        let list = []

        for(let i = 0; i < this.state.record.length; i++){
            if( this.state.record[i].userid == this.context.user ){
                let x = this.state.record[i].amalid
                list.push(
                    <View key={i} style={styles.box4}>
                        <Text style={styles.text2}> {this.state.amalan[x].nama} </Text>
                        <Text style={styles.text2}> {this.state.record[i].tanggal} </Text>
                        <View style={styles.box5}>
                            <Text style={styles.text2}>{this.state.record[i].frekuensi}</Text>
                            <Text style={styles.text2}>{this.state.record[i].satuan}</Text>
                        </View>
                    </View>
                )
            }
        }

        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <View style={styles.menu}>
                        <TouchableOpacity onPress={ () => this.state.nav.toggleDrawer()}>
                            <Image source={require('./images/menu.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.box2}>
                            <Text style={styles.title}>Assalaamu'alaikum</Text>
                            <Text style={styles.name}>{this.state.user.nama}</Text>
                        </View>
                        <Image source={require('./images/ava.png')}/>
                    </View>
                </View>

                <View style={styles.body}>
                    <View style={styles.box3}>
                        <Text style={styles.text}>Riwayat amalan:</Text>
                        <View style={styles.box4}>
                            <Text style={styles.text2}>Nama Amalan</Text>
                            <Text style={styles.text2}>Tanggal</Text>
                            <View style={styles.box5}>
                                <Text style={styles.text2}>Frekuensi</Text>
                                <Text style={styles.text2}>Satuan</Text>
                            </View>
                        </View>
                        {list}
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
        paddingTop: 15
    },
    box: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginTop: 50,
        marginRight: 10
    },
    box2: {
        alignItems: 'flex-end',
        marginTop: 10
    },
    title: {
        fontFamily: 'Montserrat',
        fontSize: 14,
        color: 'white',
    },
    name: {
        fontFamily: 'Montserrat',
        fontSize: 24,
        color: 'white',
    },
    body: {
        height: 600,
        backgroundColor: 'white',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10
    },
    text: {
        fontFamily: 'Montserrat',
        fontSize: 18,
        color: '#350B49',
    },
    box3: {
        marginTop: 20,
        marginLeft: 10
    },
    box4: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 10
    },
    box5: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 140
    },
    text2: {
        fontFamily: 'Montserrat',
        fontSize: 14,
        color: '#350B49',
    }
})