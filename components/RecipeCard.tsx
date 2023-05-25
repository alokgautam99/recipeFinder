import recipeCardCss from '../styles/recipeCard.module.css';
import Image from 'next/image';
import ArrowIcon from '../public/Arrow.svg';
import { useState } from 'react';

const RecipeCard = ({save, data,savedValue,setSavedValue,setFlag}) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [saved, setSaved] = useState(save);
    console.log(data);

    const {image ,calories,ingredientLines,totalTime,totalWeight,label,dishType,mealType} = data;

    const arrowId = `itemImg${calories}`;

    const openIngredients = () => {
        if(drawerOpen){
            document.getElementById(arrowId).style.transform = "rotate(0deg)";
        }else{
            document.getElementById(arrowId).style.transform = "rotate(180deg)";
        }
        setDrawerOpen(!drawerOpen);
    }

    const onSave = () => {
        const temp = {image ,calories,ingredientLines,totalTime,totalWeight,label,dishType,mealType};
        let foundObj = savedValue?.find(item => item.label === label);
        if(foundObj){
            const tempSavedValue = savedValue;
            const filteredPeople = tempSavedValue.filter((item) => item.label !== label);
            setSavedValue([...filteredPeople]);
        }else{
            const tempSavedValue = savedValue;
            tempSavedValue.push(temp);
            if(tempSavedValue){
                setSavedValue([...tempSavedValue]);
            }
        }
        setFlag(true);
        setSaved(!saved);
    }

    return (
        <div className={recipeCardCss.completeWrapper}>
            <div className={recipeCardCss.wrapper}>
                <div className={recipeCardCss.itemInfo}>
                    <div className={recipeCardCss.title}>
                        {label}
                    </div>
                    <div className={recipeCardCss.mealType}>
                        Dish Type: {dishType[0]} + Meal Type: {mealType[0]}
                    </div>
                    <div className={recipeCardCss.amount}>
                        Calories: {calories} &lt;&gt; Total Weight: {totalWeight}
                    </div>
                    <div className={recipeCardCss.totalTime}>
                        Total Time: {totalTime}
                    </div>
                    <div className={recipeCardCss.details} onClick={openIngredients}>
                        <div className={recipeCardCss.ingredients}>
                        Complete Ingredients
                        </div>
                        <Image src={ArrowIcon} alt='Arrow' height={20} width={20} id={arrowId}/>
                    </div>
                </div>
                <div className={recipeCardCss.itemImg}>
                    <Image src={image} alt='Recipe logo' width={180} height={180} className={recipeCardCss.ItemImgCmp}/>
                    <Image src={image} alt='Recipe logo' width={150} height={150} className={recipeCardCss.ItemMwebImgCmp}/>
                    <div className={recipeCardCss.save} onClick={()=>onSave()}>
                        {saved ? 'Saved': 'Save'}
                    </div>
                </div>
            </div>
            {drawerOpen ? 
                <div className={recipeCardCss.ingredientsDiv}>
                <ol>
                    {ingredientLines.map((item)=>{
                        return (
                            <li key={item}>{item}</li>
                        );
                    })}
                </ol> 
            </div>
            : 
                <></>
            }
        </div>
    );
}

export default RecipeCard;