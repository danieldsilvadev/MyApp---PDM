import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams } from 'expo-router';
import { IMovimentacoes } from '@/interfaces/IMovimentacoes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import Movimentacao from '@/components/processos/Movimentacao';

export default function MovimentacoesDetalhesScreen() {
    const { movimentacaoId } = useLocalSearchParams();
    const [movimentacaoForDetail, setMovimentacaoForDetail] = useState<IMovimentacoes>();
    const [movimentacoes, setMovimentacoes] = useState<IMovimentacoes[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    useEffect(() => {
        async function getData() {
            try {
                const data = await AsyncStorage.getItem("@movimentacoesApp:movimentacoes");
                const movimentacoesData: IMovimentacoes[] = data != null ? JSON.parse(data) : [];
                setMovimentacoes(movimentacoesData)

                movimentacoesData.forEach((element) => {
                    if (element.id.toString() == movimentacaoId) {
                        setMovimentacaoForDetail(element)
                    }
                })
            } catch (e) {

            }
        }

        getData()
    }, [])

    const onDelete = () => {
        if (movimentacaoForDetail) {
            const newmovimentacoes: Array<IMovimentacoes> = [];
            for (let index = 0; index < movimentacoes.length; index++) {
                const movimentacao = movimentacoes[index];
                if (movimentacao.id != movimentacaoForDetail!.id) {
                    newmovimentacoes.push(movimentacao);
                }
            }
            setMovimentacoes(newmovimentacoes);
            AsyncStorage.setItem("@movimentacoesApp:movimentacoes", JSON.stringify(newmovimentacoes))
        }

        router.replace('/MovimentacoesListScreen')
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
                {movimentacaoForDetail && (
                    <View style={styles.box}>
                        <Movimentacao
                            id_processo={movimentacaoForDetail. id_processo}
                            tipo={movimentacaoForDetail.tipo}
                            desc={movimentacaoForDetail.desc}
                            data_movimentacao={movimentacaoForDetail.data_movimentacao}
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
