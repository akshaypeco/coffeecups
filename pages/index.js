import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>coffeecups</title>
        <meta name="description" content="find eco-friendly cafes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <h1 className={styles.title}> ☕ 🧋</h1>
        <p className={styles.subtitle}>
          cataloging cafes that encourage reusable cups
        </p>
        <div className={styles.buttonsContainer}>
          <Link href={"/listpage"}>
            <a>View list</a>
          </Link>
          <Link href={"/listpage"}>
            <a>Add spot</a>
          </Link>
        </div>
        <h2 style={{ marginBottom: 8, marginTop: 70 }}>Description:</h2>
        <p
          style={{
            marginTop: 15,
            marginBottom: 10,
            marginLeft: 20,
            marginRight: 20,
            textAlign: "center",
            fontSize: 18,
            lineHeight: 1.5,
          }}
        >
          This dataset is for my senior Environmental Science thesis, where
          {" I'll "}
          write about the consumer choices of sustainable firms - particularly
          coffee and boba shops - that offer incentives to bring your own
          reusable, portable, and sealable mug. I plan to analyze the speed and
          geography of this transition, and how local legislation is helping or
          hurting it.
        </p>
      </div>
      <div className={styles.card1}>
        <h5 style={{ margin: 0, padding: 0, marginTop: -8, marginBottom: 10 }}>
          Add your cafe:
        </h5>
        <p>
          Step 1. Next time you visit your coffee shop, ask them if they let you
          bring your own reusable mug.
        </p>
        <p>Step 2. If they do, ask them if they provide a discount.</p>
        <p>
          Step 3. Add your cafe and its discount (if it exists) to the list.
        </p>
        <p style={{ fontWeight: "500", marginTop: 10 }}>
          Finally, if your shop {" doesn't "} offer any incentives, try to pitch
          the idea! You can make your favorite spot a more sustainable part of
          your community 🌎
        </p>
      </div>
    </div>
  );
}
