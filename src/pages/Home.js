import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../api/api';

export default function Home() {
    const navigation = useNavigation();
    const [campeonatos, setCampeonatos] = useState({});
    const [loading, setLoading] = useState(false);

    const token = "live_1bf5875dc55c3e57c8a5d350b65f37";
    const url = "campeonatos/2";

    useEffect(  () => {

        setLoading(true);
        api.get(url, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        })
        .then( (response) => {
            setCampeonatos(response.data)
            setLoading(false);
        })
        .catch( (error) => {
            console.log(error.code);
            setLoading(false);
        });
    }, []);

 return (
    <View style={styles.container}>
        <StatusBar style="auto" />
        <TouchableOpacity style={styles.areaCampeonatos} onPress={ () => navigation.navigate("Fases")}>
            { loading ? (
                <ActivityIndicator size={45} color="black" style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}} />
            ) : (
                <>
                <Image source={{ uri: `${campeonatos.logo}` }} style={styles.imgCampeonatos}/>
                <Text style={styles.textCampeonatos}>{campeonatos.nome}</Text>
                </>
            )}
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    areaCampeonatos: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8
    },
    textCampeonatos: {
        fontSize: 25,
        paddingRight: 20
    },
    imgCampeonatos: {
        width: 70,
        height: 70,
    }
});