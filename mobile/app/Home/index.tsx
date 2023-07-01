import { Text, View, Image, StyleSheet } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context"

import MapView, { Callout, Marker } from "react-native-maps"

import { Link, useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons"
import { api } from "../../src/lib/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [pontosDeColeta, setPontosDeColeta] = useState<Array<any> | null>(null)
  const { bottom, top } = useSafeAreaInsets()

  const router = useRouter()

  async function handlePontosColetas() {
    const { data } = await api.get("/point")
    setPontosDeColeta(data)
  }
  
  useEffect(() => {
    handlePontosColetas()
  }, [])
  

  return (
    <View style={{flex: 1, backgroundColor: "linear-gradient(180deg, #F0F0F5 0%, #FFF 100%)",}}>
      <View style={{paddingHorizontal: 24, paddingTop: top, paddingBottom: bottom,}}>
        <Link href="" style={{marginTop: 20, marginBottom: 20}} asChild>
          <Feather 
            name="arrow-left"
            size={24}
            color={"green"}
          />
        </Link>

        <Text style={{fontSize: 20, fontWeight: "700", color: "#322153", marginBottom: 8}}>😊 Bem vindo.</Text>
        <Text style={{fontSize: 16, fontWeight: "500", color: "#6C6C80", marginBottom: 20}}>Encontre no mapa um ponto de coleta.</Text>

        <View style={{height: "70%", borderRadius: 8, overflow: "hidden"}}>
          <MapView
            style={{height: "100%", width: "100%", borderRadius: 8}}
            initialRegion={{
              latitude: -22.648163,
              longitude: -43.259160,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }}
          >
            {pontosDeColeta && pontosDeColeta.map(ponto => (
              <Marker
              key={ponto.id}
              coordinate={{
                latitude: parseFloat(ponto.latitude),
                longitude: parseFloat(ponto.longitude),
              }}
            >
              <Callout>
                <Text>{ponto.name}</Text>
              </Callout>
            </Marker>
            ))}
          </MapView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
    elevation: 3,
  },
  calloutText: {
    color: '#0089A5',
    fontSize: 14,
  },
  footerCreateManicure: {
    width: 56,
    height: 56,
    backgroundColor: '#15C3D6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center'
  }
});