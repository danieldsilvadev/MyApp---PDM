import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams } from 'expo-router';
import { IProcesso } from '@/interfaces/IProcesso';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import Processo from '@/components/processos/Processo';

export default function ProcessoDetalhesScreen() {
    const { processoId } = useLocalSearchParams();
    const [processoForDetail, setProcessoForDetail] = useState<IProcesso>();
    const [processos, setProcessos] = useState<IProcesso[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    useEffect(() => {
        async function getData() {
            try {
                const data = await AsyncStorage.getItem("@processosApp:processos");
                const processosData: IProcesso[] = data != null ? JSON.parse(data) : [];
                setProcessos(processosData)

                processosData.forEach((element) => {
                    if (element.id.toString() == processoId) {
                        setProcessoForDetail(element)
                    }
                })
            } catch (e) {

            }
        }

        getData()
    }, [])

    const onDelete = () => {
        if (processoForDetail) {
            const newProcessos: Array<IProcesso> = [];
            for (let index = 0; index < processos.length; index++) {
                const processo = processos[index];
                if (processo.id != processoForDetail!.id) {
                    newProcessos.push(processo);
                }
            }
            setProcessos(newProcessos);
            AsyncStorage.setItem("@processosApp:processos", JSON.stringify(newProcessos))
        }

        router.replace('/ProcessotListScreen')
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
                {processoForDetail ? (
                    <View style={styles.box}>
                        <Processo
                            num_processo={processoForDetail.num_processo}
                            titulo={processoForDetail.titulo}
                            desc={processoForDetail.desc}
                            data_abertura={processoForDetail.data_abertura}
                            status={processoForDetail.status}
                        />
                    </View>
                ) : null}

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
