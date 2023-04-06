import React from "react";

function QuestionItem({ question, onDelete, onChange }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteClick(){
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => onDelete(question))
  }

  function handleAnswerChange(event) {
    const newAnswer = parseInt(event.target.value, 10)
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({'correctIndex': newAnswer}),
    })
      .then(response => response.json())
      .then(data => onChange(data))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleAnswerChange}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
