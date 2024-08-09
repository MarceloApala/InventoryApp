import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const QRCodeDisplay = ({ qrCodeData }) => {
  if (!qrCodeData) return null;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: qrCodeData }}
        style={styles.qrCode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  qrCode: {
    width: 200,
    height: 200,
  },
});

export default QRCodeDisplay;
