import * as styles from '../operator-layout/modalEnter.css'

interface Ifieldset {
  onChange: any
  label: string
  name: string
  isRequired?: boolean
}

function Fieldset({ onChange, label, name, isRequired }: Ifieldset) {
  return (
    <fieldset className={styles.fieldset}>
      <label className={styles.label} htmlFor={name}>
        {label}
        {isRequired && <span className={styles.required}>*</span>}
      </label>
      <input onChange={onChange} className={styles.input} id={name} name={name} required />
    </fieldset>
  )
}

export default Fieldset
