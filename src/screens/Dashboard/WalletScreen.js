import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';

export default function WalletScreen({ navigation }) {
  const [depositAmount, setDepositAmount] = useState('');
  const [trxId, setTrxId] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('EasyPaisa'); // یا JazzCash

  const handleDepositRequest = () => {
    const amount = parseFloat(depositAmount);

    // آپ کی شرط: کم سے کم 100 روپے کا ڈپازٹ
    if (!amount || amount < 100) {
      Alert.alert("غلط رقم", "کم سے کم 100 روپے ڈپازٹ کیے جا سکتے ہیں۔");
      return;
    }

    if (trxId.trim() === "") {
      Alert.alert("غلط ٹرانزیکشن آئی ڈی", "براہ کرم پیسے بھیجنے کے بعد ٹرانزیکشن آئی ڈی (TxID) لازمی لکھیں۔");
      return;
    }

    // آپ کی شرط: 100 روپے پر 3 روپے فیس کٹے گی
    const fee = 3; 
    const finalAmount = amount - fee;

    Alert.alert(
      "درخواست بھیج دی گئی",
      `آپ کی Rs ${amount} ڈپازٹ کی درخواست ایڈمن کو بھیج دی گئی ہے۔\nفیس کٹنے کے بعد Rs ${finalAmount} آپ کے اکاؤنٹ میں آئیں گے۔ یہ تب تک پینڈنگ رہے گی جب تک ایڈمن اپروو نہیں کرتا۔`
    );

    // یہاں سے درخواست ایڈمن پینل میں جائے گی
    setDepositAmount('');
    setTrxId('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>وائلٹ اور ادائیگی</Text>

      {/* پیسے بھیجنے کا آفیشل نمبر */}
      <View style={styles.numberCard}>
        <Text style={styles.cardTitle}>👇 اس نمبر پر پیسے بھیجیں 👇</Text>
        <Text style={styles.phoneNumber}>03431289824</Text>
        <Text style={styles.accountName}>نام: بختار مری (EasyPaisa / JazzCash)</Text>
      </View>

      {/* طریقہ کار سلیکٹ کرنا */}
      <View style={styles.methodContainer}>
        <TouchableOpacity 
          style={[styles.methodButton, selectedMethod === 'EasyPaisa' && styles.activeMethod]}
          onPress={() => setSelectedMethod('EasyPaisa')}
        >
          <Text style={styles.methodText}>EasyPaisa</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.methodButton, selectedMethod === 'JazzCash' && styles.activeMethod]}
          onPress={() => setSelectedMethod('JazzCash')}
        >
          <Text style={styles.methodText}>JazzCash</Text>
        </TouchableOpacity>
      </View>

      {/* رقم اور ٹرانزیکشن آئی ڈی کے خانے */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>کتنے پیسے بھیجے؟ (کم سے کم Rs 100)</Text>
        <TextInput 
          style={styles.input} 
          placeholder="رقم لکھیں" 
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={depositAmount}
          onChangeText={setDepositAmount}
        />

        <Text style={styles.label}>ٹرانزیکشن آئی ڈی (TxID) لکھیں</Text>
        <TextInput 
          style={styles.input} 
          placeholder="ٹی آئی ڈی (TID / TxID) یہاں ڈالیں" 
          placeholderTextColor="#aaa"
          value={trxId}
          onChangeText={setTrxId}
        />
      </View>

      {/* درخواست بھیجنے کا بٹن */}
      <TouchableOpacity style={styles.button} onPress={handleDepositRequest}>
        <Text style={styles.buttonText}>ڈپوزٹ کی درخواست بھیجیں</Text>
      </TouchableOpacity>

      <Text style={styles.noteText}>نوٹ: غلط ٹرانزیکشن آئی ڈی دینے پر ایڈمن آپ کا اکاؤنٹ بلاک کر سکتا ہے۔</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#071e3d',
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00b4d8',
    marginBottom: 20,
  },
  numberCard: {
    width: '100%',
    backgroundColor: '#1f4068',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#00b4d8',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  phoneNumber: {
    color: '#e94560',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  accountName: {
    color: '#aaa',
    fontSize: 13,
    marginTop: 5,
  },
  methodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  methodButton: {
    width: '48%',
    backgroundColor: '#162447',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  activeMethod: {
    backgroundColor: '#00b4d8',
  },
  methodText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'right',
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
    backgroundColor: '#e94560',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  noteText: {
    color: '#aaa',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 15,
  },
});
