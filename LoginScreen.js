import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // ایڈمن لاگ ان کی سخت چیکنگ (جو آپ نے فراہم کی)
    if (emailOrPhone.trim() === 'bakhtyarmarri2@gmail.com' && password === 'Marri@123') {
      alert('خوش آمدید ایڈمن! آپ ایڈمن پینل میں داخل ہو رہے ہیں۔');
      // یہاں سے ہم بعد میں ایڈمن پینل اسکرین پر بھیجیں گے
      navigation.navigate('Dashboard'); 
      return;
    }

    // عام یوزر کے لیے لاگ ان (بعد میں فائربیس سے جڑے گا)
    if (emailOrPhone !== '' && password !== '') {
      alert('لاگ ان کامیاب!');
      navigation.navigate('Dashboard');
    } else {
      alert('براہ کرم تمام خانے پُر کریں۔');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.logoText}>Pak Real Ludo</Text>
      <Text style={styles.subTitle}>لاگ ان کریں اور کھیلنا شروع کریں</Text>

      <View style={styles.inputContainer}>
        {/* ای میل یا موبائل نمبر */}
        <TextInput 
          style={styles.input} 
          placeholder="ای میل یا موبائل نمبر لکھیں" 
          placeholderTextColor="#aaa"
          value={emailOrPhone}
          onChangeText={setEmailOrPhone}
          autoCapitalize="none"
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
    backgroundColor: '#071e3d',
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
    backgroundColor: '#00b4d8',
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
    color: '#e94560',
    fontSize: 14,
  },
});
