import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDeatailsData, setRecipeDetailsData] = useState(null);
  // const [users, setUsers] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);
  const navigate = useNavigate();

  // async function fetchUsers(){
  //     try {
  //       setLoading(true);
  //       const res = await fetch(
  //         `https://dummyjson.com/users`
  //       );
  //       const data = await res.json();
  //       if (data?.data?.recipes) {
  //         setUsers(data?.data?.recipes);
  //         setLoading(false);
  //       }
  //       console.log(data);
  //     } catch (e) {
  //       console.log(e);
  //       setLoading(false);
  //     }
  // }
  // fetchUsers()
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );
      const data = await res.json();
      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes);
        setLoading(false);
        setSearchParam("");
        navigate("/hackatons");
      }
      console.log(data);
    } catch (e) {
      console.log(e);
      setLoading(false);
      setSearchParam("");
    }
  }
  function handleAddToFavorite(getCurrentItem) {
    console.log(getCurrentItem);
    let cpyFavoritesList = [...favoritesList];
    const index = cpyFavoritesList.findIndex(
      (item) => item.id === getCurrentItem.id
    );
    if (index === -1) {
      cpyFavoritesList.push(getCurrentItem);
    } else {
      cpyFavoritesList.splice(index);
    }
    setFavoritesList(cpyFavoritesList);
  }
  
  console.log(favoritesList, recipeList);
  useEffect(() => {}, []);
  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        loading,
        recipeList,
        setSearchParam,
        handleSubmit,
        recipeDeatailsData,
        setRecipeDetailsData,
        handleAddToFavorite,
        favoritesList,
        // users,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
