import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_ANSWER } from '../../utils/mutations';

import Auth from '../../utils/auth';

const AnswerForm = ({ _id }) => {
  const [answerBody, setAnswerBody] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addAnswer, { error }] = useMutation(ADD_ANSWER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
       await addAnswer({
        variables: {
          _id,
          answerBody: answerBody,
          answerAuthor: Auth.getProfile().data.username,
        },
      });

      setAnswerBody('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'answerBody' && value.length <= 280) {
      setAnswerBody(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h4>What are your thoughts on this question?</h4>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
            {error && <span className="ml-2">{error.message}</span>}
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="answerBody"
                placeholder="Add your answer..."
                value={answerBody}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Answer
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your questions. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default AnswerForm;
