// QRCodeList.js
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, ScrollView, Text, Alert } from "react-native";

const QRCodeList = () => {
  const [qrCodes, setQrCodes] = useState([]);

  useEffect(() => {
    const fetchQrCodes = async () => {
      try {
        const response = await fetch("https://apprest3.onrender.com/api/automovil"); // Ajusta la URL según tu endpoint
        if (response.ok) {
          const data = await response.json();
          setQrCodes(data); // Asegúrate de ajustar esto según la estructura real de tu respuesta
        } else {
          Alert.alert("Error", "No se pudieron obtener los códigos QR.");
        }
      } catch (error) {
        Alert.alert("Error", `Hubo un problema al obtener los datos: ${error.message || 'Error desconocido'}`);
      }
    };

    fetchQrCodes();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {qrCodes.length > 0 ? (
        qrCodes.map((item) => (
          <View key={item.id} style={styles.qrContainer}>
            <Text>ID: {item.id}</Text>
            <Text>Chasis: {item.chasis}</Text>
            <Image
              source={{ uri: item.codigo_qr }} // Usa el Base64 directamente en la URI
              style={styles.qrCode}
            />
          </View>
        ))
      ) : (
        <Text>No hay códigos QR disponibles.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  qrContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  qrCode: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});

export default QRCodeList;
