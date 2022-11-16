import Head from 'next/head'
import Image from 'next/image'
import { useFirebaseContext } from '../hooks/useFirebase';
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';
import {ClipLoader} from "react-spinners";

const Home = () => {
  const {state: firebase, login, logout} = useFirebaseContext();
  const [steps, setSteps] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (firebase.accessToken) {
      (async () => {
        const steps = await fetch('https://fitness.googleapis.com/fitness/v1/users/me/dataset:aggregate',
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${firebase.accessToken}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "startTimeMillis": new Date().setHours(0, 0, 0, 0),
                "endTimeMillis": new Date().getTime(),
                "aggregateBy": [
                  {
                    "dataTypeName": "com.google.step_count",
                    "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
                  }
                ],"bucketByTime": {
                  "period": {
                    "type": "day",
                    "value": 1,
                    "timeZoneId": "Europe/Bucharest"
                  }
                }})
            }
        );
        const result = await steps.json();
        if (result) {
          console.log(result);

          if(result.bucket) {
              setSteps(result.bucket[0].dataset[0].point.reduce((prev: any, curr: { value: { intVal: any; }[]; }) => prev + curr.value[0].intVal, 0));
          }
          setLoading(false);
        }
      })();
    }
  }, [firebase.accessToken]);
  return (
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
            {!loading ? (
                <h1 className={styles.title}>
                    You have made <strong style={{color: 'emerald'}}>{steps}</strong> steps today!
                </h1>
            ) : (<ClipLoader color="#36d7b7" />)}

            {firebase.user ? <button onClick={logout}>Log out</button> : <button onClick={login}>Log in</button>}
        </main>


        <footer className={styles.footer}>
          <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
          >
            Powered by{' '}
            <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
          </a>
        </footer>
      </div>
  )
}

export default Home;