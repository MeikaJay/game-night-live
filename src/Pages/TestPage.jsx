import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function TestPage() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      const { data, error } = await supabase
        .from('questions')
        .select('*');

      if (error) {
        console.error('Error fetching questions:', error);
      } else {
        console.log('Fetched questions:', data);
        setQuestions(data);
      }
    }
    fetchQuestions();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Test Page: Questions from Database</h1>
      {questions.length === 0 ? (
        <p>No questions found.</p>
      ) : (
        <ul>
          {questions.map((q) => (
            <li key={q.id}>{q.question_text}</li>
          ))}
        </ul>
      )}
    </div>
  );
}