import React, { createContext, useState } from 'react';

// یہ ہماری ایپ کی مین ڈائری (Context) بن رہی ہے
export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  // ایپ کے اندر ہی ڈیٹا سنبھالنے کے لیے لسٹیں
  const [userBalance, setUserBalance] = useState(100); // عام یوزر کا فرضی بیلنس
  const [pendingDeposits, setPendingDeposits] = useState([
    { id: '1', name: 'علی مری', amount: 500, txId: 'TXN883291', method: 'EasyPaisa' },
    { id: '2', name: 'احمد رضا', amount: 100, txId: 'JAZZ77210', method: 'JazzCash' }
  ]);
  const [totalAppDeposits, setTotalAppDeposits] = useState(25000); // ایڈمن کے دیکھنے کے لیے کل رقم

  // ڈپازٹ اپروو کرنے کا لاجک (جب ایڈمن کلک کرے گا)
  const approveDeposit = (id, amount) => {
    setPendingDeposits(pendingDeposits.filter(req => req.id !== id));
    setTotalAppDeposits(prev => prev + amount);
    setUserBalance(prev => prev + (amount - 3)); // 3 روپے فیس کٹ کر بیلنس میں جمع ہو جائیں گے
  };

  // غلط ڈپازٹ پر یوزر کی ریکویسٹ ڈیلیٹ کرنا
  const rejectDeposit = (id) => {
    setPendingDeposits(pendingDeposits.filter(req => req.id !== id));
  };

  return (
    <GameContext.Provider value={{
      userBalance,
      setUserBalance,
      pendingDeposits,
      setPendingDeposits,
      totalAppDeposits,
      approveDeposit,
      rejectDeposit
    }}>
      {children}
    </GameContext.Provider>
  );
};
