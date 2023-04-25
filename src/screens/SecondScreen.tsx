import React, { useState, useEffect } from "react";
import { View, Linking ,ActivityIndicator} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Ionicons } from "@expo/vector-icons";
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
import { MainStackParamList, Transaction } from "../types/navigation";
import { supabase } from "../initSupabase";

function isJsonString(str:string) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

type Props = NativeStackScreenProps<MainStackParamList, "MainTabs">;

export default function MainScreen({ navigation }: Props) {
  const { isDarkmode, setTheme } = useTheme();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [qrData, setQrData] = useState<string>("");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    setQrData(data);
    //parse qr data as a json object
    //validate the qr data is a json object
    if(!isJsonString(data)){
      alert("Invalid QR Code");
      return;
    }
    const qrDataObj = JSON.parse(data);
    //check if the qr data is a valid transaction
    if(!qrDataObj.hasOwnProperty("amount") || !qrDataObj.hasOwnProperty("email")){
      alert("Invalid QR Code");
      return;
    }

    navigation.navigate("Send", {
      amt: qrDataObj.amount,
      email: qrDataObj.email,
    });

  };

  const renderContent = () => {
    if (scanned) {
      return (
        <Layout style={{ alignItems: "center" }}>
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
        middleContent="Scan QR Code"
      />
          <Button
            text="Scan Again"
            status="primary"
            onPress={() => setScanned(false)}
            style={{ marginTop: 20 }}
          />
        </Layout>
      );
    } else {
      return (
    <Layout style={{ alignItems: "center" , backgroundColor: themeColor.black100,}}>
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
        middleContent="Scan QR Code"
      />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <View
            style={{
              width: 300,
              height: 300,
              overflow: "hidden",
              borderRadius: 10,
              backgroundColor: themeColor.black100,
              borderWidth: 2,
              borderColor: themeColor.black200,
              marginBottom: 20,
            }}
          >
            <BarCodeScanner
              onBarCodeScanned={handleBarCodeScanned}
              style={{
                height: "100%",
                width: "100%",
              }}
            />
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderColor: "red",
                borderWidth: 5,
              }}
            />
          </View>
          <Button text="Cancel" onPress={() => navigation.goBack()} />
          </View>
        </Layout>
      );
    }
  };
  

  if (hasPermission === null) {
    return (<Layout>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Requesting for camera permission</Text>
        </View>
    </Layout>)
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Layout>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" ,backgroundColor:themeColor.black}}>
        {renderContent()}
      </View>
    </Layout>
  );
}
