import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Animated } from 'react-native';

export default function ChatOverlay() {
  const [activeMessage, setActiveMessage] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));

  // وہ کوئک میسجز جو پاکستانی پلیئرز لوڈو میں زیادہ بولتے ہیں
  const quickTexts = [
    "ہیلو! کیسے ہو؟",
    "جلدی کرو بھائی! ⏳",
    "کیا گیم کھیلی ہے یار! 🔥",
    "تھوڑا رحم کرو مجھ پر 😅",
    "آج تو آپ کی قسمت ہی خراب ہے! 😂",
    "چلو اب گٹی رول کرو!"
  ];

  // فنی، غصے والے اور چڑچڑے ایموجیز
  const emojis = [
    { icon: "😂", label: "فنی" },
    { icon: "😡", label: "غصہ" },
    { icon: "🤪", label: "چڑچڑا" },
    { icon: "😎", label: "سٹائل" },
    { icon: "🤫", label: "خاموش" },
    { icon: "😭", label: "رونا" }
  ];

  // اسکرین پر میسج یا ایموجی دکھانے کا اینیمیشن والا فنکشن
  const showBubble = (content) => {
    setActiveMessage(content);
    
    // بلبلہ (Bubble) شو کرنے کا اینیمیشن
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // 3 سیکنڈ بعد خودکار طور پر غائب ہو جائے گا
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setActiveMessage(''));
    }, 3000);
  };

  return (
    <View style={styles.container}>
      {/* لائیو پاپ اپ بلبلہ (یہاں میسج یا ایموجی اسکرین پر تیرتا ہوا نظر آئے گا) */}
      {activeMessage !== '' && (
        <Animated.View style={[styles.bubble, { opacity: fadeAnim }]}>
          <Text style={styles.bubbleText}>{activeMessage}</Text>
        </Animated.View>
      )}

      {/* ایموجیز کی پٹی */}
      <View style={styles.emojiRow}>
        {emojis.map((item, index) => (
          <TouchableOpacity key={index} style={styles.emojiBtn} onPress={() => showBubble(item.icon)}>
            <Text style={styles.emojiIcon}>{item.icon}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* کوئک ٹیکسٹ لسٹ (ہمارے اپنے بنائے ہوئے پیغامات) */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.textScrollView}>
        {quickTexts.map((txt, index) => (
          <TouchableOpacity key={index} style={styles.textBtn} onPress={() => showBubble(txt)}>
            <Text style={styles.quickText}>{txt}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#162447',
    borderRadius: 15,
    padding: 10,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#1f4068',
  },
  bubble: {
    position: 'absolute',
    top: -60,
    alignSelf: 'center',
    backgroundColor: '#00b4d8',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 5,
    zIndex: 999,
  },
  bubbleText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emojiRow: {
    flexDirection: 'row-reverse', // پاکستانی یوزرز کے لیے رائٹ ٹو لیفٹ ترتیب
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  emojiBtn: {
    backgroundColor: '#1f4068',
    padding: 8,
    borderRadius: 50,
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiIcon: {
    fontSize: 22,
  },
  textScrollView: {
    flexDirection: 'row-reverse',
  },
  textBtn: {
    backgroundColor: '#e94560',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 10,
  },
  quickText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
