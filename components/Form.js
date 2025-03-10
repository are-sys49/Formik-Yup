import React from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";


const validationSchema = Yup.object().shape({
  name: Yup.string().min(3, "El nombre debe tener al menos 3 caracteres").required("El nombre es obligatorio"),
  email: Yup.string().email("Correo inválido").required("El correo es obligatorio"),
  password: Yup.string().min(6, "Mínimo 6 caracteres").required("La contraseña es obligatoria"),
});

// Función para guardar sesión después del registro
const saveSession = async (token) => {
  try {
    await AsyncStorage.setItem("userToken", token);
  } catch (error) {
    console.log(error);
  }
};

// Formulario de Registro
const Form = ({ onRegisterSuccess }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          // Simulación de registro
          setTimeout(async () => {
            await saveSession("fakeToken123");
            Alert.alert("Éxito", "Registro exitoso");
            onRegisterSuccess();
            resetForm();
          }, 1500);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <Text>Nombre:</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />
            {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

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

            <Button title="Registrar" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e3f2fd",
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

export default Form;
