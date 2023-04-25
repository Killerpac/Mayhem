import React from "react";
import { View, StyleSheet, Image, ScrollView, Linking } from "react-native";
import { MainStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Layout, Section, SectionContent, Text } from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

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
          Welcome to Market Mahyem
        </Text>
        <Text style={styles.subheading}>Learn More About Us</Text>
        <Text style={styles.paragraph}>
        Market Mayhem is a cutting-edge mock banking app designed to offer users a hassle-free way to send and receive money, all while staying on top of their finances.
        </Text>
        <Text fontWeight="bold" style={styles.heading}>
        Need Help? Contact Us
        </Text>
        <View style={styles.sectionview}>
        <Section style={styles.section}>
          <SectionContent style={styles.sectioncontent}>
        <Text>
        Srabanti Acharya
        </Text>
        <Text>
        (Event Head)
        </Text>
        <Text>
          Phone: +91 98747 52318
          </Text>
          </SectionContent>
          </Section>
          <Section style={styles.section2}>
          <SectionContent  style={styles.sectioncontent}>
          <Text>
          Arya Biswas 
          </Text>
          <Text>
          (Event Head)
          </Text>
          <Text>
          Phone: +91 8240421283
          </Text>
        </SectionContent>
        </Section>
        </View>
        <Text style={styles.heading}>

          Follow Us
          </Text>
          <View style={styles.sectionview}>
          <Button status="warning" text="Instagram" onPress={() => {
            Linking.openURL('https://www.instagram.com/scc_posdcorb');
          }} 
          leftContent={
            <Ionicons name="logo-instagram" size={24} color="white" />
          }
          />
          <Button text="Facebook" style={{marginLeft:10 }} onPress={() => {
            Linking.openURL('https://facebook.com/sccposdcorb');
          }} 
          leftContent={
            <Ionicons name="logo-facebook" size={24} color="white" />
          }
          
          />
          </View>
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
  sectionview:{
    flexDirection: "row",
  },  
  section:{
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: 200,
    height: 115,
  },
  section2:{
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: 200,
    height: 115,
    marginLeft: 10,
  },
  sectioncontent:{
   padding: 10,
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
    marginTop: 10,
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
