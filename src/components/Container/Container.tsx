import { PropsWithChildren } from 'react'
import classes from './Container.module.scss'


export const Container = ({children}: PropsWithChildren) => {
  return (
    <div className={classes.container}>{children}</div>
  )
}

