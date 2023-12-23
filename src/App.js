import './App.css';
import { useEffect,useState } from 'react';
import { countryList } from './countries';

function App() {

  let limitQestionCount = 20;
  let [score,setScore] = useState(0);
  let [selectedCountry,setSelectedCountry] = useState("Qatar");
  let [randomSelectedCountries,setRandomSelectedCountries] = useState();
  let [questionCount, setQuestionCount] = useState(0);

  let getRandomFourCountries = () =>
  {
    let randomItems = [...new Array(4)].map(()=>~~(Math.random()*countryList.length));
    let randomSet = new Set(randomItems);

   if(randomSet.size<4){
    while(randomSet.size<=4){
      randomSet.add(~~(Math.random()*countryList.lebgth));
    }} 

    let randomCountries = [];
    Array.from(randomSet).forEach((i)=>{
       return randomCountries.push(countryList[i]);
    });

    return randomCountries;
  }

  let getRandomSelectedCountry = () => {

    console.log("===Random Select Called");
    let randomFourCountries = getRandomFourCountries();
    let selectedCountry = randomFourCountries[~~(Math.random()*4)];
    let country = selectedCountry.name;
    country = country.replace(/ /g,"_");
    setSelectedCountry(country);
    let randomSelectedCountry =   {"selectedCountry": selectedCountry, "randomFourCountries": randomFourCountries};
    console.log(randomSelectedCountry);
    setRandomSelectedCountries(randomSelectedCountry);
   }

  let handleNext = () =>
  {
    //getRandomSelectedCountry();
    
    if(questionCount<=limitQestionCount){
       getRandomSelectedCountry();
    }
    setQuestionCount(questionCount+1);
  }

  let handleAnswer = (e) => {
    let answer = e.target.value;
    //e.style.color = 'green';
    console.log(answer);
    console.log(randomSelectedCountries.selectedCountry.name);
    if(answer === randomSelectedCountries.selectedCountry.name){
      setScore(score+1);
    }
   // handleNext();
  }
  
  useEffect(()=>{
    getRandomSelectedCountry();
    //setRandomSelectedCountries(randomSelectedCountry);
    //
  },[]);

 
  return (
    <div className="App">
       <h1> Guess The Flag Game</h1>
       <h2> Current Score :: {score} </h2>
       <img alt='flag' src={process.env.PUBLIC_URL+"/assets/flags/"+selectedCountry+".png"} />
       
       {
        randomSelectedCountries?.randomFourCountries.map((country) => (
          <button key={country.id}  value={country.name} onClick={handleAnswer}>
            {country.name}
          </button>
        ))
      }
      <br/>
      { questionCount<=20 ?
      <button onClick={()=>handleNext()}>Next</button>
       :
       <div>
       <button>Finish</button>
       <button onClick={()=>handleNext()}>Restart</button>
       </div>

      }
    </div>
  );
}

export default App;
