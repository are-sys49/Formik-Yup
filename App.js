import React from "react";
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .required("El nombre es obligatorio"),
  email: Yup.string()
    .email("Ingresa un correo válido")
    .required("El correo es obligatorio"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es obligatoria"),
});

const MyForm = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.mainTitle}>Formulario con Formik y Yup</Text>
      
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          Alert.alert("Éxito", "Formulario enviado correctamente");
          resetForm();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.container}>
            <Text style={styles.title}>Formulario de Registro</Text>
            
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

            <Button title="Enviar" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 100,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    padding: 80,
    alignSelf: "center",
  },
  container: {
    backgroundColor: "#fd8c9f",
    padding: 40,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#8b363b",
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: "#ffcce0",
  },
  error: {
    color: "#590000",
    fontSize: 12,
    marginBottom: 10,
  },
});

export default MyForm;
