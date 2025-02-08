import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Header from "./components/Header";

function App() {
  const [word, setWord] = useState("word");
  const [inputvalue, setInputvalue] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bar, setBar] = useState(false);
  const [font, setFont] = useState("sans-serif");
  const [imgg, setImgg] = useState("/Group 8.png");
  const [theme, setTheme] = useState("light");
  const [errormessage, setErrormessage] = useState("")

  const changeimg = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    setImgg((prev) =>
      prev === "/Group 8.png" ? "/Group 82.png" : "/Group 8.png"
    );
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        setError(error.response.data);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [word]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setWord(inputvalue);
   if (!inputvalue){
    setErrormessage("Whoops, can't be empty...")
    return
   }
   
  };

  const appearOption = () => {
    setBar((prev) => !prev);
  };

  const playSound = () => {
    const audioUrl = data[0].phonetics[0].audio;

    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (
    <div
      style={{
        fontFamily: font,
      }}
      className="container"
    >
      <Header
        appear={appearOption}
        fonts={font}
        img={imgg}
        changeimg={changeimg}
      ></Header>
      <form onSubmit={handleSubmit}>
        <div
          className="searchdiv"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <input
            type="text"
            onChange={(e) => setInputvalue(e.target.value)}
            placeholder="Search for any word..."
          ></input>
          <p
            style={{
              color: "red",
            }}
          >
            {errormessage}
          </p>
        </div>
      </form>

      <div className="wordcontainer">
        {data.length ? (
          <div
            style={{
              position: "absolute",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "736px",
              }}
            >
              <h1
                style={{
                  fontSize: "4em",
                  fontWeight: "bold",
                }}
              >
                {data[0].word}
              </h1>
              {data[0].phonetics[0].audio ? (
                <button
                  style={{
                    borderRadius: "100%",
                    width: "80px",
                    height: "80px",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: "rgba(164, 69, 237, 0.19)",

                    backgroundImage: "url('/Path 2.png')",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                  onClick={playSound}
                ></button>
              ) : null}
            </div>
            <p
              style={{
                color: "rgb(179, 0, 255)",
                fontSize: "1.2em",
                fontWeight: "bold",
              }}
            >
              {data[0].phonetic}
            </p>

            {data[0].meanings.map((el, index) => (
              <div key={index}>
                <h2>{el.partOfSpeech}</h2>{" "}
                <h3
                  style={{
                    color: "darkgray",
                  }}
                >
                  Meaning
                </h3>
                {el.definitions.map((item) => (
                  <>
                    <ul>
                      <li>{item.definition}</li>
                    </ul>
                  </>
                ))}
                {el.synonyms.length > 0 && (
                  <h2
                    style={{
                      color: "darkgray",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    Synonyms{" "}
                    <h2 style={{ color: "rgb(179, 0, 255)" }}>
                      {el.synonyms.join(", ")}
                    </h2>
                  </h2>
                )}
                {el.antonyms.length > 0 && (
                  <h2
                    style={{
                      color: "darkgray",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    Anyonyms{" "}
                    <h2 style={{ color: "rgb(179, 0, 255)" }}>
                      {el.antonyms.join(", ")}
                    </h2>
                  </h2>
                )}
              </div>
            ))}

            {data.length > 1 && data[1]?.sourceUrls?.length > 0 && (
              <div>
                {data[1].sourceUrls.map((url, index) => (
                  <p key={index}>{url}</p>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {error && (
              <div
                style={{
                  width: "768px",
                  height: "320px",
                  display: "flex",
                  paddingTop: "90px",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {errormessage === "" && <img src="/emoji.png" alt="" />}

                <p className={`errortitle ${theme}`}>{error.title}</p>
                <p style={{ color: "gray", fontSize: "0.9em" }}>
                  {error.message} {error.resolution}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      {bar && (
        <div className={`fonts ${theme}`}>
          <p onClick={() => setFont("sans-serif")}>Sans Serif</p>
          <p onClick={() => setFont("serif")}>Serif</p>
          <p onClick={() => setFont("monospace")}>Mono</p>
        </div>
      )}
    </div>
  );
}

export default App;
