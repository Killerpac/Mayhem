import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import {
  Layout,
  TopNav,
  Text,
  TextInput,
  Button,
  useTheme,
  themeColor,
  Section,
  SectionContent,
} from "react-native-rapi-ui";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { Ionicons } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";
import { supabase } from "../initSupabase";

function validateAmount(amount: string) {
  const re = /^\d+(\.\d{1,2})?$/;
  return re.test(amount);
}

async function getemailfromsupabase() {
  const user = supabase.auth.user();
  if(user){
    const email = user.email;
    return email;
  }
  return "";
}

export default function ReceiveScreen({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "Receive">) {
  const [amount, setAmount] = useState("");
  const { isDarkmode } = useTheme();
  const [email, setemail] = useState("");
  const [loading, setLoading] = useState(true);
  React.useEffect(() => {

    async function getemail() {

      const emails = await getemailfromsupabase();
      setemail(emails as string);
      setLoading(false);
    }
    getemail();
  }, [navigation]);
      

  return (
    <Layout>
      <TopNav
          backgroundColor={isDarkmode ? themeColor.dark : themeColor.white}
          borderColor={isDarkmode ? themeColor.dark : themeColor.white}
        leftContent={
          <Ionicons
            name="arrow-back"
            size={20}
            color={isDarkmode ? "#fff" : "#000"}
          />
        }
        leftAction={() => navigation.goBack()}
      />

      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text fontWeight="bold" style={styles.heading}>
            Receive Money
          </Text>
        </View>
        <Section >
          <SectionContent>
          <TextInput
            placeholder="Enter Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            style={styles.input}
          />
          </SectionContent>
        </Section>

    <View style={styles.qrCodeContainer}>
          <View style={styles.qrCodeBox}>
            {validateAmount(amount)? (
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
        {loading && <ActivityIndicator size='large' color={themeColor.primary} style={{
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        opacity: 0.8,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }} />}
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
    marginBottom: 30,
    alignContent: "center",
    alignItems: "center",
  },
  input: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  qrCodeContainer: {
    marginTop: 20,
    alignSelf:'center',
    verticalAlign:'center',
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
