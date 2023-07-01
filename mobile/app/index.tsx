import { Link, SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";

export default function App() {
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    // Perform some sort of async data or asset fetching.
    setTimeout(() => {
      setReady(true);
    }, 1000);
  }, []);

  return (
    <>
      {!isReady && <SplashScreen  />}
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Link href="/Home" asChild>
            <TouchableOpacity style={{backgroundColor: "blue", paddingHorizontal: 20, paddingVertical: 8, borderRadius: 8 }}>
                <Text>Novas</Text>
            </TouchableOpacity>
        </Link>
      </View>
    </>
  );
}