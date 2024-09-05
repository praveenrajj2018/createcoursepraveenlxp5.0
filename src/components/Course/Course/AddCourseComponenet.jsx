// import React, { useState, useEffect } from "react";
// // import "../../../style/Course/Course/AddCourse.css";
// import "../../../Styles/Course/Course/AddCourse.css";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Form,
//   Modal,
//   Image,
//   CloseButton,
//   CardHeader,
// } from "react-bootstrap";
// import { useDispatch, connect, useSelector } from "react-redux";
// import {
//   createCoursesRequest,
//   createCoursesSuccess,
//   fetchLevelRequest,
//   RESET_EXISTEDCOURSE_MESSAGE,
//   RESET_SUCCESSCOURSE_MESSAGE,
// } from "../../../actions/Course/Course/AddCourseAction";
// import { GiCancel } from "react-icons/gi";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { validateForm } from "../../../utils/Course/Course/AddCourseValidation";

// // import { createCategoryrequest } from "../../../action/Course/Category/AddCategoryAction";
// import {
//   createCategoryrequest,
//   RESET_THE_SUBMITTED_MESSGAE,
//   RESET_EXISTED_MESSAGE,
// } from "../../../actions/Course/Category/AddCategoryAction";
// import { useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import {
//   Dialog,
//   TextField,
//   DialogContent,
//   DialogTitle,
//   DialogActions,
//   Button,
//   Alert,
//   Stack,
//   Box,
//   MenuItem,
//   FormControl,
//   FormHelperText,
//   CardContent,
// } from "@mui/material";
// import CheckIcon from "@mui/icons-material/Check";
// import { validateCategory } from "../../../utils/Course/Course/AddCourseValidation";
// // import { fetchCategoryRequest } from "../../../action/Course/Category/FetchCategoryAction";
// import { fetchCategoryRequest } from "../../../actions/Course/Category/FetchCategoryAction";
// import Swal from "sweetalert2";

// const AddCourse = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [coursecategory, setCategory] = useState([]);
//   const [courselevel, setLevel] = useState([]);
//   const [categoryErrors, setCategoryErrors] = useState({});
//   const [category, setAddCategory] = useState({
//     category: "",
//     createdBy: "Asha",
//   });
//   const [open, setOpen] = React.useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [course, setCourse] = useState({
//     title: "",
//     level: "",
//     category: "",
//     description: "",
//     createdby: "Asha",
//     duration: "",
//     thumbnailimage: null,
//   });
//   //If course is created then navigate to course creation  page\
//   const courseid = useSelector((state) => state.addcourse.course_id);
//   const [cduration, setCDuration] = useState(0);

//   //  const isSubmits = useSelector((state) => state.addcourse);
//   const isSubmit = useSelector((state) => state.addcourse.isSubmitted);
//   //  const CourseId= useSelector((state)=>state.AddCourse.course_id)
//   //  console.log("checkcoursecontent",isSubmits);
//   useEffect(() => {
//     if (isSubmit) {
//       // console.log("oppp",courseid);
//       // const courseid = useSelector((state) => state.addcourse.course_id);
//       dispatch({ type: RESET_SUCCESSCOURSE_MESSAGE });
//       navigate(`/coursecontent/${courseid}`); // Navigate to the next page on success
//     }
//   }, [isSubmit, navigate]);
//   //success message for adding category
//   const addCategorySuccessState = useSelector(
//     (state) => state.addCategory.isSuccess
//   );
//   const addCategoryFailureState = useSelector(
//     (state) => state.addCategory.isFailure
//   );
//   //   const categorySuccessMsg=useSelector((state)=>state.addCategory.message)
//   const [successMsg, setSuccessMsg] = useState("");
//   useEffect(() => {
//     if (addCategorySuccessState) {
//       handleClose();

//       const Toast = Swal.mixin({
//         toast: true,
//         position: "top-end",
//         showConfirmButton: false,
//         timer: 3000,
//         timerProgressBar: true,
//         didOpen: (toast) => {
//           toast.onmouseenter = Swal.stopTimer;
//           toast.onmouseleave = Swal.resumeTimer;
//         },
//       });
//       Toast.fire({
//         icon: "success",
//         title: "Category added successfully",
//       });
//       dispatch({ type: RESET_THE_SUBMITTED_MESSGAE });

//       // setSuccessMsg('Category added successfully');

//       // const timer = setTimeout(() => {
//       //   setSuccessMsg('');
//       // }, 7000);

//       // // Clear the timeout if the component unmounts
//       // return () => clearTimeout(timer);
//     }
//   }, [addCategorySuccessState]);
//   const [failurMsg, setFailureMsg] = useState("");
//   useEffect(() => {
//     if (addCategoryFailureState) {
//       handleClose();
//       // setFailureMsg('Category already exists');
//       // const timer = setTimeout(() => {
//       //   setFailureMsg('');
//       // }, 7000);

//       // // Clear the timeout if the component unmounts
//       // return () => clearTimeout(timer);

//       const Toast = Swal.mixin({
//         toast: true,
//         position: "top-end",
//         showConfirmButton: false,
//         timer: 3000,
//         timerProgressBar: true,
//         didOpen: (toast) => {
//           toast.onmouseenter = Swal.stopTimer;
//           toast.onmouseleave = Swal.resumeTimer;
//         },
//       });
//       Toast.fire({
//         icon: "warning",
//         title: "Category already exists",
//       });
//       dispatch({ type: RESET_EXISTED_MESSAGE });
//     }
//   }, [addCategoryFailureState]);

//   const [servererror, setserverrError] = useState("");
//   const InternalError = useSelector((state) => state.addCategory.isError);
//   useEffect(() => {
//     if (InternalError) {
//       handleClose();
//       // setserverrError('Internal Server error occured');
//       // const timer = setTimeout(() => {
//       //   setserverrError('');
//       // }, 7000);

//       // // Clear the timeout if the component unmounts
//       // return () => clearTimeout(timer);
//       const Toast = Swal.mixin({
//         toast: true,
//         position: "top-end",
//         showConfirmButton: false,
//         timer: 3000,
//         timerProgressBar: true,
//         didOpen: (toast) => {
//           toast.onmouseenter = Swal.stopTimer;
//           toast.onmouseleave = Swal.resumeTimer;
//         },
//       });
//       Toast.fire({
//         icon: "error",
//         title: "Internal Server error occured",
//       });
//     }
//   }, [InternalError]);

//   //If course is already exists
//   const isExist = useSelector((state) => state.addcourse.isExists);
//   console.log("isEx", isExist);

//   const [existMsg, setExistMsg] = useState("");
//   useEffect(() => {
//     if (isExist) {
//       const Toast = Swal.mixin({
//         toast: true,
//         position: "top-end",
//         showConfirmButton: false,
//         timer: 3000,
//         timerProgressBar: true,
//         didOpen: (toast) => {
//           toast.onmouseenter = Swal.stopTimer;
//           toast.onmouseleave = Swal.resumeTimer;
//         },
//       });
//       Toast.fire({
//         icon: "warning",
//         title: "Course already exists",
//       });
//       dispatch({ type: RESET_EXISTEDCOURSE_MESSAGE });
//     }
//   }, [isExist]);

//   //if internal message occurs for creating course
//   const [failure, setFailure] = useState("");
//   const isFailure = useSelector((state) => state.course.isError);
//   useEffect(() => {
//     if (isFailure) {
//       // setFailure('Internal Server error occured');
//       const Toast = Swal.mixin({
//         toast: true,
//         position: "top-end",
//         showConfirmButton: false,
//         timer: 3000,
//         timerProgressBar: true,
//         didOpen: (toast) => {
//           toast.onmouseenter = Swal.stopTimer;
//           toast.onmouseleave = Swal.resumeTimer;
//         },
//       });
//       Toast.fire({
//         icon: "error",
//         title: "Internal Server error occured",
//       });
//     }
//   }, [isFailure]);

//   const fetchCategory = useSelector((state) => state.category.courses);

//   const fetchLevel = useSelector((state) => state.level.courses);

//   const fetchData = async () => {
//     // try {
//     //   const categoryResponse = await axios.get(
//     //     "http://localhost:5199/lxp/course/category"
//     //   );
//     //   setCategory(categoryResponse.data.data);
//     //   const levelResponse = await axios.get(
//     //     "http://localhost:5199/lxp/course/courselevel/ash"
//     //   );
//     //   setLevel(levelResponse.data.data);
//     // } catch (error) {
//     //   console.error("Error fetching data:", error);
//     // }
//     dispatch(fetchCategoryRequest());
//   };
//   useEffect(() => {
//     fetchData();
//     dispatch(fetchLevelRequest());
//   }, []);

//   const handleClickOpen = async () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setAddCategory("");
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const isFormValid = validateForm(course, setErrors);

//     if (isFormValid) {
//       try {
//         console.log("form", course);
//         dispatch(createCoursesRequest(course));
//       } catch (error) {
//         console.error("Error creating course:", error);
//       }
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCourse({ ...course, [name]: value });
//     //  setCourse({ ...course, [e.target.name]: e.target.value });
//     if (name === "category" && value === "Add category") {
//       // Show modal for adding a new category
//       handleClickOpen();
//     }
//   };
//   const handleInputCategory = (e) => {
//     setAddCategory({ ...category, [e.target.name]: e.target.value });
//   };
//   // const handleCategory = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     console.log("category add", category);
//   //     dispatch(createCategoryrequest(category));

//   //   } catch (error) {
//   //     window.alert("Error occured in adding category", error);
//   //   }
//   // };

//   const handleCategory = async (e) => {
//     e.preventDefault();
//     const isCategoryValid = validateCategory(category, setCategoryErrors);

//     if (isCategoryValid) {
//       // fetchData();
//       handleClose(); // This will close the modal

//       try {
//         console.log("category add", category);
//         dispatch(createCategoryrequest(category));
//       } catch (error) {
//         window.alert("Error occurred in adding category", error);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [category]); // Dependency array with category to re-run fetchData when category changes

//   const handleThumbnailChange = (event) => {
//     if (event.target.files && event.target.files[0]) {
//       setCourse((prevCourse) => ({
//         ...prevCourse,
//         thumbnailimage: event.target.files[0],
//       }));
//       const file = event.target.files[0];
//       setSelectedImage(URL.createObjectURL(file));
//     }
//   };

//   const removeThumbnail = () => {
//     setSelectedImage(null);
//   };

//   const onDrop = useCallback((acceptedFiles) => {
//     console.log(acceptedFiles);
//     // Handle the files
//     const file = acceptedFiles[0];
//     // Create a URL for the file
//     const fileUrl = URL.createObjectURL(file);
//     setSelectedImage(fileUrl);
//     handleThumbnailChange({ target: { files: [file] } });
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: "image/*",
//   });

//   const [progress, setProgress] = useState(1);
//   const percentage = Math.round((progress / 6) * 100);

//   const containerStyles = {
//     height: 5,
//     width: "100%",
//     backgroundColor: "white",
//     borderRadius: 20,
//     // marginLeft:'10px'

//     //margin: 50,
//   };

//   const fillerStyles = {
//     height: "100%",
//     width: `${percentage}%`,
//     backgroundColor: "blue", // Change this color as needed
//     borderRadius: "inherit",
//     textAlign: "right",
//     // marginLeft:'10px'
//   };

//   const labelStyles = {
//     padding: 5,
//     color: "white",
//     fontWeight: "bold",
//   };
//   const [step, setStep] = useState(1);
//   const handleContinue = () => {
//     // const isFormValid = alidateForm(course, setErrors);

//     // if (isFormValid) {
//     setProgress(progress + 1);

//     setStep(step + 1);
//     // }else{

//     //   setErrors({})

//     // }
//   };
//   const handlePrevious = () => {
//     setProgress(progress - 1);
//     setStep(step - 1);
//   };

//   return (

// <>
//=================================case 1=======================================================
//       <Container style={{ background: 'white' }}>
//         <Form onSubmit={handleSubmit}>
//           <Row>
//             {/* <Row
//               className="mt-5"
//               style={{
//                 boxShadow: '1px 2px 9px #F0F0F0',
//                 height: '60px',
//                 marginLeft: '10px',
//               }}
//             >
//               <h6 style={{ paddingTop: '20px', fontWeight: 'bold' }}>Step 6 of 6</h6> */}
//               {/* Assuming percentage is a fixed value or can be calculated */}
//               {/* <Row style={{ flexGrow: 1, marginTop: '1rem' }}>
//                 <Row style={{ flexGrow: 1, backgroundColor: '#E0E0E0', height: '10px' }}>
//                   <span style={{ backgroundColor: '#50C878', height: '100%', display: 'block', width: '100%' }}></span>
//                 </Row>
//               </Row>
//             </Row> */}

//             <Row style={{ height: '90vh' ,marginBottom:'1230px'}} className="mt-1 d-flex justify-content-center align-items-center">
//               <Row className="d-flex justify-content-center align-items-center">
//                 <h4 className="mb-3 d-flex justify-content-center align-items-center">
//                   Course Title
//                 </h4>

//                 <Col></Col>
//                 <Col>
//                   <FormControl className="mt-3" fullWidth>
//                     <TextField
//                       type="text"
//                       name="title"
//                       placeholder="eg : Learn Reactjs from scratch"
//                       label="Course title"
//                       fullWidth
//                       autoFocus
//                       error={Boolean(errors.title)}
//                       helperText={errors.title}
//                       value={course.title}
//                       onChange={handleInputChange}
//                     />
//                   </FormControl>
//                 </Col>
//                 <Col></Col>
//               </Row>

//               <Row className="d-flex justify-content-center align-items-center">
//                 <h4 className="mb-3 d-flex justify-content-center align-items-center">
//                   Course Category
//                 </h4>

//                 <Col></Col>
//                 <Col>
//                   <FormControl className="mt-3" fullWidth>
//                     <TextField
//                       select
//                       name="category"
//                       onChange={handleInputChange}
//                       fullWidth
//                       label="Course Category"
//                       placeholder="Select Category"
//                       error={Boolean(errors.category)}
//                       helperText={errors.category}
//                     >
//                       {fetchCategory.map((category) => (
//                         <MenuItem key={category.categoryId} value={category.categoryId}>
//                           {category.category}
//                         </MenuItem>
//                       ))}
//                       <MenuItem
//                         value="Add category"
//                         style={{ color: '#050C9C' }}
//                         onClick={() => setOpen(true)}
//                       >
//                         + Add Category
//                       </MenuItem>
//                     </TextField>
//                   </FormControl>
//                 </Col>
//                 <Col></Col>
//               </Row>

//               <Row className="d-flex justify-content-center align-items-center">
//                 <h4 className="mb-3 d-flex justify-content-center align-items-center">
//                  Course Level
//                 </h4>

//                 <Col></Col>
//                 <Col>
//                   <FormControl className="mb-3" fullWidth>
//                     <TextField
//                       name="level"
//                       select
//                       onChange={handleInputChange}
//                       label="Course Level"
//                       fullWidth
//                       error={Boolean(errors.level)}
//                       helperText={errors.level}
//                       placeholder="Select Level"
//                     >
//                       {fetchLevel.map((level) => (
//                         <MenuItem key={level.levelId} value={level.levelId}>
//                           {level.level}
//                         </MenuItem>
//                       ))}
//                     </TextField>
//                   </FormControl>
//                 </Col>
//                 <Col></Col>
//               </Row>

//               <Row className="d-flex justify-content-center align-items-center">
//                 <h4 className="mb-3 d-flex justify-content-center align-items-center">
//                   course duration
//                 </h4>

//                 <Col></Col>
//                 <Col>
//                   <FormControl className="mb-3" fullWidth>
//                     <TextField
//                       margin="dense"
//                       id="name"
//                       label="Course Duration (in hrs)"
//                       fullWidth
//                       type="number"
//                       helperText={errors.duration}
//                       error={Boolean(errors.duration)}
//                       InputProps={{
//                         inputProps: {
//                           min: 0,
//                           max: 30,
//                           step: 1,
//                         },
//                       }}
//                       placeholder="Course Duration (in hrs)"
//                       name="duration"
//                       value={cduration}
//                       onChange={(e) => {
//                         setCDuration(e.target.value);
//                         setCourse({
//                           ...course,
//                           duration: `${parseFloat(e.target.value)}:00:00`,
//                         });
//                       }}
//                     />
//                   </FormControl>
//                 </Col>
//                 <Col></Col>
//               </Row>
// {/* ===============================================case 2====================================================================== */}
//               <Row className="d-flex justify-content-center align-items-center">
//                 <h4 className="mb-3 d-flex justify-content-center align-items-center">
//                   Describe your course
//                 </h4>

//                 <Col></Col>
//                 <Col>
//                   <FormControl className="mb-3" fullWidth>
//                     <TextField
//                       type="text"
//                       label="Description"
//                       multiline
//                       rows={3}
//                       placeholder="e.g.: This course covers key React concepts such as JSX, components, state, props, and hooks. You’ll learn how to build powerful interactive web applications using React. The syllabus includes 11 lessons, 7 projects, and quizzes."
//                       name="description"
//                       value={course.description}
//                       error={Boolean(errors.description)}
//                       helperText={errors.description}
//                       onChange={handleInputChange}
//                     />
//                   </FormControl>
//                 </Col>
//                 <Col></Col>
//               </Row>
// {/* ====================================================case 3=========================================================================== */}
//               <Row className="d-flex justify-content-center align-items-center">
//                 <h4 className="mb-3 d-flex justify-content-center align-items-center">
//                   Provide the best thumbnail for your course
//                 </h4>

//                 <Col></Col>
//                 <Col>
//                   <FormControl className="mb-3" fullWidth>
//                     <Box className="course-thumbnail" style={{ border: '1px dashed gray', paddingRight: '500px',paddingLeft:'10px',paddingTop:"150px", textAlign: 'center' }}>
//                       <Card.Body className="text-center">
//                         <input type="file" style={{width:'320px'}} onChange={(e) => {
//                           const file = e.target.files[0];
//                           if (file) {
//                             setSelectedImage(URL.createObjectURL(file));
//                             setCourse({
//                               ...course,
//                               thumbnailimage: file,
//                             });
//                           }
//                         }} />
//                         {selectedImage ? (
//                           <Card>
//                             <CloseButton
//                               className="position-absolute top-0 end-0"
//                               style={{ color: 'red' }}
//                               onClick={removeThumbnail}
//                               aria-label="Remove image"
//                             />
//                             <img
//                               className="thumbnail-image"
//                               src={selectedImage}
//                               alt="Course thumbnail"
//                               style={{ width: '100%', height: 'auto' }}
//                             />
//                           </Card>
//                         ) : (
//                           <p style={{paddingLeft:'220px',}}>
//                             Click to select a thumbnail image or{' '}
//                             <span className="upload-link">Click to upload</span>
//                           </p>
//                         )}
//                       </Card.Body>
//                     </Box>
//                     {errors.thumbnailimage && (
//                       <p className="error">{errors.thumbnailimage}</p>
//                     )}
//                   </FormControl>
//                 </Col>
//                 <Col></Col>
//               </Row>

//               <Row>
//                 <Row className="mb-3 d-flex justify-content-center align-items-center">
//                   {errors.title && (
//                     <h6 className="error mb-2 d-flex justify-content-center align-items-center">
//                       *{errors.title}
//                     </h6>
//                   )}
//                 </Row>
//                 <Row className="mb-3 d-flex justify-content-center align-items-center">
//                   {errors.description && (
//                     <h6 className="error mb-2 d-flex justify-content-center align-items-center">
//                       *{errors.description}
//                     </h6>
//                   )}
//                 </Row>
//                 <Row className="mb-3 d-flex justify-content-center align-items-center">
//                   {errors.thumbnailimage && (
//                     <h6 className="error mb-2 d-flex justify-content-center align-items-center">
//                       *{errors.thumbnailimage}
//                     </h6>
//                   )}
//                 </Row>
//                 <Row className="mb-3 d-flex justify-content-center align-items-center">
//                   {errors.category && (
//                     <h6 className="error mb-2 d-flex justify-content-center align-items-center">
//                       *{errors.category}
//                     </h6>
//                   )}
//                 </Row>
//                 <Row className="mb-3 d-flex justify-content-center align-items-center">
//                   {errors.level && (
//                     <h6 className="error mb-2 d-flex justify-content-center align-items-center">
//                       *{errors.level}
//                     </h6>
//                   )}
//                 </Row>
//                 <Row className="mb-3 d-flex justify-content-center align-items-center">
//                   {errors.duration && (
//                     <h6 className="error mb-2 d-flex justify-content-center align-items-center">
//                       *{errors.duration}
//                     </h6>
//                   )}
//                 </Row>
//               </Row>
//             </Row>
//           </Row>
//           <footer>
//             <Row
//               style={{
//                 boxShadow: '1px 2px 9px #F0F0F0',
//                 height: '60px',
//                 marginLeft: '10px',
//               }}
//             >
//               <Col md={6} xs={6} className="mt-3">
//                 <Button variant="contained" type="submit">Submit</Button>
//               </Col>
//               <Col
//                 md={6}
//                 xs={6}
//                 className="d-flex justify-content-end align-items-end"
//               >
//                 {/* No 'Continue' button needed since it's a single form */}
//               </Col>
//             </Row>
//           </footer>
//         </Form>
//       </Container>
//       <Modal show={open} onHide={handleClose} centered>
//         <Form onSubmit={handleCategory}>
//           <Modal.Header closeButton>
//             <Modal.Title>Add Category</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form.Group className="mb-3" controlId="category">
//               <Form.Label>Enter new category</Form.Label>
//               <Form.Control
//                 name="category"
//                 type="text"
//                 autoFocus
//                 value={category.category}
//                 onChange={handleInputCategory}
//                 isInvalid={!!categoryErrors.category}
//               />
//               <Form.Control.Feedback type="invalid">
//                 {categoryErrors.category}
//               </Form.Control.Feedback>
//             </Form.Group>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleClose}>
//               Cancel
//             </Button>
//             <Button variant="primary" type="submit">
//               Add
//             </Button>
//           </Modal.Footer>
//         </Form>
//       </Modal>
//     </>



//   );
// };

// export default AddCourse;
//online payment system
//-------------------------------------------------------------------------------------























import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import React, { useState, useEffect } from "react";
import "../../../Styles/Course/Course/AddCourse.css";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Modal,
  Image,
  CloseButton,
  CardHeader,
} from "react-bootstrap";
import { useDispatch, connect, useSelector } from "react-redux";
import {
  createCoursesRequest,
  createCoursesSuccess,
  fetchLevelRequest,
  RESET_EXISTEDCOURSE_MESSAGE,
  RESET_SUCCESSCOURSE_MESSAGE,
} from "../../../actions/Course/Course/AddCourseAction";
import { useNavigate } from "react-router-dom";
import { validateForm } from "../../../utils/Course/Course/AddCourseValidation";
import {
  createCategoryrequest,
  RESET_THE_SUBMITTED_MESSGAE,
  RESET_EXISTED_MESSAGE,
} from "../../../actions/Course/Category/AddCategoryAction";
import {
  Dialog,
  TextField,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Alert,
  Stack,
  Box,
  MenuItem,
  FormControl,
  FormHelperText,
  CardContent,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { validateCategory } from "../../../utils/Course/Course/AddCourseValidation";
import { fetchCategoryRequest } from "../../../actions/Course/Category/FetchCategoryAction";
import Swal from "sweetalert2";


import "../../../Styles/Course/Course/AddCourse.css";

const Tab = ({ number, label, onClick, isActive }) => (
  <div
    onClick={() => onClick(number)}
    className={`tab ${isActive ? 'active' : ''}`}
    style={{ display: 'flex', alignItems: 'center', position: 'relative' }}
  >
    <div className="circle" style={{ position: 'relative', zIndex: 1 }}>{number}</div>
    <div className="label" style={{ marginLeft: '10px' }}>{label}</div>
    {number < 3 && (
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '130%',
          width: '135%',
          height: '2px',
          backgroundColor: '#C7C8CC', // Adjust color as needed
          zIndex: 0,
        }}
      />
    )}
  </div>
);



const Contents = ({ activeTab }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [coursecategory, setCategory] = useState([]);
  const [courselevel, setLevel] = useState([]);
  const [categoryErrors, setCategoryErrors] = useState({});
  const [category, setAddCategory] = useState({
    category: "",
    createdBy: "Asha",
  });
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [course, setCourse] = useState({
    title: "",
    level: "",
    category: "",
    description: "",
    createdby: "Asha",
    duration: "",
    thumbnailimage: null,
  });
  const courseid = useSelector((state) => state.addcourse.course_id);
  const [cduration, setCDuration] = useState(0);

  const isSubmit = useSelector((state) => state.addcourse.isSubmitted);
  useEffect(() => {
    if (isSubmit) {
      dispatch({ type: RESET_SUCCESSCOURSE_MESSAGE });
      navigate(`/coursecontent/${courseid}`); // Navigate to the next page on success
    }
  }, [isSubmit, navigate]);
  //success message for adding category
  const addCategorySuccessState = useSelector(
    (state) => state.addCategory.isSuccess
  );
  const addCategoryFailureState = useSelector(
    (state) => state.addCategory.isFailure
  );
  const [successMsg, setSuccessMsg] = useState("");
  useEffect(() => {
    if (addCategorySuccessState) {
      handleClose();

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Category added successfully",
      });
      dispatch({ type: RESET_THE_SUBMITTED_MESSGAE });


    }
  }, [addCategorySuccessState]);
  useEffect(() => {
    if (addCategoryFailureState) {
      handleClose();

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "warning",
        title: "Category already exists",
      });
      dispatch({ type: RESET_EXISTED_MESSAGE });
    }
  }, [addCategoryFailureState]);
  const InternalError = useSelector((state) => state.addCategory.isError);
  useEffect(() => {
    if (InternalError) {
      handleClose();

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: "Internal Server error occured",
      });
    }
  }, [InternalError]);

  //If course is already exists
  const isExist = useSelector((state) => state.addcourse.isExists);
  console.log("isEx", isExist);

  const [existMsg, setExistMsg] = useState("");
  useEffect(() => {
    if (isExist) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "warning",
        title: "Course already exists",
      });
      dispatch({ type: RESET_EXISTEDCOURSE_MESSAGE });
    }
  }, [isExist]);

 
  const isFailure = useSelector((state) => state.course.isError);
  useEffect(() => {
    if (isFailure) {
      // setFailure('Internal Server error occured');
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: "Internal Server error occured",
      });
    }
  }, [isFailure]);

  const fetchCategory = useSelector((state) => state.category.courses);

  const fetchLevel = useSelector((state) => state.level.courses);

  const fetchData = async () => {

    dispatch(fetchCategoryRequest());
  };
  useEffect(() => {
    fetchData();
    dispatch(fetchLevelRequest());
  }, []);

  const handleClickOpen = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAddCategory("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isFormValid = validateForm(course, setErrors);

    if (isFormValid) {
      try {
        console.log("form", course);
        dispatch(createCoursesRequest(course));
      } catch (error) {
        console.error("Error creating course:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
    //  setCourse({ ...course, [e.target.name]: e.target.value });
    if (name === "category" && value === "Add category") {
      // Show modal for adding a new category
      handleClickOpen();
    }
  };
  const handleInputCategory = (e) => {
    setAddCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleCategory = async (e) => {
    e.preventDefault();
    const isCategoryValid = validateCategory(category, setCategoryErrors);

    if (isCategoryValid) {
      // fetchData();
      handleClose(); // This will close the modal

      try {
        console.log("category add", category);
        dispatch(createCategoryrequest(category));
      } catch (error) {
        window.alert("Error occurred in adding category", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]); // Dependency array with category to re-run fetchData when category changes

  const handleThumbnailChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setCourse((prevCourse) => ({
        ...prevCourse,
        thumbnailimage: event.target.files[0],
      }));
      const file = event.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const removeThumbnail = () => {
    setSelectedImage(null);
  };

 


 
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const handleEditorChange = (state) => {
    setEditorState(state);
    setCourse({ ...course, description: state.getCurrentContent().getPlainText() });
  };

  switch (activeTab) {
    case 1:
      return <div><hr/>
        <Container >
          <Form onSubmit={handleSubmit} >
            <Row  className="mt-2  justify-content-center align-items-center" style={{width:'1470px',marginRight:'60px'}}>
              <Row className="d-flex justify-content-center align-items-center">
                <h4 className="mb-3 d-flex justify-content-center align-items-center"><b>COURSE TITLE</b></h4>
                <Col></Col>
                <Col>
                  <FormControl className="mt-3" fullWidth>
                    <TextField
                      type="text"
                      name="title"
                      placeholder="eg : Learn Reactjs from scratch"
                      label="Course title"
                      fullWidth
                      autoFocus
                      error={Boolean(errors.title)}
                      helperText={errors.title}
                      value={course.title}
                      onChange={handleInputChange}
                    /><br/>
                  </FormControl>
                </Col>
                <Col></Col>
              </Row>
              <Row className="d-flex justify-content-center align-items-center">
                <h4 className="mb-3 d-flex justify-content-center align-items-center"><b>COURSE CATEGORY</b></h4>
                <Col></Col>
                <Col>
                  <FormControl className="mt-3" fullWidth>
                    <TextField
                      select
                      name="category"
                      onChange={handleInputChange}
                      fullWidth
                      label="Course Category"
                      placeholder="Select Category"
                      error={Boolean(errors.category)}
                      helperText={errors.category}
                    >
                      {fetchCategory.map((category) => (
                        <MenuItem key={category.categoryId} value={category.categoryId}>
                          {category.category}
                        </MenuItem>
                      ))}
                      <MenuItem value="Add category" style={{ color: '#050C9C' }} onClick={() => setOpen(true)}>
                        + Add Category
                      </MenuItem>
                    </TextField><br/>
                  </FormControl>
                </Col>
                <Col></Col>
              </Row>
              <Row className="d-flex justify-content-center align-items-center">
                <h4 className="mb-3 d-flex justify-content-center align-items-center"><b>COURSE LEVEL</b></h4>
                <Col></Col>
                <Col>
                  <FormControl className="mb-3" fullWidth>
                    <TextField
                      name="level"
                      select
                      onChange={handleInputChange}
                      label="Course Level"
                      fullWidth
                      error={Boolean(errors.level)}
                      helperText={errors.level}
                      placeholder="Select Level"
                    >
                      {fetchLevel.map((level) => (
                        <MenuItem key={level.levelId} value={level.levelId}>
                          {level.level}
                        </MenuItem>
                      ))}
                    </TextField><br/>
                  </FormControl>
                </Col>
                <Col></Col>
              </Row>
              <Row className="d-flex justify-content-center align-items-center">
                <h4 className="mb-3 d-flex justify-content-center align-items-center"><b>COURSE DURATION</b></h4>
                <Col></Col>
                <Col>
                  <FormControl className="mb-3" fullWidth>
                    <TextField
                      margin="dense"
                      id="name"
                      label="Course Duration (in hrs)"
                      fullWidth
                      type="number"
                      helperText={errors.duration}
                      error={Boolean(errors.duration)}
                      InputProps={{ inputProps: { min: 0, max: 30, step: 1 } }}
                      placeholder="Course Duration (in hrs)"
                      name="duration"
                      value={cduration}
                      onChange={(e) => {
                        setCDuration(e.target.value);
                        setCourse({ ...course, duration: `${parseFloat(e.target.value)}:00:00` });
                      }}
                    />
                  </FormControl>
                </Col>
                <Col></Col>
              </Row>
              
            </Row>

          </Form>
          <Modal show={open} onHide={handleClose} centered>
            <Form onSubmit={handleCategory}>
              <Modal.Header closeButton>
                <Modal.Title>Add Category</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="mb-3" controlId="category">
                  <Form.Label>Enter new category</Form.Label>
                  <Form.Control
                    name="category"
                    type="text"
                    autoFocus
                    value={category.category}
                    onChange={handleInputCategory}
                    isInvalid={!!categoryErrors.category}
                  />
                  <Form.Control.Feedback type="invalid">
                    {categoryErrors.category}
                  </Form.Control.Feedback>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="primary" type="submit">Add</Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </Container>
      </div>;
    case 2:
      return <div><hr/>

        <Container style={{ background: 'white' }}>
          <Form onSubmit={handleSubmit}>
            <Row className="d-flex justify-content-center align-items-center">
              <h4 className="mb-3 d-flex justify-content-center align-items-center"><b>DESCRIBE YOUR COURSE</b></h4>
              <Col></Col>
              <Col>
                <Form.Group className="mb-3" controlId="courseDescription" >
                  <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor custom-editor"
                    onEditorStateChange={handleEditorChange}
                    placeholder="e.g.: This course covers key React concepts such as JSX, components, state, props, and hooks..."

                  />
                  {errors.description && (
                    <div className="error mb-2 d-flex justify-content-center align-items-center">
                      *{errors.description}
                    </div>
                  )}
                </Form.Group>
              </Col>
              <Col></Col>
            </Row>
          </Form>
        </Container>
      </div>
    case 3:
      return <div><hr/>
      <Container style={{ background: 'white' }}>
        <Form onSubmit={handleSubmit}>
          <Row className="d-flex justify-content-center align-items-center" >
            <h4 className="mb-3 d-flex justify-content-center align-items-center"><b>Provide the best thumbnail for your course</b></h4>
            <Col></Col>
            <Col>
              <FormControl className="mb-3" fullWidth>
                <Box className="course-thumbnail" style={{ textAlign: 'center',paddingRight:'620px' }}>
                  <Card.Body className="text-center">
                    <div>
                      <input
                        type="file"
                        style={{ width: '420px',marginLeft:'520px'}}
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setSelectedImage(URL.createObjectURL(file));
                            setCourse({ ...course, thumbnailimage: file });
                          }
                        }}
                      />
                      {selectedImage ? (
                        <Card style={{paddingRight:'220px',width:'350px',left:'560px'}}>
                          <CloseButton
                            className="position-absolute top-0 end-0"
                            style={{ color: 'red' }}
                            onClick={removeThumbnail}
                            aria-label="Remove image"
                          />
                          <img
                            className="thumbnail-image"
                            src={selectedImage}
                            alt="Course thumbnail"
                            style={{ width: '350px', height: '150px',marginRight:'120px' }}
                          />
                        </Card>
                      ) : (
                        <p style={{paddingLeft:'520px'}}>
                          Click to select a thumbnail image or{' '}
                          <span className="upload-link">Click to upload</span>
                        </p>
                      )}
                    </div>
                  </Card.Body>
                </Box>
                {errors.thumbnailimage && (
                  <p className="error">{errors.thumbnailimage}</p>
                )}
              </FormControl>
              <Row className="mb-3 d-flex justify-content-center align-items-center">
              {errors.thumbnailimage && (
                <h6 className="error mb-2 d-flex justify-content-center align-items-center">*{errors.thumbnailimage}</h6>
              )}
            </Row>
            </Col> 
            <Col></Col>
          </Row>
                       <Row>                 <Row className="mb-3 d-flex justify-content-center align-items-center">
                  {errors.title && (
                    <h6 className="error mb-2 d-flex justify-content-center align-items-center">
                      *{errors.title}
                    </h6>
                  )}
                </Row>
                <Row className="mb-3 d-flex justify-content-center align-items-center">
                  {errors.description && (
                    <h6 className="error mb-2 d-flex justify-content-center align-items-center">
                      *{errors.description}
                    </h6>
                  )}
                </Row>
                <Row className="mb-3 d-flex justify-content-center align-items-center">
                  {errors.thumbnailimage && (
                    <h6 className="error mb-2 d-flex justify-content-center align-items-center">
                      *{errors.thumbnailimage}
                    </h6>
                  )}
                </Row>
                <Row className="mb-3 d-flex justify-content-center align-items-center">
                  {errors.category && (
                    <h6 className="error mb-2 d-flex justify-content-center align-items-center">
                      *{errors.category}
                    </h6>
                  )}
                </Row>
                <Row className="mb-3 d-flex justify-content-center align-items-center">
                  {errors.level && (
                    <h6 className="error mb-2 d-flex justify-content-center align-items-center">
                      *{errors.level}
                    </h6>
                  )}
                </Row>
                <Row className="mb-3 d-flex justify-content-center align-items-center">
                  {errors.duration && (
                    <h6 className="error mb-2 d-flex justify-content-center align-items-center">
                      *{errors.duration}
                    </h6>
                  )}
                </Row>
              </Row>
          <footer>
            <Row >
              <Col md={6} xs={6} className="mt-3">
                
                <Button variant="contained" type="submit" className='btn btn-primary' style={{marginLeft:'820px',paddingLeft:'60px',paddingRight:'60px',backgroundColor:'blue',marginBottom:'30px',marginTop:'10px'}}>Submit</Button>
              </Col>
              
            </Row>
          </footer>
        </Form>
      </Container>
    </div>
    
   
    

    default:
      return null;
  }
};

const CourseManagementApp = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleNext = () => {
    setActiveTab((prevTab) => (prevTab < 3 ? prevTab + 1 : prevTab));
  };
  const handleBack = () => {
    setActiveTab((prevTab) => Math.max(prevTab - 1, 1));
  };
  
  return (
    

    <div style={{backgroundColor:'#F5F7F8'}}>
     <div style={{border:'2px solid black',borderColor:'#7C00FE',height:'150px',marginTop:'80px',backgroundColor:'#7C00FE',width:'1565px'}}>
      <p style={{fontSize:'33px',paddingLeft:'90px',paddingTop:'30px',color:'white'}}><b>Add New Course.</b></p>
      {/* <p style={{fontSize:'23px',paddingLeft:'90px'}}><b>Just fill the form and create your courses.</b></p>
      <button className='btn btn-primary' style={{color:'white',backgroundColor:'black'}}>Back to Courses</button> */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
  <p style={{ fontSize: '23px', paddingLeft: '90px', margin: 0 ,color:'white'}}>
    <b>Just fill the form and create your courses.</b>
  </p>
  <button
  className='btn btn-primary'
  style={{ color: 'white', backgroundColor: 'black', marginLeft: '690px' }}
  onClick={() => window.history.back()}
>
  Back to Courses
</button>

</div>

      </div> 
  <nav className="nav" style={{ marginTop: '10px' }}>
    {[...Array(3)].map((_, index) => (
      <Tab
        key={index}
        number={index + 1}
        label={['Basic Information', 'Course Description', 'Course Thumbail'][index]}
        onClick={setActiveTab}
        isActive={activeTab === index + 1}
      />
    ))}
  </nav>
  <main>
  <Contents activeTab={activeTab} />
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    {activeTab > 1 && (
      <button
        onClick={handleBack}
        className="btn btn-secondary"
        style={{ paddingLeft: '60px', paddingRight: '60px', backgroundColor: 'gray' }}
      >
        Previous
      </button>
    )}
    {activeTab < 3 && (
      <button
        onClick={handleNext}
        className="btn btn-primary"
        style={{ paddingLeft: '60px', paddingRight: '60px', backgroundColor: 'blue' ,marginLeft:'970px'}}
      >
        Next
      </button>
    )}
  </div>
</main>

</div>
  );
};

export default CourseManagementApp;

//******************************************************************************************************** */
//**************************************************************************************************************** */

