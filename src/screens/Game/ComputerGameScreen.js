import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import ChatOverlay from '../../components/ChatOverlay'; // چیاٹ اور ایموجی سسٹم کو یہاں شامل کر رہے ہیں

export default function ComputerGameScreen({ navigation }) {
  const [diceResult, setDiceResult] = useState(1);
  const [turnText, setTurnText] = useState('آپ کی باری ہے (سرخ)');
  const [isRolling, setIsRolling] = useState(false);

  // یوزر کی گٹی رول کرنے کا فنکشن
  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    setTurnText('گٹی گھوم رہی ہے...');

    setTimeout(() => {
      const userRoll = Math.floor(Math.random() * 6) + 1;
      setDiceResult(userRoll);
      setIsRolling(false);

      if (userRoll === 6) {
        setTurnText('آپ کو دوبارہ باری ملی! 🎲');
      } else {
        // اگر 6 نہ آئے تو کمپیوٹر کی خودکار باری شروع ہوگی
        setTurnText('💻 کمپیوٹر اپنی گٹی گھما رہا ہے...');
        runComputerTurn();
      }
    }, 600);
  };

  // کمپیوٹر کی باری کا خودکار لاجک
  const runComputerTurn = () => {
    setTimeout(() => {
      const compRoll = Math.floor(Math.random() * 6) + 1;
      // ہلکا سا احساس دلانے کے لیے کہ کمپیوٹر نے کیا رول کیا
      alert(`💻 کمپیوٹر نے رول کیا: ${compRoll}`);
      
      if (compRoll === 6) {
        setTurnText('💻 کمپیوٹر کو دوبارہ باری ملی، وہ کھیل رہا ہے...');
        runComputerTurn();
      } else {
        setTurnText('آپ کی باری ہے (سرخ) 🎲');
      }
    }, 1200); // یوزر کو سمجھنے کے لیے تھوڑا سا گیپ دیا ہے
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🤖 کمپیوٹر کے ساتھ پریکٹس میچ</Text>
      
      {/* موجودہ اسٹیٹس کارڈ */}
      <View style={styles.statusCard}>
        <Text style={styles.statusText}>{turnText}</Text>
      </View>

      {/* لوڈو بورڈ گرافکس ہولڈر */}
      <View style={styles.ludoBoardGraphic}>
        <View style={styles.boardRow}>
          <View style={[styles.house, { backgroundColor: '#dc3545' }]}><Text style={styles.houseText}>آپ (Red)</Text></View>
          <View style={[styles.house, { backgroundColor: '#ffc107' }]}><Text style={styles.houseText}>کمپیوٹر (Bot)</Text></View>
        </View>
        <View style={styles.centerHome}><Text style={styles.centerText}>🤖</Text></View>
      </View>

      {/* گٹی رول کرنے کا بٹن */}
      <View style={styles.diceSection}>
        <Text style={styles.diceNumber}>{diceResult}</Text>
        <TouchableOpacity 
          style={[styles.diceButton, turnText.includes('💻') && styles.disabledButton]} 
          onPress={rollDice} 
          disabled={isRolling || turnText.includes('💻')}
        >
          <Text style={styles.diceButtonText}>گٹی رول کریں 🎲</Text>
        </TouchableOpacity>
      </View>

      {/* آپ کا بتایا ہوا فنی چیٹ اور ایموجی پینل یہاں شو ہوگا */}
      <Text style={styles.chatLabel}>مذاق یا غصہ ظاہر کریں 👇</Text>
      <ChatOverlay />

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Dashboard')}>
        <Text style={styles.backButtonText}>واپس ڈیش بورڈ پر جائیں</Text>
      </TouchableOpacity>
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00b4d8',
    marginBottom: 15,
  },
  statusCard: {
    backgroundColor: '#1f4068',
    padding: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ludoBoardGraphic: {
    width: 280,
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    elevation: 5,
  },
  boardRow: {
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'space-between',
  },
  house: {
    width: '48%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  houseText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  centerHome: {
    position: 'absolute',
    top: '35%',
    left: '42%',
    width: '16%',
    height: '30%',
    backgroundColor: '#fff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#071e3d',
  },
  centerText: {
    fontSize: 16,
  },
  diceSection: {
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  diceNumber: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    backgroundColor: '#1f4068',
    paddingHorizontal: 25,
    paddingVertical: 5,
    borderRadius: 10,
  },
  diceButton: {
    backgroundColor: '#e94560',
    padding: 12,
    borderRadius: 10,
    width: '70%',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#555',
  },
  diceButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chatLabel: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 20,
    alignSelf: 'flex-end',
  },
  backButton: {
    marginTop: 25,
    padding: 10,
  },
  backButtonText: {
    color: '#00b4d8',
    fontSize: 14,
  },
});
