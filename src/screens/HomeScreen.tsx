import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default function HomeScreen() {
  const [chasis, setChasis] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      setError('');
      const response = await axios.get(`https://apprest3.onrender.com/api/automovil?chasis=${chasis}`);
      if (response.data) {
        setData(response.data);
      } else {
        setError('No se encontraron datos para el número de chasis ingresado.');
      }
    } catch (error) {
      setError('Error al buscar los datos. Por favor, intente nuevamente.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ingrese el número de chasis"
        value={chasis}
        onChangeText={setChasis}
      />
      <Button title="Buscar" onPress={handleSearch} />
      {data && (
        <View style={styles.result}>
          <Text>ID: {data.id}</Text>
          <Text>Chasis: {data.chasis}</Text>
          <Text>Código QR: {data.codigo_qr}</Text>
        </View>
      )}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  result: {
    marginTop: 20,
  },
  error: {
    marginTop: 20,
    color: 'red',
  },
});
