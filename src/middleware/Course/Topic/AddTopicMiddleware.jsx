import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {CREATE_TOPICS_REQUEST,SET_TOPICS_STATUS,createTopicsSuccess,createTopicsFailure, createTopicsExists} from '../../../actions/Course/Topic/AddTopicAction'



const API_URL = 'http://localhost:5199/lxp/course/topic';

 const addTopic = ({ dispatch,getState}) => (next) =>async (action) => {
  
  if (action.type === CREATE_TOPICS_REQUEST ) {
  console.log("isRequesting", getState().Topic);
  const ReducerData = getState().Topic;
  if (!ReducerData.isRequesting) {
    dispatch({ type: SET_TOPICS_STATUS, payload: true });
    
    try {
      const response = await axios.post(API_URL,action.payload);
      console.log('API Response1:', response.data); // Log the response data
      if(response.data.statusCode==412){
        dispatch(createTopicsExists());
      }
      else{
        dispatch(createTopicsSuccess(response.data.data)); // Dispatch success action with the response data
        console.log("successfullresponse",response.data.data)
      }
     
       
    } 
    catch (error) {
      console.error('API Error:', error.message);
      dispatch(createTopicsFailure(error.message));
    } finally{
      dispatch({type:SET_TOPICS_STATUS,payload:false})
      
      }
    }
 }
  return next(action);
  
};

export default addTopic;

