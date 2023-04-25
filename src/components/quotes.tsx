import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { themeColor, useTheme } from 'react-native-rapi-ui';

interface Quote {
  text: string;
  author: string;
}

const QuotesCard: React.FC = () => {
  const [quote, setQuote] = useState<Quote>({ text: '', author: '' });
  const { isDarkmode } = useTheme();

  useEffect(() => {
    fetch('https://type.fit/api/quotes')
      .then(response => response.json())
      .then((data: Quote[]) => {
        const randomIndex = Math.floor(Math.random() * data.length);
        setQuote(data[randomIndex]);
      });
  }, []);

  const styles = StyleSheet.create({
    card: {
      backgroundColor: isDarkmode ? themeColor.dark200 : themeColor.white200,
      borderRadius: 8,
      padding: 16,
      marginTop: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
  
      elevation: 5,
    },
    text: {
      color: isDarkmode ? themeColor.white : themeColor.black,
      fontSize: 20,
      fontStyle: 'italic',
      marginBottom: 8,
    },
    author: {
        color: isDarkmode ? themeColor.white : themeColor.black,
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'right',
    },
  });

  return (
    <View style={styles.card}>
      <Text style={styles.text}>
        {quote.text ? `" ${quote.text}` : ''}
      </Text>
      <Text style={styles.author}>- {quote.author}</Text>
    </View>
  );
};

export default QuotesCard;
