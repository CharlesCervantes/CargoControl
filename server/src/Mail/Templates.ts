
import { env } from '../env'
import { transporter } from '../config/nodemailer'

export const demoRegister = async(name: string, lastname: string, password: string, organizationname: string, organizationid: string, email: string) => {
  const info = await transporter.sendMail({
    from: `"Registegic" <${env.MAIL_ACCOUNT}>`,
    to: `${email}`,
    subject: 'Informacion de registro de cuenta demo',
    html: `
            <div>
                <h1>Bienvenido a Info Guard</h1>
                <img src="https://i.postimg.cc/Wzfrf0rg/Logo2.png">
            </div>
            <p>Bienvenido ${name} ${lastname}</>
            <h2>Registro de credenciales para inicio de sesion</h2>
            <br>
            <p>nombre de la organización: ${organizationname}</p>
            <p>id organización: ${organizationid}</p>
            <p>correo electrónico: ${email}</p>
            <p>contraseña: ${password}</p>
        `,
  })
  return info
}

export const sendUserCredentials = async(email: string, password: string, username: string) => {
  const info = await transporter.sendMail({
    from: `"Registegic" <${env.MAIL_ACCOUNT}>`,
    to: `${email}`,
    subject: 'Informacion de registro de cuenta demo',
    html: `
            <div>
                <h1>Bienvenido a Info Guard!</h1>
                <img src="https://i.postimg.cc/Wzfrf0rg/Logo2.png">
            </div>
            <h2>Sus credenciales de Inicio de Sesion Son: </h2>
            <br>
            <p>Correo: ${email}</p>
            <p>Usuario: ${username}</p>
            <p>Contraseña: ${password}</p>
        `,
  })
  return info
}

export const sendNewPassword = async(email: string, password: string, username: string) => {
  const info = await transporter.sendMail({
    from: `"Registegic" <${env.MAIL_ACCOUNT}>`,
    to: `${email}`,
    subject: 'Actualizacion en tu informacion',
    html: `
            <div>
                <h1>Tus credenciales de inicio de sesión cambiaron!</h1>
                <img src="https://i.postimg.cc/Wzfrf0rg/Logo2.png">
            </div>
            <h2>Tu nueva contraseña de inicio de sesión es: </h2>
            <br>
            <p>Contraseña: ${password}</p>
        `,
  })
  return info
}

transporter.verify().then(() => {
  console.log('Ready for send emails')
})
