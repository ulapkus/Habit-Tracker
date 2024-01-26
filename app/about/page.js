import React from "react";

export default function About() {
  return (
    <div className="about">
      <p className="about-p">HEY THERE!</p>
      <h3>Welcome to Habit Rabbit</h3>
      <p className="about-p">
        {
          "I'm Ula, the self-taught coder and creator behind this little corner of the internet. It's my mission to make building and maintaining habits a breeze."
        }
      </p>
      <p className="about-p">
        Ever since I read &quot;The Power of Habit&quot; by Charles Duhigg in
        2020, I&apos;ve been on a habit-tracking train. For a while, I tracked
        my habits by hand in a notebook. Every so often, I would browse the App
        Store for a similarly styled habit tracker as my own - but I never found
        anything that gave me the same satisfaction as my own. When I began
        teaching myself to code in 2022, I was determined to get to a point
        where I could build my own habit tracker - exactly as I had envisioned
        it. Fast forward to 2024, and I find myself wrapping up this project. I
        love that I have a product exactly how I like it. I use it every day!
      </p>
      <p className="about-p">
        {
          "As someone who started from scratch, every line of code in this app is a testament to the countless hours spent learning and refining. It's been a thrilling ride of trial and error, late-night debugging sessions, and the sheer joy of seeing an idea come to life on the screen."
        }
      </p>
      <p className="about-p">
        {
          "What sets Habit Rabbit apart? It's the result of my personal frustrations turned into a passion project. I wanted a habit tracker that's not just functional but pleasing to the eye and simple to use. So, I poured that enthusiasm into creating an intuitive, user-friendly experience that adapts to your unique journey of habit formation."
        }
      </p>
      <p className="about-p">
        {
          "I hope you enjoy looking back on your habit progress as much as I enjoyed creating this for you."
        }
      </p>
      <div className="about-bottom">
        <p className="about-p">Happy tracking!</p>
        <p className="about-p">- Ula</p>
      </div>
    </div>
  );
}
