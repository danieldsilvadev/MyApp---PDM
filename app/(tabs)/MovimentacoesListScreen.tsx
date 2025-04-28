import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import Movimentacao from '@/components/processos/Movimentacao';
import MyScrollView from '@/components/MyScrollView';
import MovimentacoesModal from '@/components/modal/MovimentacoesModal';
import { IMovimentacoes } from '@/interfaces/IMovimentacoes';

export default function MovimentacoesListScreen() {
  const [movimentacoes, setMovimentacoes] = useState<IMovimentacoes[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onAdd = (id_processo : number, tipo : string, desc : string, data_movimentacao : number) => {
    const newProcesso: IMovimentacoes = {
      id: Math.random() * 1000,
      id_processo: id_processo,
      tipo: tipo,
      desc: desc,
      data_movimentacao: data_movimentacao,
    };
    setMovimentacoes([...movimentacoes, newProcesso]);
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <MyScrollView headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
      <ThemedView style={styles.headerContainer}>
        <TouchableOpacity onPress={openModal}>
          <Text style={styles.headerButton}>+</Text>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.container}>
        {movimentacoes.map((movimentacao) => (
          <Movimentacao
            key={movimentacao.id}
            id_processo={movimentacao.id_processo}
            tipo={movimentacao.tipo}
            desc={movimentacao.desc}
            data_movimentacao={movimentacao.data_movimentacao}
          />
        ))}
      </ThemedView>

      <MovimentacoesModal visible={modalVisible} onCancel={closeModal} onAdd={onAdd} />
    </MyScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  headerContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButton: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingHorizontal: 20,
  },
});
