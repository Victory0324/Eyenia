import {
  VEHICLE_ADDING,
  VEHICLE_REMOVING,
  VEHICLE_SHOWING,
  VEHICLE_ADDING_FAILED,
  VEHICLE_ADDING_SUCCESS,
  VEHICLE_REMOVE_FAILED,
  VEHICLE_REMOVE_SUCCESS,
  VEHICLE_SHOWING_FAILED,
  VEHICLE_SHOWING_SUCCESS,
  VEHICLE_LIST,
  VEHICLE_LIST_FAILED,
  VEHICLE_LIST_SUCCESS,
  VEHICLE_SET_PERIOD,
  VEHICLE_GPRS_IGNITION,
  VEHICLE_GPRS_RESET,
  VEHICLE_GPRS_RESTART,
  VEHICLE_GPRS_IGNITION_FAILED,
  VEHICLE_GPRS_IGNITION_SUCCESS,
  VEHICLE_GPRS_RESET_FAILED,
  VEHICLE_GPRS_RESET_SUCCESS,
  VEHICLE_GPRS_RESTART_FAILED,
  VEHICLE_GPRS_RESTART_SUCCESS,
  VEHICLE_CONFIRM_NOTIFY_SETTINGS,
  VEHICLE_CONFIRM_NOTIFY_SETTINGS_SUCCESS,
  VEHICLE_CONFIRM_NOTIFY_SETTINGS_FAILED
} from '../constants/vehicles';

import { toastr } from "../services/navRef";
import { vehicleService } from "../services/vehicleService";

export const showingVehicles = (isGettingVehicles) => ({
  type: VEHICLE_SHOWING,
  payload: isGettingVehicles
});

export const successShowVehicles = (data) => ({
  type: VEHICLE_SHOWING_SUCCESS,
  payload: data,
});

export const errorShowingVehicles = (errorMessage) => ({
  type: VEHICLE_SHOWING_FAILED,
  payload: errorMessage,
});

export const showVehicles = (token, userId) => (dispatch) => {
  console.log("get teltonika real-time data...");
  dispatch(showingVehicles(true));
  vehicleService.showVehicles(token, userId).then(async (res) => {
    //console.log("vehicles list::::", res.data);
    await dispatch(successShowVehicles(res.data));
  }).catch((err) => {
    console.log(err);
    // dispatch(errorShowingVehicles('No Available server!'));
    // toastr('No available server!');
  }).finally(() => {
    dispatch(showingVehicles(false));
  });
};

export const action_vehicle_list = (isVehicleList) => ({
  type: VEHICLE_LIST,
  payload: isVehicleList
});

export const successVehicleList = (data) => ({
  type: VEHICLE_LIST_SUCCESS,
  payload: data,
});

export const errorVehicleList = (errorMessage) => ({
  type: VEHICLE_LIST_FAILED,
  payload: errorMessage,
});

export const vehicleList = (token, userId) => (dispatch) => {
  console.log("get vehicle lists...");
  dispatch(action_vehicle_list(true));
  vehicleService.vehicleList(token, userId).then(async (res) => {
    //console.log("vehicles list::::", res.data);
    await dispatch(successVehicleList(res.data));
  }).catch((err) => {
    console.log(err);
    dispatch(errorVehicleList("Something went worng!"));
  }).finally(() => {
    dispatch(action_vehicle_list(false));
  });
};

export const addingVehicles = (isAddingVehicle) => ({
  type: VEHICLE_ADDING,
  payload: isAddingVehicle
});

export const successAddVehicles = (data) => ({
  type: VEHICLE_ADDING_SUCCESS,
  payload: data,
});

export const errorAddVehicles = (errorMessage) => ({
  type: VEHICLE_ADDING_FAILED,
  payload: errorMessage,
});

export const addVehicles = (token, userId, vehicleName, deviceImei, deviceType, deviceModel, simNumber, navigation) => (dispatch) => {
  dispatch(addingVehicles(true));
  vehicleService.addVehicles(token, userId, vehicleName, deviceImei, deviceType, deviceModel, simNumber).then(async (res) => {
    await dispatch(successAddVehicles(res.data));
    await navigation.navigate('MapScreen');
    toastr('Vehicle is added.');
  }).catch((err) => {
    dispatch(errorAddVehicles(err.response.data.message));
    toastr(err.response.data.message);
  }).finally(() => {
    dispatch(addingVehicles(false));
  });
};

export const removingVehicles = (isRemovingVehicle) => ({
  type: VEHICLE_REMOVING,
  payload: isRemovingVehicle
});

export const successRemoveVehicles = (data) => ({
  type: VEHICLE_REMOVE_SUCCESS,
  payload: data,
});

export const errorRemoveVehicles = (errorMessage) => ({
  type: VEHICLE_REMOVE_FAILED,
  payload: errorMessage,
});

export const deleteVehicle = (token, imei, navigation) => (dispatch) => {
  dispatch(removingVehicles(true));
  vehicleService.deleteVehicle(token, imei).then(async (res) => {
    await dispatch(successRemoveVehicles(res.data));
    await navigation.navigate('List');
    toastr(res.message);
  }).catch((err) => {
    dispatch(errorRemoveVehicles('Wrong Vehicle info!'));
    toastr('Vehicle remove failed');
  }).finally(() => {
    dispatch(removingVehicles(false));
  });
};

export const setReceivePeriod = (receivePeriod) => ({
  type: VEHICLE_SET_PERIOD,
  payload: receivePeriod
});

export const setPeriod = (value) => (dispatch) => {
  dispatch(setReceivePeriod(value * 1000));
}

export const sendingIgnition = (isLoading) => ({
  type: VEHICLE_GPRS_IGNITION,
  payload: isLoading
});

export const successIgnition = (isLoading) => ({
  type: VEHICLE_GPRS_IGNITION_SUCCESS,
  payload: isLoading,
});

export const failedIgnition = () => ({
  type: VEHICLE_GPRS_IGNITION_FAILED,
});

export const sendGprsIgnition = (value) => (dispatch) => {
  dispatch(sendingIgnition(true));
  vehicleService.sendGprsIgnition(token, value).then(async (res) => {
    await dispatch(successIgnition(false));
  }).catch((err) => {
    dispatch(failedIgnition(err.message));
  }).finally(() => {
    dispatch(sendingIgnition(false));
  });
}

export const sendingRestart = (isLoading) => ({
  type: VEHICLE_GPRS_RESTART,
  payload: isLoading
});

export const successRestart = (isLoading) => ({
  type: VEHICLE_GPRS_RESTART_SUCCESS,
  payload: isLoading,
});

export const failedRestart = () => ({
  type: VEHICLE_GPRS_RESTART_FAILED,
});


export const sendGprsRestart = () => (dispatch) => {
  dispatch(sendingRestart(true));
  vehicleService.sendGprsRestart(token).then(async (res) => {
    await dispatch(successRestart(false));
  }).catch((err) => {
    dispatch(failedRestart(err.message));
  }).finally(() => {
    dispatch(sendRestart(false));
  });
}


export const sendingReset = (isLoading) => ({
  type: VEHICLE_GPRS_RESET,
  payload: isLoading
});

export const successReset = (isLoading) => ({
  type: VEHICLE_GPRS_RESET_SUCCESS,
  payload: isLoading,
});

export const failedReset = () => ({
  type: VEHICLE_GPRS_RESET_FAILED,
});

export const sendGprsReset = () => (dispatch) => {
  dispatch(sendingReset(true));
  vehicleService.sendGprsReset(token).then(async (res) => {
    await dispatch(successReset(false));
  }).catch((err) => {
    dispatch(failedReset(err.message));
  }).finally(() => {
    dispatch(sendingReset(false));
  });
}

export const sendingConfirmNotify = (isLoading) => ({
  type: VEHICLE_CONFIRM_NOTIFY_SETTINGS,
  payload: isLoading
});

export const successConfirmNotify = (payload) => ({
  type: VEHICLE_CONFIRM_NOTIFY_SETTINGS_SUCCESS,
  payload: payload,
});

export const failedConfirmNotify = () => ({
  type: VEHICLE_CONFIRM_NOTIFY_SETTINGS_FAILED,
});

export const confirmNotificationSettings = (token, deviceImei,
  isVibration, isMovement, isStop, isEnterZone, isSortZone, isOverspeed, isDetachment, navigation) => (dispatch) => {
    dispatch(sendingConfirmNotify(true));
    vehicleService.confirmNotificationSettings(token, deviceImei,
      isVibration, isMovement, isStop, isEnterZone, isSortZone, isOverspeed, isDetachment).then(async (res) => {
      await dispatch(successConfirmNotify(res.data));
    }).catch((err) => {
      dispatch(failedConfirmNotify(err.message));
    }).finally(() => {
      dispatch(sendingConfirmNotify(false));
    });
  }