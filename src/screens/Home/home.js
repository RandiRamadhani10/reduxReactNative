import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icons from 'react-native-vector-icons/Ionicons';
import getBooks from '../../data/redux/screens/Home/action';
import YoutubePlayer from 'react-native-youtube-iframe';
const screen = Dimensions.get('screen');
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Home = ({navigation}) => {
  const logins = useSelector(state => state.login);
  const books = useSelector(state => state.book);

  const [newBook, setNewBook] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBooks(logins.token));
  }, [dispatch]);
  let count = 0;
  useEffect(() => {
    const sorted = [...books.data].sort(function (a, b) {
      var keyA = parseInt(a.average_rating),
        keyB = parseInt(b.average_rating);
      // Compare the 2 dates
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
    setNewBook(sorted);
  }, [books.data]);

  return (
    <>
      {books.isMsg && Alert.alert()}
      {books.isMsg &&
        Alert.alert('error', 'books.msg', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ])}
      {books.isLoading ? <Loading /> : <></>}
      <View style={styles.header}>
        <Text style={styles.text}>Hai Randi</Text>
      </View>
      <ScrollView
        style={styles.scroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{width: '100%', padding: 5}}>
          <YoutubePlayer
            height={300}
            // play={playing}
            videoId={'m1mpecQfLrw'}
            // onChangeState={onStateChange}
          />
        </View>
        <Text style={{marginHorizontal: 20, fontSize: 20}}>Recommended</Text>
        <ScrollView horizontal={true}>
          {newBook.map(book => {
            if (count < 6) {
              count += 1;
              return (
                <TouchableOpacity
                  style={[styles.scrollItems, {margin: 20}]}
                  onPress={() => {
                    navigation.navigate('DetailBook', {
                      navigation: navigation,
                      id: book.id,
                    });
                  }}>
                  <Image source={{uri: book.cover_image}} style={styles.img} />
                </TouchableOpacity>
              );
            }
          })}
        </ScrollView>
        <Text style={{marginHorizontal: 20, marginTop: 20, fontSize: 20}}>
          Popular
        </Text>
        {books.data.map(book => {
          const price = book.price;
          const parsePrice = data => {
            let rupiah = data
              .toString()
              .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
            return `Rp${rupiah}`;
          };
          return (
            <View style={styles.popularList}>
              <TouchableOpacity
                style={[styles.scrollItems]}
                onPress={() => {
                  navigation.navigate('DetailBook', {
                    navigation: navigation,
                    id: book.id,
                  });
                }}>
                <Image source={{uri: book.cover_image}} style={styles.img} />
              </TouchableOpacity>
              <View style={styles.popularDetail}>
                <Text
                  style={[
                    styles.textPopular,
                    {fontSize: 18, fontWeight: 'bold'},
                  ]}>
                  {book.title}
                </Text>
                <Text style={[styles.textPopular]}>{book.author}</Text>
                <Text style={[styles.textPopular]}>{book.publisher}</Text>
                <Text style={[styles.textPopular]}>
                  Rating <Icons name="star" size={13} color="yellow" />
                </Text>
                <Text style={[styles.textPopular]}>{parsePrice(price)}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </>
  );
};
const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'absolute',
        zIndex: 99,
        width: screen.width,
        height: screen.height,
      }}>
      <ActivityIndicator />
    </View>
  );
};
const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  header: {
    padding: 20,
    marginBottom: 15,
    backgroundColor: 'black',
    width: '50%',
    borderBottomRightRadius: 300,
  },
  text: {
    fontSize: 25,
    color: 'white',
  },
  img: {
    width: screen.width * 0.3,
    height: screen.width * 0.4,
  },
  scrollItems: {
    overflow: 'hidden',
    borderRadius: 15,
    elevation: 10,
  },
  popularList: {
    flexDirection: 'row',
    margin: 20,
    backgroundColor: 'black',
    borderRadius: 15,
    overflow: 'hidden',
    alignItems: 'center',
    elevation: 8,
  },
  popularDetail: {
    padding: 15,
    flex: 1,
  },
  textPopular: {
    color: 'white',
  },
});

export default Home;
