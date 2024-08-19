import { Input } from '@mantine/core'
import * as styles from '../../../../operator-layout/modalEnter.css'

interface ILocationFieldset {
  onChange: any
  label: string
  name: string
}

export function LocationFieldset({ onChange, label, name }: ILocationFieldset) {
  return (
    <fieldset className={styles.fieldset}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input onChange={onChange} className={styles.input} id={name} name={name} required />
    </fieldset>
  )
}
