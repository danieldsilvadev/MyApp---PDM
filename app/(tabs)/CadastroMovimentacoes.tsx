import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useState } from 'react';

export type MovimentacoesModalProps = {
  visible: boolean;
  onAdd: (id_processo: number, tipo: string, desc: string, data_movimentacao: number) => void;
  onCancel: () => void;
};

export default function CadastroMovimentacoes({
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
    <View style={styles.container}>
      <View style={styles.inputContainer}>
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
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCancel} onPress={onCancel}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    height: 76,
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
