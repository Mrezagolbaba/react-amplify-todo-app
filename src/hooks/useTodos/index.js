import {useMutation, useQuery} from 'react-query';
import {queryClient} from '../../context';

import * as api from '../../api/todos';

export const useGetTodos = () => useQuery(['todos'], api.fetchTodos);

export const useGetTodo = ({id}) => {
  return useQuery(['todo', id], () => api.getTodo(id), {
    enabled: !!id,
  });
};

export const useCreateTodo = () => {
  return useMutation(api.createTodo, {
    onSuccess: data => {
      const {
        createTodo: {id},
      } = data;
      queryClient.invalidateQueries('todos');
      queryClient.invalidateQueries(['todo', id]);
    },
  });
};

export const useDeleteTodo = () => {
  return useMutation(api.deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
  });
};

export const useUpdateTodo = () => {
  return useMutation(api.updateTodo, {
    onSuccess: (_, {id}) => {
      queryClient.fetchQuery('todos');
      queryClient.fetchQuery(['todo', id]);
    },
  });
};
