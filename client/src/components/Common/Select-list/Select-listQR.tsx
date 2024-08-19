/* eslint-disable @typescript-eslint/no-unused-vars */
import * as styles from './listQR.css'
import type React from 'react'

interface SelectOption<T> {
  value: T
}

interface SelectListProps<T> {
  name: string
  data: Array<T>
  valueKey: keyof T
  onChange: (value: T) => void // Actualización aquí
}

function SelectListVisitor<T>(props: SelectListProps<T>) {
  const { name, data, valueKey, onChange } = props

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value as unknown as T[keyof T]
    const selectedItem = data.find(item => String(item[valueKey]) === selectedValue)
    if (selectedItem)
      onChange(selectedItem)
  }

  return (
    <select className={styles.inputSelect} onChange={handleChange}>
      <option className={styles.inputOption} value="">Tipo de visita</option>
      {data.map(item => (
        <option className={styles.inputOption} key={String(item[valueKey])} value={String(item[valueKey])} />
      ))}
    </select>
  )
}

export default SelectListVisitor
