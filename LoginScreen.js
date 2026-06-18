import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // یہاں ہم بعد میں فائربیس (Firebase) کا لاگ ان لاجک جوڑیں گے
    if (phone === '03001234567' && password === 'admin123') {
      // اگر یہ نمبر اور پاس ورڈ ہو تو سیدھا ایڈمن پینل یا ڈیش بورڈ پر لے جائیں
      alert('ایڈمن لاگ ان کامیاب!');
    } else {
      alert('لاگ ان کی درخواست بھیج دی گئی ہے!');
      navigation.navigate('Dashboard');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.logoText}>Pak Real Ludo</Text>
      <Text style={styles.subTitle}>لاگ ان کریں اور کھیلنا شروع کریں</Text>

      <View style={styles.inputContainer}>
        {/* موبائل نمبر */}
        <TextInput 
          style={styles.input} 
          placeholder="موبائل نمبر لکھیں" 
          placeholderTextColor="#aaa"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        {/* پاس ورڈ */}
        <TextInput 
          style={styles.input} 
          placeholder="پاس ورڈ لکھیں" 
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* لاگ ان بٹن */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>لاگ ان کریں</Text>
      </TouchableOpacity>

      {/* رجسٹر پر جانے کا لنک */}
      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.linkContainer}>
        <Text style={styles.linkText}>اکاؤنٹ نہیں ہے؟ نیا اکاؤنٹ بنائیں</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#071e3d', // وہی خوبصورت گیمنگ تھیم والا گہرا نیلا رنگ
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#00b4d8',
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 14,
    color: '#e2e2e2',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#1f4068',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    textAlign: 'right',
    fontSize: 16,
  },
  button: {
    width: '100%',
    backgroundColor: '#00b4d8', // لاگ ان کے لیے چمکدار نیلا بٹن
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkContainer: {
    marginTop: 20,
  },
  linkText: {
    color: '#e94560', // ہائی لائٹ کرنے کے لیے سرخ رنگ کا لنک
    fontSize: 14,
  },
});
