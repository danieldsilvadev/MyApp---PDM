import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type MovimentacoesProps = {
  id_processo : number, 
  tipo : string, 
  desc : string, 
  data_movimentacao : number
};

export default function Movimentacao({
  id_processo,
  tipo,
  desc,
  data_movimentacao
}: MovimentacoesProps) {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>{id_processo}</Text>
      <Text style={styles.subTitle}>{tipo}</Text>
      <Text style={styles.info}>Descrição: {desc}</Text>
      <Text style={styles.info}>Data de Movimentacao: {data_movimentacao}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 20,
    margin: 20,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 10,
  },
  info: {
    fontSize: 12,
    marginTop: 5,
  },
});
