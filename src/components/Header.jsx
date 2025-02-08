import React from "react";

export default function Header({ appear, fonts, img, changeimg }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "736px",
        height: "64px",
        marginTop: "40px",
        fontFamily: {fonts},
      }}
    >
      <img src="/iconoir_book.png" alt="pic" />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "46px",
        }}
      >
        <span>
          Sans Serif{" "}
          <img
            onClick={appear}
            style={{
              marginLeft: "15px",

              cursor: "pointer",
            }}
            src="/Path 3.png"
            alt=""
          />{" "}
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "25px",
          }}
        >
          <img onClick={changeimg}
            style={{
              cursor: "pointer",
            }}
            src={img}
            alt=""
          />
          <img src="/Path.png" alt="" />
        </div>
      </div>
    </div>
  );
}
