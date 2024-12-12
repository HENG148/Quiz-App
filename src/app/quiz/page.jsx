'use client'
import React, { use, useState } from "react"
import { quiz } from "./data"
import next from "next";

const page = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswer: 0,
    wrongAnswer: 0,
  });

  const { questions } = quiz;
  const { question, answers, correctAnswer } = questions[activeQuestion];

  const onAnswerSelected = (answers, idx) => {
    setChecked(true);
    setSelectedAnswerIndex(idx);
    if (answers == correctAnswer) {
      setSelectedAnswer(true);
      console.log('True');
    } else {
      setSelectedAnswer(false);
      console.log('False');
    }
  };

  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
          ...prev,
          score: prev.score + 5,
          correctAnswer: prev.correctAnswer + 1,
        } : {
          ...prev,
          wrongAnswer: prev.wrongAnswer + 1,
        }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
    setChecked(false);
  };
  return (
    <div className="container">
      <h1>Quiz Page</h1>
      <div>
        <h2>
          Question:{activeQuestion + 1}
          <span>/{questions.length}</span>
        </h2>
      </div>
      <div>
        {!showResult ? (
          <div className="quiz-container">
            <h3>{questions[activeQuestion].question}</h3>
            {answers.map((answer, idx) => (
              <li
                key={idx}
                onClick={() => onAnswerSelected(answer, idx)}
                className={
                selectedAnswerIndex === idx ? 'li-selected' : 'li-hover'
              }
              >
                <span>{answer}</span>
              </li>
            ))}
            {checked ? (
              <button onClick={nextQuestion} className="btn">
                {activeQuestion === question.length - 1 ? 'Finish' : 'Next'}
              </button>
            ) : (
                <button onClick={nextQuestion} disabled className="btn disabled">
                  {''}
                  {activeQuestion === question.length - 1 ? 'Finish' : 'Next'}
                </button>
            )}
          </div>
        ) : (
            <div className='quiz-container'>
            <h3>Results</h3>
            <h3>Overall {(result.score / 25) * 100}%</h3>
            <p>
              Total Questions: <span>{questions.length}</span>
            </p>
            <p>
              Total Score: <span>{result.score}</span>
            </p>
            <p>
              Correct Answers: <span>{result.correctAnswers}</span>
            </p>
            <p>
              Wrong Answers: <span>{result.wrongAnswers}</span>
            </p>
            <button onClick={() => window.location.reload()}>Restart</button>
          </div>
        )}
      </div>
    </div>
   );
}
 
export default page;