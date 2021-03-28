import Head from 'next/head'
import { Toolbar } from '../components/toolBar';
import styles from '../styles/Home.module.css'
import imageUrlBuilder from '@sanity/image-url'
import { useState, useEffect } from 'react';
import {useRouter} from 'next/router'
import { Footer } from '../components/footer';

export default function Home({ posts }) {
  const router = useRouter()
  const [mappedPosts, setMappedPosts] = useState([]);

  useEffect(() => {
    if(posts.length){
      const imgBuilder = imageUrlBuilder({
        projectId: "s67spfy3",
        dataset: 'production',
    });

    setMappedPosts(
      posts.map(p => {
        return{
          ...p, 
          mainImage: imgBuilder.image(p.mainImage).width(500).height(250),
        }
      })
    )
    }else{
      setMappedPosts([])
    }
  }, [posts]);

  return (    
    <div>
      <Head>
        <title>FA Blog</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Toolbar/>
      <div className={styles.main}>
        <h1>Welcome to my Blog</h1>

        <h3>Recent Posts:</h3>

        <div className={styles.feed}>
          
           { mappedPosts.length ? mappedPosts.map((p, index) => (
             <div key={index} className={styles.post} onClick={() => router.push(`/posts/${p.slug.current}`)}>
               <h3>{p.title}</h3>
               <img className={styles.mainImage} src={p.mainImage}/>
             </div>
           )) : <>No Posts yet</> } 
          
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export const getServerSideProps = async pageContext => {
  const query = encodeURIComponent('*[ _type == "post" ]')
  const url = `https://s67spfy3.api.sanity.io/v1/data/query/production?query=${query}`;
  const result = await fetch(url).then(res => res.json());
  
  if(!result.result || !result.result.length){
    return {
      props : {
        posts: [],
      }
    }
  }else{
    return {
      props : {
        posts: result.result,
      }
    }    
  }
}
