import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams } from 'expo-router';
import { IUsuario } from '@/interfaces/IUsuario';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import Usuario from '@/components/processos/Usuario';

export default function MovimentacoesDetalhesScreen() {
    const { usuarioId } = useLocalSearchParams();
    const [usuarioForDetail, setUsuarioForDetail] = useState<IUsuario>();
    const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    useEffect(() => {
        async function getData() {
            try {
                const data = await AsyncStorage.getItem("@usuariosApp:usuarios");
                const usuariosData: IUsuario[] = data != null ? JSON.parse(data) : [];
                setUsuarios(usuariosData)

                usuariosData.forEach((element) => {
                    if (element.id.toString() == usuarioId) {
                        setUsuarioForDetail(element)
                    }
                })
            } catch (e) {

            }
        }

        getData()
    }, [])

    const onDelete = () => {
        if (usuarioForDetail) {
            const newusuarios: Array<IUsuario> = [];
            for (let index = 0; index < usuarios.length; index++) {
                const usuario = usuarios[index];
                if (usuario.id != usuarioForDetail!.id) {
                    newusuarios.push(usuario);
                }
            }
            setUsuarios(newusuarios);
            AsyncStorage.setItem("@usuarioApp:usuarios", JSON.stringify(newusuarios))
        }

        router.replace('/UsuariosListScreen')
    };



    return (
        <View>
            <ThemedView style={styles.headerContainer}>
                <TouchableOpacity onPress={() => onDelete()}>
                    <Text style={styles.headerButton}>
                        X
                    </Text>
                </TouchableOpacity>
            </ThemedView>

            <View style={styles.box}>
                {usuarioForDetail && (
                    <View style={styles.box}>
                        <Usuario
                            email={usuarioForDetail. email}
                            senha={usuarioForDetail.senha}
                        />
                    </View>
                )}

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 20,
        margin: 20,
        borderRadius: 5
    },

    headerButton: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingHorizontal: 20
    },

    headerContainer: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
