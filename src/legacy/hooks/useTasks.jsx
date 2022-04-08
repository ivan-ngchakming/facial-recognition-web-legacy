import { useState, useEffect, useCallback } from 'react';
import { graphqlQuery } from '../graphql';
import { TASKS as TASKS_GQL_Q } from '../graphql/query';

export default function useTasks() {
  const [tasks, setTasks] = useState([]);

  const fetch = useCallback(() => {
    graphqlQuery(TASKS_GQL_Q)
      .then((res) => {
        console.log(res.tasks);
        setTasks(res.tasks);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return [tasks, fetch];
}
