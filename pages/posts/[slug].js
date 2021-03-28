import imageUrlBuilder from '@sanity/image-url'
import { useState, useEffect } from 'react';
import styles from '../../styles/Post.module.css'
import BlockContent from '@sanity/block-content-to-react'
import { Toolbar } from '../../components/toolBar';

export const Post = ({title, body, image}) => {
    const [imageUrl, setImageUrl] = useState('')

    useEffect(() => {
        const imgBuilder = imageUrlBuilder({
            projectId: "s67spfy3",
            dataset: 'production',
        });

        setImageUrl(imgBuilder.image(image))
    }, [image]);

    return (
        <div>
            <Toolbar/>
            <div className={styles.main}>
                
                <h1>{title}</h1>

                {imageUrl && <img src={imageUrl} className={styles.mainImage} />}

                <div className={styles.body}>
                    <BlockContent blocks={body}/>
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps = async pageContext => {
    const pageSlug =pageContext.query.slug;

    if(!pageSlug){
        return{
            notFound: true
        }
    }

    const query = encodeURIComponent(`*[ _type == "post" && slug.current == "${pageSlug}" ]`);
    const url = `https://s67spfy3.api.sanity.io/v1/data/query/production?query=${query}`;

    const result = await fetch(url).then(res => res.json());
    const post = result.result[0];

    if(!post){
        return{
            notFound: true
        }
    }
    else{
        return{
            props : {
                title: post.title,
                body: post.body,
                image: post.mainImage
            }
        }
    }

};

export default Post;
