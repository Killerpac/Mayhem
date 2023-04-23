import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Layout,
  TopNav,
  Text,
  TextInput,
  Button,
  useTheme,
} from "react-native-rapi-ui";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { Ionicons } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";

function validateEmail(email: string) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validateAmount(amount: string) {
  const re = /^\d+(\.\d{1,2})?$/;
  return re.test(amount);
}

export default function ReceiveScreen({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "Receive">) {
  const [email, setemail] = useState("");
  const [amount, setAmount] = useState("");
  const { isDarkmode } = useTheme();
      

  return (
    <Layout>
      <TopNav
        leftContent={
          <Ionicons
            name="arrow-back"
            size={20}
            color={isDarkmode ? "#fff" : "#000"}
          />
        }
        leftAction={() => navigation.goBack()}
        middleContent="Request Money"
      />

      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text fontWeight="bold" style={styles.heading}>
            Receive Money
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter Email Address"
            value={email}
            onChangeText={setemail}
            keyboardType='email-address'
            style={styles.input}
          />
          <TextInput
            placeholder="Enter Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            style={styles.input}
          />
        </View>

        <View style={styles.qrCodeContainer}>
          <View style={styles.qrCodeBox}>
            {validateEmail(email) && validateAmount(amount) ? (
              <QRCode
                onError={(e:Error) => console.log(e)}
                value={JSON.stringify({ email, amount })}
                size={180}
                color="#000"
                backgroundColor="#fff"
              />
            ) : null}
          </View>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headingContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  heading: {
    fontSize: 28,
  },
  inputContainer: {
    marginBottom: 50,
  },
  input: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  qrCodeContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  qrCodeBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
