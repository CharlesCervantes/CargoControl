import { useDisclosure } from '@mantine/hooks'
import { Button, FileInput, Group, Input, Modal } from '@mantine/core'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { getCompanies } from '../../../../../fetch/Companies/getCompanies'
import { paginationStore } from '../../../../../zustand/paginationStore'
import { addCompanySuccess, existingElement } from '../../../../Notifications/notifications'
import { CreateCompany } from '../../../../../fetch/Companies/postCompanies'
import { companyStore } from '../../../../../zustand/companiesStore'
import { useForm } from '../../../../../tools/useForm'
import * as styles from '../../../../operator-layout/modalEnter.css'
import { CompanyFieldset } from './CompaniesFieldset'

export function CreateCompanies() {
  const [opened, { open, close }] = useDisclosure(false)
  const initialValues = {
    name: '',
    address: '',
  }
  const {
    pageIndex,
    pageSize,
    setCount,
  } = paginationStore()
  const { setCompanies } = companyStore()

  const { onChange, onSubmit, values, onReset } = useForm(handleSave, initialValues)

  async function saveCompanyInDB(newCompany) {
    try {
      await CreateCompany(newCompany)
        .then((data) => {
          if (data.ok) {
            toast.success(data.message)
            onReset()
            close()
          } else { toast.error(data.message) }
        })
    } catch (error) {
      toast.error('Error Inesperado al Crear las Compañías')
    }

    try {
      await getCompanies(pageSize, pageIndex + 1)
        .then((data) => {
          setCompanies(data.data.result)
          setCount(data.data.count)
        })
    } catch (error) {
      toast.error('Error Inesperado al Obtener las Compañías')
    }
  }

  function handleSave() {
    const newCompany = {
      name: values.name.toLowerCase(),
      address: values.address.toLowerCase(),
      // name: values.name,
      // address: values.address,

    }

    if (newCompany.name !== '' && newCompany.address !== '')
      saveCompanyInDB(newCompany)
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        centered
        size="50%"
      >
        <Modal.Title className={styles.dialogTitle}>Agregar Compañía</Modal.Title>

        <form onSubmit={onSubmit} autoComplete="off">
          <CompanyFieldset
            label="Compañía"
            name="name"
            onChange={onChange}
          />
          <CompanyFieldset
            label="Dirección"
            name="address"
            onChange={onChange}
          />
        </form>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
          {/* <Button style={{ display: 'flex', width: '90%', justifyContent: 'center' }}>Guardar</Button> */}
          <button className={styles.closeButton} onClick={close} color="red" style={{ width: '40%' }}>Cancelar</button>
          <Button
            className={styles.button}
            onClick={handleSave}
            disabled={((values.name === undefined || (values.name === '')))}
          >Guardar
          </Button>
        </div>
      </Modal>

      <Group position="center">
        <Button onClick={open}>Agregar Compañía</Button>
      </Group>
    </>
  )
}
