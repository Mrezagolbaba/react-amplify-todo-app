import React, {useState} from 'react';
import {ScrollView, Text} from 'react-native';

import {styles} from './components/styles';

import {useGetTodos} from '../../hooks';
import {TodoListItem} from './components/ListItem';
import {ShareModal} from './components/ShareModal';
import {AddNewTodo} from './components/AddNewTodo';

export const TodoList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const {data: todos, isLoading} = useGetTodos();

  const handlePressShareBtn = todo => {
    setModalVisible(true);
    setSelectedTodo(todo);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedTodo(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <AddNewTodo />
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        todos?.map(todo => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            setModalVisible={setModalVisible}
            onPressShare={handlePressShareBtn}
          />
        ))
      )}

      <ShareModal
        item={selectedTodo}
        isVisible={modalVisible}
        close={handleCloseModal}
      />
    </ScrollView>
  );
};
