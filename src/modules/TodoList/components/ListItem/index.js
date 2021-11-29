import React, {useEffect, useMemo, useState} from 'react';
import {Text, View, TouchableOpacity, TextInput, Platform} from 'react-native';
import {RNS3} from 'react-native-aws3';
import {useDeleteTodo, useUpdateTodo} from '../../../../hooks';
import {isEqual} from 'lodash';

import {styles} from './styles';
import {ImagePicker} from '../../../../components';
import {getUri} from '../../../../utils';
import {S3AccessKeyId, S3SecretAccessKey} from '../../../../constants';

const options = {
  keyPrefix: 'test/',
  bucket: 's3-yellowstone-web-ol30831-staging',
  region: 'us-west-2',
  accessKey: S3AccessKeyId,
  secretKey: S3SecretAccessKey,
  successActionStatus: 201,
};

export function TodoListItem({todo, onPressShare}) {
  const {mutate: deleteTodo, status} = useDeleteTodo();
  const {mutate: updateTodo, isLoading: isEditing} = useUpdateTodo();
  const [name, setName] = useState(todo.name);
  const [description, setDescription] = useState(todo.description);
  const [img, setImg] = useState(todo.img);

  useEffect(() => {
    const file = {
      name: img?.fileName || 'img.jpg',
      type: img?.type || 'image/jpeg',
      uri: getUri(Platform, img?.uri),
    };
    if (file.uri) {
      RNS3.put(file, options)
        // .progress(e => console.log(e.loaded / e.total))
        .then(response => {
          if (response.status !== 201) {
            throw new Error('Failed to upload image to S3', response.text);
          }
          const {
            body: {
              postResponse: {location},
            },
          } = response;
          setImg(location);
          updateTodo({...todo, img: location});
          /**
           * {
           *   postResponse: {
           *     bucket: "your-bucket",
           *     etag : "9f620878e06d28774406017480a59fd4",
           *     key: "uploads/image.png",
           *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
           *   }
           * }
           */
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [img]);

  const isEdited = useMemo(() => {
    return !isEqual(
      {name, description},
      {name: todo.name, description: todo.description},
    );
  }, [name, description, todo.name, todo.description]);

  const handlePressDelete = () => {
    deleteTodo({id: todo.id});
  };

  const handlePressUpdate = () => {
    updateTodo({id: todo.id, name, description});
  };

  return (
    <View style={styles.box}>
      <View style={styles.leftSection}>
        {isEditing ? (
          <Text>Updating...</Text>
        ) : (
          <ImagePicker img={img} setImg={setImg} />
        )}
        <TouchableOpacity
          style={[styles.btn, styles.deleteBtn]}
          onPress={handlePressDelete}
          disabled={status === 'loading'}>
          <Text style={{color: 'white'}}>
            {status === 'loading' ? 'Deleting' : 'Delete'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.des}>
        <TextInput
          style={[styles.newTodoInput, styles.titleInput]}
          onChangeText={setName}
          value={name}
        />
        <TextInput
          style={[styles.newTodoInput, styles.descriptionInput, {fontSize: 18}]}
          onChangeText={setDescription}
          value={description}
        />
      </View>
      <View style={styles.leftSection}>
        {isEdited && (
          <TouchableOpacity
            style={[styles.btn, {marginBottom: 'auto'}]}
            onPress={handlePressUpdate}
            disabled={isEditing}>
            <Text style={{fontWeight: '700', fontSize: 16}}>
              {isEditing ? 'Updating' : 'Update'}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.btn, styles.ShareBtn]}
          onPress={() => onPressShare(todo)}>
          <Text style={{color: 'white'}}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
