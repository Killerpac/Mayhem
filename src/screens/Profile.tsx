import React from "react";
import { View } from "react-native";
import { MainStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Layout, Text, useTheme } from "react-native-rapi-ui";
import { supabase } from "../initSupabase";

export default function ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "MainTabs">) {
  const { isDarkmode } = useTheme();
  const user = supabase.auth.user();

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.log("Error logging out");
    }
  };

  const resetPassword = async () => {
    try {
      const email = user?.email;
      if (email) {
        await supabase.auth.api.resetPasswordForEmail(email);
        alert("A password reset link has been sent to your email");
      }
    } catch (error) {
      console.log("Error resetting password");
    }
  };

  return (
    <Layout>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text fontWeight="bold" style={{ fontSize: 24, marginBottom: 20 }}>
          My Profile
        </Text>
        <Text style={{ fontSize: 18, marginBottom: 20 }}>
          Email: {user?.email}
        </Text>
        <Button
          text="Reset Password"
          onPress={resetPassword}
          style={{ marginBottom: 20, backgroundColor: isDarkmode ? "#444" : "#eee" }}
          textStyle={{ color: isDarkmode ? "#fff" : "#000" }}
        />
        <Button
          text="Logout"
          onPress={logout}
          style={{ backgroundColor: isDarkmode ? "#444" : "#eee" }}
          textStyle={{ color: isDarkmode ? "#fff" : "#000" }}
        />
      </View>
    </Layout>
  );
}
