import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { IUsuario } from '@/interfaces/IUsuario';

export type usuarioModalProps = {
  visible: boolean;
  onAdd: (email: string, senha: string, id: number) => void;
  onCancel: () => void;
  onDelete: (id: number) => void;
  usuario?: IUsuario;
};

export default function UsuarioModal({
  visible,
  onAdd,
  onCancel,
  onDelete,
  usuario
}: usuarioModalProps) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    if (usuario) {
      setEmail(usuario.email.toString());
      setSenha(usuario.senha);
      setId(usuario.id);
    } else {
      setEmail('');
      setSenha('');
      setId(0);
    }
  }, [usuario]);
  

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.container}>
        <View style={styles.boxContainer}>
          <TextInput
            style={styles.boxInput}
            placeholder="email"
            value={email.toString()}
            onChangeText={setEmail}
            autoFocus
          />
          <TextInput
            style={styles.boxInput}
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonAdd}
              onPress={() => onAdd(email, senha , id)}
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
