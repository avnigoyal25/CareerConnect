import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function InterviewButton() {
  return (
    <section className="bg-gray-50 py-16 flex">
      <div className="w-1/2 px-8">
        <h1 className="text-6xl font-bold text-gray-800">Preparing for <br></br>Interviews? </h1>
        <p className="mt-4 text-gray-600 text-lg">
          Get insights from alumni placed in top companies.
        </p>
        <div className="mt-8 space-x-4">
          <Link href='/dashboard/interviewInsights'>
          <button className="bg-blue-500 text-white px-8 py-3 rounded-lg shadow-md">
            Check Interview Insights
          </button>
          </Link>
          <br /> <br />
          <Link href='/dashboard/PostInterview'>
          <button className="bg-green-500 text-white px-8 py-3 rounded-lg shadow-md -ml-4">
            Post Interview Experience
          </button>
          </Link>
          <br /><br />
          <Link href='/dashboard/queries'>
          <button className="bg-slate-600 text-white px-8 py-3 rounded-lg shadow-md -ml-4">
            Ask your queries/doubt
          </button>
          </Link>
        </div>
      </div>
      <div className="w-1/2">
        <Image
          src="/assets/images/info.png" // updated image needs to be uploaded
          alt="Placement Preparation"
          width={500}
          height={400}
          className="mx-auto"
        />
      </div>
    </section>
  );
}