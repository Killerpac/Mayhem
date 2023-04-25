import React, { useState } from "react";
import { View, Linking, TouchableOpacity,ScrollView } from "react-native";
import { MainStackParamList, Transaction } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { supabase } from "../initSupabase";
import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { initdb,getBalance, getTransactions } from "../api";
import TransactionsList from "../components/transactionlist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const transactions: Transaction[] = [
];


async function getbalance(): Promise<number|undefined> {
  const myemail = supabase.auth.user()?.email;
  if (myemail != null) {
    const balance = await getBalance(myemail);
    return balance;
  }
}

async function gettrans(): Promise<Transaction[]> {
  const myemail = supabase.auth.user()?.email;
  if (myemail != null) {
    const transactions = await getTransactions(myemail);
    return transactions.reverse()
  }
  return [];
}

export default function ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "MainTabs">) {
  const { isDarkmode, setTheme } = useTheme();
  const [balance, setBalance] = useState(0);
  const [trans, setTrans] = useState(transactions);
  const [isbuyer,setisbuyer] = useState(false);

const email = supabase.auth.user()?.email;


  AsyncStorage.getItem("isBuyer").then((value) => {
    console.log(value);
    if (value == "false") {
      setisbuyer(true);
    } else {
      setisbuyer(false);
    }
  });
  // Dummy function for refreshing balance
  const refreshBalance = async () => {
    console.log("Refreshing balance...");
    const bal  = await getbalance()
    setBalance(bal as number); // Generate a random balance between 1 and 10000
  };

  const refreshTransactions = async () => {
    console.log("Refreshing transactions...");
    setTrans(await gettrans());
  };

  const refreshAll = async () => {
    await refreshBalance();
    await refreshTransactions();
  };



  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refreshBalance();
      refreshTransactions();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Layout>
      <TopNav
      backgroundColor={isDarkmode ? themeColor.dark : themeColor.white}
      borderColor={isDarkmode ? themeColor.dark : themeColor.white}
        middleContent="Home"
        rightContent={
          <Ionicons
            name={isDarkmode ? "sunny" : "moon"}
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        rightAction={() => {
          if (isDarkmode) {
            setTheme("light");
          } else {
            setTheme("dark");
          }
        }}
      />
      <ScrollView style={{ flex: 1 }}>
        <Section style={{ flex: 1, marginLeft: 10, marginTop: 20 ,marginRight:10}}>
          <SectionContent style={{ paddingHorizontal: 15 }}>
            <Text fontWeight="bold" style={{ fontSize: 20, marginBottom: 10 }}>
              {isbuyer ? "Welcome Trader!" : "Welcome Patron!"}
            </Text>
            <SectionContent 
              style={{
                borderRadius: 10,
                backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
                padding: 20,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ color: isDarkmode ? themeColor.white200:themeColor.dark200 }}>Available Balance</Text>
                <Text style={{ fontSize: 28, fontWeight: "bold" }}>
                  {balance.toFixed(2)} CORB
                </Text>
              </View>
              <TouchableOpacity
                onPress={refreshAll}
                style={{
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  overflow: "hidden",
                  marginLeft: 10,
                }}
              >
                <Ionicons
                  name="refresh"
                  size={20}
                  color={isDarkmode ? "#fff" : "#000"}
                />
              </TouchableOpacity>
            </SectionContent>
          </SectionContent>
        </Section>
        <Section style={{ flex: 1, marginLeft: 10, marginTop:20,flexGrow:1 ,marginRight:10}}>
          <SectionContent>
            <Text fontWeight="bold" style={{ fontSize: 18 }}>
              Mayhem ID
            </Text>
            <Text style={{ fontSize: 18, marginTop:5,marginBottom:5 }} >
                {email}
              </Text>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Button
                text="Logout"
                status="warning"
                outline
                onPress={() => {
                    supabase.auth.signOut();
                }}
                style={{ marginRight: 10, flex: 1 }}
              />
            </View>
          </SectionContent>
        </Section>
        <Section style={{ flex: 1, marginLeft: 10, marginTop:20,flexGrow:1 ,marginRight:10}}>
          <SectionContent>
            <Text fontWeight="bold" style={{ fontSize: 18 }}>
              Send Money
            </Text>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Button
                text="Send"
                status="info"
                  onPress={() => navigation.navigate("Send",{
                    amt: null,
                    email: null,
                  })}
                  color={themeColor.danger}
                style={{ marginRight: 10, flex: 1 }}
              />
              <Button
                text="Request"
                status="info"
                color={themeColor.primary}
                onPress={() => navigation.navigate("Receive")}
                style={{ marginRight: 10, flex: 1 }}
              />
            </View>
          </SectionContent>
        </Section>
        <Section style={{ flex: 1, marginLeft: 10, marginTop:20,flexGrow:1 ,marginRight:10}}>
          <SectionContent>
            <Text fontWeight="bold" style={{ fontSize: 18 }}>
              Transactions
            </Text>
            </SectionContent>
            <SectionContent>
              <TransactionsList transactions={trans} />
            </SectionContent>
        </Section>
      </ScrollView>
    </Layout>
  );
}