import { useState, useRef, useEffect } from "react";
import { AmericanExpress, MasterCard, Mir, Visa } from "./SVGs";
import './App.css';

export const App = () => {
  const cardRef = useRef(null);
  const dateRef = useRef(null);
  const cvcRef = useRef(null);
  const emailRef = useRef(null);
  const buttonRef = useRef(null);

  const [card, setCard] = useState("");
  const [date, setDate] = useState("");
  const [cvc, setCVC] = useState("");
  const [email, setEmail] = useState("");

  const [cardCheck, setCardCheck] = useState(false);
  const [dateCheck, setDateCheck] = useState(false);
  const [cvcCheck, setCVCCheck] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);

  const obj = {
    2: <Mir />,
    3: <AmericanExpress />,
    4: <Visa />,
    5: <MasterCard />
  };

  useEffect(() => {
    if (cardCheck && dateCheck && cvcCheck && emailCheck) {
      buttonRef.current.style.background = "white";
      buttonRef.current.style.cursor = "pointer";
    }
  }, [cardCheck, dateCheck, cvcCheck, emailCheck]);
  

  return (
    <div className="App">
      <div className="form">
        <div className="svg" style={{width: "60px"}}>
          {card.length && [2, 3, 4, 5].includes(parseInt(card.slice(0, 1))) ? obj[parseInt(card.slice(0, 1))] : null}
        </div>
        <div>
          <input
            placeholder="Card number"
            type="number"
            value={card}
            onChange={(event) => {
              const { value } = event.target;
              if (value.length <= 19) {
                setCard(event.target.value)
              }}}
            ref={cardRef}
            maxLength={19}
            onBlur={() => {
              if (card.length < 13 || card.length > 19) {
                cardRef.current.style.borderColor = "red";
                setCardCheck(false);
              } else {
                cardRef.current.style.borderColor = "lightgray";
                setCardCheck(true);
              }
            }}
          />
        </div>
        <div style={{gap: 5}}>
          <input
            placeholder="MM/YY"
            type="text"
            value={date}
            onChange={(event) => {
              const { value } = event.target;
              if (value.length === 2) {
                setDate(`${value}/`);
              } else if (value.length <= 5) {
                setDate(value);
              } 
            }}
            onBlur={() => {
              if (card.length < 5) {
                dateRef.current.style.borderColor = "red";
                setDateCheck(false);
              } else {
                dateRef.current.style.borderColor = "lightgray";
                setDateCheck(true);
              }
            }}
            ref={dateRef}
          />
          <input
            placeholder="CVC"
            type="number"
            value={cvc}
            maxLength={3}
            ref={cvcRef}
            onChange={(event) => {
              const { value } = event.target;
              if (value.length <= 3) {
                setCVC(value);
              } 
            }}
            onBlur={() => {
              if (cvc.length < 3) {
                cvcRef.current.style.borderColor = "red";
                setCVCCheck(false);
              } else {
                cvcRef.current.style.borderColor = "lightgray";
                setCVCCheck(true);
              }
            }}
          />
        </div>
        <div>
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onBlur={() => {
              if (email.length === 0 || email.indexOf("@") === -1 || email.indexOf(".") === -1) {
                emailRef.current.style.borderColor = "red";
                setEmailCheck(false);
              } else {
                emailRef.current.style.borderColor = "lightgray";
                setEmailCheck(true);
              }
            }}
            ref={emailRef}
          />
        </div>
        <div>
          <button 
            style={{background: "gray"}}
            ref={buttonRef}
          >
            submit
          </button>
        </div>
      </div>
    </div>
  );
}
