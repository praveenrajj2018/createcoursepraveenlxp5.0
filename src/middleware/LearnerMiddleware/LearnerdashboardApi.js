import { FETCH_DASHBOARD_REQUEST, FetchDashboardSuccess, FetchDashboardFailure } from "../../actions/LearnerAction/LearnerdashboardAction";
import axios from 'axios';
const LearnerdashboardApi = ({ dispatch }) => (next) => async (action) => {
    if (action.type === FETCH_DASHBOARD_REQUEST) {
        try {
            console.log("act", action.payload);
            const response = await axios.get(`http://localhost:5199/lxp/learner/LearnerDashboard/${action.payload}`);
            console.log("dashboardcount", response.data);
            dispatch(FetchDashboardSuccess(response.data.data))
        } catch (error) {
            dispatch(FetchDashboardFailure(error))
        }
    }
    return next(action)
}

export default LearnerdashboardApi;