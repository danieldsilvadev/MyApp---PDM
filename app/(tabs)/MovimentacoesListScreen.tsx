import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import Movimentacao from '@/components/processos/Movimentacao';
import MyScrollView from '@/components/MyScrollView';
import MovimentacoesModal from '@/components/modal/MovimentacoesModal';
import { IMovimentacoes } from '@/interfaces/IMovimentacoes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MovimentacoesListScreen() {
  const [movimentacoes, setMovimentacoes] = useState<IMovimentacoes[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedMovimentacao, setSelectedMovimentacao] = useState<IMovimentacoes>();

  useEffect(() => {
    async function getData() {
      try {
        const data = await AsyncStorage.getItem("@movimentacoesApp:movimentacoes");
        const movimentacoesData = data != null ? JSON.parse(data) : [];
        setMovimentacoes(movimentacoesData)
      } catch (e) {
        
      }
    }
    getData()
  }, [])


  const onAdd = (
    id_processo : number,
    tipo: string,
    desc: string,
    data_movimentacao: number,
    id?: number
  ) => {
    if (!id || id <= 0) {
      const newMovimentacao: IMovimentacoes = {
        id: Math.random() * 1000,
        id_processo,
        tipo,
        desc,
        data_movimentacao,
      }
      const movimentacoesPlus: IMovimentacoes[] = [...movimentacoes, newMovimentacao];
      setMovimentacoes(movimentacoesPlus);
      AsyncStorage.setItem("@movimentacoesApp:movimentacoes", JSON.stringify(movimentacoesPlus))
    } else {
      movimentacoes.forEach(movimentacao => {
        if (movimentacao.id == id) {
          movimentacao.id_processo = id_processo
          movimentacao.tipo = tipo
          movimentacao.desc = desc
          movimentacao.data_movimentacao = data_movimentacao
        }
      });

      AsyncStorage.setItem("@movimentacoesApp:movimentacoes", JSON.stringify(movimentacoes))
    }
    setModalVisible(false);
  };
  const onDelete = (id: number) => {
    const newmovimentacoes: IMovimentacoes[] = [];
    for (let index = 0; index < movimentacoes.length; index++) {
      const movimentacao = movimentacoes[index];
      if (movimentacao.id !== id) {
        newmovimentacoes.push(movimentacao);
      }
    }
    setMovimentacoes(newmovimentacoes);
    AsyncStorage.setItem("@movimentacoesApp:movimentacoes", JSON.stringify(newmovimentacoes))
    setModalVisible(false);
  };
  const openModal = () => {
    setSelectedMovimentacao(undefined);
    setModalVisible(true);
  };
  const openEditModal = (selectedMovimentacao: IMovimentacoes) => {
    setSelectedMovimentacao(selectedMovimentacao);
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
             <TouchableOpacity key={movimentacao.id} onPress={() => openEditModal(movimentacao)}>
               <Movimentacao
                id_processo={movimentacao.id_processo}
                 tipo ={movimentacao.tipo}
                 desc={movimentacao.desc}
                 data_movimentacao={movimentacao.data_movimentacao}
               />
             </TouchableOpacity>
           ))}
         </ThemedView>
   
   
         <MovimentacoesModal
           visible={modalVisible}
           onCancel={closeModal}
           onAdd={onAdd}
           onDelete={onDelete}
           movimentacao={selectedMovimentacao}
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
