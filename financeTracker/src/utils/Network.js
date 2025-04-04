import {getObjByKey} from './Storage';

export const POSTNETWORK = async (url, payload, token = false) => {
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // 'Content-Type': 'multipart/form-data'
  };
  if (token) {
    let loginRes = await getObjByKey('loginResponse');
    // let loginAdminRes = await getObjByKey('loginAdminResponse');
    // headers = {...headers, Authorization: 'Bearer ' + loginAdminRes};
    // headers = { ...headers, Authorization: loginRes.token }
    headers = {...headers, Authorization: `Bearer ${loginRes}`};
    // console.log("________________________________Retrieved Token",loginRes)
  }
  return await fetch(url, {
    method: 'POST',
    headers: headers,
    redirect: 'follow',
    body: JSON.stringify(payload),
  })
    .then(response => response.json())
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log('error' + error);
    });
};

export const GETNETWORK = async (url, token = false) => {
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  if (token) {
    let loginRes = await getObjByKey('loginResponse');

    // let loginAdminRes = await getObjByKey('loginAdminResponse');
    headers = {...headers, Authorization: 'Bearer ' + loginRes};
    // headers = {...headers, Authorization: 'Bearer ' + loginAdminRes};
    // console.log(
    //   'Retrieved Token::::::::::::::::::::::::::------------------------------==',
    //   loginRes
    // );
  }
  return fetch(url, {
    method: 'GET',
    headers: headers,
  })
    .then(response => response.json())
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log(error);
    });
};

export const PUTNETWORK = async (url, payload, token = false) => {
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (token) {
    let loginRes = await getObjByKey('loginResponse');

    headers = {...headers, Authorization: 'Bearer ' + loginRes};
    //  let loginAdminRes = await getObjByKey('loginAdminResponse');
    //  headers = {...headers, Authorization: 'Bearer ' + loginAdminRes};
    // console.log("Retrieved Token::::::::::::::::::::::::::------------------------------====",loginRes)
  }

  return fetch(url, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(payload),
  })
    .then(response => response.json())
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log(error);
    });
};

export const DELETENETWORK = async (url, token = false) => {
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (token) {
    let loginRes = await getObjByKey('loginResponse');
    headers = {...headers, Authorization: `Bearer ${loginRes}`};
  }

  return await fetch(url, {
    method: 'DELETE',
    headers: headers,
    redirect: 'follow',
  })
    .then(response => response.json())
    .then(response => response)
    .catch(error => {
      console.log('error' + error);
    });
};