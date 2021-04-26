import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../api/api';

export default function Fases() {
  const navigation = useNavigation();
  const [fases, setFases] = useState({});
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const token = "live_1bf5875dc55c3e57c8a5d350b65f37";
  const url = "campeonatos/2/fases";

  useEffect(  () => {

    setLoading(true);
    api.get(url, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
    })
    .then( (response) => {
        setFases(response.data);
        setLoading(false);
        setMsg('');
    })
    .catch( (error) => {
        console.log(error.code);
        setLoading(false);
    });

  }, []);

  function ListaFases({ data }){
    if( data.status == 'finalizado' || data.status == 'andamento'){
      return(
        <TouchableOpacity style={styles.areaFases} onPress={ () => {
          setMsg('')
          navigation.navigate("Partidas", { data: data.fase_id })}
        }>
          <Text style={styles.textFases}>{ data.nome }</Text>
        </TouchableOpacity>
      );
    }else{
      return(
        <TouchableOpacity style={styles.areaFases} onPress={ () => setMsg('Está fase ainda não ocorreu')}>
          <Text style={styles.textFases}>{ data.nome }</Text>
        </TouchableOpacity>
      );
    }
  }
  
 return (
   <View style={styles.container}>
     { loading ? (
        <ActivityIndicator size={50} color="black" style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}} />
     ) : (
        <FlatList
          style={{width: '95%'}}
          showsVerticalScrollIndicator={false}
          data={fases}
          renderItem={ ({ item }) => <ListaFases data={ item } /> }
        />
     )}
     <Text style={styles.text}>{ msg }</Text>
   </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  areaFases: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    marginTop: 15,
    
  },
  textFases: {
    fontSize: 15,
    paddingRight: 20
  },
  text: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    color: 'red'
  }
});