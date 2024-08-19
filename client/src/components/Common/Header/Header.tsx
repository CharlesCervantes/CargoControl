import { useEffect, useState } from 'react'
import moment from 'moment'
import { sesionStore } from '../../../zustand/sesionStore'
import * as styles from './Header.css'
import '../../operator-layout/responsive.css'

interface Title {
  title: string
}

export function Header({ title }: Title) {
  const [currentTime, setCurrentTime] = useState(moment().format('hh:mm:ss A'))
  const { user } = sesionStore()

  // useEffect

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment().format('hh:mm:ss A'))
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div className={`${styles.header} header`}>
      <div className={`${styles.enterConatiner} flex`}>
        <p className={styles.p}>{ title }</p>
        <p className={styles.p}>{currentTime}</p>
        {/* TODO: revisar el almacenamiento de la sesion */}
        {/* <p>{user.email}</p> */}
      </div>
    </div>
  )
}
