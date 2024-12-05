import React, {useRef, useState} from "react";
import "./Quiz.css";
import {data} from "../assets/data.js";

const Quiz = () => {
    let [index, setIndex] = useState(0); // Current question index
    let [question, setQuestion] = useState(data[index]); // Directly access the question object from the array
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false);

    const handleNext = () => {
        // Increment the index if there are more questions
        if (lock === true) {
            if (index === data.length - 1) {
                setResult(true);
                return 0;
            }
            setIndex(++index);
            setQuestion(data[index])
            setLock(false);
            optionArray.map((option) => {
                option.current.classList.remove('wrong');
                option.current.classList.remove('correct');
                return null;
            })
        }
    };

    let option1 = useRef(null)
    let option2 = useRef(null)
    let option3 = useRef(null)

    let optionArray = [option1, option2, option3]

    const checkAnswer = (e, ans) => {
        if (lock === false) {
            if (question.ans === ans) {
                e.target.classList.add("correct");
                setLock(true)
                setScore(prev => prev + 1);
            } else {
                e.target.classList.add("wrong");
                setLock(true)
                optionArray[question.ans - 1].current.classList.add("correct");
            }
        }
    };

    const reset = () =>{
        setIndex(0);
        setQuestion(data[0]);
        setLock(false);
        setScore(0);
        setResult(false);
    }

    return (
        <div className={"container"}>
            <div className={"row justify-content-center"}>
                <div className={"col-lg-6 col-md-6 col-sm-12"}>
                    <img src={"./logo.png"} alt={"logo"} className={"logo mx-auto d-block"} />
                    <hr/>
                    {result ? <></> : <>
                        <span className={"fs-4"}>
                        {index + 1}. {question.question}
                    </span>
                        <ul className={""}>
                            <li ref={option1} onClick={(e) => checkAnswer(e, 1)}>{question.option1}</li>
                            <li ref={option2} onClick={(e) => checkAnswer(e, 2)}>{question.option2}</li>
                            <li ref={option3} onClick={(e) => checkAnswer(e, 3)}>{question.option3}</li>
                        </ul>
                        <div className="d-flex justify-content-center">
                            <button className={"btn"} onClick={handleNext}>
                                Next
                            </button>
                        </div>
                        <div className={"index mt-5 fw-bold"}>
                            {index + 1} of {data.length} questions
                        </div>
                    </>}
                    {result ? <>
                        <h6 className={"fs-4 text-center"}>You Scored {score} out of {data.length} questions</h6>
                        <div className="d-flex justify-content-center mt-5">
                            <button className={"btn"} onClick={reset}>Reset</button>
                        </div>
                    </> : <></>}

                </div>
            </div>
        </div>
    );
};

export default Quiz;
