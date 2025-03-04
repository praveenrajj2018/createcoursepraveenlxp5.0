import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoLogoHtml5 } from "react-icons/io5";
import { PiFileCssFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuizInstructionRequest } from "../../../../actions/Quiz And Feedback Module/Learner/QuizInstructionAction";
import { fetchtopicfeedbackquestionrequest } from "../../../../actions/Quiz And Feedback Module/Learner/FetchTopicFeedbackQuestionAction";
import { fetchQuizIdRequest } from "../../../../actions/Quiz And Feedback Module/Learner/FetchQuizIdAction";


function LearnerCoursepage() {
  const [noQuizTopicId, setNoQuizTopicId] = useState(
    "c6ce0441-f10b-492f-8536-978718b0b1a3"
  );
  const [yesQuizTopicId, setYesQuizTopicId] = useState(
    "db7c16a2-49e6-44e7-8504-ff4f293f3efd"
  );
  const [LearnerId, setLearnerId] = useState(
    "a2b7a936-9809-4128-bc3e-e69a1dc48d3b"
  );
  const quizId = useSelector(
    (state) => state.fetchquizinstruction.quizinstructiondetails
  );
  const isSuccess = useSelector((state) => state.fetchquizinstruction.isSubmitted);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [topicId, setTopicId] = useState("");

  console.log("course page quizId", quizId, isSuccess);

  const handleAddQuiz = async (topicId) => {
    console.log("handleAttemptQuiz called with topicId:", topicId);
    setTopicId(topicId);
    dispatch(fetchQuizInstructionRequest(topicId));
    sessionStorage.setItem("topicId", topicId);
    sessionStorage.setItem("quizId", quizId.quizId);
    // console.log(quizId);
    sessionStorage.setItem("LearnerId", LearnerId);
    if (isSuccess) {
      navigate("/instruction");
    }
  };

  const handleGiveFeedback = async (topicId) => {
    dispatch(fetchtopicfeedbackquestionrequest(topicId));
    sessionStorage.setItem("topicId", topicId);
    navigate("/topicfeedbackquestion");

  };

  const handleQuizGiveFeedback = async (topicId) => {
    dispatch(fetchQuizIdRequest(topicId));
    sessionStorage.setItem("quizId", quizId);
    navigate("/quizfeedbackquestion");
  };


  return (
    <div>
      <h5
        style={{ marginTop: "5%", textAlign: "center", color: "midnightblue" }}
      >
        Learner CoursePage
      </h5>
      <Accordion id="accordion">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <IoLogoHtml5 style={{ fontSize: "30px", color: "orange" }} />
            <b>Introduction to HTML</b>
          </Accordion.Header>
          <Accordion.Body>
            <ul>
              {[
                "HTML Basic",
                "HTML Elements",
                "Html Attributes",
                "Html Styles",
                "Html Tables",
              ].map((topic) => (
                <li key={topic}>
                  {topic}
                  <div className="topic-buttons">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        handleAddQuiz(yesQuizTopicId);
                      }}
                    >
                      Take Quiz
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      style={{ marginLeft: "5px" }}
                      onClick={() => {
                        handleGiveFeedback(yesQuizTopicId);
                      }}
                    >
                      Give Feedback
                    </Button>
                    <Button
                      variant="success"
                      size="sm"
                      style={{ marginLeft: "5px" }}
                      onClick={() => {
                        handleQuizGiveFeedback(yesQuizTopicId);
                      }}
                    >
                      Give QuizFeedback
                    </Button>
                    {/* <Button variant="secondary" size="sm" onClick={() => { handleFeedback(yesQuizTopicId) }} style={{ marginLeft: "5px" }}>Add Feedback</Button>
                    <Button variant="secondary" size="sm" onClick={() => { handleQuizFeedback(yesQuizTopicId) }} style={{ marginLeft: "5px" }}>Add Quiz Feedback</Button> */}
                  </div>
                </li>
              ))}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <PiFileCssFill
              style={{ fontSize: "30px", color: "midnightblue" }}
            />
            <b>CSS</b>
          </Accordion.Header>
          <Accordion.Body>
            <ul>
              {["Introduction to CSS", "CSS Elements", "CSS Selectors"].map(
                (topic) => (
                  <li key={topic}>
                    {topic}
                    <div className="topic-buttons">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          handleAddQuiz(yesQuizTopicId);
                        }}
                      >
                        Take Quiz
                      </Button>
                      <Button
                        variant="warning"
                        size="sm"
                        style={{ marginLeft: "5px" }}
                        onClick={() => {
                          handleGiveFeedback(yesQuizTopicId);
                        }}
                      >
                        Give Feedback
                      </Button>
                      <Button
                        variant="success"
                        size="sm"
                        style={{ marginLeft: "5px" }}
                        onClick={() => {
                          handleQuizGiveFeedback();
                        }}
                      >
                        Give QuizFeedback
                      </Button>
                      {/* <Button onClick={() => { handleFeedback(noQuizTopicId) }} variant="secondary" size="sm" style={{ marginLeft: "5px" }}>Add Feedback</Button>
                    <Button onClick={() => { handleQuizFeedback(noQuizTopicId) }} variant="secondary" size="sm" style={{ marginLeft: "5px" }}>Add Quiz Feedback</Button> */}
                    </div>
                  </li>
                )
              )}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
export default LearnerCoursepage;
