import { useForm, SubmitHandler } from 'react-hook-form';
import { object, string } from 'zod';
import userService from '@/services/server/user';
import { CreateSessionInput } from '@/utils/types';
import styles from '../../styles/Login.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader } from '@/components/Loader';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useGetUser } from '@/hooks/useGetUser';

export const createSessionSchema = object({
  username: string().min(1, 'Username cannot be empty'),
  password: string().min(1, 'Password cannot be empty'),
});

// REVISAR EL ERROR QUE VUELVE DESDE EL BACKEND PARA UN CORRECTO MENSAJE

export default function LogInForm() {
  const { isLoading, data: user } = useGetUser();
  const router = useRouter();
  const [errorMesage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateSessionInput>({
    resolver: zodResolver(createSessionSchema),
  });
  // if (isLoading) return <div>Loading!</div>;
  if (user?.name) {
    router.push('/shop');
  }
  const onSubmit: SubmitHandler<CreateSessionInput> = async (data) => {
    try {
      const { username, password } = data;
      await userService.login({ username, password });
      // console.log('ROUTINGGGGGGGGGGGGGG', await response.json());
      router.push('/shop');
    } catch (e: any) {
      setErrorMessage(e.response?.data?.error);
      // REVISAR EL ERROR QUE VUELVE DESDE EL BACKEND PARA UN CORRECTO MENSAJE
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };
  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1 className={styles.title}>Login</h1>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          placeholder="username"
          {...register('username', { required: true })}
        />
        {errors.username && (
          <span className={styles.errorMessage}>{errors.username.message}</span>
        )}
        <label htmlFor="password">Password</label>
        <input
          type={'password'}
          id="password"
          placeholder="password"
          {...register('password', { required: true })}
        />
        {errors.password?.message && (
          <span className={styles.errorMessage}>{errors.password.message}</span>
        )}
        {errorMesage ? (
          <p className={styles.errorMessage}>{errorMesage}</p>
        ) : (
          <p className={styles.disableMessage}>errorMesage</p>
        )}
        <motion.button
          type="submit"
          className={styles.loginButton}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isSubmitting ? <Loader /> : 'Log In'}
        </motion.button>
        <div className={styles.createAccount}>
          <span>{`Don't have an account?`}</span>
          <Link href={'/signup'} className={styles.createAccount}>
            Create one
          </Link>
        </div>
      </form>
    </div>
  );
}
