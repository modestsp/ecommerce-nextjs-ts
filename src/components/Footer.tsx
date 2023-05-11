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
        {/* <Image
          onClick={() => router.push('https://github.com/modestsp')}
          src={gitHubIcon}
          alt={'go to my personal github page'}
          width={20}
          height={20}
          loader={imageLoader}
          unoptimized
          style={{ cursor: 'pointer' }} // ver esto  has a "loader" property that does not implement width.
          // Please implement it or use the "unoptimized" property instead.
        /> */}
        <span className={styles.footerCredit}> Sebastián Perichón © 2023</span>
      </div>
      <p>Made Using NextJS</p>
    </footer>
  );
};
// ARREGLAR SIGNUP, CHECKOUT
export default Footer;
