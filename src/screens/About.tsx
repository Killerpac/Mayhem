import React from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { MainStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Layout, Text } from "react-native-rapi-ui";

const image = require("../../assets/event_logo.png");

export default function AboutScreen({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "MainTabs">) {
  return (
    <Layout>
      <ScrollView >
        <View style={styles.container}>
        <Image source={image} style={styles.image} />
        <Text fontWeight="bold" style={styles.heading}>
          Welcome to Market Mayam
        </Text>
        <Text style={styles.subheading}>Learn More About Us</Text>
        <Text style={styles.paragraph}>
        Market Mayhem is a cutting-edge banking app designed to offer users a hassle-free way to send and receive money, all while staying on top of their finances. With its easy-to-use interface, sending and receiving money has never been easier. Whether you're paying your bills or splitting the tab with friends, Market Mayhem makes it simple to manage your transactions. Plus, the app comes equipped with robust authentication measures to ensure that your data stays secure at all times. Market Mayhem is the perfect solution for anyone looking for a quick and efficient way to stay on top of their finances.
        </Text>
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  heading: {
    fontSize: 28,
    marginBottom: 10,
    textAlign: "center",
  },
  subheading: {
    fontSize: 18,
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
  },
});
