import { useEffect, useState } from "react";
import "./App.css";
import "./assets/fonts/fonts.css";
import "normalize.css";
import fetchJsonp from "fetch-jsonp";

const API_URL =
  "https://api.forismatic.com/api/1.0/?method=getQuote&key=random&format=jsonp&lang=ru&jsonp=?";

function App() {
  const [quoteData, setQuoteData] = useState({
    text: "",
    author: "",
  });

  const getQuoteData = url => {
    try {
      fetchJsonp(url, {
        jsonpCallback: "jsonp",
      }).then(response => response.json())
      .then(response => {
        setQuoteData(() => ({
          text: response.quoteText,
          author: response.quoteAuthor ? response.quoteAuthor : "Неизвестный автор",
        }));
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getQuoteData(API_URL);
  }, []);

  return (
    <>
      <div className="quote">
        <div className="quote__display">
          <p className="quote__text">{quoteData.text}</p>
          <p className="quote__author">{quoteData.author}</p>
        </div>
        <button className="quote__button" onClick={() => getQuoteData(API_URL)}>Новая цитата</button>
      </div>
    </>
  );
}

export default App;
