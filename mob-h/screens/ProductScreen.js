import React, { useState, useContext } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Button, Alert, Dimensions, ScrollView, Share } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { ThemeContext } from '../ThemeContext';

const DATA = [
  { id: '1', name: 'Manzana', category: 'Fruta' },
  { id: '2', name: 'Lechuga', category: 'Verdura' },
  { id: '3', name: 'Pan', category: 'Otro' },
  { id: '4', name: 'Pera', category: 'Fruta' },
  { id: '5', name: 'Zanahoria', category: 'Verdura' },
];

const CATEGORIES = ['Todas', 'Fruta', 'Verdura', 'Otro'];

export default function ProductScreen() {
  const { isDark } = useContext(ThemeContext);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');

  const backgroundColor = isDark ? '#000' : '#fff';
  const textColor = isDark ? '#fff' : '#000';
  const inputBg = isDark ? '#222' : '#eee';
  const screenWidth = Dimensions.get('window').width;

  const filteredData = DATA.filter(
    (item) =>
      (category === 'Todas' || item.category === category) &&
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  const chartData = {
    labels: ['Fruta', 'Verdura', 'Otro'],
    datasets: [
      {
        data: [
          DATA.filter((i) => i.category === 'Fruta').length,
          DATA.filter((i) => i.category === 'Verdura').length,
          DATA.filter((i) => i.category === 'Otro').length,
        ],
      },
    ],
  };

const chartConfig = {
    backgroundGradientFrom: backgroundColor,
    backgroundGradientTo: backgroundColor,
    color: (opacity = 1) => isDark ? `rgba(255,255,255,${opacity})` : `rgba(0,0,0,${opacity})`,
    labelColor: (opacity = 1) => isDark ? `rgba(255,255,255,${opacity})` : `rgba(0,0,0,${opacity})`,
};

  return (
    <ScrollView style={{ flex: 1, backgroundColor }}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: textColor }]}>Productos</Text>

        <TextInput
          placeholder="Buscar..."
          placeholderTextColor={isDark ? '#aaa' : '#666'}
          style={[styles.input, { backgroundColor: inputBg, color: textColor }]}
          value={search}
          onChangeText={setSearch}
        />

        <View style={styles.row}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.catButton, {
                backgroundColor: category === cat ? '#007AFF' : '#ccc'
              }]}
              onPress={() => setCategory(cat)}
            >
              <Text style={{ color: '#fff' }}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Text style={{ color: textColor, marginVertical: 4 }}>
              {item.name} ({item.category})
            </Text>
          )}
        />

        <Text style={[styles.title, { color: textColor }]}>Gráfico total productos por categoría</Text>
        <BarChart
          data={chartData}
          width={screenWidth - 40}
          height={250}
          chartConfig={chartConfig}
          style={{ borderRadius: 10, marginVertical: 20 }}
          fromZero={true} 
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, marginBottom: 10 },
  input: { padding: 10, borderRadius: 10, fontSize: 16, marginBottom: 10 },
  row: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
  catButton: { padding: 8, borderRadius: 8, marginRight: 8, marginBottom: 8 },
});
