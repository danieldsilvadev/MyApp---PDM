import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type ProcessoProps = {
  num_processo: number;
  titulo: string;
  desc: string;
  data_abertura: number;
  status: string;
};

export default function Processo({
  num_processo,
  titulo,
  desc,
  data_abertura,
  status,
}: ProcessoProps) {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>{titulo}</Text>
      <Text style={styles.subTitle}>{desc}</Text>
      <Text style={styles.info}>Número do Processo: {num_processo}</Text>
      <Text style={styles.info}>Data de Abertura: {data_abertura}</Text>
      <Text style={styles.info}>Status: {status}</Text>
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
