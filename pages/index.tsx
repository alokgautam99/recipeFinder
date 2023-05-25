"use client"; // this is a client component 
import usefetch from '@/components/Fetcher';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import indexCss from '../styles/index.module.css';
import Image from 'next/image';
import SearchIcon from '../public/SearchIcon.svg';
import RecipeCard from '@/components/RecipeCard';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [response, setResponse] = useState();
  const [result, setResult] = useState();
  const [search, setSearch] = useState('');
  const [savedValue, setSavedValue] = useState([]);
  const [flag, setFlag] = useState(false);

  const onSearch = () => {
    const data = usefetch({Endpoint: `https://api.edamam.com/search?q=${search}&app_id=${process.env.NEXT_PUBLIC_ID}&app_key=${process.env.NEXT_PUBLIC_KEY}`});
    data.then((res)=>{setResponse(res.hits)})
  }

  useEffect(()=>{
    setResult(response);
  },[response])

  useEffect(()=>{
    if(flag){
      localStorage.setItem('savedRecipe', JSON.stringify(savedValue));
    }
  },[flag, savedValue, savedValue?.length])

  useEffect(()=>{
      const localSavedRecipe = JSON.parse(localStorage.getItem('savedRecipe'));
      if(localSavedRecipe){
        setSavedValue(localSavedRecipe);
      }
  },[flag])

  const checkSavedValue = (checkItem) => {
    let foundObj = savedValue?.find(item => item.label === checkItem.label);
    if(foundObj){
      return true;
    }
    return false;
  }

  return (
    <div className={indexCss.wrapper}>
      <div className={indexCss.inputWrapper}>
        <input type='text' placeholder='Search Recipe' className={indexCss.searchInput} onChange={(e)=>setSearch(e.target.value)}/>
        <Image src={SearchIcon} alt='Search Icon' width={50} height={50} className={indexCss.searchBtn} onClick={onSearch} />
      </div>
      <div className={indexCss.cardWrapper}>
        {search ? 
          result?.map((item,index)=>{
            return (
              <RecipeCard save={checkSavedValue(item?.recipe)} data={item?.recipe} key={index + item?.recipe?.totalTime} setSavedValue={setSavedValue} savedValue={savedValue} setFlag={setFlag} />
            )
          })
        :
        <div className={indexCss.savedItemsWrapper}>
          <div className={indexCss.savedItemsTitle}>
            Your Saved Recipes
          </div>
        {savedValue?.map((item,index)=>{
          return (
            <RecipeCard save={true} data={item} key={index+item.totalTime+item.label} setSavedValue={setSavedValue} savedValue={savedValue} setFlag={setFlag} />
          )
        })}
        </div>
        }
      </div>
    </div>
  )
}
