import React, { useState } from "react";
import { View, StyleSheet,ActivityIndicator } from "react-native";
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
import { MainStackParamList, Transaction } from "../types/navigation";
import { Ionicons } from "@expo/vector-icons";
import { checkUser, transferBalance } from "../api";
import { supabase } from "../initSupabase";
import QuotesCard from "../components/quotes";

async function sendMoney(email: string, amount:number): Promise<{success: boolean, error?: string}|undefined>{
    if(amount <= 0 || isNaN(amount)){
        alert("Invalid amount");
        return {success: false, error: "Invalid amount"}
    }
         //valid email with regex
    const re = /\S+@\S+\.\S+/;
         if(!re.test(email)){
             
             return {success: false, error: "Invalid email"}
         }
         if(await checkUser(email) == false){
          return {success: false, error: "User does not exist"}
      }
    const myemail = supabase.auth.user()?.email;
    console.table(myemail, email, amount);
   if(myemail != null){
       const transfer:Transaction = {
           from: myemail,
           to: email,
           amount: amount,
       }
   
      const transadction =  await transferBalance(myemail, email, amount,transfer);
      return transadction;
   }
}


export default function SendScreen({
  route,
  navigation,
}: NativeStackScreenProps<MainStackParamList, "Send">) {
  const [amount, setAmount] = useState("");
  const [email, setemail] = useState("");
  const [loading, setLoading] = useState(true);
      //get userid and amount from props
  const { isDarkmode } = useTheme();
  React.useEffect(() => {
    const amt = route.params.amt || "";
    const propmails = route.params.email || "";
    if(propmails != ""){
        setemail(propmails);
    }
    if(amt != ""){
        //test if amt is a number
        if(isNaN(amt)){
            alert("Invalid amount");
            navigation.goBack();
            return;
        }
        setAmount(amt.toString());
    }
    setLoading(false);
  }, [route.params]);
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
            Send Funds
          </Text>
        </View>

        <Section>
          <SectionContent style={styles.inputContainer}>
        <TextInput
            placeholder="Enter Receiver Mayhem ID"
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
          </SectionContent>
        </Section>
        <View style={styles.buttonContainer}>
          <Button
            text="Scan QR Code"
            onPress={() => {
              // Navigate to QR code scanner screen
              navigation.navigate("SecondScreen");
            }}
            color={themeColor.danger}
            style={styles.button}
          />
          <Button text="Send" style={styles.button} onPress={async () => {
            setLoading(true);
            //check if amount is a number
            if(isNaN(Number(amount))){
                setLoading(false);
                alert("Invalid amount");
                return;
            }
              const t = await sendMoney(email,parseFloat(amount));
              if(t != undefined && t.success == true){
                setLoading(false);
                alert("Transaction successful");
              }else{
                setLoading(false);
                alert(`Transaction failed: ${t?.error}`);
              }
          }}/>
        </View>
        <QuotesCard/>
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
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 28,
    fontFamily: "RobotoSlab_700Bold",
  },
  inputContainer: {
    justifyContent: "space-between",
    height: 150,
  },
  input: {
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});
