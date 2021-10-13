import { ActiveLink } from '../ActiveLink'
import styles from './styles.module.scss'

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <div>
                    <nav>
                        <ActiveLink activeClassName={styles.active} href="/salvos">
                            <a>Home</a>
                        </ActiveLink>
                        <ActiveLink activeClassName={styles.active} href="/salvos">
                            <a>Salvos</a>
                        </ActiveLink>
                    </nav>
                </div>
            </div>
        </header>
    )
}