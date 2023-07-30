import { useEffect, useState } from 'react';
import { FETCH } from '../utils/helper';
import Issue from '../components/Issue';
import request from '../api/request';

const Issues = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await FETCH(request.searchIssues.url);

        setIssues(data.items);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, []);

  if (!issues.length) return <h1>no data</h1>;

  return (
    <div className='py-5 space-y-3'>
      {issues.map((issue) => (
        <Issue
          key={issue.html_url}
          url={issue.html_url}
          labels={issue.labels}
          title={issue.title}
        />
      ))}
    </div>
  );
};

export default Issues;
