import React from "react";
import { View } from "react-native";
import { MainStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Layout, Section, SectionContent, Text, themeColor, useTheme } from "react-native-rapi-ui";
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
        alert("A password reset link has been sent to your Mayhem ID");
      }
    } catch (error) {
      console.log("Error resetting password");
    }
  };

  return (
    <Layout>
      <Section
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SectionContent>
        <Text fontWeight="bold" style={{ fontSize: 24, marginBottom: 20 }}>
          My Profile
        </Text>
        </SectionContent>
        <SectionContent>
        <Text style={{ fontSize: 18, marginBottom: 20 }}>
          Email: {user?.email}
        </Text>
        </SectionContent>
        <SectionContent>
        <Button
          text="Reset Password"
          onPress={resetPassword}
          style={{ marginBottom: 20 }}
          color={themeColor.primary}
          textStyle={{ color: themeColor.white }}
        />
        <Button
          text="Logout"
          onPress={logout}
          color={themeColor.danger}
          textStyle={{ color: themeColor.white }}
        />
        </SectionContent>
      </Section>
    </Layout>
  );
}
