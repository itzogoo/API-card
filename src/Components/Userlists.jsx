
import {useState, useEffect} from "react";
import UserListCard  from "./UserListCard";
import "./Userlists.css";


const Userlists = () => {
    const [userlists, setUserlists] = useState(null);
    const [UserlistsData, setUserlistsData] = useState(null);


// function to fetch data from github api
const fetchData = async() => {
    const response = await fetch("https://api.github.com/users");
    
    const data= await response.json();
    setUserlists(data);
    setUserlistsData(data);
}

useEffect (() => {
    fetchData();
}, []);

// search form management
const [searchText, setSearchText] = useState("");


// filter profiles based on search text
const filteredUserlists = userlists?.filter(({login}) => {
    return login.toLowerCase().includes(searchText.toLowerCase());  
});

const handleSearch = (event) => {
    event.preventDefault();
    setUserlistsData(filteredUserlists);
};

//console.log("all data", filteredProfiles);



  return (
    <>
    <div className="searchForm">
        <form>
            <input
            type="text" 
            placeholder="Search..." 
            value={searchText}
            onChange={(event) => setSearchText(event.target.
                value) }
             />     
            <button type="type" onClick={handleSearch}>Search</button>      
        </form>
    </div>
     <div className="grid">
        {UserlistsData?.map(({login, id, avatar_url}) => {
            return (
                <UserListCard
                key={id}
                username={login}
                image={avatar_url}
                />
            );
        })};
    </div>
    </> 
  );
}

export default Userlists;