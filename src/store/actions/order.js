import * as actionTypes from "./actionTypes";
import axiosInstance from "../../axios-orders";

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseBurger = orderData => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axiosInstance
      .post(
        "./orders.json" + "/?auth=TGS3sr5gbBmZ2FzcBzqZnEOqdVXtYkUqRl1Kc04a",
        orderData
      )
      .then(response => {
        dispatch(purchaseBurgerSuccess(response, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const purchaseBurgerSuccess = (response, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderData: orderData,
    orderId: response.data.name
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchIngredientSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchIngredientStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchIngredientFailed = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error: error
  };
};

export const fetchOrdersInit = () => {
  return dispatch => {
    dispatch(fetchIngredientStart());
    axiosInstance
      .get("/orders.json")
      .then(response => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({ id: key, ...response.data[key] });
        }
        dispatch(fetchIngredientSuccess(fetchedOrders));
      })
      .catch(error => {
        dispatch(fetchIngredientFailed(error));
      });
  };
};
