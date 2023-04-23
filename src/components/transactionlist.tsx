import React from 'react';
import { FlatList } from 'react-native';
import {  Layout, Text, useTheme } from 'react-native-rapi-ui';
import TransactionCard from './transaction';
import { Transaction } from '../types/navigation';
import Svg, { Path } from 'react-native-svg';

type Props = {
    transactions: Transaction[];
  };
  
  const TransactionsList: React.FC<Props> = ({ transactions }) => {
    const { isDarkmode, setTheme } = useTheme();
    if (transactions.length === 0) {
        return (
          <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center',borderRadius:10 ,padding:20}}>
            <Svg width={64} height={64} viewBox="0 0 24 24" color={isDarkmode ? '#fff' : '#333'}>
              <Path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                fill="#333"
              />
            </Svg>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 16 }}>
              No transactions yet
            </Text>
          </Layout>
        );
      }
    const renderItem = ({ item }: { item: Transaction }) => (
      <TransactionCard transaction={item} />
    );
  
    // Generate an id for each transaction if one doesn't exist
    const transactionsWithIds = transactions.map((t) => ({
      ...t,
      id: t.id || Math.random().toString(36).substring(7),
    }));
  
    return (
      <FlatList
        data={transactionsWithIds}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    );
  };
  
  export default TransactionsList;
