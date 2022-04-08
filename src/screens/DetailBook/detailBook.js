import React, {useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import getDetailBook from '../../data/redux/screens/detailBook/action';
import notification from '../../data/service/notif';
import Share from 'react-native-share';
const Detailbook = props => {
  const logins = useSelector(state => state.login);
  const navigation = props.navigation;
  const id = props.route.params.id;
  const book = useSelector(state => state.detailBook);
  console.log(id);
  const dispatch = useDispatch();
  const parseRupiah = (data = 0) => {
    let rupiah = data.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
    return `Rp${rupiah}`;
  };
  const shareLink = () => {
    const shareOptions = {
      title: 'Share via',
      message: 'Link :',
      url: book.data.cover_image,
    };
    Share.open(shareOptions)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };
  useEffect(() => {
    const data = {token: logins.token, id: id};
    dispatch(getDetailBook(data));
  }, []);
  return (
    <>
      {book.isMsg && Alert.alert(book.msg)}
      <ScrollView style={styles.scroll}>
        {book.isLoading ? <Loading /> : <></>}

        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.replace('Home');
            }}>
            <Icon name="chevron-back-sharp" size={30} />
          </TouchableOpacity>
          <View style={styles.headerDetail}>
            <TouchableOpacity
              onPress={() => {
                notification.configure();
                notification.createChannel('1');
                notification.sendNotif(
                  '1',
                  'Gedebook',
                  `anda menyukai ${book.data.title}`,
                );
              }}>
              <Icon name="heart-circle" size={30} style={{marginRight: 10}} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                shareLink();
              }}>
              <Icon name="share-social" size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bookHeader}>
          <Image source={{uri: book.data.cover_image}} style={styles.img} />
          <View style={styles.bookHeaderChild}>
            <Text style={styles.text}>{book.data.title}</Text>
            <Text style={styles.text}>{book.data.author}</Text>
            <Text style={styles.text}>{book.data.publisher}</Text>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={{fontSize: 20, margin: 10}}>
              Rating : {book.data.average_rating}
              <Icon name="star" color="yellow" size={20} />
            </Text>
            <Text style={{fontSize: 20, margin: 10}}>
              Total sale : {book.data.total_sale}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: screen.width * 0.4,
              padding: 10,
              backgroundColor: 'black',
              flexDirection: 'row',
              justifyContent: 'center',
              borderRadius: 10,
            }}>
            <Text style={{fontSize: 15, margin: 10, color: 'white'}}>
              Buy {parseRupiah(book.data.price)}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{margin: 20, fontSize: 20}}>Overview</Text>
        <Text
          style={{paddingHorizontal: 20, fontSize: 15, textAlign: 'center'}}>
          {book.data.synopsis}
        </Text>
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
const screen = Dimensions.get('screen');
const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-between',
    padding: 10,
  },
  headerDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bookHeader: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 15,
    elevation: 10,
    overflow: 'hidden',
  },
  bookHeaderChild: {padding: 10},
  img: {
    width: screen.width * 0.3,
    height: screen.width * 0.45,
  },
  text: {
    color: 'white',
  },
});
export default Detailbook;
