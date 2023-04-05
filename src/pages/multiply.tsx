import React, { useState } from "react";
import { range } from "lodash";
import { get } from "@/utils";
import { GetServerSideProps } from "next";

export default Index;

interface Problem {
  left: number;
  right: number;
  result: number;
}

function Index(params: { problems: Problem[]; showResult: boolean }) {

  const [showResult, setShowResult] = useState(false);


  return <div className="w-[800px] p-4 flex flex-row flex-wrap justify-between">
    {params.problems.map((value, i) => {
      return <div className="font-mono p-2 flex flex-row w-[150px] border-2 mb-3" key={i}>
        <span className={'flex pr-2 text-center'}>{value.left}</span>
        <span className={'flex pr-2 text-center'}>×</span>
        <span className={'flex pr-2 text-center'}>{value.right}</span>
        <span className={'flex pr-2 text-center'}>=</span>
        <span className={'flex pr-2 text-center'} style={{
          visibility: showResult ? 'visible': 'hidden',
        }}>{value.result}</span>
      </div>;
    })}

    <button className='' onClick={() => setShowResult(prev => !prev)}>显示结果</button>
  </div>;
}

const randomNum = () => {
  if (Math.random() < 0.5) {
    const a = get(() => {
      if (Math.random()< 0.5) {
        return Math.random() < 0.5 ? 1 : 3;
      }
      return Math.floor(Math.random() * 9 + 1);
    })
    const b = get(() => {
      if (Math.random()< 0.5) {
        return Math.random() < 0.5 ? 1 : 3;
      }
      return Math.floor(Math.random() * 9 + 1);
    })
    return a * 10 + b;
  }

  return Math.floor(Math.random() * 90 + 10);
}

export const getServerSideProps: GetServerSideProps = async () => {
  const problems = get(() => {
    const count = 5 * 20;
    return range(0, count).map(() => {
      const left = randomNum();
      const right = randomNum();
      const result = left * right;

      return {
        left, right, result
      };
    });
  });

  return {
    props: {
      problems,
    }
  };
};
