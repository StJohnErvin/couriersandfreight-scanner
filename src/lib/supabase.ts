import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import 'react-native-url-polyfill/auto'

export default createClient(
  'https://bvtruuesbbohdkxmacsq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxOTU2NDY2NSwiZXhwIjoxOTM1MTQwNjY1fQ.IJVwKmjFk5FMrCrCiyj2h_cXaffRwAtoAxplGQ9hQQE',
  {
    localStorage: AsyncStorage,
    detectSessionInUrl: false
  }
)