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
        }
    }

    componentDidMount() {
        this.fetchData();
        this.fetchData2();
    }

    componentDidUpdate() {
        this.fetchData2();
    }

    componentWillUnmount() {
        this.fetchData();
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

    static contextType = RootContext

    render() {

        let amal = []
        let tanggal = []
        let frekuensi = []
        let satuan = []

        let img

        if( this.state.user.gender == "Pria" ){
            img = require('./images/ikhwan.png')
        }

        else if( this.state.user.gender == "Wanita" ){
            img = require('./images/akhwat.png')
        }

        else{
            img = require('./images/ava.png')
        }

        for(let i = 0; i < this.state.record.length; i++){
            if( this.state.record[i].userid == this.context.user ){
                amal.push(
                    <Text style={styles.text2}> {this.state.record[i].amalid} </Text>
                )
                tanggal.push(
                    <Text style={styles.text2}> {this.state.record[i].tanggal} </Text>
                )
                frekuensi.push(
                    <Text style={styles.text2}>{this.state.record[i].frekuensi}</Text>
                )
                satuan.push(
                    <Text style={styles.text2}>{this.state.record[i].satuan}</Text>
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
                        <Image style={{ width:70, height:70 }} source={img}/>
                    </View>
                </View>

                <View style={styles.body}>
                    <ScrollView horizontal={true}>
                    <View style={styles.box3}>
                        <Text style={styles.text}>Riwayat amalan:</Text>
                        <View style={styles.box4}>
                            <View style={styles.box5}>
                                <Text style={styles.text2}>Nama Amalan</Text>
                                {amal}
                            </View>
                            <View style={styles.box5}>
                                <Text style={styles.text2}>Tanggal</Text>
                                {tanggal}
                            </View>
                            <View style={styles.box5}>
                                <Text style={styles.text2}>Frekuensi</Text>
                                <View style={{alignItems: 'flex-end'}}>
                                {frekuensi}
                                </View>
                            </View>
                            <View style={styles.box5}>
                                <Text style={styles.text2}>Satuan</Text>
                                {satuan}
                            </View>
                        </View>
                    </View>
                    </ScrollView>
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
        marginRight: 20
    },
    text2: {
        fontFamily: 'Montserrat',
        fontSize: 14,
        color: '#350B49',
    }
})