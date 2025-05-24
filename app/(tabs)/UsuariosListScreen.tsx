import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import Usuario from '@/components/processos/Usuario';
import MyScrollView from '@/components/MyScrollView';
import UsuarioModal from '@/components/modal/UsuarioModal';
import { IUsuario } from '@/interfaces/IUsuario';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export default function UsuariosListScreen() {
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedUsuario, setSelectedUsuario] = useState<IUsuario>();

  useEffect(() => {
    async function getData() {
      try {
        const data = await AsyncStorage.getItem("@usuariosApp:usuarios");
        const usuariosData = data != null ? JSON.parse(data) : [];
        setUsuarios(usuariosData)
      } catch (e) {
        
      }
    }
    getData()
  }, [])


  const onAdd = (
    email: string,
    senha: string,
    id?: number
  ) => {
    if (!id || id <= 0) {
      const newUsuario: IUsuario = {
        id: Math.random() * 1000,
        email,
        senha
      }
      const usuariosPlus: IUsuario[] = [...usuarios, newUsuario];
      setUsuarios(usuariosPlus);
      AsyncStorage.setItem("@usuariosApp:usuarios", JSON.stringify(usuariosPlus))
    } else {
      usuarios.forEach(usuario => {
        if (usuario.id == id) {
          usuario.email = email
          usuario.senha = senha
        }
      });

      AsyncStorage.setItem("@usuariosApp:usuarios", JSON.stringify(usuarios))
    }
    setModalVisible(false);
  };
  const onDelete = (id: number) => {
      const newUsuarios: IUsuario[] = [];
      for (let index = 0; index < usuarios.length; index++) {
        const usuario = usuarios[index];
        if (usuario.id !== id) {
          newUsuarios.push(usuario);
        }
      }
      setUsuarios(newUsuarios);
      AsyncStorage.setItem("@usuariosApp:usuarios", JSON.stringify(newUsuarios))
      setModalVisible(false);
    };
  const openModal = () => {
    setSelectedUsuario(undefined);
    setModalVisible(true);
  };
  const openEditModal = (selectedUsuario: IUsuario) => {
    setSelectedUsuario(selectedUsuario);
    setModalVisible(true);
  };
  const navigateToDetails = (selectedUsuario: IUsuario) => {
      router.push({pathname : '/screens/UsuarioDetalhesScreen', params : {usuarioId : selectedUsuario.id}})
    }
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
           {usuarios.map((usuario) => (
             <TouchableOpacity key={usuario.id} onPress={() => openEditModal(usuario)}>
               <Usuario
                 email ={usuario.email}
                 senha ={usuario.senha}
               />
             </TouchableOpacity>
           ))}
         </ThemedView>
   
   
         <UsuarioModal
           visible={modalVisible}
           onCancel={closeModal}
           onAdd={onAdd}
           onDelete={onDelete}
           usuario={selectedUsuario}
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
