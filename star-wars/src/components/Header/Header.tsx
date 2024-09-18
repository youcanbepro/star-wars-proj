import styles from './Header.module.css'
import cx from 'classnames'

type ElementType={
    kindOfElement?:"header"|"footer"
}
export const Header = ({kindOfElement}:ElementType)=> {
return (<div className={cx(styles.header ,{
    [styles.footer]: kindOfElement=="footer",
  })}></div>)
}
