import React, { useEffect, useState } from "react";

export default function Home() {
  const [displayedQuote, setDisplayedQuote] = useState("");
  const [displayedAuthor, setDisplayedAuthor] = useState("");

  // const motivationalQuotes = [
  //   "Don’t watch the clock; do what it does. Keep going. - Sam Levenson",
  //   "Believe you can and you're halfway there. - Theodore Roosevelt",
  //   "The only way to achieve the impossible is to believe it is possible. - Charles Kingsleigh",
  //   "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
  //   "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
  //   "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart. - Roy T. Bennett",
  //   "Success is stumbling from failure to failure with no loss of enthusiasm. - Winston Churchill",
  //   "It always seems impossible until it's done. - Nelson Mandela",
  //   "Your attitude, not your aptitude, will determine your altitude. - Zig Ziglar",
  //   "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
  //   "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
  //   "The only thing standing between you and your goal is the story you keep telling yourself as to why you can't achieve it. - Jordan Belfort",
  //   "Do not wait to strike till the iron is hot, but make it hot by striking. - William Butler Yeats",
  //   "The only person you are destined to become is the person you decide to be. - Ralph Waldo Emerson",
  //   "Success is not in what you have, but who you are. - Bo Bennett",
  //   "If you want to achieve greatness stop asking for permission. - Anonymous",
  //   "Do not wait; the time will never be 'just right.' Start where you stand, and work with whatever tools you may have at your command, and better tools will be found as you go along. - Napoleon Hill",
  //   "Our greatest glory is not in never falling, but in rising every time we fall. - Confucius",
  //   "The only way to do great work is to love what you do. - Steve Jobs",
  //   "What lies behind us and what lies before us are tiny matters compared to what lies within us. - Ralph Waldo Emerson",
  //   "Success is liking yourself, liking what you do, and liking how you do it. - Maya Angelou",
  //   "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  //   "Don't count the days, make the days count. - Muhammad Ali",
  //   "The only place where success comes before work is in the dictionary. - Vidal Sassoon",
  //   "Don't be afraid to give up the good to go for the great. - John D. Rockefeller",
  //   "It's not about how hard you hit. It's about how hard you can get hit and keep moving forward. - Rocky Balboa",
  //   "You are the master of your destiny. You can influence, direct, and control your own environment. You can make your life what you want it to be. - Napoleon Hill",
  //   "Challenges are what make life interesting and overcoming them is what makes life meaningful. - Joshua J. Marine",
  //   "The only person you are destined to become is the person you decide to be. - Ralph Waldo Emerson",
  //   "Our greatest glory is not in never falling, but in rising every time we fall. - Confucius",
  //   "The only way to do great work is to love what you do. - Steve Jobs",
  //   "What lies behind us and what lies before us are tiny matters compared to what lies within us. - Ralph Waldo Emerson",
  //   "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
  //   "Success is liking yourself, liking what you do, and liking how you do it. - Maya Angelou",
  //   "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  //   "Don't count the days, make the days count. - Muhammad Ali",
  //   "The only place where success comes before work is in the dictionary. - Vidal Sassoon",
  //   "Don't be afraid to give up the good to go for the great. - John D. Rockefeller",
  //   "It's not about how hard you hit. It's about how hard you can get hit and keep moving forward. - Rocky Balboa",
  //   "You are the master of your destiny. You can influence, direct, and control your own environment. You can make your life what you want it to be. - Napoleon Hill",
  //   "The only thing standing between you and your goal is the story you keep telling yourself as to why you can't achieve it. - Jordan Belfort",
  // ];

  const motivationalQuotes = [
    {
      text: "Don’t watch the clock; do what it does. Keep going.",
      author: "Sam Levenson",
    },
    {
      text: "Believe you can and you're halfway there.",
      author: "Theodore Roosevelt",
    },
    {
      text: "The only way to achieve the impossible is to believe it is possible.",
      author: "Charles Kingsleigh",
    },
    {
      text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      author: "Winston Churchill",
    },
    {
      text: "Your time is limited, don't waste it living someone else's life.",
      author: "Steve Jobs",
    },
    {
      text: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
      author: "Roy T. Bennett",
    },
    {
      text: "It always seems impossible until it's done.",
      author: "Nelson Mandela",
    },
    {
      text: "Your attitude, not your aptitude, will determine your altitude.",
      author: "Zig Ziglar",
    },
    {
      text: "The only limit to our realization of tomorrow will be our doubts of today.",
      author: "Franklin D. Roosevelt",
    },
    {
      text: "The only thing standing between you and your goal is the story you keep telling yourself as to why you can't achieve it.",
      author: "Jordan Belfort",
    },
    {
      text: "Do not wait to strike till the iron is hot, but make it hot by striking.",
      author: "William Butler Yeats",
    },
    {
      text: "The only person you are destined to become is the person you decide to be.",
      author: "Ralph Waldo Emerson",
    },
    {
      text: "Success is not in what you have, but who you are.",
      author: "Bo Bennett",
    },
    {
      text: "If you want to achieve greatness stop asking for permission.",
      author: "Anonymous",
    },
    {
      text: "Do not wait; the time will never be 'just right.' Start where you stand, and work with whatever tools you may have at your command, and better tools will be found as you go along.",
      author: "Napoleon Hill",
    },
    {
      text: "Our greatest glory is not in never falling, but in rising every time we fall.",
      author: "Confucius",
    },
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
    },
    {
      text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
      author: "Ralph Waldo Emerson",
    },
    {
      text: "Success is liking yourself, liking what you do, and liking how you do it.",
      author: "Maya Angelou",
    },
    {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
    },
    {
      text: "Don't count the days, make the days count.",
      author: "Muhammad Ali",
    },
    {
      text: "The only place where success comes before work is in the dictionary.",
      author: "Vidal Sassoon",
    },
    {
      text: "Don't be afraid to give up the good to go for the great.",
      author: "John D. Rockefeller",
    },
    {
      text: "It's not about how hard you hit. It's about how hard you can get hit and keep moving forward.",
      author: "Rocky Balboa",
    },
    {
      text: "You are the master of your destiny. You can influence, direct, and control your own environment. You can make your life what you want it to be.",
      author: "Napoleon Hill",
    },
    {
      text: "Challenges are what make life interesting and overcoming them is what makes life meaningful.",
      author: "Joshua J. Marine",
    },
  ];

  useEffect(() => {
    setDisplayedQuote(quote().text);
    setDisplayedAuthor(quote().author);
  }, []);

  const quote = () => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    return motivationalQuotes[randomIndex];
  };

  return (
    <div className="main-home">
      <h1>Welcome back, Ula!</h1>
      <div className="quote-and-author">
        <p className="quote">&quot;{displayedQuote}&quot;</p>
        <p className="author">- {displayedAuthor}</p>
      </div>
    </div>
  );
}
