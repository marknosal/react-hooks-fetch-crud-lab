import React, { useState, useEffect } from "react";
import QuestionItem from './QuestionItem';

function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(response => response.json())
      .then(data => setQuestions(data))
  }, [])

  function handleDelete(deletedQuestion) {
    const updatedQs = questions.filter(question => question.id !== deletedQuestion.id ? true: false)
    setQuestions(updatedQs)
  }

  function handleChange(correctedAnswer) {
    const updatedQs = questions.map(question => {
      if(question.id === correctedAnswer.id) {
        return correctedAnswer
      } else {
        return question
      }
    })
    setQuestions(updatedQs)
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map((question) => {
        return (
          <QuestionItem question={question} key={question.id} onDelete={handleDelete} onChange={handleChange} />
        )
      })}
      </ul>
    </section>
  );
}

export default QuestionList;
