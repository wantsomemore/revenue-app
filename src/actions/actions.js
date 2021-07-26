import {
  GET_COIN_SUCCESSFULLY,
  GET_COIN_FAILED,
  GET_COIN_FETCHING,
  GET_LIST_SUCCESSFULLY,
  GET_LIST_FAILED,
  GET_LIST_FETCHING,
} from "../reducers";
import axios from "axios";

const listUrl = "/list";

const fetchList = () => {
  return {
    type: GET_LIST_FETCHING
  };
};

const fetchListSuccessfully = (list) => {
  return {
    type: GET_LIST_SUCCESSFULLY,
    payload: {
      list
    },
  };
};

const fetchListFailed = () => {
  return {
    type: GET_LIST_FAILED
  };
};

const fetchCoin = () => {
  return {
    type: GET_COIN_FETCHING
  };
};

const fetchCoinSuccessfully = (coin) => {
  return {
    type: GET_COIN_SUCCESSFULLY,
    payload: {
      coin
    },
  };
};

const fetchCoinFailed = () => {
  return {
    type: GET_COIN_FAILED
  };
};

export const fetchListData = () => {
  return (dispatch) => {
    const fetchData = async () => {
      dispatch(fetchList());
      const response = await axios.get(listUrl);
      if (response.statusText === "OK") {
        const data = await response.data;
        dispatch(fetchListSuccessfully(data));
      } else {
        dispatch(fetchListFailed());
      }
    };
    fetchData();
  };
};

export const fetchCoinData = (payload) => {
  return (dispatch) => {
    dispatch(fetchCoin());
    const fetchData = async () => {
      const response = await axios.get(`${payload}`);
      if (response.statusText === "OK") {
        const data = await response.data;
        dispatch(fetchCoinSuccessfully(data.data.filter(item => item.curency !== 'null')));
      } else {
        dispatch(fetchCoinFailed());
      }
    };
    fetchData();
  };
};
