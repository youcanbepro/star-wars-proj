import { useEffect, useState } from 'react'
import styles from './Home.module.css'
import { Header } from './Header/Header';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';
import { TileButton } from './UIElements/TileButton';
import { getEnumKeyByEnumValue } from '../utils/utilityCollection';

export enum EApiQueryType {
  People="people",
  Planets="planets",
  Species="species",
  Films="films",
  StarShips="starships",
  Vehicles="vehicles",
 };

export const Home =  ()=> {

    const [data, setData] = useState<RespExampleType|null>(null)
    const [removeData,setRemoveData]= useState(false)
    const keys = Object.keys(EApiQueryType)
    console.log(keys)

    async function getDataFromServer(apiEndPoint:EApiQueryType): Promise<void> {
        try {
            const res = await fetch(`https://swapi.py4e.com/api/${apiEndPoint}`,{ mode: 'cors',method:'GET' },);
        const data: RespExampleType  = await res.json();
        setData(data)
        } catch (error) {
            //could write a better error handler
            console.error("Api Error: Promise failed",error)
        }
      }

    useEffect(() => {
        /* This is added to have the long press functionality
          */
        window.oncontextmenu = (event: MouseEvent) => {
          if ((event as PointerEvent)?.pointerType === "mouse") {
            return false // context menu was triggered by right click
          }
        }
      }, [])




      const allPeopleOnPage = data?.results.map((people:any) => {
		console.log(people);

		return (
			<div className={classNames(styles.people,styles.card)}>
				<h2 key={people.name}>{people.name}</h2>
				<p>Gender: {people.gender}</p>
				<p>Birth Year: {people.birth_year}</p>
				<p>Height: {people.height}</p>
				<p>Hair Color: {people.hair_color}</p>
				<p>Skin Color: {people.skin_color}</p>
				<p>Eye Color: {people.eye_color}</p>
				<br />
			</div>
		)
	})


    return (
        <div className={styles.container}>
        <Header labelText='Star Wars'></Header>
        <div className={styles.content}>
        {Object.values(EApiQueryType).map((val)=>  (<TileButton key={uuidv4()} name={getEnumKeyByEnumValue(EApiQueryType,val)} onClick={()=>{
          getDataFromServer(val)
        }}></TileButton>))}
        </div>
        <div className={styles.gridContainer}>{data&&!removeData&&allPeopleOnPage}</div>
        <Header kindOfElement='footer' labelText='@2024 Rahul Ranjan'></Header>
    </div>
    )
  }

