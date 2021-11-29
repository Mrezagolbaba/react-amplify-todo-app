import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {useCreateTodo} from '../../../hooks';

import {styles} from './styles';

export const AddNewTodo = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const {mutate: createTodo} = useCreateTodo();

  const handleAddTodo = () => {
    createTodo({name, description});
  };
  return (
    <View style={[styles.box, {marginBottom: 24}]}>
      <View style={[styles.des, {flexGrow: 1}]}>
        <TextInput
          style={[styles.newTodoInput, styles.titleInput]}
          onChangeText={setName}
          value={name}
          placeholder="Title"
        />
        <TextInput
          style={[styles.newTodoInput, styles.descriptionInput]}
          onChangeText={setDescription}
          value={description}
          placeholder="Description"
        />
      </View>
      <View>
        <TouchableOpacity style={styles.ShareBtn} onPress={handleAddTodo}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
