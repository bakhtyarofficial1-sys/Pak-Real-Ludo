import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

// ہماری بنائی ہوئی لوکل ڈائری (GameProvider) کو یہاں امپورٹ کر رہے ہیں
import { GameProvider } from './src/context/GameContext';

// اسکرینز کے لنکس
import LoginScreen from './src/screens/Auth/LoginScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen';
import DashboardScreen from './src/screens/Dashboard/DashboardScreen';
import WalletScreen from './src/screens/Dashboard/WalletScreen';
import AdminPanel from './src/screens/Admin/AdminPanel';
import OfflineGameScreen from './src/screens/Game/OfflineGameScreen';
import ComputerGameScreen from './src/screens/Game/ComputerGameScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    // یہاں ہم نے پوری ایپ کو گیم پرووائیڈر کے اندر ڈال دیا تاکہ ڈیٹا ہر جگہ پہنچ سکے
    <GameProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator 
          initialRouteName="Login"
          screenOptions={{
            headerShown: false, // فل اسکرین دلکش لک کے لیے
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Wallet" component={WalletScreen} />
          <Stack.Screen name="Admin" component={AdminPanel} />
          <Stack.Screen name="OfflineGame" component={OfflineGameScreen} />
          <Stack.Screen name="ComputerGame" component={ComputerGameScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GameProvider>
  );
}
