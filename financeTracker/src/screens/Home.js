import {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  StatusBar,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  RefreshControl,
  Modal,
  Pressable,
} from 'react-native';
import {
  BLACK,
  GrayishBlue,
  LightGray,
  LustRed,
  TealBlue,
  lightOFFWhite,
  WHITE,
  VividRed,
} from '../constants/color';
import {HEIGHT, WIDTH} from '../constants/config';
import {AddImage, HomeProfileImage, LogoutImage} from '../constants/imagepath';
import {checkuserToken} from '../redux/actions/auth';
import {clearAll, getObjByKey} from '../utils/Storage';
import {useDispatch} from 'react-redux';
import {InputTxt} from '../components/InputTxt';
import {BASE_URL} from '../constants/url';
import {DELETENETWORK, GETNETWORK, POSTNETWORK, PUTNETWORK} from '../utils/Network';

const Home = () => {
  const dispatch = useDispatch();
  const [transactionsList, setTransactionsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal,setShowUpdateModal]=useState(false)
  const [selectedId, setSelectedId] = useState(null);

  const [data, setData] = useState({
    description: '',
    amount: 0,
    type: '',
    category: '',
    date: '',
  });
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
  });
  const [refresh, setRefresh] = useState(false);
  const handleRefresh = () => {
    setRefresh(true);
    GetTransationList();
    setRefresh(false);
  };

  const GetData = async () => {
    const name = await getObjByKey('name');
    const email = await getObjByKey('email');
    const phoneNumber = await getObjByKey('phoneNumber');
    setUserData({name, email, phoneNumber});
  };

  const handleLogout = () => {
    clearAll().then(() => {
      dispatch(checkuserToken());
    });
  };
  const renderItem = ({item}) => {
    return (
      <View
        style={{height: HEIGHT * 0.2, width: WIDTH * 1, alignItems: 'center'}}>
        <View
          style={{
            height: HEIGHT * 0.16,
            width: WIDTH * 0.9,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: WHITE,
            borderRadius: 10,
            elevation: 5,
          }}>
          <View
            style={{
              height: HEIGHT * 0.04,
              width: WIDTH * 0.9,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text
              allowFontScaling={false}
              style={{left: '5%', color: GrayishBlue,fontFamily: 'PlusJakartaSans-VariableFont_wght'}}>
              Type: <Text style={{color: BLACK,fontWeight:'400'}}>{item.type === 1 ? 'Income' : item.type === 2 ? 'Expense' : 'NA'}</Text>
            </Text>
            <Text allowFontScaling={false} style={{right: '5%', color: BLACK,fontFamily: 'PlusJakartaSans-VariableFont_wght'}}>
              {new Date(item.date).toISOString().slice(0, 10)}
            </Text>
          </View>

          <View
            style={{
              height: HEIGHT * 0.06,
              width: WIDTH * 0.9,
              paddingStart: '4%',
              justifyContent: 'center',
            }}>
            <Text allowFontScaling={false} style={{color: GrayishBlue,fontFamily: 'PlusJakartaSans-VariableFont_wght'}}>
              Amount:{' '}
              <Text style={{color: BLACK, fontWeight: '600'}}>
                {item.amount} ({item.category})
              </Text>
            </Text>
            <Text allowFontScaling={false} style={{color: GrayishBlue,top:'3%',fontFamily: 'PlusJakartaSans-VariableFont_wght'}}>
              description:{' '}
              <Text style={{color: BLACK, fontWeight: '600'}}>
                {item.description}
              </Text>
            </Text>
          </View>
          <View
            style={{
              height: HEIGHT * 0.06,
              width: WIDTH * 0.9,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
            onPress={()=>{handleUpdatePress(item._id)}}
              style={{
                height: HEIGHT * 0.04,
                width: WIDTH * 0.15,
                borderWidth: 1,
                borderColor: LightGray,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                right: '5%',
              }}>
              <Text
                allowFontScaling={false}
                style={{fontSize: 14, color: 'green',fontFamily: 'PlusJakartaSans-VariableFont_wght'}}>
                Edit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
           onPress={() => handlePress(item._id)}
              style={{
                height: HEIGHT * 0.04,
                width: WIDTH * 0.15,
                borderWidth: 1,
                borderColor: LightGray,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                left: '5%',
              }}>
              <Text
                allowFontScaling={false}
                style={{fontSize: 14, color: 'red',fontFamily: 'PlusJakartaSans-VariableFont_wght'}}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  const CreateTransaction = () => {
    const apiUrl = BASE_URL + 'transation/createTransaction';
    const payload = {
      description: data.description,
      amount: data.amount,
      type: data.type,
      category: data.category,
      date: data.date,
    };
    POSTNETWORK(apiUrl, payload, true).then(response => {
      GetTransationList();
      setShowModal(false);
    });
  };
  const GetTransationList = () => {
    const apiUrl = BASE_URL + 'transation/getTransactions';
    GETNETWORK(apiUrl, true).then(response => {
      
      setTransactionsList(response.data);
    });
  };
  useEffect(() => {
    GetTransationList();
    GetData();
  }, []);
  const handlePress=(id)=>{
    console.log("---",id)
    DeleteTransation(id)
  }
  const handleUpdatePress=(id)=>{
   setShowUpdateModal(true) 
    setSelectedId(id)
  }
  const UpdateTransaction=(id)=>{
    const apiUrl=BASE_URL+`transation/updateTransaction/${id}`
    const payload = {
      description: data.description,
      amount: data.amount,
      type: data.type,
      category: data.category,
      date: data.date,
    };
    PUTNETWORK(apiUrl,payload,true).then(response=>{
      setShowUpdateModal(false)
      GetTransationList();
      console.log("44",response,apiUrl)
    })
  }
  const DeleteTransation=(id)=>{
    const apiUrl=BASE_URL+`transation/deleteTransaction/${id}`
    DELETENETWORK(apiUrl,true).then(response=>{
      console.log("===",response,apiUrl)
      GetTransationList();
    })
  }
  return (
    <View style={{flex: 1, backgroundColor: LightGray, alignItems: 'center'}}>
      <StatusBar
        backgroundColor={LightGray}
        barStyle="dark-content"
        translucent={false}
      />

      <TouchableOpacity
        onPress={() => {
          setShowModal(true);
        }}
        style={{
          height: HEIGHT * 0.09,
          width: WIDTH * 0.2,
          right: '7%',
          justifyContent: 'center',
          alignItems: 'center',
          bottom: '10%',
          zIndex: 20,
          position: 'absolute',
        }}>
        <Image
          source={AddImage}
          style={{height: HEIGHT * 0.09, width: HEIGHT * 0.09}}
        />
      </TouchableOpacity>

      <View
        style={{
          height: HEIGHT * 0.1,
          width: WIDTH * 0.96,
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{
            height: HEIGHT * 0.09,
            width: WIDTH * 0.15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={HomeProfileImage}
            style={{height: '75%', width: '85%'}}
          />
        </TouchableOpacity>
        <View
          style={{
            height: HEIGHT * 0.09,
            width: WIDTH * 0.66,
            justifyContent: 'center',
            paddingStart: '1%',
          }}>
          <View
            style={{
              height: HEIGHT * 0.04,
              width: WIDTH * 0.64,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text
              allowFontScaling={false}
              adjustsFontSizeToFit
              numberOfLines={1}
              style={{
                fontSize: 18,
                fontFamily: 'KronaOne-Regular',
                color: BLACK,
                letterSpacing: 1,
              }}>
              Welcome,
              <Text style={{color: TealBlue}}>{userData.name}</Text>
            </Text>
          </View>
          <View
            style={{
              height: HEIGHT * 0.04,
              width: WIDTH * 0.64,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            <Text
              allowFontScaling={false}
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{
                fontSize: 10,
                fontFamily: 'KronaOne-Regular',
                color: GrayishBlue,
              }}>
              {userData.email} | {userData.phoneNumber}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleLogout}
          style={{
            height: HEIGHT * 0.09,
            width: WIDTH * 0.15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={LogoutImage}
            style={{height: 30, width: 30, bottom: '8%', tintColor: LustRed}}
          />
        </TouchableOpacity>
      </View>
      <View style={{height: HEIGHT * 0.9, width: WIDTH * 1}}>
        <FlatList
          data={transactionsList}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
          }
        />
      </View>
      <Modal
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}>
        <Pressable
          onPress={() => {
            setShowModal(false);
          }}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: lightOFFWhite,
          }}>
          <View
            style={{
              height: HEIGHT * 0.7,
              width: WIDTH * 0.85,
              backgroundColor: WHITE,
              borderRadius: 15,
              elevation: 5,
            }}>
            <View
              style={{
                height: HEIGHT * 0.08,
                width: WIDTH * 0.85,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 16,
                  color: BLACK,
                  fontFamily: 'KronaOne-Regular',
                }}>
                Add Transaction
              </Text>
            </View>
            <View
              style={{
                height: HEIGHT * 0.52,
                width: WIDTH * 0.85,
                alignItems: 'center',
              }}>
              <InputTxt
                placeholder="Enter description"
                inputdata={data.description}
                setInputdata={value =>
                  setData({...data, description: value?.toString() || ''})
                }
              />
              <InputTxt
                placeholder="Enter amount"
                inputdata={data.amount}
                setInputdata={value =>
                  setData({...data, amount: value?.toString() || ''})
                }
              />
              <InputTxt
                placeholder="Enter type"
                inputdata={data.type}
                setInputdata={value =>
                  setData({...data, type: value?.toString() || ''})
                }
              />
              <InputTxt
                placeholder="Enter category"
                inputdata={data.category}
                setInputdata={value =>
                  setData({...data, category: value?.toString() || ''})
                }
              />
              <InputTxt
                placeholder="Enter date"
                inputdata={data.date}
                setInputdata={value =>
                  setData({...data, date: value?.toString() || ''})
                }
              />
            </View>
            <View
              style={{
                height: HEIGHT * 0.08,
                width: WIDTH * 0.85,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={CreateTransaction}
                style={{
                  height: HEIGHT * 0.07,
                  width: WIDTH * 0.7,
                  backgroundColor: VividRed,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <Text
                  allowFontScaling={false}
                  style={{
                    color: WHITE,
                    fontFamily: 'KronaOne-Regular',
                    fontSize: 15,
                  }}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
      <Modal
        transparent={true}
        visible={showUpdateModal}
        onRequestClose={() => {
          setShowUpdateModal(false);
        }}>
        <Pressable
          onPress={() => {
            setShowUpdateModal(false);
          }}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: lightOFFWhite,
          }}>
          <View
            style={{
              height: HEIGHT * 0.7,
              width: WIDTH * 0.85,
              backgroundColor: WHITE,
              borderRadius: 15,
              elevation: 5,
            }}>
            <View
              style={{
                height: HEIGHT * 0.08,
                width: WIDTH * 0.85,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 16,
                  color: BLACK,
                  fontFamily: 'KronaOne-Regular',
                }}>
                Update Transaction
              </Text>
            </View>
            <View
              style={{
                height: HEIGHT * 0.52,
                width: WIDTH * 0.85,
                alignItems: 'center',
              }}>
              <InputTxt
                placeholder="Enter description"
                inputdata={data.description}
                setInputdata={value =>
                  setData({...data, description: value?.toString() || ''})
                }
              />
              <InputTxt
                placeholder="Enter amount"
                inputdata={data.amount}
                setInputdata={value =>
                  setData({...data, amount: value?.toString() || ''})
                }
              />
              <InputTxt
                placeholder="Enter type"
                inputdata={data.type}
                setInputdata={value =>
                  setData({...data, type: value?.toString() || ''})
                }
              />
              <InputTxt
                placeholder="Enter category"
                inputdata={data.category}
                setInputdata={value =>
                  setData({...data, category: value?.toString() || ''})
                }
              />
              <InputTxt
                placeholder="Enter date"
                inputdata={data.date}
                setInputdata={value =>
                  setData({...data, date: value?.toString() || ''})
                }
              />
            </View>
            <View
              style={{
                height: HEIGHT * 0.08,
                width: WIDTH * 0.85,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => UpdateTransaction(selectedId)}
                style={{
                  height: HEIGHT * 0.07,
                  width: WIDTH * 0.7,
                  backgroundColor: VividRed,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <Text
                  allowFontScaling={false}
                  style={{
                    color: WHITE,
                    fontFamily: 'KronaOne-Regular',
                    fontSize: 15,
                  }}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default Home;
