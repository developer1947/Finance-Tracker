import {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {BLACK, WHITE} from '../constants/color';

export const InputTxt = ({
  placeholder = '',
  height = 60,
  width = '90%',
  borderradius = 10,
  type = '',
  inputdata = '',
  setInputdata = {},
  keyboardType = 'default',
  editable = true,
  borderColor = WHITE,
  maxLength = 100,
  backgroundColor = WHITE,
  elevation = 5,
}) => {
  const [tap, setTap] = useState(false);

  return (
    <Pressable
      style={{
        ...Styles.container,
        borderWidth: tap ? 2 : 1,
        borderColor: borderColor,
        height: height,
        width: width,
        borderRadius: borderradius,
        backgroundColor: backgroundColor,
        elevation: elevation,
        borderBottomWidth: 0,
      }}>
      {(tap || inputdata != '') && (
        <View style={{...Styles.lablebackgroud}}>
          <Text style={{...Styles.lable}}>{placeholder}</Text>
        </View>
      )}
      <View style={{flex: 1}}>
        <TextInput
          style={{...Styles.txtinput}}
          onChangeText={res => {
            // console.log(res)
            if (type == 'name') {
              if (res[0] != ' ' && /[a-zA-Z" "]/.test(res[res.length - 1])) {
                setInputdata(res);
              } else if (/[a-zA-Z" "]/.test(res[res.length - 1])) {
                setInputdata(res.slice(0, 0));
              } else {
                setInputdata('');
              }
            } else if (type == 'number') {
              if (res[0] != 0 && /[0-9]/.test(res[res.length - 1])) {
                setInputdata(res);
              } else if (/[0-9]/.test(res[res.length - 1])) {
                setInputdata(res.slice(0, 0));
              } else {
                setInputdata('');
              }
            } else if (type == 'email') {
              if (/[a-zA-Z@0-9_.-]/.test(res[res.length - 1])) {
                setInputdata(res);
              } else {
                setInputdata('');
              }
            } else if (type == 'password') {
              if (/[a-zA-Z0-9]/.test(res[res.length - 1])) {
                setInputdata(res);
              } else {
                setInputdata('');
              }
            } else {
              // console.log('others')
              setInputdata(res);
            }
          }}
          value={inputdata}
          editable={editable}
          maxLength={maxLength}
          keyboardType={keyboardType}
          placeholder={tap ? '' : placeholder}
          placeholderTextColor={'gray'}
          onFocus={() => {
            setTap(true);
          }}
          onEndEditing={() => {
            setTap(false);
          }}
        />
      </View>
    </Pressable>
  );
};
const Styles = StyleSheet.create({
  container: {
    width: '90%',
    margin: 10,
    borderRadius: 15,
    borderWidth: 1,
  },
  lable: {
    color: BLACK,
    fontFamily: 'PlusJakartaSans-VariableFont_wght',
  },
  lablebackgroud: {
    backgroundColor: WHITE,
    top: -10,
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 5,
    position: 'absolute',
    borderRadius: 10,
  },
  imgContainer: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtinput: {
    flex: 1,
    marginLeft: 10,
    color: BLACK,
    fontFamily: 'PlusJakartaSans-VariableFont_wght',
    fontSize: 15,
  },
});