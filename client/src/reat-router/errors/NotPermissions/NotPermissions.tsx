
import { Button, Title } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import registegicError from '../../../assets/registegic_notAccess.png'
import style from '../ErrorStyles.module.scss'

export function NotPermissions(props: { role: string }) {
  const navigate = useNavigate()
  const [role, setRole] = useState('')

  useEffect(() => {
    if (props.role === 'operator')
      setRole('admin/inicio')
    else if (props.role === 'admin')
      setRole('operator/visitor-enter')
  }, [props.role])
  console.log('roleIs:', role)
  return (
    <div className={style.errorContainer}>
      <img src={registegicError} alt="" />
      <Title className={style.title} color="red" order={1}>Acceso Denegado</Title>
      <Title className={style.subtitle} order={3}>No tienes permisos de {props.role}</Title>
      <Button onClick={() => navigate(`/${role}`)} style={{ marginTop: '1rem' }} size="md">Volver</Button>
    </div>
  )
}
