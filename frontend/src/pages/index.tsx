import styles from '@/styles/Home.module.css'
import SalesPage from './vendas'

export default function Home() {
  return (
    <div className={`${styles.main}`}>
      <SalesPage />
    </div>
  )
}
