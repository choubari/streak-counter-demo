/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { streakCounter } from "@choubari/streak-counter";
import { useEffect, useState } from "react";

export default function Home() {
  /** Either use this:
   // const { currentCount } = streakCounter(localStorage, today);
   * but the server won't recognize localStorage (error in server console)
   */

  /** Or use this
   // const { currentCount } =
   //   typeof window !== "undefined"
   //     ? streakCounter(localStorage, today)
   //     : { currentCount: 1 };
   * but then the server and client will have different values of currentCount
   */

  /** I created instead a useEffect Hook that will update the currentCount from localStorage */

  const [loading, setLoading] = useState(false);
  const [currentCount, setCurrentCount] = useState(1);

  const today = new Date();
  useEffect(() => {
    setCurrentCount(streakCounter(localStorage, today).currentCount);
    setLoading(true);
  }, []);

  // console.log("current count ", currentCount);
  return (
    <div className="text-center">
      <h1 className="mb-4 text-2xl">Current streak</h1>
      <div>
        <p className="text-6xl mt-8 mb-2">
          <span aria-label="fire emoji" role="img">
            🔥
          </span>
        </p>
      </div>
      {loading && (
        <p className="text-6xl">
          {currentCount} day
          {currentCount > 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
