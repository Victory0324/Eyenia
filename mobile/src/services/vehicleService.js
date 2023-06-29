import axios from 'axios';
import { API_URL } from '../constants/url';

function addVehicles(token, userId, vehicleName, deviceImei, deviceType, deviceModel, simNumber, addClient) {
  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/vehicles/create`, {
      token, userId, vehicleName, deviceImei, deviceType, deviceModel, simNumber
    }).then(async (response) => {
      try {
        resolve(response);
      } catch (e) { 
        reject(e) }
    }).catch((err) => {
      reject(err)
    });
  });
}

function showVehicles(token, userId) {
  
  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/vehicles/show`, {
      token, userId
    }).then(async (response) => {
      try {
        resolve(response);
      } catch (e) { reject(e) }
    }).catch((err) => {
      reject(err)
    });
  });
}

function deleteVehicle(token, imei) {
  
  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/vehicles/remove`, {
      token, imei
    }).then(async (response) => {
      try {
        resolve(response);
      } catch (e) { reject(e) }
    }).catch((err) => {
      reject(err)
    });
  });
}

function vehicleList(token, userId) {
  
  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/vehicles/list`, {
      token, userId
    }).then(async (response) => {
      try {
        resolve(response);
      } catch (e) { reject(e) }
    }).catch((err) => {
      reject(err)
    });
  });
}

function confirmNotificationSettings(token, deviceImei,
  isVibration, isMovement, isStop, isEnterZone, isSortZone, isOverspeed, isDetachment) {
  
  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/vehicles/update`, {
      token, deviceImei,
      isVibration, isMovement, isStop, isEnterZone, isSortZone, isOverspeed, isDetachment
    }).then(async (response) => {
      try {
        resolve(response);
      } catch (e) { reject(e) }
    }).catch((err) => {
      reject(err)
    });
  });
}

function sendGprsIgnition(token, ip, port, value) {
  
  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/vehicles/ignition`, {
      token, ip, port, value
    }).then(async (response) => {
      try {
        resolve(response);
      } catch (e) { reject(e) }
    }).catch((err) => {
      reject(err)
    });
  });
}

function sendGprsReset(token, ip, port) {
  
  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/vehicles/reset`, {
      token, ip, port
    }).then(async (response) => {
      try {
        resolve(response);
      } catch (e) { reject(e) }
    }).catch((err) => {
      reject(err)
    });
  });
}

function sendGprsRestart(token, ip, port) {
  
  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/vehicles/ignition`, {
      token, ip, port
    }).then(async (response) => {
      try {
        resolve(response);
      } catch (e) { reject(e) }
    }).catch((err) => {
      reject(err)
    });
  });
}

export const vehicleService = {
  addVehicles,
  showVehicles,
  vehicleList,
  deleteVehicle,
  sendGprsIgnition,
  sendGprsRestart,
  sendGprsReset,
  confirmNotificationSettings
};
