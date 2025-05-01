'use client';
import { useEffect, useState } from 'react';
import Navbar from '../../_components/navbar/page';
import GlobalApi from '@/app/_services/GlobalApi';

export default function QueriesPage() {
  const [queries, setQueries] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [replyMessage, setReplyMessage] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    GlobalApi.GetAllQueries()
      .then(res => setQueries(res.data))
      .catch(err => console.error('Error fetching queries:', err));
  }, []);

  const postQuery = async () => {
    const res = await GlobalApi.PostQuery({ title, description }, token);
    const data = res.data;
    setQueries([data, ...queries]);
    setTitle('');
    setDescription('');
    setIsModalOpen(false);
  };

  const postReply = async (queryId) => {
    const replyText = replyMessage[queryId];
    const res = await GlobalApi.PostReply(queryId, replyText, token);
    const reply = res.data;
    setQueries(prev =>
      prev.map(q =>
        q.id === queryId ? { ...q, replies: [...q.replies, reply] } : q
      )
    );
    setReplyMessage({ ...replyMessage, [queryId]: '' });
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-700">Queries</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Ask a Question
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">Ask a Question</h2>
              <input
                type="text"
                placeholder="Query Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full p-3 mb-4 border rounded-lg"
              />
              <textarea
                placeholder="Describe your query in detail..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full p-3 mb-4 border rounded-lg h-28 resize-none"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={postQuery}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6 mt-10">
          {queries.map(query => (
            <div key={query.id} className="bg-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="mb-2">
                <h3 className="text-xl font-semibold text-indigo-800">{query.title}</h3>
                <p className="text-sm text-gray-500">Asked by {query.user?.name || 'Anonymous'}</p>
              </div>
              <p className="text-gray-800 mb-4">{query.description}</p>

              <div className="ml-4 mb-4">
                <h4 className="font-semibold text-sm text-gray-600 mb-1">Replies:</h4>
                <ul className="space-y-2">
                  {(query.replies || []).map(reply => (
                    <li key={reply.id} className="text-sm text-gray-700 bg-white px-3 py-2 rounded-md border">
                      <span className="font-semibold">{reply.user?.name || 'Anonymous'}:</span> {reply.message}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={replyMessage[query.id] || ''}
                  onChange={(e) =>
                    setReplyMessage({ ...replyMessage, [query.id]: e.target.value })
                  }
                  placeholder="Write a reply..."
                  className="flex-grow p-2 border rounded-lg"
                />
                <button
                  onClick={() => postReply(query.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Reply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
