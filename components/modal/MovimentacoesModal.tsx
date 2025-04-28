import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useState } from 'react';

export type MovimentacoesModalProps = {
  visible: boolean;
  onAdd: (id_processo : number, tipo : string, desc : string, data_movimentacao : number) => void;
  onCancel: () => void;
};

export default function MovimentacoesModal({
  visible,
  onAdd,
  onCancel,
}: MovimentacoesModalProps) {
  const [id_processo, setIdProcesso] = useState('');
  const [tipo, setTipo] = useState('');
  const [desc, setDesc] = useState('');
  const [data_movimentacao, setDataMovimentacao] = useState('');

  const handleAdd = () => {
    onAdd(
      Number(id_processo),
      tipo,
      desc,
      Number(data_movimentacao)
    );
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.container}>
        <View style={styles.boxContainer}>
          <TextInput
            style={styles.boxInput}
            placeholder="Id processo"
            value={id_processo}
            onChangeText={setIdProcesso}
            keyboardType="numeric"
            autoFocus
          />
          <TextInput
            style={styles.boxInput}
            placeholder="Título"
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
            value={data_movimentacao}
            onChangeText={setDataMovimentacao}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
              <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCancel} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancelar</Text>
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
});
