import React, { useState, useEffect } from "react";
import { SafeAreaView, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "./components/Login";
import Form from "./components/Form";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (token) setIsLoggedIn(true);
    };
    checkSession();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    setIsLoggedIn(false);
    Alert.alert("Sesión cerrada", "Has cerrado sesión correctamente.");
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      {isLoggedIn ? (
        <>
          <Form />
          <Button title="Cerrar Sesión" onPress={handleLogout} />
        </>
      ) : (
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </SafeAreaView>
  );
};

export default App;
