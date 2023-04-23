import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Transaction } from '../types/navigation';
import { themeColor, useTheme } from 'react-native-rapi-ui';

type Props = {
  transaction: Transaction;
};

const TransactionCard: React.FC<Props> = ({ transaction }) => {
  const { from, to, amount } = transaction;
  const { isDarkmode, setTheme } = useTheme();

  const styles = StyleSheet.create({
    card: {
    backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    label: {
      color: isDarkmode ? themeColor.white200:themeColor.dark200,
      flex: 1,
      fontWeight: 'bold',
    },
    text: {
      color: isDarkmode ? themeColor.white200:themeColor.dark200,
      flex: 2,
      fontSize: 16,
    },
  });

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>From:</Text>
        <Text style={styles.text}>{from}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>To:</Text>
        <Text style={styles.text}>{to}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Amount:</Text>
        <Text style={styles.text}>{amount} CORB</Text>
      </View>
    </View>
  );
};



export default TransactionCard;
