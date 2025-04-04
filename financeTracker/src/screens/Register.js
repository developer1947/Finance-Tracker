import { View, Text, TouchableOpacity, StatusBar, Alert, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { BLACK, LightGray, TealBlue, VividRed, WHITE } from '../constants/color';
import { HEIGHT, WIDTH } from '../constants/config';
import { InputTxt } from '../components/InputTxt';
import { BASE_URL } from '../constants/url';
import { POSTNETWORK } from '../utils/Network';

const Register = ({ navigation }) => {
  const [data, setData] = useState({ name: "", email: "", phoneNumber: "", password: "" });
  const [loading, setLoading] = useState(false); 

  const RegisterApi = async () => {
    if (!data.name || !data.email || !data.phoneNumber || !data.password) {
      Alert.alert('Please fill all the fields');
      return;
    }

    setLoading(true);
    const apiUrl = BASE_URL + "user/register";
    const payload = {
      "name": data.name,
      "email": data.email,
      "password": data.password,
      "phoneNumber": data.phoneNumber
    };

    try {
      const response = await POSTNETWORK(apiUrl, payload, false);
      console.log(response, payload);

      if (response?.status === 200) {
        navigation.navigate('Login');
      } else {
        Alert.alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('An error occurred. Please try again.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled">
        <View style={{ flex: 1, backgroundColor: LightGray }}>
          <StatusBar
            backgroundColor={LightGray}
            barStyle="dark-content"
            translucent={false}
          />
          <View
            style={{
              height: HEIGHT * 0.2,
              width: WIDTH * 1,
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text
              allowFontScaling={false}
              style={{ fontSize: 20, color: BLACK, fontFamily: 'KronaOne-Regular' }}>
              CREATE ACCOUNT
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 15,
                color: BLACK,
                fontFamily: 'PlusJakartaSans-VariableFont_wght',
                textAlign: 'center',
              }}>
              Create an account so you can explore all the existing tasks
            </Text>
          </View>
          <View
            style={{ height: HEIGHT * 0.4, width: WIDTH * 1, alignItems: 'center' }}>
            <InputTxt placeholder="Enter Name" inputdata={data.name} setInputdata={(value) => setData(prev => ({ ...prev, name: value }))} />
            <InputTxt placeholder="Enter Email" inputdata={data.email} setInputdata={(value) => setData(prev => ({ ...prev, email: value }))} />
            <InputTxt placeholder="Enter Phone Number" inputdata={data.phoneNumber} setInputdata={(value) => setData(prev => ({ ...prev, phoneNumber: value }))} />
            <InputTxt placeholder="Enter Password" inputdata={data.password} setInputdata={(value) => setData(prev => ({ ...prev, password: value }))} />
          </View>
          <View
            style={{
              height: HEIGHT * 0.18,
              width: WIDTH * 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={RegisterApi}
              disabled={loading} 
              style={{
                height: HEIGHT * 0.075,
                width: WIDTH * 0.9,
                backgroundColor: VividRed,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                opacity: loading ? 0.7 : 1, 
              }}>
              {loading ? (
                <ActivityIndicator size="small" color={WHITE} />
              ) : (
                <Text
                  allowFontScaling={false}
                  style={{
                    color: WHITE,
                    fontFamily: 'KronaOne-Regular',
                    fontSize: 15,
                  }}>
                  Submit
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={{ height: HEIGHT * 0.22, width: WIDTH * 1 }}>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 15,
                color: BLACK,
                fontFamily: 'PlusJakartaSans-VariableFont_wght',
                textAlign: 'center',
              }}>
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 15,
                  color: TealBlue,
                  fontFamily: 'PlusJakartaSans-VariableFont_wght',
                  textAlign: 'center',
                  fontWeight: '900',
                  top: '15%',
                }}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;