import {API, graphqlOperation} from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';

export const fetchTodos = async () => {
  try {
    const todos = await API.graphql({query: queries.listTodos}).then(
      ({data}) => {
        if (data.listTodos.items.length) {
          return data?.listTodos?.items.filter(item => item._deleted !== true);
        }
      },
    );
    return todos;
  } catch (e) {
    console.log('Error occurred while listing todos: ', e);
    return {error: e, type: 'error'};
  }
};

export const getTodo = async ({id}) => {
  try {
    const {data} = await API.graphql(
      graphqlOperation(queries.getTodo, {id}).then(res => {
        if (res.data.getTodo._deleted !== true) {
          return res.data?.getTodo;
        }
        return undefined;
      }),
    );
    return data;
  } catch (e) {
    console.log('Error occurred while getting todo: ', e);
    return {error: e, type: 'error'};
  }
};

export const createTodo = async ({name, description, img}) => {
  try {
    const {data} = await API.graphql({
      query: mutations.createTodo,
      variables: {
        input: {
          name,
          description,
        },
      },
    });
    return data;
  } catch (e) {
    console.log('Error occurred while creating todo: ', e);
    return {error: e, type: 'error'};
  }
};

export const updateTodo = async ({id, name, description, img}) => {
  try {
    const {_version} = await API.graphql(
      graphqlOperation(queries.getTodo, {id}),
    ).then(({data}) => data?.getTodo);

    const {data} = await API.graphql({
      query: mutations.updateTodo,
      variables: {
        input: {
          id,
          name,
          description,
          img,
          _version,
        },
      },
    });
    return data;
  } catch (e) {
    console.log('Error occurred while updating todo: ', e);
    return {error: e, type: 'error'};
  }
};

export const deleteTodo = async ({id}) => {
  try {
    const {_version} = await API.graphql(
      graphqlOperation(queries.getTodo, {id}),
    ).then(({data}) => data?.getTodo);

    const {data} = await API.graphql({
      query: mutations.deleteTodo,
      variables: {
        input: {
          id,
          _version,
        },
      },
    });
    return data;
  } catch (e) {
    console.log('Error occurred while deleting todo: ', e);
    return {error: e, type: 'error'};
  }
};
