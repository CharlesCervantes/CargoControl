/* eslint-disable import/order */

import { Icon } from '@iconify/react'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'
import * as styles from './UpdateVisitor.css'
import { useDisclosure } from '@mantine/hooks'
import iconEdit from '@iconify-icons/ph/pencil'
import { Camera } from '../../../../Camera/Camera'
import '../../../../operator-layout/responsive.css'
import SelectList from '../../../../Common/Select-list/Select-list'
import { PERSON_FILES_TYPES } from '../../../../../global'
import { Button, Divider, Group, Input, Modal, Select, TextInput, Tooltip } from '@mantine/core'
import { useTheme } from '../../../../../styles/contextTheme'
import { imagesStore } from '../../../../../zustand/fileStore'
import type { IArrImages, IVisitor, IVisitorType } from '../../../../../interfaces'
import { RemoveElement } from '../../../Render/RemoveElement'

import { useVisitorEnterStore } from '../../../../../zustand/visitorEnterStore'
import { visitorTypeStore } from '../../../../../zustand/visitorTypeStore'
import toast from 'react-hot-toast'
import { createId } from '@paralleldrive/cuid2'

// export function UpdateVisitor(props: { id: string }) {
export function UpdateVisitor(props: { id: string, onVisitorUpdate: (visitor: IVisitor) => void }) {
  const { theme } = useTheme()
  const { entrance, editVisitor } = useVisitorEnterStore()
  const { images } = imagesStore()
  const [visitorEdit, setVisitorEdit] = useState<IVisitor>(entrance.Visitors.find(v => v.id === props.id))
  const [picture, setPicture] = useState<IArrImages>()
  const [identification, setIdentification] = useState<IArrImages>()
  const [opened, { open, close }] = useDisclosure(false)
  const { visitorTypes } = visitorTypeStore()
  const [name, setName] = useState(visitorEdit?.Person?.name)
  const [lastname, setLastname] = useState(visitorEdit?.Person?.lastname)
  const [curp, setCurp] = useState(visitorEdit?.Person?.curp)
  const [nss, setNss] = useState('')
  const [company, setCompany] = useState(visitorEdit?.Company?.name)
  const [visitsubject, setVisitSubject] = useState(visitorEdit?.subject)
  const [badge, setBadge] = useState(visitorEdit?.badge)
  const [visittype, setVisitType] = useState<IVisitorType>()
  const [onOpen, setonOpen] = useState(false)
  const { id, onVisitorUpdate } = props

  function handleNameChange(event) {
    setName(event.target.value)
  }

  function handleLastnameChange(event) {
    setLastname(event.target.value)
  }

  function handleCurpChange(event) {
    setCurp(event.target.value)
  }

  function handleNssChange(event) {
    setNss(event.target.value)
  }

  function handleCompanyChange(event) {
    setCompany(event.target.value)
  }

  function handleVisitSubjectChange(event) {
    setVisitSubject(event.target.value)
  }

  function handleBadgeChange(event) {
    setBadge(event.target.value)
  }

  useEffect(() => {
    const visitorToUpdate = entrance.Visitors.find(v => v.id === props.id)
    images.forEach((img) => {
      const fileID = img.name.split('_')[0]
      if (fileID === visitorToUpdate?.Person?.identificationFiles) {
        const fileType = img.name.split('_')[1].split('.')[0]
        if (fileType === PERSON_FILES_TYPES.picture)
          setPicture(img)
        else
          setIdentification(img)
      }
      setName(visitorToUpdate?.Person?.name)
    })

    setVisitorEdit(visitorToUpdate)
    console.log('visitorToUpdate:', visitorToUpdate)
    console.log('visitorEdit', visitorEdit)
  }, [onOpen, entrance.Visitors, images, visitorEdit, props.id])

  // useEffect(() => {
  //   // Supongamos que aquí se realiza una operación para obtener los datos actualizados
  //   // const updatedData = obtenerDatosActualizados()
  //   const visitorNew = visitorEdit

  //   // Llamar a la función proporcionada desde VisitorEnter para pasar los datos actualizados
  //   onVisitorUpdate(visitorNew)
  // }, [onVisitorUpdate, visitorEdit])

  const form = useForm({
    initialValues: {
      subject: visitorEdit?.subject,
      visitorTypeId: '',
      badge: visitorEdit?.badge,
      companyName: visitorEdit?.Company?.name,
      name: visitorEdit?.Person?.name,
      lastname: visitorEdit?.Person?.lastname,
      curp: visitorEdit?.Person?.curp,

    },
  })

  function handleSave(data) {
    console.log('1.28: Visitor data:', data)
    if ((name || lastname || curp) === '') {
      toast.error('Falta información')
      // console.log('Información antes: Nombre:', name, lastname, 'CURP:', curp, 'Compañía:', company, 'NSS:', nss, 'Tipo de Visita:', visitsubject, 'Gafete:', badge)
    } else {
      console.log('Información antes: Nombre:', name, lastname, 'CURP:', curp, 'Compañía:', company, 'NSS:', nss, 'Tipo de Visita:', visitsubject, 'Gafete:', badge)
      const autoId = props.id
      const newVisitor: IVisitor = {
        id: autoId, // requerido, pero solo en frontend
        isExit: false, // requerido
        organizationId: '',
        personId: '',
        subject: visitsubject, // requerido totalmente
        visitorTypeId: visittype?.id || '', // requerido
        badge,
        Company: {
          id: autoId,
          name: company,
        },
        companyId: '',
        Person: {
          isInside: true,
          name,
          lastname,
          identificationFiles: autoId,
          id: autoId,
          organizationId: '',
          curp: curp.toUpperCase() || undefined,
          security_social_number: nss,
          numberphone: '',
          license: '',
        },
      }
      console.log('Información después: Nombre:', name, lastname, 'CURP:', curp, 'Compañía:', company, 'NSS:', nss, 'Tipo de Visita:', visitsubject, 'Gafete:', badge)
      editVisitor(newVisitor)
      setVisitorEdit(newVisitor)
      props.onVisitorUpdate(newVisitor)
    }
    console.log('visitors:', entrance.Visitors)
    close()
  }

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  useEffect(() => {
    console.log('1.28: props.id:', props.id)

    console.log('1.28: Nombre:', name, lastname, 'CURP:', curp)
  }, [name, lastname, curp, visittype, props.id])

  return (
    <>
      <button
        className=""
        onClick={() => {
          open()
          setonOpen(true)
        }}
      >
        <Tooltip label="Editar visitante">
          <Icon icon={iconEdit} className={styles.editButton} />
        </Tooltip>
      </button>

      <Modal
        opened={opened}
        onClose={
          () => {
            close()
            setonOpen(false)
          }
        }
        withCloseButton={false}
        transitionProps={{ transition: 'fade', duration: 600 }}
        className="modalResp"
        size="95%"
      >
        <Modal.Title className={styles.dialogTitle}>
          Editar Información
        </Modal.Title>
        <Modal.Body className={styles.dialogDescription}>
          <div className="formResp">
            <form
              onSubmit={form.onSubmit((values) => {
                handleSave(values)
              })
              }
              autoComplete="off"
            >
              <Input.Wrapper label="Nombre">
                <Input value={name} onChange={handleNameChange} />
              </Input.Wrapper>
              <Input.Wrapper label="Apellidos">
                <Input value={lastname} onChange={handleLastnameChange} />
              </Input.Wrapper>
              <Input.Wrapper label="CURP">
                <Input value={curp} onChange={handleCurpChange} />
              </Input.Wrapper>
              <Input.Wrapper label="NSS">
                <Input
                  defaultValue={visitorEdit?.Person?.security_social_number}
                  onChange={handleNssChange}
                />
              </Input.Wrapper>
              <Input.Wrapper label="Empresa">
                <Input value={company} onChange={handleCompanyChange} />
              </Input.Wrapper>
              <Input.Wrapper label="Motivo de visita">
                <Input value={visitsubject} onChange={handleVisitSubjectChange} />
              </Input.Wrapper>
              <Input.Wrapper label="Gafete">
                <Input value={badge} onChange={handleBadgeChange} />
              </Input.Wrapper>
              <Input.Wrapper label="Tipo de visita">
                <SelectList
                  isRequired
                  data={visitorTypes}
                  valueKey="id"
                  labelKey="name"
                  onChange={(selectedValue) => {
                    if (selectedValue !== undefined)
                      setVisitType(selectedValue)
                  }}

                />
              </Input.Wrapper>
              <Divider />
              <div className={styles.photoContainer}>

                <div>
                  <h2>Fotografía</h2>
                  { picture
                    ? <div className={styles.imageContainer}><img src={picture.base64} className={styles.imagePreview} /><Button className={styles.imageButton} color="red" onClick={() => setPicture(null)} >Eliminar</Button></div>
                    : <Camera
                        Image={(image: any) => setPicture(image)}
                      /> }
                </div>

                <div>
                  <h2>Identificación</h2>
                  <div>
                    { identification
                      ? <div className={styles.imageContainer}><img src={identification.base64} className={styles.imagePreview} /> <Button className={styles.imageButton} color="red" onClick={() => setIdentification(null)} >Eliminar</Button></div>
                      : <Camera
                          Image={(image: any) => setIdentification(image)}
                        /> }
                  </div>
                </div>
              </div>
              <div className={styles.saveContainer}>
                <button
                  onClick={() => {
                    close()
                    setonOpen(false)
                  }}
                  className={styles.closeButton}
                >Cerrar
                </button>
                <button type="submit" className={styles.button}>Guardar</button>
              </div>
            </form>
          </div>
        </Modal.Body>

      </Modal>
    </>
  )
}
