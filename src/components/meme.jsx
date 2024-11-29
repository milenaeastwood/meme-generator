import {useState, useEffect} from 'react';

const Meme = () => {

const [memes, setMemes] = useState([]);
const [textTop, setTextTop] = useState("");
const [textBottom, setTextBottom] = useState("");
const [currentMemeIndex, setCurrentMemeIndex] = useState(0);
const [error, setError] = useState(null);

useEffect( () => {
    async function fetchMeme()  {
     try {
        const result = await fetch('https://api.imgflip.com/get_memes');
        console.log(result)
        if (!result.ok) throw new Error(`Error: ${result.status}`);
        const parseData = await result.json();
        console.log(parseData);
        setMemes(parseData.data.memes);
     } catch (error) {
        console.log(error)
        setError(error);
     }
    }
    fetchMeme();
    }, []);


    if (error) {
        return <p>Something went wrong</p>;
    }

    const handlePreviousMeme = () => {
        setCurrentMemeIndex(prevIndex => (prevIndex === 0 ? memes.length - 1 : prevIndex - 1));
      };
    
    const handleNextMeme = () => {
        setCurrentMemeIndex(prevIndex => (prevIndex === memes.length - 1 ? 0 : prevIndex + 1));
      };
    
    const currentMeme = memes.length > 0 ? memes[currentMemeIndex].url : '';


return (
    <div>
        <form>
            <label htmlFor="text-top"></label>
            <input id="text-top" name="text-top" type="text" value={textTop} onChange={(e) => setTextTop(e.target.value)} placeholder="Text top"/>
            <label htmlFor="text-bottom"></label>
            <input id="text-bottom" type="text" value={textBottom} onChange={(e) => setTextBottom(e.target.value)} placeholder="Text bottom"/>
            <button>Submit</button>
        </form>
        <button onClick={handlePreviousMeme}>Previous meme</button>
        <button onClick={handleNextMeme}>Next meme</button>
        <input type="file" id="input" multiple />
        <div className='meme-container'>
            <img src={currentMeme} alt="" />
            <div className="meme-text-top">{textTop}</div>
            <div className="meme-text-bottom">{textBottom}</div>
        </div>
  </div>
)
}

export default Meme