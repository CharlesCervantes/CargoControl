/* eslint-disable @typescript-eslint/no-unused-vars */
import * as styles from '../../operator-layout/modalEnter.css'
import * as style from './listQR.css'
import type React from 'react'

interface SelectOption<T> {
  value: T
  label: React.ReactNode
}

interface SelectListProps<T> {
  name: string
  data: Array<T>
  valueKey: keyof T
  labelKey: keyof T
  onChange: (value: T) => void // Actualización aquí
  isRequired?: boolean
}

function SelectList<T>(props: SelectListProps<T>) {
  const { name, data, valueKey, labelKey, onChange, isRequired } = props

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value as unknown as T[keyof T]
    const selectedItem = data.find(item => String(item[valueKey]) === selectedValue)
    console.log(selectedValue, selectedItem)
    if (selectedItem)
      onChange(selectedItem)
  }

  return (
    <fieldset className={styles.fieldsetSelect}>
      <label className={styles.label} htmlFor={name}>
        {name}
        {isRequired && <span className={style.required}>*</span>}
      </label>
      <select className={styles.inputSelect} onChange={handleChange}>
        <option className={styles.inputOption} value="">Seleccione una opción</option>
        {data.map(item => (
          <option className={styles.inputOption} key={String(item[valueKey])} value={String(item[valueKey])}>
            {String(item[labelKey])}
          </option>
        ))}
      </select>
    </fieldset>
  )
}

export default SelectList
