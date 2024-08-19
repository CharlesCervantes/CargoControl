
import { Button, Title } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import registegicError from '../../../assets/registegic_error.png'
import style from '../ErrorStyles.module.scss'
export function NotSessionStarted() {
  const navigate = useNavigate()
  return (
    <div className={style.errorContainer}>

      <img src={registegicError} alt="" />
      <Title className={style.title} color="red" order={1}>Acceso Denegado</Title>
      <Title className={style.subtitle} order={3}>Primero debes iniciar sesion</Title>
      <Button onClick={() => navigate('/auth')} style={{ marginTop: '1rem' }} size="md">Volver al Inicio</Button>
    </div>
  )
}
