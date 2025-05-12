import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type ProcessoProps = {
  email: string;
  senha: string;
};

export default function Usuario({
  email,
  senha,
}: ProcessoProps) {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>{email}</Text>
      <Text style={styles.info}>Senha: {senha}</Text>
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
