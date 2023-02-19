import styles from '../styles/utils.module.css';

export const Loader = (props: any) => {
  return (
    <div className={styles.loaderContainer}>
      <div style={props.style} className={styles.spinner}></div>
    </div>
  );
};
