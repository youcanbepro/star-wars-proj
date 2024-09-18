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
   
{labelText&&<div className={styles.labelText}>{labelText}</div>}
  </div>)
}
