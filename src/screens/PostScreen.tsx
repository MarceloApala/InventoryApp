import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Image } from "react-native";
import QRCode from 'qrcode';

export default function PostScreen() {
  const [chasis, setChasis] = useState("");
  const [codigoQr, setCodigoQr] = useState("");

  // Datos adicionales para el QR
  const vehicleData = {
    make: "Toyota",
    model: "Corolla",
    year: 2024,
    color: "Red",
    engine: "1.8L 4-Cylinder",
    transmission: "Automatic",
  };

  const handleGenerateQRCode = async () => {
    try {
      // Incluir datos del vehículo junto con el número de chasis
      const data = {
        chasis: chasis,
        ...vehicleData,
      };
      const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(data), { errorCorrectionLevel: 'H' });
      setCodigoQr(qrCodeDataUrl);
    } catch (error) {
      Alert.alert("Error", `Hubo un problema al generar el QR: ${error.message || 'Error desconocido'}`);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        "https://apprest3.onrender.com/api/automovil",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chasis: chasis,
            codigo_qr: codigoQr,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        Alert.alert("Éxito", "Datos guardados correctamente");
        setChasis("");
        setCodigoQr("");
      } else {
        const errorData = await response.json();
        Alert.alert("Error", `Hubo un problema al guardar los datos: ${errorData.message || 'Error desconocido'}`);
      }
    } catch (error) {
      Alert.alert("Error", `Hubo un problema al guardar los datos: ${error.message || 'Error desconocido'}`);
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
      <Button title="Generar QR" onPress={handleGenerateQRCode} />
      {codigoQr ? (
        <Image
          source={{ uri: codigoQr }}
          style={styles.qrCode}
        />
      ) : null}
      <Button title="Guardar" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  qrCode: {
    marginTop: 20,
    width: 200,
    height: 200,
  },
});
