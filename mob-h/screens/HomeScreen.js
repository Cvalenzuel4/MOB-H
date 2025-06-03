import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { ThemeContext } from '../ThemeContext';

export default function HomeScreen({ navigation }) {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const backgroundColor = isDark ? '#000' : '#fff';
  const textColor = isDark ? '#fff' : '#000';

  return (
    <View style={[styles.container, { backgroundColor }]}>      
      <Text style={[styles.title, { color: textColor }]}>Modo {isDark ? 'Oscuro' : 'Claro'}</Text>
      <Button title="Cambiar Tema" onPress={toggleTheme} />

      <View style={styles.spacer} />
      <Button title="Ir a Filtrado" onPress={() => navigation.navigate('Filtrado y busqueda')} />

      <View style={styles.spacer} />
      <Button title="Ir a Tareas" onPress={() => navigation.navigate('Tareas')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  spacer: { height: 15 },
});
