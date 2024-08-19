import { Input } from '@mantine/core'
import * as styles from '../../../../operator-layout/modalEnter.css'

interface ICompanyFieldset {
  onChange: any
  label: string
  name: string
}

export function CompanyFieldset({ onChange, label, name }: ICompanyFieldset) {
  return (
  // <Input.Wrapper label={label} required >
  //   <Input
  //     required
  //     placeholder={name}
  //     onChange={event => onChange(name, event.target.value)}
  //   />
  // </Input.Wrapper>
    <fieldset className={styles.fieldset}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input onChange={onChange} className={styles.input} id={name} name={name} required />
    </fieldset>
  )
}

// interface Ifieldset {
//   onChange: any
//   label: string
//   name: string
// }

// function Fieldset({ onChange, label, name }: Ifieldset) {
//   return (
//     <fieldset className={styles.fieldset}>
//       <label className={styles.label} htmlFor={name}>
//         {label}
//       </label>
//       <input onChange={onChange} className={styles.input} id={name} name={name} required />
//     </fieldset>
//   )
// }

// export default Fieldset
