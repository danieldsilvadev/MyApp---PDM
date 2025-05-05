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
  const [selectedProcesso, setSelectedProcesso] = useState<IProcesso>();

  const onAdd = (
    num_processo: number,
    titulo: string,
    desc: string,
    data_abertura: number,
    status: string,
    id?: number
  ) => {
    if (!id || id <= 0) {
      const newProcesso: IProcesso = {
        id: Math.random() * 1000,
        num_processo,
        titulo,
        desc,
        data_abertura,
        status,
      };
      const processosPlus: IProcesso[] = [...processos, newProcesso];
      setProcessos(processosPlus);
    } else {
      processos.forEach(processo => {
        if (processo.id == id) {
          processo.num_processo = num_processo
          processo.titulo = titulo
          processo.desc = desc
          processo.data_abertura = data_abertura
          processo.status = status
        }
      })
    }
    setModalVisible(false);
  };
  const onDelete = (id: number) => {
    const newProcessos: IProcesso[] = [];
    for (let index = 0; index < processos.length; index++) {
      const processo = processos[index];
      if (processo.id !== id) {
        newProcessos.push(processo);
      }
    }
    setProcessos(newProcessos);
    setModalVisible(false);
  };
  const openModal = () => {
    setSelectedProcesso(undefined);
    setModalVisible(true);
  };
  const openEditModal = (selectedProcesso: IProcesso) => {
    setSelectedProcesso(selectedProcesso);
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
          <TouchableOpacity key={processo.id} onPress={() => openEditModal(processo)}>
            <Processo
              num_processo={processo.num_processo}
              titulo={processo.titulo}
              desc={processo.desc}
              data_abertura={processo.data_abertura}
              status={processo.status}
            />
          </TouchableOpacity>
        ))}
      </ThemedView>

      <ProcessoModal
        visible={modalVisible}
        onCancel={closeModal}
        onAdd={onAdd}
        onDelete={onDelete}
        processo={selectedProcesso}
      />
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
