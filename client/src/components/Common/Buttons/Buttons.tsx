// SwipeButton.tsx
import { Icon } from '@iconify/react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import iconSave from '@iconify-icons/ph/floppy-disk'
import iconArrow from '@iconify-icons/ph/arrow-fat-lines-right'
import { useMediaQuery } from 'react-responsive'
import { vars } from '../../../styles/themes.css'
import * as styles from './Button.css'
import '../../operator-layout/responsive.css'

interface SwipeButtonProps {
  onClick: () => void
  isEnter: boolean
}

export function SwipeButton(props: SwipeButtonProps) {
  const { onClick, isEnter } = props
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1200px)' })
  const umbral = 100
  const x = useMotionValue(0)
  const background = useTransform(
    x,
    [30, 50],
    [vars.colors.background, vars.colors.principal],
  )

  return isTabletOrMobile
    ? (
      <motion.button
        className={`${styles.save}`}
        style={{ background }}
        onClick={onClick}
      >
        <motion.div
          className={`${styles.buttonDiv} buttonDiv `}
          drag={false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.6}
          style={{ x }}
        >
          {isEnter ? <Icon className={styles.color} icon={iconSave} /> : <Icon icon={iconArrow} />}
        </motion.div>
      </motion.button>
      )
    : (
      <motion.button
        className={`${styles.save} `}
        style={{ background }}
      >
        <motion.div
          className={`${styles.buttonDiv} buttonDiv `}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.6}
          style={{ x }}
          onDragEnd={() => {
            if (x.get() > umbral)
              onClick()
          }}
        >
          {isEnter ? <Icon className={styles.color} icon={iconSave} /> : <Icon icon={iconArrow} />}
        </motion.div>
      </motion.button>
      )
}
