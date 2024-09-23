import './index.scss';
import { Container } from '@openedx/paragon';
import React, { useEffect, useState } from 'react';

const ExamplePage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://tools.dev.cudzoziemiec.emag.lukasiewicz.local/cudserver/task/list?type=cudmath", {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        },
      });
      const data = await response.json();
      setTasks(data);
    };

    fetchData();
  }, []);

  return (
    <main>
      <Container className="py-5">
        <h1>Example Page</h1>
        <table>
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Type</th>
              <th>Category</th>
              <th>Language</th>
              <th>Title</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.taskId}>
                <td>{task.taskId}</td>
                <td>{task.type}</td>
                <td>{task.category}</td>
                <td>{task.lang}</td>
                <td>{task.title}</td>
                <td dangerouslySetInnerHTML={{ __html: task.description }} />
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </main>
  );
};

export default ExamplePage;
