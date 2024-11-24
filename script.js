// To do next:
// 1) enable choice of different voices/volume/rate/pitch
// 3) enable typing of words on desktops
// 4) add a visual depiction of lives remaining with heart emojis
// 5) option to turn on animation/confetti (default should be "no confetti")
// 6) smoother page transitions
// 7) add a link to my portfolio - made with <3 by []
// 8) option to turn on/off reading of words from start screen and game screen
// 9) easy and hard modes - hard mode requires user to input letters in correct order
// 10) about/contact pages

// Object containing words and definitions
const options = {
onus: " a responsibility or duty that someone is expected to take on. The onus is on the captain to lead the team to victory.",
gnawing: "biting or chewing something repeatedly, often to wear it down or break it apart. Can also mean a constant, annoying pain or feeling, like something biting or chewing at you.",
rinds: "the hard outer layer of cheese, or the tough outer skin of fruits like lemons or oranges.",
defiantly: "doing something in a bold, rebellious way to show you're not willing to obey or agree.",
senile: "losing the ability to think clearly or remember things, usually because of old age.",
slander: "saying something untrue about someone to harm their reputation.",
vessel: "something that carries something else, like a ship that carries people or goods, a blood vessel that carries blood in the body, or a drinking container like a mug or cup."
        };
        
        //Initial references
        const questionNoContainer = document.querySelector(".question-no-container");
        const message = document.getElementById("message");
        const hintRef = document.querySelector(".hint-ref");
        const controls = document.querySelector(".controls-container");
        const startBtn = document.getElementById("start");
        const speakWordBtn = document.getElementById("speak-word-button");
        const speakDefinitionBtn = document.getElementById("speak-definition-button");
        const letterContainer = document.getElementById("letter-container");
        const userInpSectionChances = document.getElementById(
          "user-input-section-chances"
        );
        const userInpSectionWord = document.getElementById("user-input-section-word");
        const resultText = document.getElementById("result");
        let word = document.getElementById("word");
        const words = Object.keys(options);
        let randomWord = "";
        let randomHint = "";
        let winCount = 0;
        let lossCount = 0;
        let questionNo = 0;
        let randomArray = [];
        for (let i = 0, tempnames = words, len = words.length; i < len; i++) {
          let rnd = Math.floor(Math.random() * tempnames.length);
          randomArray.push(tempnames[rnd]);
          tempnames.splice(rnd, 1);
        }
        
        // const generateRandomValue = (array) => Math.floor(Math.random() * array.length);
        
        //Block all the buttons
        const blocker = () => {
          // let lettersButtons = document.querySelectorAll(".letters");
          stopGame();
        };
        let voices = window.speechSynthesis.getVoices();
        let synth = window.speechSynthesis;
        
        //Start game
        startBtn.addEventListener("click", () => {
          const play = () => {
            const reset = () => {
              let allLetters = document.querySelectorAll(".letters");
              let allLettersArray = Array.from(allLetters);
              allLettersArray.forEach((button) => (button.disabled = false));
              allLettersArray.forEach((button) => button.classList.remove("correct"));
              allLettersArray.forEach((button) => button.classList.remove("incorrect"));
              message.innerText = "";
            };
            questionNo++;
            reset();
            generateWord();
        
            controls.classList.add("hide");
            initialFunction();
        
            //Read random word out loud
            let msg = new SpeechSynthesisUtterance();
            msg.text = randomWord;
            let voiceList = document.querySelector("#voiceList");
            PopulateVoices();
            if (speechSynthesis !== undefined) {
              speechSynthesis.onvoiceschanged = PopulateVoices;
            }
            let selectedVoiceName =
              "Microsoft Sonia Online (Natural) - English (United Kingdom)";
            voices.forEach((voice) => {
              if (voice.name === selectedVoiceName) {
                msg.voice = voice;
              }
            });
            window.speechSynthesis.speak(msg);
          };
          play();
        });
        
        function PopulateVoices() {
          voices = synth.getVoices();
          // let selectedIndex = voiceList.selectedIndex < 0 ? 0 : voiceList.selectedIndex;
          voiceList.innerHTML = "";
          voices.forEach((voice) => {
            let listItem = document.createElement("option");
            listItem.textContent = voice.name;
            listItem.setAttribute("data-lang", voice.lang);
            listItem.setAttribute("data-name", voice.name);
            voiceList.appendChild(listItem);
          });
        
          voiceList.selectedIndex = 111;
        }
        
        //Read word out loud after clicking "Say word" button
        speakWordBtn.addEventListener("click", () => {
          speakWordBtn.classList.add("glow");
          setTimeout(() => {
            speakWordBtn.classList.remove("glow");
          }, 1500);
          //Read random word out loud
          let msg = new SpeechSynthesisUtterance();
          msg.text = randomWord;
          let voiceList = document.querySelector("#voiceList");
          PopulateVoices();
          if (speechSynthesis !== undefined) {
            speechSynthesis.onvoiceschanged = PopulateVoices;
          }
          let selectedVoiceName =
            "Microsoft Sonia Online (Natural) - English (United Kingdom)";
          voices.forEach((voice) => {
            if (voice.name === selectedVoiceName) {
              msg.voice = voice;
            }
          });
          window.speechSynthesis.speak(msg);
        });
        
        //Read definition out loud after clicking "Say definition" button
        speakDefinitionBtn.addEventListener("click", () => {
          speakDefinitionBtn.classList.add("glow");
          setTimeout(() => {
            speakDefinitionBtn.classList.remove("glow");
          }, 3000);
          let msg = new SpeechSynthesisUtterance();
          msg.text = randomHint;
          let voiceList = document.querySelector("#voiceList");
          PopulateVoices();
          if (speechSynthesis !== undefined) {
            speechSynthesis.onvoiceschanged = PopulateVoices;
          }
          let selectedVoiceName =
            "Microsoft Sonia Online (Natural) - English (United Kingdom)";
          voices.forEach((voice) => {
            if (voice.name === selectedVoiceName) {
              msg.voice = voice;
            }
          });
          window.speechSynthesis.speak(msg);
        });
        
        //Stop game
        const stopGame = () => {
          controls.classList.remove("hide");
        };
        
        //Generate word function
        const generateWord = () => {
          // letterContainer = each tile holding the letters of the alphabet on a grid. This code makes the alphabet tiles visible
          letterContainer.classList.remove("hide");
          userInpSectionWord.innerText = "";
        
          // randomWord = words[generateRandomValue(words)];
          console.log(randomArray);
          randomWord = randomArray[questionNo - 1];
          console.log(randomWord);
          randomHint = options[randomWord];
          console.log(randomHint);
          questionNoContainer.innerHTML = `<div id="questionNo"><span>Question </span>${questionNo} of ${randomArray.length}</div>`;
          hintRef.innerHTML = `<div id="wordHint"><span>Definition: </span>${randomHint}</div>`;
          let displayItem = "";
          randomWord.split("").forEach((value) => {
            displayItem += `<span class="inputSpace">_</span>`;
          });
        
          //Display each element as span containing underscored spaces, to be replaced by letters that the player guesses
          userInpSectionWord.innerHTML = displayItem;
        };
        
        //Initial function
        const initialFunction = () => {
          //Show remaining chances
          const showChances = () => {
            let heartsLeft = new Array(lossCount);
            heartsLeft.fill('<ion-icon class="heart" name="heart"></ion-icon>');
            userInpSectionChances.innerHTML = `<div id="chanceCount"><span>Chances left (for this word): ${lossCount}</span><span class="heartSpan"> ${heartsLeft.join(
              " "
            )}</span></div>`;
          };
          winCount = 0;
          lossCount = 5;
          randomWord = "";
          // word.innerText = "";
          randomHint = "";
          message.innerText = "";
          userInpSectionWord.innerHTML = "";
          letterContainer.classList.add("hide");
          letterContainer.innerHTML = "";
          generateWord();
        
          showChances();
          //Creating alphabet letter buttons
          // for (let i = 39; i < 91; i++) {
          //     if (![40, 41, 42, 43, 44, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64].includes(i)) {
          //   let button = document.createElement("button");
          //   button.classList.add("letters");
    
          [81,87, 69, 82, 84, 89, 85,73,79,80, 65,83, 68, 70, 71, 72, 74, 75, 76,39,90, 88, 67,86,66,78,77,45].forEach((i) => {
          
          let button = document.createElement("button");
          button.classList.add("letters");
        
            //Number to ASCII[A-Z]
            button.innerText = String.fromCharCode(i);
        
            //Character button onClick
            button.addEventListener("click", () => {
              message.innerText = `Correct Letter`;
              message.style.color = "#008000";
              let charArray = randomWord.toUpperCase().split("");
              let inputSpace = document.getElementsByClassName("inputSpace");
        
              const disableLetterButtons = () => {
                let allLetters = document.querySelectorAll(".letters");
                let allLettersArray = Array.from(allLetters);
                allLettersArray.forEach((button) => (button.disabled = true));
              };
        
              //If array contains clicked value, replace the matched dash with letter
              if (charArray.includes(button.innerText)) {
                charArray.forEach((char, index) => {
                  //If character in array is same as clicked button, add "correct" class
                  if (char === button.innerText) {
                    button.classList.add("correct");
                    //replace dash with letter
                    inputSpace[index].innerText = char;
                    //increment counter
                    winCount++;
                    //if winCount = word length
        
                    if (winCount === charArray.length) {
                      message.innerHTML = `The word was <span>"${randomWord}"</span>. You won!`;
                      disableLetterButtons();
                    }
                    //confetti
                    setTimeout(() => {
                      if (winCount === charArray.length) {
                        var defaults = {
                          spread: 360,
                          ticks: 120,
                          gravity: 0,
                          decay: 1,
                          startVelocity: 1,
                          shapes: ["star"],
                          colors: [
                            "FFE40002",
                            "FFBD0003",
                            "E8940004",
                            "FFCA6C05",
                            "FDFFB806",
                          ],
                        };
        
                        function shoot() {
                          confetti({
                            ...defaults,
                            particleCount: 70,
                            scalar: 1.8,
                            shapes: ["star"],
                          });
                        }
                        setTimeout(shoot, 50);
                      }
                    }, 0);
        
                    if (winCount === charArray.length) {
                      console.log("questionNo is now " + questionNo);
                      console.log(
                        "options.length is now " + Object.keys(options).length
                      );
        
                      if (questionNo === Object.keys(options).length) {
                        console.log("They match!");
                        setTimeout(() => {
                          startBtn.innerText =
                            "Game completed! Click here to start a new game.";
                          //block all buttons
                          blocker();
                          startBtn.addEventListener("click", () => {
                            location.replace(location.href);
                          });
                        }, 2500);
                      } else {
                        setTimeout(() => {
                          startBtn.innerText = "Next word";
                          //block all buttons
                          blocker();
                        }, 2500);
                      }
                    }
                  }
                });
              } else {
                //lose count
                button.classList.add("incorrect");
                lossCount--;
                showChances();
                // document.getElementById(
                //   "chanceCount"
                // ).innerText = `Chances Left: ${lossCount}`;
                message.innerText = `Incorrect letter`;
                message.style.color = "#ff0000";
                if (lossCount <= 0) {
                  disableLetterButtons();
                }
        
                if (lossCount <= 0) {
                  questionNo++;
                  message.innerHTML = `The word was <span>"${randomWord}"</span>. Better luck next time!`;
                  setTimeout(() => {
                    startBtn.innerText = "New word";
                    blocker();
                  }, 3000);
                }
              }
              //Disable clicked buttons
              button.disabled = true;
            });
            //Append generated buttons to the letters container
            letterContainer.appendChild(button);
          
        })
        
        };
        
        
        window.onload = () => {
          initialFunction();
        };
        