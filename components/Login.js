import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import * as Yup from "yup";

// Esquema de validación con Yup
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Correo inválido").required("El correo es obligatorio"),
  password: Yup.string().min(6, "Mínimo 6 caracteres").required("La contraseña es obligatoria"),
});

// Función para guardar sesión
const saveSession = async (token) => {
  try {
    await AsyncStorage.setItem("userToken", token);
  } catch (error) {
    console.log(error);
  }
};

// Formulario de Login
const Login = ({ onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setLoading(true);
          // Simulación de autenticación
          setTimeout(async () => {
            await saveSession("fakeToken123");
            Alert.alert("Éxito", "Inicio de sesión exitoso");
            onLoginSuccess();
            setLoading(false);
          }, 1500);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <Text>Correo:</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType="email-address"
            />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <Text>Contraseña:</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
            />
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <Button title={loading ? "Cargando..." : "Ingresar"} onPress={handleSubmit} disabled={loading} />
          </>
        )}
      </Formik>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
    padding: 20,
    borderRadius: 10,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#888",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});

export default Login;
