import React from "react";
import Image from "next/image";
import rabbitEars from "../../public/rabbit-ears.png";
import bunnyTwo from "../../public/bunny-two.png";

export default function About() {
  return (
    <div className="about">
      <div className="about-title-parent">
        <div className="about-hey-and-welcome">
          <p className="about-hey">HEY THERE!</p>
          <h3>Welcome</h3>
        </div>
        <Image className="about-image" src={rabbitEars} alt="rabbit ears" />

        <h3>to Habit Rabbit</h3>
      </div>
      <p className="about-p">
        {
          "I'm Ula, the self-taught coder and creator behind this little corner of the internet. It's my mission to make building and maintaining habits a breeze."
        }
      </p>
      <Image className="about-rabbit" src={bunnyTwo} alt="rabbit icon" />
      <p className="about-p">
        Ever since I read &quot;The Power of Habit&quot; by Charles Duhigg in
        2020, I&apos;ve been on a habit-tracking train. As a result, I loved
        tracking my habits. But I could never find a habit tracker online that
        suited my style and needs, which frusterated me. When I began learning
        to code in 2022, I was determined to build my own habit tracker one day,
        exactly as I had envisioned it. Fast forward to 2024, and I find myself
        wrapping up this project. I love that I have a product exactly how I
        like it. I use it every day!
      </p>
      <p className="about-p">
        {
          "As someone who started from scratch, every line of code in this app is a testament to the countless hours spent learning and refining. It's been a thrilling ride of trial and error, late-night debugging sessions, and the sheer joy of seeing an idea come to life on the screen."
        }
      </p>
      <p className="about-p">
        {
          "Habit Rabbit is the result of my personal frustrations turned into a passion project. I wanted a habit tracker that's not just functional but pleasing to the eye and simple to use. So, I poured that enthusiasm into creating an intuitive, user-friendly experience that adapts to your unique journey of habit formation."
        }
      </p>
      <p className="about-p">
        {
          "I hope you enjoy looking back on your habit progress as much as I enjoyed creating this for you."
        }
      </p>
      <div className="about-bottom about-p">
        <p>Happy tracking!</p>
        <p>- Ula</p>
      </div>
    </div>
  );
}
