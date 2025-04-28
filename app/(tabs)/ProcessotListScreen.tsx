import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import Processo from '@/components/processos/Processo';
import MyScrollView from '@/components/MyScrollView';
import ProcessoModal from '@/components/modal/ProcessoModal';
import { IProcesso } from '@/interfaces/IProcesso';

export default function ProcessoListScreen() {
  const [processos, setProcessos] = useState<IProcesso[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onAdd = (num_processo: number, titulo: string, desc: string, data_abertura: number, status: string) => {
    const newProcesso: IProcesso = {
      id: Math.random() * 1000,
      num_processo: num_processo,
      titulo: titulo,
      desc: desc,
      data_abertura: data_abertura,
      status: status,
    };
    setProcessos([...processos, newProcesso]);
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
        {processos.map((processo) => (
          <Processo
            key={processo.id}
            num_processo={processo.num_processo}
            titulo={processo.titulo}
            desc={processo.desc}
            data_abertura={processo.data_abertura}
            status={processo.status}
          />
        ))}
      </ThemedView>

      <ProcessoModal visible={modalVisible} onCancel={closeModal} onAdd={onAdd} />
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
