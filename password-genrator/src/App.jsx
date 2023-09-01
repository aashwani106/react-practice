/* eslint-disable no-unused-vars */
import { useState, useCallback, useEffect, useRef } from "react";
function App() {
  const [length, setlength] = useState(8);
  const [isNum, setNum] = useState(false);
  const [isChar, setChar] = useState(false);
  const [pass, setPass] = useState("");
  const [textColor, setTextcolor] = useState('blue')
  const [text , setText] = useState('copy')

  const passRef = useRef(null)

  const passGen = useCallback(() => {
    console.log('passGen is here ');
    let pass = " ";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNum) {
      str += "0123456789";
    }
    if (isChar) {
      str += "!@#$%^&*()_+={}[]";
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }

    setPass(pass)
  }, [length, isNum, isChar, setPass]);


  const copyPassToClip = useCallback(() => {
    passRef.current?.select()
    passRef.current?.setSelectionRange(0, 101)
    window.navigator.clipboard.writeText(pass)
    setText('copied')
    setTextcolor('green')
  }, [pass])

  useEffect(() => {
    passGen()
    setText('copy')
    setTextcolor('blue')
  }, [length, isNum, isChar, passGen])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center my-3">
        Password Genrator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={pass}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passRef}
          />
          <button className="outline-none text-white px-3 py-0.5 shrink-0"
            style={{ backgroundColor: textColor }}
            onClick={copyPassToClip}
          >
            {text}
          </button>
        </div>
        <div className="flex text-sm gap-x-2" >
          <div className="flex items-center gap-x-1">
            <input type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => { setlength(e.target.value) }}
            />
            <label> Length: {length} </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={isNum}
              id="numberInput"
              className="cursor-pointer"
              onChange={(e) => {
                setNum((prev) => !prev)
              }}
            />
            <label htmlFor="numberInput">Number</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={isChar}
              id="charinput"
              className="cursor-pointer"
              onChange={(e) => {
                setChar((prev) => !prev)
              }}
            />
            <label htmlFor="numberInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
