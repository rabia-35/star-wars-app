import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchStarship } from "redux/StarWarsSlice";
import './style.css';
import dataTitles from './titles.json'
const Search = () => {
  const [text, setText] = useState("");
  const [filteredTitle, setFilteredTitle]=useState([])
  const error = useSelector((state) => state.starships.error) 
  const dispatch = useDispatch();

    const handleChange=(e)=>{
      setText(e.target.value.replace(/\s+/," "))
    }

  useEffect(() => {
    if (text.length >1) {
      setFilteredTitle(dataTitles.titles.filter(item=> item.title.toLowerCase().includes(text.toLowerCase()) ))
    }else{setFilteredTitle([])}

  }, [text]);


  return (
    <>
      <div className="search-area">
        <form className="input-group  mb-3" onSubmit={(e)=> e.preventDefault()}>
            <input
              type="search"
              className="form-control"
              placeholder="Enter Name or Model"
              aria-label="Search"
              value={text}
              onChange={handleChange}
            />
          </form>
              <ul>
                {filteredTitle.map((item,ind)=>(
                  <li key={ind} onClick={()=>{dispatch(searchStarship(item.title.toLowerCase())); setText("")}} ><a href="#" >{item.title}</a></li>
                ))}
              </ul>
      </div>

      {error.length > 0 && (
        <div className=" align-items-center mt-2 text-center ">{error}</div>
      )}
    </>
  );
};

export default React.memo(Search);
