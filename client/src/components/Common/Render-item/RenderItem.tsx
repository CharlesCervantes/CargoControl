import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import * as styles from './RenderItem.css'
import '../../operator-layout/responsive.css'

export function ItemDash(props: {
  data: number
  label: string
  icon: any
  onClick: () => void
}) {
  const { data, label, icon, onClick } = props

  return (
    <motion.div onClick={onClick} transition={{ duration: 0.5 }} whileHover={{ scale: 1.04 }} className={styles.item}>
      <Icon className={styles.icon} icon={icon} />
      <div className={styles.itemText}>
        <p style={{ color: 'gray' }}>{label}</p>
        <p className={styles.pItem}>{data} {label}</p>
      </div>
    </motion.div>
  )
}
