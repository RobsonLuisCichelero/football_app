import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image } from 'react-native';

import api from '../api/api';

export default function Partidas( data ) {
    const [partidas, setPartidas] = useState({});
    const [loading, setLoading] = useState(false);

    const token = "live_1bf5875dc55c3e57c8a5d350b65f37";
    const url = `campeonatos/2/fases/${data.route.params.data}`;

    useEffect(  () => {

        setLoading(true);
        api.get(url, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        })
        .then( (response) => {
            setPartidas(response.data.chaves);
            setLoading(false);
        })
        .catch( (error) => {
            console.log(error.code);
            setLoading(false);
        });
    }, []);

    function ListaParidas({ data }){

        return(
          <View style={styles.areaPartidas}>
            <Image source={{ uri: `${data.partida_ida.time_mandante.escudo}`}} style={{ width: 55, height: 55}}/>   
            <Text style={styles.textPartidas}>{data.partida_ida.placar}</Text>
            <Image source={{ uri: `${data.partida_ida.time_visitante.escudo}` }} style={{ width: 55, height: 55}}/> 
          </View>
        );
    }

 return (
    <View style={styles.container}>
        { loading ? (
            <ActivityIndicator size={50} color="black" style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}} />
        ) : (
            <FlatList
                keyExtractor={token}
                showsVerticalScrollIndicator={false}
                data={partidas}
                renderItem={ ({ item }) => <ListaParidas data={ item } /> }
                keyExtractor={partidas.fase_id}
            />
        )}
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    areaPartidas:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        marginTop: 15,
        padding: 20
    },
    textPartidas: {
        fontSize: 15,
    }
});