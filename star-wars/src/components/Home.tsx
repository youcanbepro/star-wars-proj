import { useEffect, useState } from 'react'
import styles from './Home.module.css'
import { Header } from './Header/Header';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';

export const Home =  ()=> {
   
   const value="people"
    const urlWithProxy = `https://swapi.py4e.com/api/${value}`;
    const [data, setData] = useState<RespExampleType|null>(null)

    const [removeData,setRemoveData]= useState(false)


    async function getDataFromServer(): Promise<void> {
        try {
            const res = await fetch(urlWithProxy,{ mode: 'cors',method:'GET' },);
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
        <Header ></Header>
        <div className={styles.content}>
        <button className={styles.button} onClick={
           ()=>  {
            setRemoveData(false)
            getDataFromServer()}}>
        Get Data
      </button>
      <button className={styles.button} onClick={()=>
            setRemoveData(true)}>
        Remove Data
      </button>
     {data&&!removeData&&allPeopleOnPage}
        </div>
        <Header kindOfElement='footer'></Header>
     
    </div>
 
    )
  }

