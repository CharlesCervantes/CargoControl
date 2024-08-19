
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { Button, Divider, Group, Modal } from '@mantine/core'
import { createId } from '@paralleldrive/cuid2'
import iconVisit from '@iconify-icons/ph/identification-badge'
import toast from 'react-hot-toast'
import Fieldset from '../../Fieldset'
import { imagesStore } from '../../../../zustand/fileStore'
import * as styles from '../../modalEnter.css'
import { useForm } from '../../../../tools/useForm'
import { useTheme } from '../../../../styles/contextTheme'
import SelectList from '../../../Common/Select-list/Select-list'
import { visitorTypeStore } from '../../../../zustand/visitorTypeStore'
import { getAllVisitorTypes } from '../../../../fetch/Visitor/getVisitorTypes'
import { useVisitorEnterStore } from '../../../../zustand/visitorEnterStore'
import { Camera } from '../../../Camera/Camera'
import type { IArrImages, IVisitor, IVisitorType } from '../../../../interfaces'
import '../../responsive.css'

export function VisitorForm() {
  const { theme } = useTheme()
  const [open, setOpen] = useState(false)
  const { setVisitor } = useVisitorEnterStore()
  const [valueVisitorType, setValueVisitorType] = useState<IVisitorType>()
  const { setVisitorTypes, visitorTypes, resetVisitorType } = visitorTypeStore()
  const { addImage } = imagesStore()

  const [pictureState, setPictureState] = useState<any>(null)
  const [identificationState, setIdentification] = useState<any>(null)

  const initValues: IVisitor = {
    id: '',
    organizationId: '',
    personId: '',
    subject: '',
    visitorTypeId: '',
    badge: '',
    Company: {
      id: '',
      name: '',
    },
    companyId: '',
    Person: {
      id: '',
      isInside: false,
      name: '',
      lastname: '',
      curp: '',
      organizationId: '',
      picture_url: '',
      identification_url: '',
      security_social_number: '',
      email: '',
      license: '',
      numberphone: '',
    },
  }
  const { onChange, onSubmit, values, onReset } = useForm(handleSave, initValues)

  function handleSave() {
    try {
      const autoId = createId()
      const newVisitor: IVisitor = {
        id: autoId, // requerido, pero solo en frontend
        isExit: false, // requerido
        organizationId: '',
        personId: '',
        subject: values.subject, // requerido totalmente
        visitorTypeId: valueVisitorType?.id || '', // requerido
        badge: values.badge,
        Company: {
          id: autoId,
          name: values.company,
        },
        companyId: '',
        Person: {
          isInside: true,
          name: values.name,
          lastname: values.lastname,
          identificationFiles: autoId,
          id: autoId,
          organizationId: '',
          curp: values.curp.toUpperCase() || undefined,
          security_social_number: values.social_security_number,
          numberphone: '',
          license: '',
        },
      }

      console.log('pictureState', pictureState)
      console.log('identificationState', identificationState)
      if ((pictureState || identificationState) === null) {
        throw new Error('Fotos obligatorias')
        // toast.error('Fotos obligatorias')
      } else {
        onReset()
        setOpen(false)
      }

      if (newVisitor.Person?.name !== '' && newVisitor.Person?.name !== undefined && newVisitor.subject !== '') {
        setVisitor(newVisitor)
        setIdentification(null)
        setPictureState(null)

        if (pictureState !== null) {
          const newImges: IArrImages = { name: `${autoId}_picture.png`, base64: pictureState }
          addImage(newImges)
        }

        if (identificationState !== null) {
          const newImges: IArrImages = { name: `${autoId}_identification.png`, base64: pictureState }
          addImage(newImges)
        }
        console.log(newVisitor)
      } else {
        const errorBody = 'Llena los datos requeridos'
        const error = new Error(errorBody)
        throw error
      }
    } catch (error) {
      console.error(error)
      toast.error('Llena los datos requeridos')
    }
  }

  useEffect(() => {
    document.body.className = theme
    const fetchData = async() => {
      try {
        const data = await getAllVisitorTypes()
        setVisitorTypes(data.data)
      } catch (error) {
        console.error(error)
        toast.error(`error al obtener los tipos de visitantes: ${error}`)
      }
    }
    fetchData()

    return () => {
      resetVisitorType()
    }
  }, [theme, setVisitorTypes, resetVisitorType])

  return (
    <>
      <Group>
        <button
          className={`${styles.itemOperador} itemOpMov ${theme}`}
          onClick={() => setOpen(true)}
        >
          <p><Icon icon={iconVisit} /> <span className="displayNone">Visitante</span></p>
        </button>
      </Group>
      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        withCloseButton={false}
        transitionProps={{ transition: 'fade', duration: 600 }}
        className="modalResp"
        size="95%"
      >
        <Modal.Title className={styles.dialogTitle}>Control de Acceso</Modal.Title>
        <Modal.Body className={styles.dialogDescription}>
          <div className="formResp">
            <form onSubmit={onSubmit}>
              <Fieldset
                name="name"
                onChange={onChange}
                label="Nombre(s):"
                isRequired
              />
              <Fieldset
                name="lastname"
                onChange={onChange}
                label="Apellidos:"
                isRequired
              />
              <Fieldset
                name="curp"
                onChange={onChange}
                label="CURP"
              />
              <Fieldset
                name="social_security_number"
                onChange={onChange}
                label="NSS"
              />
              <Fieldset
                name="company"
                onChange={onChange}
                label="Empresa"
                isRequired
              />
              <Fieldset
                name="subject"
                onChange={onChange}
                label="Motivo de visita"
                isRequired
              />
              <Fieldset
                name="badge"
                onChange={onChange}
                label="Gafete"
              />
              <SelectList
                isRequired
                name="Tipo de visita"
                data={visitorTypes}
                valueKey="id"
                labelKey="name"
                onChange={(selectedValue) => {
                  if (selectedValue !== undefined)
                    setValueVisitorType(selectedValue)
                }}
              />

              <Divider />
              <div className={styles.photoContainer}>

                <div>
                  <h2>Fotografía</h2>
                  { pictureState
                    ? <div className={styles.imageContainer}><img src={pictureState} className={styles.imagePreview} /><Button className={styles.imageButton} color="red" onClick={() => setPictureState(null)} >Eliminar</Button></div>
                    : <Camera
                        Image={(image: any) => {
                          setPictureState(image)
                          console.log('picture', image)
                        }}
                      /> }
                </div>

                <div>
                  <h2>Identificación</h2>
                  <div>
                    { identificationState
                      ? <div className={styles.imageContainer}><img src={identificationState} className={styles.imagePreview} /> <Button className={styles.imageButton} color="red" onClick={() => setIdentification(null)} >Eliminar</Button></div>
                      : <Camera
                          Image={(image: any) => setIdentification(image)}
                        /> }
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
        <div className={styles.saveContainer}>
          <button onClick={() => setOpen(false)} className={styles.closeButton}>Cerrar</button>
          <button type="submit" onClick={handleSave} className={styles.button}>Guardar</button>
        </div>
      </Modal>
    </>
  )
}
