import { useDisclosure } from '@mantine/hooks'
import { ActionIcon, Button, Group, Input, Modal } from '@mantine/core'
import { DateInput, TimeInput } from '@mantine/dates'
import { Icon } from '@iconify/react'
import editIcon from '@iconify-icons/ph/pencil-bold'
import clockIcon from '@iconify-icons/ph/clock-bold'
import { useRef, useState } from 'react'

import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import styles from './EditRegistersModalStyles.module.scss'

// import type { Register } from '../../../auxiliarInterface'

// dayjs.extend(isSameOrBefore)

// export function EditRegisterModal(params: { data: Register, updateTableData: (updatedData: Register) => void }) {
//   // Hooks
//   const [driver, setDriver] = useState('')
//   const [enterTime, setEnterTime] = useState('')
//   const [exitTime, setExitTime] = useState('')
//   const [vehicle, setVehicle] = useState('')
//   const [tow, setTow] = useState('')
//   const [enterDate, setEnterDate] = useState<string | null>(null)
//   const [exitDate, setExitDate] = useState<string | null>(null)
//   const [opened, { open, close }] = useDisclosure(false)

//   // Refs to dateinputs
//   const enterTimeRef = useRef<HTMLInputElement>()
//   const exitTimeRef = useRef<HTMLInputElement>()
//   const today = dayjs()

//   // onClick the save button make this
//   const handleSave = () => {
//     console.log(driver, enterTime, exitTime, vehicle, tow)
//     console.log(enterDate ? dayjs(enterDate).format('DD MMM YYYY') : null)
//     console.log(exitDate ? dayjs(exitDate).format('DD MMM YYYY') : null)

//     const searchId = params.data.id
//     const foundRegisterIndex = data.findIndex(register => register.id === searchId)

//     if (foundRegisterIndex !== -1) {
//       const updatedRegister = {
//         ...data[foundRegisterIndex],
//         driver: driver || data[foundRegisterIndex].driver,
//         enterDate: enterTime || data[foundRegisterIndex].enterDate,
//         exitDate: exitTime || data[foundRegisterIndex].exitDate,
//         vehicle: vehicle || data[foundRegisterIndex].vehicle,
//         tow: tow || data[foundRegisterIndex].tow,
//       }

//       params.updateTableData(updatedRegister)
//       console.log('Registro actualizado:', updatedRegister)
//       close()
//     } else {
//       console.log('Registro no encontrado')
//     }
//   }
//   // Use this to select a date on inputDate
//   const handleEnterDateChange = (value) => {
//     const selectedDay = dayjs(value)
//     selectedDay.isSameOrBefore(today) ? setEnterDate(selectedDay.toDate()) : setEnterDate(null)
//   }

//   // Use this to select a date on exittDate
//   const handleExitDateChange = (value) => {
//     const selectedDay = dayjs(value)
//     selectedDay.isSameOrBefore(today) ? setExitDate(selectedDay.toDate()) : setExitDate(null)
//   }

//   // AMPM format to timeinputs
//   const formatAMPM = (timeString: string) => {
//     const time = new Date(`2000-01-01T${timeString}`)
//     let hours = time.getHours()
//     let minutes = time.getMinutes()
//     const ampm = hours >= 12 ? 'PM' : 'AM'
//     hours %= 12
//     hours = hours || 12
//     minutes = minutes < 10 ? `0${minutes}` : minutes
//     return `${hours}:${minutes} ${ampm}`
//   }

//   return (
//     <>
//       <Modal
//         opened={opened}
//         onClose={close}
//         closeOnClickOutside={false}
//         title="Editar Registro"
//         centered
//       >
//         <Input.Wrapper label="Conductor">
//           <Input<any> onChange={(e: any) => setDriver(e.target.value)} placeholder="Pablo Sebastian" />
//         </Input.Wrapper>
//         <Input.Wrapper label="Unidad">
//           <Input<any> onChange={(e: any) => setVehicle(e.target.value)} placeholder="Unidad" />
//         </Input.Wrapper>
//         <Input.Wrapper label="Remolque">
//           <Input<any> onChange={(e: any) => setTow(e.target.value)} placeholder="Remolque" />
//         </Input.Wrapper>
//         <TimeInput
//           label="Hora de Entrada"
//           ref={enterTimeRef}
//           onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
//             setEnterTime(formatAMPM(event.target.value))
//           }
//           rightSection={
//             <ActionIcon onClick={() => enterTimeRef.current.showPicker()}>
//               <Icon icon={clockIcon} />
//             </ActionIcon>
//           }
//           maw={400}
//           mx="auto"
//         />
//         <TimeInput
//           label="Hora de Salida"
//           ref={exitTimeRef}
//           onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
//             setExitTime(formatAMPM(event.target.value))
//           }
//           rightSection={
//             <ActionIcon onClick={() => exitTimeRef.current.showPicker()}>
//               <Icon icon={clockIcon} />
//             </ActionIcon>
//           }
//           maw={400}
//           mx="auto"
//         />
//         <DateInput
//           value={enterDate}
//           onChange={handleEnterDateChange}
//           valueFormat="DD MMM YYYY"
//           label="Fecha de Entrada"
//           placeholder="Fecha"
//           maw={400}
//           mx="auto"
//           maxDate={today}
//         />
//         <DateInput
//           value={exitDate}
//           onChange={handleExitDateChange}
//           valueFormat="DD MMM YYYY"
//           label="Fecha de Salida"
//           placeholder="Fecha"
//           maw={400}
//           mx="auto"
//           maxDate={today}
//         />
//         <div className={styles.buttonContainer}>
//           <Button className={styles.button} onClick={handleSave}>
//             Guardar
//           </Button>
//         </div>
//       </Modal>

// <Group position="center">
//   <button className={styles.pencilIcon} onClick={open}>
//     <Icon icon={editIcon} />
//   </button>
// </Group>
//     </>
//   )
// }

export function EditRegisterModal() {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Modal opened={opened} onClose={close} title="Editar Registro">
        {/* Modal content */}
      </Modal>

      <Group position="center">
        <button className={styles.pencilIcon} onClick={open}>
          <Icon icon={editIcon} />
        </button>
      </Group>
    </>
  )
}
