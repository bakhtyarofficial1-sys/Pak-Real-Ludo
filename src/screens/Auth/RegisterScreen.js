import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [referCode, setReferCode] = useState('');

  const handleRegister = () => {
    // یہاں ہم بعد میں فائربیس (Firebase) کا لاجک جوڑیں گے
    alert(`اکاؤنٹ بنانے کی درخواست بھیج دی گئی ہے!\nنام: ${name}`);
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.logoText}>Pak Real Ludo</Text>
      <Text style={styles.subTitle}>نیا اکاؤنٹ بنائیں اور کمانا شروع کریں</Text>

      <View style={styles.inputContainer}>
        {/* پورا نام */}
        <TextInput 
          style={styles.input} 
          placeholder="پورا نام لکھیں" 
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />

        {/* موبائل نمبر */}
        <TextInput 
          style={styles.input} 
          placeholder="موبائل نمبر (ایزی پیسہ/جائز کیش والا)" 
          placeholderTextColor="#aaa"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        {/* پاس ورڈ */}
        <TextInput 
          style={styles.input} 
          placeholder="پاس ورڈ سیٹ کریں" 
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* ریفرل کوڈ */}
        <TextInput 
          style={styles.input} 
          placeholder="ریفرل کوڈ (اگر ہے تو - آپشنل)" 
          placeholderTextColor="#aaa"
          value={referCode}
          onChangeText={setReferCode}
        />
      </View>

      {/* رجسٹر بٹن */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>رجسٹر کریں</Text>
      </TouchableOpacity>

      {/* لاگ ان پر جانے کا لنک */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.linkContainer}>
        <Text style={styles.linkText}>پہلے سے اکاؤنٹ موجود ہے؟ لاگ ان کریں</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#071e3d', // خوبصورت گہرا نیلا رنگ (پروفیشنل گیمنگ لک)
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1f4068',
    color: '#00b4d8', // دلکش چمکدار نیلا رنگ
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
    textAlign: 'right', // اردو/پاکستانی یوزرز کے لیے دائیں طرف سے ٹیکسٹ
    fontSize: 16,
  },
  button: {
    width: '100%',
    backgroundColor: '#e94560', // دلکش گلابی/سرخ بٹن
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3, // اینڈرائیڈ پر ہلکا سا شیڈو دینے کے لیے
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
    color: '#00b4d8',
    fontSize: 14,
  },
});
    
