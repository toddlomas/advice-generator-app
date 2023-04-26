import React, { useEffect, useState } from "react";
import { PauseIcon } from "@heroicons/react/24/solid";
import diceImage from "../images/icon-dice.svg";
import axios from "axios";

function Card() {
  const [quote, setQuote] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    axios.get("https://api.adviceslip.com/advice").then((res) => {
      setQuote(res.data.slip.advice);
      setId(res.data.slip.id);
    });
  });

  const clickHandler = async () => {
    const { quote, id } = await getQuote();
    setQuote(quote);
    setId(id);
  };

  const getQuote = async () => {
    const res = await axios("https://api.adviceslip.com/advice");
    const quote = await res.data.slip.advice;
    const id = await res.data.slip.id;

    return { quote, id };
  };

  return (
    <div className="bg-[#212633] h-screen w-screen flex justify-center">
      <div className="bg-[#303a49] h-[500px] w-[800px] mx-auto mt-[400px] rounded-xl relative shadow-[0px_0px_50px_1px_rgb(48,58,73)]">
        <div className="h-10 w-[50%] mt-10 mx-auto text-center">
          <h1 className="text-[#52ffa8] uppercase tracking-widest">
            Advice {id ? `#${id}` : null}
          </h1>
        </div>
        <div className="border-b-2 text-center p-10 h-[60%]">
          <p className="text-5xl font-extrabold text-[#cee3e9]">
            {quote ? `"${quote}"` : null}
          </p>
        </div>
        <div>
          <PauseIcon className="h-10 w-10 -mt-5 mx-auto bg-[#303a49] text-[#cee3e9]" />
        </div>
        <div className="-mb-3">
          <div
            onClick={clickHandler}
            className="absolute bottom-0 left-[45%] -mb-10 h-20 w-20 rounded-full bg-[#52ffa8] 
            mx-auto flex justify-center items-center cursor-pointer hover:transition-transform-bg hover:shadow-[0px_0px_50px_1px_rgb(82,255,168)] hover:animate-pulse"
          >
            <img src={diceImage} alt="" className="h-[50%] w-[50%]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
