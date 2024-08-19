import '../../responsive.css'
import { Icon } from '@iconify/react'
import { useForm } from '@mantine/form'
import User from '@iconify-icons/ph/user'
import { useEffect, useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { createId } from '@paralleldrive/cuid2'
import CreatableSelect from 'react-select/creatable'
import { Button, Group, Input, Modal, Title } from '@mantine/core'
import toast from 'react-hot-toast'
import * as styles from '../../modalEnter.css'
import { Camera } from '../../../../components/Camera/Camera'
import { getDrivers } from '../../../../fetch/Drivers/getDrivers'
import { EntranceUnitStore } from '../../../../zustand/EntraceUnitStore'
import { ThemeProvider, useTheme } from '../../../../styles/contextTheme'
import { notSuccessDriver, successDriver } from '../../../Notifications/notifications'
import { passGenerate } from '../../../../components/Admin/Admin_Options/Users/addUserModal/AddUser'
import { DriverNamesake } from './driverNamesake'
import type { IDriver, IFile, SelectItem } from '../../../../interfaces'

export function DriverForm({ setEditable }) {
  const { theme } = useTheme()
  const [opened, { open, close }] = useDisclosure(false)
  const [namesakeOpened, setNamesakeOpened] = useState()
  const { setDriver } = EntranceUnitStore()
  const [userSelected, setUserSelected] = useState<'name' | 'license' | 'curp' | 'lastnme' | null>(null)
  const [registerType, setRegisterType] = useState<'existUser' | 'newUser' | null>('existUser')
  const form = useForm({
    initialValues: {
      id: '',
      name: '',
      lastname: '',
      company: '',
      curp: '',
      license: '',
    },
    validate: {
      name: value => (value.length < 5 ? 'Ingrese un nombre completo' : null),
      lastname: value => (value.length < 5 ? 'Ingrese un nombre completo' : null),
      license: value => (value.length < 5 ? 'Ingrese un numero de licencia válida' : null),
      company: value => (value.length < 2 ? 'La compañía es obligatoria' : null),
    },
  })

  // Filter Data From DB
  const [driverByName, setDriversByName] = useState<Array<SelectItem>>([])
  const [driverByLastName, setDriversByLastName] = useState<Array<SelectItem>>([])
  const [driverByLicense, setDriversByLicense] = useState<Array<SelectItem>>([])
  const [driverByCurp, setDriversByCurp] = useState<Array<SelectItem>>([])
  const [driverByCompany, setDriversByCompany] = useState<Array<SelectItem>>([])

  // Selected Items
  const [selectedName, setSelectedName] = useState<SelectItem | null>(null)
  const [selectedLastName, setSelectedLastName] = useState<SelectItem | null>(null)
  const [selectedLicense, setSelectedLicense] = useState<SelectItem | null>(null)
  const [selectedCurp, setSelectedCurp] = useState<SelectItem | null>(null)
  const [selectedCompany, setSelectedCompany] = useState<SelectItem | null>(null)

  // New Items
  const [driverName, setDriverName] = useState('')
  const [driverLastName, setDriverLastName] = useState('')
  const [driverLicense, setDriverLicense] = useState('')
  const [driverCurp, setDriverCurp] = useState('')
  const [driverCompany, setDriverCompany] = useState('')

  // Images
  const [driverPhoto, setDriverPhoto] = useState(null)
  const [driverIdentification, setDriverIdentification] = useState(null)

  // data
  const [driversFromDB, setDriverFromDB] = useState<Array<IDriver>>([])

  // driverToSave
  const [data, setData] = useState<IDriver>()

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  useEffect(() => {
    async function getDriverFromDB() {
      const data = await getDrivers()
      console.log('1.18MYDRIVER:', data)

      const formatedDataByName: Array<SelectItem> = data.data.map((driver: IDriver): SelectItem => ({
        value: driver.id || '',
        label: driver.Person?.name || '',
      }))
      // const formatedDataByName: Array<SelectItem> = data.data.map((driver: { id: any, name: any }): SelectItem => ({
      //   value: driver.id,
      //   label: driver.Person.name,
      // }))
      const formatedDataByLastName: Array<SelectItem> = data.data.map((driver: IDriver): SelectItem => ({
        value: driver.id || '',
        label: driver.Person?.lastname || '',
      }))
      const formatedDataByLicense: Array<SelectItem> = data.data.map((driver: IDriver): SelectItem => ({
        value: driver.id || '',
        label: driver.Person?.license || '',
      }))
      const formatedDataByCurp: Array<SelectItem> = data.data.map((driver: IDriver): SelectItem => ({
        value: driver.id || '',
        label: driver.Person?.curp || '',
      }))
      const formatedDataByCompany: Array<SelectItem> = data.data.map((driver: IDriver): SelectItem => ({
        value: driver.id || '',
        label: driver.Company?.name || '',
      }))
      setDriversByName(formatedDataByName)
      setDriversByLastName(formatedDataByLastName)
      setDriversByLicense(formatedDataByLicense)
      setDriversByCurp(formatedDataByCurp)
      setDriversByCompany(formatedDataByCompany)
      setDriverFromDB(data.data)
    }
    getDriverFromDB()
  }, [])

  useEffect(() => {
    if (userSelected?.includes('name') && selectedName) {
      const name = driverByName.find(name => name.value === selectedName.value)
      // console.log('1.3Name:', name)
      if (name) {
        const lastname = driverByLastName.find(lastname => lastname.value === name.value)
        const curp = driverByCurp.find(curp => curp.value === name.value)
        const license = driverByLicense.find(license => license.value === name.value)
        const company = driverByCompany.find(company => company.value === name.value)
        searchDriverPhotos(selectedName.value)

        if (curp && license && company && lastname) {
          setSelectedLastName({ value: lastname.value, label: lastname.label })
          setSelectedCurp({ value: curp.value, label: curp.label })
          setSelectedLicense({ value: license.value, label: license.label })
          setSelectedCompany({ value: company.value, label: company.label })
        }
        // namesakeModal()
      }
    } else {
      if (userSelected?.includes('license') && selectedLicense) {
        const license = driverByLicense.find(license => license.value === selectedLicense.value)
        if (license) {
          const curp = driverByCurp.find(curp => curp.value === license.value)
          const name = driverByName.find(name => name.value === license.value)
          const lastname = driverByLastName.find(lastname => lastname.value === license.value)
          const company = driverByCompany.find(company => company.value === license.value)
          searchDriverPhotos(selectedLicense.value)
          if (curp && name && company && lastname) {
            setSelectedCurp({ value: curp.value, label: curp.label })
            setSelectedName({ value: name.value, label: name.label })
            setSelectedCompany({ value: company.value, label: company.label })
            setSelectedLastName({ value: lastname.value, label: lastname.label })
          }
        // namesakeModal()
        }
      } else {
        if (userSelected?.includes('curp') && selectedCurp) {
          const curp = driverByCurp.find(curp => curp.value === selectedCurp.value)
          if (curp) {
            const name = driverByName.find(name => name.value === curp.value)
            const lastname = driverByLastName.find(lastname => lastname.value === curp.value)
            const license = driverByLicense.find(license => license.value === curp.value)
            const company = driverByCompany.find(company => company.value === curp.value)
            searchDriverPhotos(selectedCurp.value)
            if (name && license && company && lastname) {
              setSelectedName({ value: name.value, label: name.label })
              setSelectedLicense({ value: license.value, label: license.label })
              setSelectedCompany({ value: company.value, label: company.label })
              setSelectedLastName({ value: lastname.value, label: lastname.label })
            }
          }
          // namesakeModal()
        } else {
          if (userSelected?.includes('lastnme') && selectedLastName) {
            const lastname = driverByLastName.find(lastname => lastname.value === selectedLastName.value)
            if (lastname) {
              const name = driverByName.find(name => name.value === lastname.value)
              const license = driverByLicense.find(license => license.value === lastname.value)
              const company = driverByCompany.find(company => company.value === lastname.value)
              const curp = driverByCurp.find(curp => curp.value === lastname.value)
              searchDriverPhotos(selectedLastName.value)
              if (name && license && company && curp) {
                setSelectedName({ value: name.value, label: name.label })
                setSelectedLicense({ value: license.value, label: license.label })
                setSelectedCompany({ value: company.value, label: company.label })
                setSelectedCurp({ value: curp.value, label: curp.label })
              }
            }
            // namesakeModal()
          }
        }
      }
    }
  }, [userSelected])

  useEffect(() => {
    setDriverName(null)
    setSelectedName(null)

    setDriverLastName(null)
    setSelectedLastName(null)

    setDriverLicense(null)
    setSelectedLicense(null)

    setDriverCurp(null)
    setSelectedCurp(null)

    setDriverCompany(null)
    setSelectedCompany(null)

    setDriverPhoto(null)
    setDriverIdentification(null)
  }, [registerType])

  function searchDriverPhotos(searchID) {
    // searchPhotos
    const driverP = driversFromDB.find(driver => driver?.id === searchID)
    console.log('driverP , searchId:', driverP, searchID)
    const driverPhoto = driverP?.Person?.File?.find(photo => photo.name.includes('photo'))?.url
    console.log('driverPhoto:', driverPhoto)
    if (driverPhoto)
      setDriverPhoto(driverPhoto)
    else
      setDriverPhoto(null)

    // searchIdentification
    const driverI = driversFromDB.find(driver => driver.id === searchID)
    const driverIdentification = driverI?.Person?.File?.find(photo => photo.name.includes('identification'))?.url

    if (driverIdentification)
      setDriverIdentification(driverIdentification)
    else
      setDriverIdentification(null)
  }

  function resetImages() {
    setDriverPhoto(null)
    setDriverIdentification(null)
  }

  function handleSaveWithExistUser() {
    try {
      const autoID = createId()
      const data: IDriver = {
        id: autoID,
        Person: {
          name: selectedName?.label || '',
          lastname: selectedLastName?.label || '',
          license: selectedLicense?.label || '',
          curp: selectedCurp?.label.toUpperCase() || '',
          identificationFiles: autoID,
          isInside: true,
          File: [],
          organizationId: '',
        },
        Company: {
          name: selectedCompany?.label || '',
        },
        organizationId: '',
        identification: autoID,
      }
      setData(data)

      if (driverPhoto) {
        const newFile: IFile = {
          name: `${data.identification}_photo.png`,
          size: 0,
          type: 'png',
          url: '',
          base64: driverPhoto,
          organizationId: '',
        }

        data.Person?.File?.push(newFile)
      }
      if (driverIdentification) {
        const newFile: IFile = {
          name: `${data.identification}_identification.png`,
          size: 0,
          type: 'png',
          url: '',
          base64: driverIdentification,
          organizationId: '',
        }

        data.Person?.File?.push(newFile)
      }
      setDriver(data)
      form.reset()
      toast.success('Conductor agregado correctamente!!!')
    } catch (error) {
      notSuccessDriver()
    }
    close()
  }

  function handleSaveWithNewUser() {
    try {
      const autoID = createId()
      const data: IDriver = {
        id: autoID,
        Person: {
          name: driverName,
          lastname: driverLastName,
          license: driverLicense,
          curp: driverCurp,
          identificationFiles: autoID,
          isInside: true,
          File: [],
          organizationId: '',
        },
        Company: {
          name: driverCompany,
        },
        organizationId: '',
        identification: autoID,
      }
      setData(data)

      if (driverPhoto) {
        const newFile: IFile = {
          name: `${data.identification}_photo.png`,
          size: 0,
          type: 'png',
          url: '',
          base64: driverPhoto,
          organizationId: '',
        }

        data.Person?.File?.push(newFile)
      }
      if (driverIdentification) {
        const newFile: IFile = {
          name: `${data.identification}_identification.png`,
          size: 0,
          type: 'png',
          url: '',
          base64: driverIdentification,
          organizationId: '',
        }

        data.Person?.File?.push(newFile)
      }
      setDriver(data)
      form.reset()
      toast.success('Driver agregado correctamente!!!')
    } catch (error) {
      notSuccessDriver()
    }
    close()
  }
  function filterOptions(options) {
    const filter = options.filter(option => option.label !== '')
    // Filtra las opciones que no tengan una etiqueta vacía
    return filter
  }
  // Modal para detectar Homonimo
  function namesakeModal() {
    setNamesakeOpened(true)
  }

  return (
    <ThemeProvider>
      <Group>
        <button
          className={`${styles.itemOperador} itemOpMov`}
          onClick={open}
        >
          <p><Icon icon={User} /><span className="displayNone">Conductor</span></p>
        </button>
      </Group>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        transitionProps={{ transition: 'fade', duration: 600 }}
        className={`${styles.modal} modalResp`}
      >
        <Modal.Title className={styles.dialogTitle}>Conductor</Modal.Title>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingLeft: '1rem', paddingRight: '1rem' }}>
          <Button disabled={registerType === 'existUser'} size="xs" onClick={() => setRegisterType('existUser')}>Conductor Existente</Button>
          <Button disabled={registerType === 'newUser'} size="xs" onClick={() => setRegisterType('newUser')} >Nuevo Registro</Button>
        </div>
        {registerType === 'existUser'
          ? (
            <Modal.Body className={styles.dialogDescription}>
              <div className="formResp">
                <form
                  onReset={form.onReset}
                  onSubmit={(event) => {
                    event.preventDefault()
                    handleSaveWithExistUser()
                  }}
                  autoComplete="off"
                >
                  <div style={{ pointerEvents: namesakeOpened ? 'none' : 'all' }}>
                    <p style={{ fontWeight: '500' }}>Nombre:</p>
                    <CreatableSelect
                      isClearable
                      options={filterOptions(driverByName)}
                      name="name"
                      required
                      value={selectedName}
                      onChange={(selectedOption) => {
                        setSelectedName(selectedOption)
                        // fallo previsto
                        setUserSelected(`name${passGenerate(4)}`)
                        const { onChange } = form.getInputProps('name')
                        onChange(selectedOption)
                      }}
                    />
                  </div>
                  <div style={{ marginTop: '1rem', pointerEvents: namesakeOpened ? 'none' : 'all' }}>
                    <p style={{ fontWeight: '500' }}>Apellidos:</p>
                    <CreatableSelect
                      isClearable
                      options={filterOptions(driverByLastName)}
                      name="lastnme"
                      required
                      value={selectedLastName}
                      onChange={(selectedOption) => {
                        setSelectedLastName(selectedOption)
                        // fallo previsto
                        setUserSelected(`lastnme${passGenerate(4)}`)
                        const { onChange } = form.getInputProps('lastnme')
                        onChange(selectedOption)
                      }}
                    />
                  </div>
                  <div style={{ marginTop: '1rem', pointerEvents: namesakeOpened ? 'none' : 'all' }}>
                    <p style={{ fontWeight: '500' }}>Licencia:</p>
                    <CreatableSelect
                      isClearable
                      options={filterOptions(driverByLicense)}
                      name="license"
                      required
                      value={selectedLicense}
                      onChange={(selectedOption) => {
                        setSelectedLicense(selectedOption)
                        // fallo previsto
                        setUserSelected(`license${passGenerate(4)}`)
                        const { onChange } = form.getInputProps('license')
                        onChange(selectedOption)
                      }}
                    />
                  </div>
                  <div style={{ marginTop: '1rem', pointerEvents: namesakeOpened ? 'none' : 'all' }}>
                    <p style={{ fontWeight: '500' }}>CURP:</p>
                    <CreatableSelect
                      isClearable
                      options={filterOptions(driverByCurp)}
                      name="curp"
                      required
                      value={selectedCurp}
                      onChange={(selectedOption) => {
                        setSelectedCurp(selectedOption)
                        // fallo previsto
                        setUserSelected(`curp${passGenerate(4)}`)
                        const { onChange } = form.getInputProps('curp')
                        onChange(selectedOption)
                      }}
                    />
                  </div>
                  <div style={{ marginTop: '1rem', pointerEvents: namesakeOpened ? 'none' : 'all' }}>
                    <p style={{ fontWeight: '500' }}>Compañía:</p>
                    <CreatableSelect
                      isClearable
                      options={filterOptions(driverByCompany)}
                      name="company"
                      required
                      value={selectedCompany}
                      onChange={selectedOption => setSelectedCompany(selectedOption)}
                    />
                  </div>
                  <div style={{ display: 'flex', width: '100%', marginTop: '1rem', pointerEvents: namesakeOpened ? 'none' : 'all' }}>
                    <div style={{ width: '50%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', justifyContent: 'center' }}><Title order={6}>Fotografía</Title></div>
                      {driverPhoto === null
                        ? (<Camera Image={(image: any) => setDriverPhoto(image)} />)
                        : (
                          <div style={{ display: 'flex', flexDirection: 'column', margin: '1rem', marginTop: '0' }}>
                            <img style={{ width: '100%', marginTop: '0.5rem', marginBottom: '0.5rem' }} src={driverPhoto} />
                            <Button onClick={() => setDriverPhoto(null)} color="red">Eliminar</Button>
                          </div>
                          )
                  }
                    </div>
                    <div style={{ width: '50%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', justifyContent: 'center' }}><Title order={6}>Identificación</Title></div>
                      {driverIdentification === null
                        ? (<Camera Image={(image: any) => setDriverIdentification(image)} />)
                        : (
                          <div style={{ display: 'flex', flexDirection: 'column', margin: '1rem', marginTop: '0' }}>
                            <img style={{ width: '100%', marginTop: '0.5rem', marginBottom: '0.5rem' }} src={driverIdentification} />
                            <Button onClick={() => setDriverIdentification(null)} color="red">Eliminar</Button>
                          </div>
                          )
                  }
                    </div>
                  </div>
                  <div className={styles.saveContainer} style={{ pointerEvents: namesakeOpened ? 'none' : 'all' }}>
                    <button className={styles.closeButton} type="button" onClick={() => { form.reset(); close() }} >Cancelar</button>
                    <button className={styles.button} type="submit" >Guardar</button>
                  </div>
                </form>
              </div>
            </Modal.Body>)
          : (<Modal.Body className={styles.dialogDescription}>
            <div className="formResp">
              <form
                onReset={form.onReset}
                onSubmit={(event) => {
                  event.preventDefault()
                  handleSaveWithNewUser()
                }}
                autoComplete="off"
              >
                <div style={{ pointerEvents: namesakeOpened ? 'none' : 'all' }}>
                  <p style={{ fontWeight: '500' }}>Nombre:</p>
                  <Input
                  // isClearable
                  // options={driverByName}
                    name="name"
                    required
                  // value={selectedName}
                    onChange={(value) => {
                      // setSelectedName(selectedOption)
                      // fallo previsto
                      //  setUserSelected(`name${passGenerate(4)}`)
                      setDriverName(value.target.value)
                      // onChange(selectedOption)
                    }}
                  />
                </div>
                <div style={{ marginTop: '1rem', pointerEvents: namesakeOpened ? 'none' : 'all' }}>
                  <p style={{ fontWeight: '500' }}>Apellidos:</p>
                  <Input
                  // isClearable
                  // options={driverByLastName}
                    name="lastnme"
                    required
                  // value={selectedLastName}
                    onChange={(value) => {
                      // setSelectedLastName(selectedOption)
                      // fallo previsto
                      // setUserSelected(`lastnme${passGenerate(4)}`)
                      // const { onChange } = form.getInputProps('lastnme')
                      // onChange(selectedOption)
                      setDriverLastName(value.target.value)
                    }}
                  />
                </div>
                <div style={{ marginTop: '1rem', pointerEvents: namesakeOpened ? 'none' : 'all' }}>
                  <p style={{ fontWeight: '500' }}>Licencia:</p>
                  <Input
                  // isClearable
                  // options={driverByLicense}
                    name="license"
                    required
                  // value={selectedLicense}
                    onChange={(value) => {
                      // setSelectedLicense(selectedOption)
                      // fallo previsto
                      // setUserSelected(`license${passGenerate(4)}`)
                      // const { onChange } = form.getInputProps('license')
                      // onChange(selectedOption)
                      setDriverLicense(value.target.value)
                    }}
                  />
                </div>
                <div style={{ marginTop: '1rem', pointerEvents: namesakeOpened ? 'none' : 'all' }}>
                  <p style={{ fontWeight: '500' }}>CURP:</p>
                  <Input
                  // isClearable
                  // options={driverByCurp}
                    name="curp"
                    required
                  // value={selectedCurp}
                    onChange={(value) => {
                      // setSelectedCurp(selectedOption)
                      // fallo previsto
                      // setUserSelected(`curp${passGenerate(4)}`)
                      // const { onChange } = form.getInputProps('curp')
                      // onChange(selectedOption)
                      setDriverCurp(value.target.value)
                    }}
                  />
                </div>
                <div style={{ marginTop: '1rem', pointerEvents: namesakeOpened ? 'none' : 'all' }}>
                  <p style={{ fontWeight: '500' }}>Compañía:</p>
                  <Input
                  // isClearable
                  // options={driverByCompany}
                    name="company"
                    required
                  // value={selectedCompany}
                    onChange={(value) => {
                      setDriverCompany(value.target.value)
                      // const { onChange } = form.getInputProps('company')
                      // onChange(selectedOption)
                    }}
                  />
                </div>
                <div style={{ display: 'flex', width: '100%', marginTop: '1rem', pointerEvents: namesakeOpened ? 'none' : 'all' }}>
                  <div style={{ width: '50%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}><Title order={6}>Fotografía</Title></div>
                    {driverPhoto === null
                      ? (<Camera Image={(image: any) => setDriverPhoto(image)} />)
                      : (
                        <div style={{ display: 'flex', flexDirection: 'column', margin: '1rem', marginTop: '0' }}>
                          <img style={{ width: '100%', marginTop: '0.5rem', marginBottom: '0.5rem' }} src={driverPhoto} />
                          <Button onClick={() => setDriverPhoto(null)} color="red">Eliminar</Button>
                        </div>
                        )
                  }
                  </div>
                  <div style={{ width: '50%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}><Title order={6}>Identificación</Title></div>
                    {driverIdentification === null
                      ? (<Camera Image={(image: any) => setDriverIdentification(image)} />)
                      : (
                        <div style={{ display: 'flex', flexDirection: 'column', margin: '1rem', marginTop: '0' }}>
                          <img style={{ width: '100%', marginTop: '0.5rem', marginBottom: '0.5rem' }} src={driverIdentification} />
                          <Button onClick={() => setDriverIdentification(null)} color="red">Eliminar</Button>
                        </div>
                        )
                  }
                  </div>
                </div>
                <div className={styles.saveContainer} style={{ pointerEvents: namesakeOpened ? 'none' : 'all' }}>
                  <button className={styles.closeButton} type="button" onClick={() => { form.reset(); close(); resetImages() }} >Cancelar</button>
                  <button className={styles.button} type="submit" >Guardar</button>
                </div>
              </form>
            </div>
          </Modal.Body>)

        }
        <DriverNamesake opened={namesakeOpened} setOpened={setNamesakeOpened} setEditable={setEditable} photo={undefined} identification={undefined} />
      </Modal>
    </ThemeProvider>
  )
}
