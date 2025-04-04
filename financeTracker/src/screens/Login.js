import {View, Text, TouchableOpacity, StatusBar, Image, Alert, ActivityIndicator, KeyboardAvoidingView, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {BLACK, LightGray, TealBlue, VividRed, WHITE} from '../constants/color';
import {HEIGHT, WIDTH} from '../constants/config';
import {InputTxt} from '../components/InputTxt';
import {LoginImage} from '../constants/imagepath';
import { BASE_URL } from '../constants/url';
import { POSTNETWORK } from '../utils/Network';
import { storeObjByKey } from '../utils/Storage';
import { checkuserToken } from '../redux/actions/auth';
import { useDispatch } from 'react-redux';

const Login = ({navigation}) => {
  const dispatch=useDispatch();
  const [data, setData] = useState({
    phoneNumber: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false); 

  const LoginApi = async () => {
    const apiUrl = BASE_URL + "user/login";
    const payload = {
      phoneNumber: data.phoneNumber,
      password: data.password
    };
    setIsLoading(true);
    try {
      const response = await POSTNETWORK(apiUrl, payload, false);
      console.log(response, payload);
      if (response?.status == 200) {
        console.log(response.user.email)
        storeObjByKey('loginResponse', response?.token);
        storeObjByKey("name",response.user.name)
        storeObjByKey("email",response.user.email)
        storeObjByKey("phoneNumber",response.user.phoneNumber)
        dispatch(checkuserToken());
      } else {
        Alert.alert('Error', 'Invalid phone number or password');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
    setIsLoading(false); 
  };

  return (
   <KeyboardAvoidingView
         style={{ flex: 1 }}
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
         <ScrollView
           contentContainerStyle={{ flexGrow: 1 }}
           keyboardShouldPersistTaps="handled">
           <View style={{ flex: 1, backgroundColor: LightGray }}>
      <StatusBar backgroundColor={LightGray} barStyle="dark-content" translucent={false} />
      <View style={{height: HEIGHT * 0.08, width: WIDTH * 1, justifyContent: 'space-around', alignItems: 'center'}}>
        <Text allowFontScaling={false} style={{fontSize: 20, color: BLACK, fontFamily: 'KronaOne-Regular'}}>
          LOGIN HERE
        </Text>
      </View>
      <View style={{height: HEIGHT * 0.3, width: WIDTH * 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={LoginImage} style={{height: 250, width: 250}} />
      </View>
      <View style={{height: HEIGHT * 0.25, width: WIDTH * 1, alignItems: 'center', paddingTop: '5%'}}>
        <InputTxt placeholder="Enter Phone Number" inputdata={data.phoneNumber} setInputdata={value => setData(prev => ({...prev, phoneNumber: value}))} />
        <InputTxt placeholder="Enter Password" inputdata={data.password} setInputdata={value => setData(prev => ({...prev, password: value}))} />
      
      </View>
      <View style={{height: HEIGHT * 0.18, width: WIDTH * 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={LoginApi}
          disabled={isLoading} 
          style={{
            height: HEIGHT * 0.075,
            width: WIDTH * 0.9,
            backgroundColor: VividRed,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            opacity: isLoading ? 0.7 : 1, 
          }}>
          {isLoading ? (
            <ActivityIndicator size="small" color={WHITE} />
          ) : (
            <Text allowFontScaling={false} style={{color: WHITE, fontFamily: 'KronaOne-Regular', fontSize: 15}}>
              Submit
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={{height: HEIGHT * 0.22, width: WIDTH * 1}}>
        <Text allowFontScaling={false} style={{fontSize: 15, color: BLACK, fontFamily: 'PlusJakartaSans-VariableFont_wght', textAlign: 'center'}}>
          Create new account
        </Text>
        <TouchableOpacity onPress={() => { navigation.navigate('Register'); }}>
          <Text allowFontScaling={false} style={{fontSize: 15, color: TealBlue, fontFamily: 'PlusJakartaSans-VariableFont_wght', textAlign: 'center', fontWeight: '900', top: '15%'}}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;