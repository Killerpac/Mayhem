import { StatusBar } from "expo-status-bar";
import React from "react";
import { useColorScheme } from 'react-native';
import { ThemeProvider } from "react-native-rapi-ui";
import Navigation from "./src/navigation";
import { AuthProvider } from "./src/provider/AuthProvider";

export default function App() {
  const [isDarkmode, setIsDarkmode] = React.useState<boolean>(false);
  const images = [
    require("./assets/images/login.png"),
    require("./assets/images/register.png"),
    require("./assets/images/forget.png"),
  ];

  const colorScheme = useColorScheme();

  React.useEffect(() => {
    if (colorScheme === "dark") {
      setIsDarkmode(true);
    }
  }, [colorScheme]);
  
  return (
    <ThemeProvider images={images} theme="dark">
      <AuthProvider>
        <Navigation />
      </AuthProvider>
      <StatusBar />
    </ThemeProvider>
  );
}
