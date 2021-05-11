import axios from "axios";
import env from "./env";
import _ from 'lodash';

const instance = axios.create({
  baseURL: env.api,
});

instance.interceptors.request.use(
  function (config) {
    config.headers.token = localStorage.getItem("ap-token");
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(null, function(error){
  let code = _.get(error, 'response.data.code', '');
  if(code === 'session-expired'){
    localStorage.clear();
    window.location.href = `${env.url}/`; 
  }
  return Promise.reject(error);
});

const doGet = async (route, params) => {
  try{
    let result = await instance.get(route, { params });
    return result.data;
  } catch(error){
    return _.get(error, 'response.data', {});
  }
};

const doPost = async (route, data) => {
  try{
    let result = await instance.post(route, data);
    return result.data;
  } catch(error){
    return _.get(error, 'response.data', {});
  }
};

const doPut = async (route, data) => {
  try{
    let result = await instance.put(route, data);
    return result.data;
  } catch(error){
    return _.get(error, 'response.data', {});
  }
};

const doDelete = async (route, data) => {
  try{
    let result = await instance.delete(route, data);
    return result.data;
  } catch(error){
    return _.get(error, 'response.data', {});
  }
};

export const listInventory = () => doGet("/inventory");
export const getInventoryById = (id) => doGet(`/inventory/${id}`);
export const createInventory = (data) => doPost("/inventory", data);
export const editInventory = (id, data) => doPut(`/inventory/${id}`, data);
export const deleteInventory = (id) => doDelete(`/inventory/${id}`);

export const listLabs = () => doGet("/laboratory");
export const getLabById = (id) => doGet(`/laboratory/${id}`);
export const createLab = (data) => doPost("/laboratory", data);
export const editLab = (id, data) => doPut(`/laboratory/${id}`, data);
export const deleteLab = (id) => doDelete(`/laboratory/${id}`);

export const listSchedule = () => doGet("/schedule");
export const getScheduleById = (id) => doGet(`/schedule/${id}`);
export const createSchedule = (data) => doPost("/schedule", data);
export const editSchedule = (id, data) => doPut(`/schedule/${id}`, data);
export const deleteSchedule = (id) => doDelete(`/schedule/${id}`);

export const listLicense = () => doGet("/license");
export const getLicenseById = (id) => doGet(`/license/${id}`);
export const createLicense = (data) => doPost("/license", data);
export const editLicense = (id, data) => doPut(`/license/${id}`, data);
export const deleteLicense = (id) => doDelete(`/license/${id}`);

export const authenticate = (data) => doPost(`/authenticate`, data);
