import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { IMovimentacoes } from '@/interfaces/IMovimentacoes';

export type MovimentacaoModalProps = {
  visible: boolean;
  onAdd: (id_processo: number, tipo: string, desc: string, data_movimentacao: number, id: number) => void;
  onCancel: () => void;
  onDelete: (id: number) => void;
  movimentacao?: IMovimentacoes;
};

export default function MovimentacoesModal({
  visible,
  onAdd,
  onCancel,
  onDelete,
  movimentacao
}: MovimentacaoModalProps) {
  const [id_processo, setIdProcesso] = useState('');
  const [tipo, setTipo] = useState('');
  const [desc, setDesc] = useState('');
  const [data_movimentacao, setDataMovimentacao] = useState('');
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    if (movimentacao) {
      setIdProcesso(movimentacao.id_processo.toString());
      setTipo(movimentacao.tipo);
      setDesc(movimentacao.desc);
      setDataMovimentacao(movimentacao.data_movimentacao.toString());
      setId(movimentacao.id);
    } else {
      setIdProcesso('');
      setTipo('');
      setDesc('');
      setDataMovimentacao('');
      setId(0);
    }
  }, [movimentacao]);
  

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.container}>
        <View style={styles.boxContainer}>
          <TextInput
            style={styles.boxInput}
            placeholder="ID do Processo"
            value={id_processo.toString()}
            onChangeText={setIdProcesso}
            keyboardType="numeric"
            autoFocus
          />
          <TextInput
            style={styles.boxInput}
            placeholder="Típo"
            value={tipo}
            onChangeText={setTipo}
          />
          <TextInput
            style={styles.boxInput}
            placeholder="Descrição"
            value={desc}
            onChangeText={setDesc}
          />
          <TextInput
            style={styles.boxInput}
            placeholder="Data de Abertura"
            value={data_movimentacao.toString()}
            onChangeText={setDataMovimentacao}
            keyboardType="numeric"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonAdd}
              onPress={() => onAdd(Number(id_processo), tipo, desc, Number(data_movimentacao), id)}
            >
              <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonCancel}
              onPress={() => onDelete(id)}
              disabled={id <= 0}
            >
              <Text style={styles.buttonText}>Deletar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.71)',
    alignContent: 'center',
    justifyContent: 'center',
  },
  boxContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    padding: 20,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#FFF',
  },
  buttonAdd: {
    backgroundColor: 'green',
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 20,
  },
  buttonCancel: {
    backgroundColor: 'red',
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    height: 76,
  },
  boxInput: {
    alignSelf: 'stretch',
    height: 40,
    borderRadius: 5,
    backgroundColor: '#bbb',
    margin: 5,
    paddingHorizontal: 10,
  },

  cancelButton: {
    backgroundColor: '#FFD700',
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 20,
  },

  cancelButtonText: {
    fontWeight: 'bold',
    color: '#FFF',
  },
});
