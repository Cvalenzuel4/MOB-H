import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Alert,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import { ThemeContext } from '../ThemeContext';

const STORAGE_KEY = '@tareas_guardadas';

export default function TaskScreen() {
  const { isDark } = useContext(ThemeContext);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [sound, setSound] = useState(null);

  const backgroundColor = isDark ? '#000' : '#fff';
  const textColor = isDark ? '#fff' : '#000';
  const inputBg = isDark ? '#222' : '#eee';

  useEffect(() => {
    const loadTasks = async () => {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) setTasks(JSON.parse(data));
    };
    loadTasks();
  }, []);

  const saveTasks = async (updated) => {
    setTasks(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const deleteTask = (id) => {
    const updated = tasks.filter((t) => t.id !== id);
    saveTasks(updated);
  };

  const addTask = () => {
    if (!newTask.trim()) {
      Alert.alert('Error', 'Ingresa una tarea válida');
      return;
    }
    const nueva = { id: Date.now().toString(), name: newTask.trim() };
    const updated = [...tasks, nueva];
    saveTasks(updated);
    setNewTask('');
  };

  const renderRightActions = (progress, dragX, id) => {
    const scale = dragX.interpolate({ inputRange: [-100, 0], outputRange: [1, 0] });
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteTask(id)}
      >
        <Animated.Text style={[styles.deleteText, { transform: [{ scale }] }]}>Eliminar</Animated.Text>
      </TouchableOpacity>
    );
  };

  const playSound = async () => {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require('../assets/sonido.mp3')
      );
      setSound(newSound);
      await newSound.playAsync();
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>Tareas</Text>

      <View style={styles.inputRow}>
        <TextInput
          placeholder="Nueva tarea"
          placeholderTextColor={isDark ? '#aaa' : '#666'}
          style={[styles.input, { backgroundColor: inputBg, color: textColor }]}
          value={newTask}
          onChangeText={setNewTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => {addTask(); playSound();}}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Swipeable
            onSwipeableRightOpen={() => deleteTask(item.id)}
            renderRightActions={(progress, dragX) =>
              renderRightActions(progress, dragX, item.id)
            }
            rightThreshold={100}
          >
            <View style={[styles.item, { backgroundColor: isDark ? '#333' : '#eee' }]}>
              <Text style={{ color: textColor }}>{item.name}</Text>
            </View>
          </Swipeable>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 10 },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, padding: 10, borderRadius: 10, fontSize: 16 },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 10,
    marginLeft: 10,
  },
  addText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  item: { padding: 20, borderRadius: 10 },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 5,
  },
  deleteText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
