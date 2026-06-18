import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native';

export default function AdminPanel({ navigation }) {
  // فرضی ایڈمن ڈیٹا (بعد میں یہ فائربیس ڈیٹا بیس سے لائیو تبدیل ہوگا)
  const [onlineUsers, setOnlineUsers] = useState(14);
  const [totalUsers, setTotalUsers] = useState(120);
  const [totalDeposits, setTotalDeposits] = useState(25000);

  // ڈپازٹ کی پینڈنگ درخواستیں
  const [requests, setRequests] = useState([
    { id: '1', name: 'علی خان', amount: 500, txId: 'TXN883291', method: 'EasyPaisa' },
    { id: '2', name: 'احمد رضا', amount: 100, txId: 'JAZZ77210', method: 'JazzCash' },
  ]);

  // لائیو میچز کی مانیٹرنگ
  const [liveMatches, setLiveMatches] = useState([
    { id: '1', player1: 'عمران', player2: 'بلال', bet: 50 },
    { id: '2', player1: 'حمزہ', player2: 'اسد', bet: 10 },
  ]);

  // درخواست منظور (Approve) کرنے کا فنکشن
  const handleApprove = (id, name, amount) => {
    Alert.alert("منظور کر دیا", `${name} کا Rs ${amount} کا ڈپازٹ اپروو ہو گیا ہے۔`);
    setRequests(requests.filter(req => req.id !== id));
    setTotalDeposits(totalDeposits + amount);
  };

  // غلط ڈپازٹ پر بلاک کرنے کا فنکشن
  const handleBlockUser = (id, name) => {
    Alert.alert(
      "یوزر بلاک کریں",
      `کیا آپ واقعی غلط ٹرانزیکشن آئی ڈی کی وجہ سے ${name} کو بلاک کرنا چاہتے ہیں؟`,
      [
        { text: "کینسل", style: "cancel" },
        { text: "ہاں، بلاک کریں", onPress: () => {
            alert(`${name} کو بلاک کر دیا گیا ہے۔`);
            setRequests(requests.filter(req => req.id !== id));
          }
        }
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>👑 آفیشل ایڈمن پینل</Text>

      {/* اوور ویو کارڈز (Stats) */}
      <View style={styles.statsGrid}>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>{onlineUsers}</Text>
          <Text style={styles.statLabel}>آن لائن یوزرز</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>{totalUsers}</Text>
          <Text style={styles.statLabel}>کل یوزرز</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNum, { color: '#00b4d8' }]}>Rs {totalDeposits}</Text>
          <Text style={styles.statLabel}>کل ڈپازٹ رقم</Text>
        </View>
      </View>

      {/* پینڈنگ ڈپازٹ ریکویسٹس */}
      <Text style={styles.sectionTitle}>📥 پینڈنگ ڈپازٹ درخواستیں</Text>
      {requests.length === 0 ? (
        <Text style={styles.emptyText}>کوئی پینڈنگ درخواست نہیں ہے۔</Text>
      ) : (
        requests.map(item => (
          <View key={item.id} style={styles.requestCard}>
            <Text style={styles.requestText}>👤 یوزر: {item.name}</Text>
            <Text style={styles.requestText}>💰 رقم: Rs {item.amount} ({item.method})</Text>
            <Text style={styles.requestText}>🆔 TxID: {item.txId}</Text>
            
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.approveButton} onPress={() => handleApprove(item.id, item.name, item.amount)}>
                <Text style={styles.btnText}>اپروو کریں</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.blockButton} onPress={() => handleBlockUser(item.id, item.name)}>
                <Text style={styles.btnText}>بلاک کریں</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}

      {/* لائیو میچ مانیٹرنگ */}
      <Text style={styles.sectionTitle}>🎲 لائیو میچز مانیٹرنگ</Text>
      {liveMatches.map(match => (
        <View key={match.id} style={styles.matchCard}>
          <Text style={styles.matchText}>🎮 {match.player1} 🆚 {match.player2}</Text>
          <Text style={styles.matchBet}>شرط کی رقم: Rs {match.bet}</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Dashboard')}>
        <Text style={styles.btnText}>واپس ڈیش بورڈ پر جائیں</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0c1020', // ایڈمن کے لیے الگ گہرا تھیم رنگ
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#e94560',
    textAlign: 'center',
    marginBottom: 25,
  },
  statsGrid: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statBox: {
    width: '31%',
    backgroundColor: '#161a36',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1f4068',
  },
  statNum: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#aaa',
    fontSize: 11,
    marginTop: 5,
    textAlign: 'center',
  },
  sectionTitle: {
    color: '#00b4d8',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 15,
    marginTop: 10,
  },
  emptyText: {
    color: '#aaa',
    textAlign: 'center',
    marginVertical: 10,
  },
  requestCard: {
    backgroundColor: '#161a36',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderColor: '#e94560',
  },
  requestText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  approveButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  blockButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  matchCard: {
    backgroundColor: '#1f4068',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  matchText: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  matchBet: {
    color: '#00b4d8',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 5,
  },
  backButton: {
    backgroundColor: '#1f4068',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
});
