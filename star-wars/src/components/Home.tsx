import { useEffect } from 'react'
import styles from './Home.module.css'
import cx from 'classnames'

export const Home =  ()=> {
    useEffect(() => {
        /* This is added to have the long press functionality 
          */
        window.oncontextmenu = (event: MouseEvent) => {
          if ((event as PointerEvent)?.pointerType === "mouse") {
            return false // context menu was triggered by right click
          }
        }
      }, [])

    return (
          <div className={cx(styles.container) }>
            This is Home Page
          </div>
       
    )
  }