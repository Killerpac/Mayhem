import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import 'react-native-url-polyfill/auto';

// Better put your these secret keys in .env file
export const supabase = createClient("https://yhtdwurmwbkmzbjvicbe.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlodGR3dXJtd2JrbXpianZpY2JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIxNzM1NjksImV4cCI6MTk5Nzc0OTU2OX0.9RtDiGTBHoeL-3S2rVUYdry0htSU632T7eMQ4_1ydTk", {
  localStorage: AsyncStorage as any,
  detectSessionInUrl: false // Prevents Supabase from evaluating window.location.href, breaking mobile
});
