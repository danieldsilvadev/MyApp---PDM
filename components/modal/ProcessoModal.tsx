import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useState } from 'react';

export type ProcessoModalProps = {
  visible: boolean;
  onAdd: (num_processo: number, titulo: string, desc: string, data_abertura: number, status: string) => void;
  onCancel: () => void;
};

export default function ProcessoModal({
  visible,
  onAdd,
  onCancel,
}: ProcessoModalProps) {
  const [num_processo, setNumProcesso] = useState('');
  const [titulo, setTitulo] = useState('');
  const [desc, setDesc] = useState('');
  const [data_abertura, setDataAbertura] = useState('');
  const [status, setStatus] = useState('');

  const handleAdd = () => {
    onAdd(
      Number(num_processo),
      titulo,
      desc,
      new Date(data_abertura).getTime(),
      status
    );
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.container}>
        <View style={styles.boxContainer}>
          <TextInput
            style={styles.boxInput}
            placeholder="Número do Processo"
            value={num_processo}
            onChangeText={setNumProcesso}
            keyboardType="numeric"
            autoFocus
          />
          <TextInput
            style={styles.boxInput}
            placeholder="Título"
            value={titulo}
            onChangeText={setTitulo}
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
            value={data_abertura}
            onChangeText={setDataAbertura}
          />
          <TextInput
            style={styles.boxInput}
            placeholder="Status"
            value={status}
            onChangeText={setStatus}
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
