import { useEffect, useState } from 'react'
import styles from './Home.module.css'

export const Home =  ()=> {
   
   const value="people"
    const urlWithProxy = `https://swapi.py4e.com/api/${value}`;
    const [data, setData] = useState<RespExampleType|null>(null);
    

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

      useEffect(()=>{
        console.log(data)
      },[data])

    return (
        <div className={styles.app}>
      <button className={styles.button} onClick={getDataFromServer}>
        Get Data
      </button>
    </div>
 
    )
  }

