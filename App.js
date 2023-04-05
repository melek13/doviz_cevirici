import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';

const API_KEY = '1bfafb11ccce8a1c0742abf0';

export default function App() {
  const [miktar, setMiktar] = useState('');
  const [cevrilecek, setCevrilecek] = useState('');
  const [cevrildi, setCevrildi] = useState('');
  const [sonuc, setSonuc] = useState(null);

  const degistir = async () => {
    if (
      miktar.trim() !== '' &&
      cevrilecek.trim() !== '' &&
      cevrildi.trim() !== ''
    ) {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${cevrilecek}/${cevrildi}/${miktar}`
      );

      const data = await response.json();

      console.log(data);

      if (data.result == 'success'){
        setSonuc(data.conversion_result);
      }else{
        setSonuc('Error : ');
      }
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Miktarı giriniz"
        value={miktar}
        onChangeText={setMiktar}
        keybordType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Çevireceğiniz para birimini yazınız. ÖR:USD,TR vb."
        value={cevrilecek}
        onChangeText={setCevrilecek}
        autoCapitalize="characters"
      />
      <TextInput
        style={styles.input}
        placeholder="Çevirmek istediğiniz para birimini yazınız. ÖR:USD,TR vb."
        value={cevrildi}
        onChangeText={setCevrildi}
        autoCapitalize="characters"
      />
      <TouchableOpacity style={styles.button} onPress={degistir}>
        <Text> Cevir
        </Text>
      </TouchableOpacity>
      <Text>{typeof sonuc === 'number'?`${miktar} ${cevrilecek} = ${sonuc} ${cevrildi}`
        :
        sonuc}
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#mmm',
    alignItems: 'center',
    padding: 50,
    paddingHorizantal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 7,
    padding: 10,
    width: '80%',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 7,
    padding: 10,
    marginTop: 10,
  },
  result: {
    marginTop : 20,
    fontSize : 31,
  }
});
