import { useState } from 'react'

export function useForm(callback: any, initialState: any) {
  const [values, setValues] = useState(initialState)

  // onChange
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  // onSubmit
  const onSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // TODO: en el await va la funcion que enviara la informacion hacia el servidor
    await callback()
  }

  // onReset
  const onReset = () => {
    setValues({})
  }

  return {
    onChange,
    onSubmit,
    values,
    onReset,
  }
}
