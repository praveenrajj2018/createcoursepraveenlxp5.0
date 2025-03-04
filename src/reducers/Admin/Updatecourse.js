
import { UPDATE_COURSES_REQUEST,RESET_UPDATE_COURSES, UPDATE_COURSES_SUCCESS, UPDATE_COURSES_FAILURE } from "../../actions/Admin/Updatecourse";

const initialState = {
  courses: [],
  loading: false,
  error: null,
  message: null,
  isUpdated: false

};

const courseupdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COURSES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_COURSES_SUCCESS:
      const updatedCourses = state.courses.map((course) =>
        course.courseId === action.payload.courseId ? { ...course, ...action.payload } : course
      );
      console.log("updatereducer", action.payload);
      return {
        ...state,
        loading: false,
        courses: updatedCourses,
        message: action.payload,
        isUpdated: true, // This should match the initialState property name
        error: null,
      };
    case UPDATE_COURSES_FAILURE:
      return {
        ...state,
        loading: false,
        isUpdated: false, // This should match the initialState property name
        error: action.payload,
      };
    case RESET_UPDATE_COURSES:
      return {
        ...state,
        isUpdated: false,
      };
    default:
      return state;
  }
};

export default courseupdateReducer;