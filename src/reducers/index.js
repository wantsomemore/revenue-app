let initialState = {
  list: [],
  coin: [],
  isFetched: false,
  notification: {
    status: 'loading',
    message: 'Data is fetching...'}
};
export const GET_LIST_SUCCESSFULLY = 'GET_LIST_SUCCESSFULLY';
export const GET_LIST_FAILED = 'GET_LIST_FAILED';
export const GET_LIST_FETCHING = 'GET_LIST_FETCHING';

export const GET_COIN_SUCCESSFULLY = 'GET_COIN_SUCCESSFULLY';
export const GET_COIN_FAILED = 'GET_COIN_FAILED';
export const GET_COIN_FETCHING = 'GET_LIST_FETCHING';


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_FETCHING:
      return {
        ...state,
        isFetched: true,
        notification: {
          status: 'loading',
          message: 'List of coins is fetching...'
        }
      }
    case GET_LIST_SUCCESSFULLY:
      return {
        ...state,
        list: action.payload.list,
        notification: {
          status: 'success',
          message: 'Great! List of coins fetched successfully!'
        }
      }
    case GET_LIST_FAILED: 
      return {
        ...state,
        notification: {
          status: 'failed',
          message: 'Error! List of coins doesn\'t fetched:('
        }
      }
      case GET_COIN_FETCHING:
        return {
          ...state,
          isFetched: true,
          notification: {
            status: 'loading',
            message: 'Coin details os fetching...'
          }
        }
    case GET_COIN_SUCCESSFULLY:
      return {
        ...state,
        coin: action.payload.coin,
        notification: {
          status: 'success',
          message: 'Great! Coin details fetched successfully!'
        }
      }
    case GET_COIN_FAILED: 
      return {
        ...state,
        notification: {
          status: 'failed',
          message: 'Error! Coin details is not fetched:('
        }
        }
    default:
      return state
  }
}
export default reducer