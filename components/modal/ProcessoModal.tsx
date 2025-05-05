import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { IProcesso } from '@/interfaces/IProcesso';

export type ProcessoModalProps = {
  visible: boolean;
  onAdd: (num_processo: number, titulo: string, desc: string, data_abertura: number, status: string, id: number) => void;
  onCancel: () => void;
  onDelete: (id: number) => void;
  processo?: IProcesso;
};

export default function ProcessoModal({
  visible,
  onAdd,
  onCancel,
  onDelete,
  processo
}: ProcessoModalProps) {
  const [num_processo, setNumProcesso] = useState('');
  const [titulo, setTitulo] = useState('');
  const [desc, setDesc] = useState('');
  const [data_abertura, setDataAbertura] = useState('');
  const [status, setStatus] = useState('');
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    if (processo) {
      setNumProcesso(processo.num_processo.toString());
      setTitulo(processo.titulo);
      setDesc(processo.desc);
      setDataAbertura(processo.data_abertura.toString());
      setStatus(processo.status);
      setId(processo.id);
    } else {
      setNumProcesso('');
      setTitulo('');
      setDesc('');
      setDataAbertura('');
      setStatus('');
      setId(0);
    }
  }, [processo]);
  

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.container}>
        <View style={styles.boxContainer}>
          <TextInput
            style={styles.boxInput}
            placeholder="Número do Processo"
            value={num_processo.toString()}
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
            value={data_abertura.toString()}
            onChangeText={setDataAbertura}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.boxInput}
            placeholder="Status"
            value={status}
            onChangeText={setStatus}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonAdd}
              onPress={() => onAdd(Number(num_processo), titulo, desc, Number(data_abertura), status, id)}
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
