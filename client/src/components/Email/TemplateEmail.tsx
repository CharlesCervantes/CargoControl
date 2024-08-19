import { Html } from '@react-email/html'
import { Container } from '@react-email/container'
import { Section } from '@react-email/section'
import { Text } from '@react-email/text'
import { Hr } from '@react-email/hr'
import { Img } from '@react-email/img'
import { Preview } from '@react-email/preview'

export default function TemplateEmail(props: { email: string, password: string, userName: string }) {
  return (
    <Html>
      <Preview>Tus Credenciales para Registegic</Preview>
      <Container
        style={{
          // borderStyle: "solid",
          // borderColor: "#e9ecef",
          // borderWidth: "1px",
          // borderRadius: "5px",
          // padding: "10px",
          // width:"100%"
        }}
      >
        <Img
          src="https://i.postimg.cc/Mp2tKgqq/Registegic-logo-correo.png"
          alt="Registegic"
          width="25%"
          height="100%"
          style={{

          }}
        />
        <Hr />
        <Section>
          <Container
            style={{
              // background: "#f8f9fa",
              padding: '1%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'init',
            }}
          >
            <Text
              style={{
                color: '#1d1c1d',
                fontFamily: '-apple-system',
                fontSize: '200%',
                fontWeight: 'bold',
              }}
            >
              Tus Credenciales de Inicio de Sesión
            </Text>
          </Container>
        </Section>
        <Hr />
        <Section>
          <Container
            style={{
              // background: "#f8f9fa",
              padding: '1%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: 'black',
                fontFamily: '-apple-system',
                fontSize: '20',
                fontWeight: 'bold',
              }}
            >
              Usuario: {props.userName}
            </Text>
            <Text
              style={{
                color: 'black',
                fontFamily: '-apple-system',
                fontSize: '20',
                fontWeight: 'bold',
              }}
            >
              Correo: {props.email}
            </Text>

            <Text
              style={{
                color: 'black',
                fontFamily: '-apple-system',
                fontSize: '20',
                fontWeight: 'bold',
              }}
            >
              Contraseña: {props.password}
            </Text>
          </Container>
        </Section>
      </Container>
    </Html>
  )
}
