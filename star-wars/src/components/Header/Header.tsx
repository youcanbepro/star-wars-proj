import { Button } from '../UIElements/Button'
import styles from './Header.module.css'
import cx from 'classnames'

type ElementType={
    kindOfElement?:"header"|"footer"
    labelText?:string
}
export const Header = ({kindOfElement, labelText}:ElementType)=> {
return (<div className={cx(styles.header ,{
    [styles.footer]: kindOfElement=="footer",
  })}>
    {kindOfElement!=="footer"&&
    <>
    <Button theme='light' labelText='People'></Button>
    <Button theme='light' labelText='Planets'></Button>
    <Button theme='light' labelText='Species'></Button>
    <Button theme='light' labelText='Films'></Button>
    <Button theme='light' labelText='Starships'></Button>
    <Button theme='light' labelText='Vehicles'></Button>
    </>
    }
{labelText&&<div className={styles.labelText}>{labelText}</div>}
  </div>)
}
