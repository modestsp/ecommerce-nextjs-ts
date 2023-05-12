import imageLoader from '@/utils/imageLoader';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import gitHubIcon from '../../public/githubIcon.svg';
import styles from '../styles/Shop.module.css';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  const router = useRouter();

  return (
    <footer className={styles.footer}>
      <div>
        <Link href={'https://github.com/modestsp'}>
          <GitHubIcon />
        </Link>

        <span className={styles.footerCredit}> Sebastián Perichón © 2023</span>
      </div>
      <p>Made Using NextJS</p>
    </footer>
  );
};
// ARREGLAR SIGNUP, CHECKOUT
export default Footer;
