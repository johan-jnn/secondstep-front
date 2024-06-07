import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {Link} from 'react-router-dom';
import '../styles/blog.$articlehandle.scss';
import FilDarianne from '~/components/FilDarianne';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Minero | ${data?.article.title ?? ''} article`}];
};

export async function loader({params, context}: LoaderFunctionArgs) {
  const {blogHandle, articleHandle} = params;

  if (!articleHandle || !blogHandle) {
    throw new Response('Not found', {status: 404});
  }

  const {blog} = await context.storefront.query(ARTICLE_QUERY, {
    variables: {blogHandle, articleHandle},
  });

  if (!blog?.articleByHandle) {
    throw new Response(null, {status: 404});
  }

  const article = blog.articleByHandle;

  return json({article});
}

export default function Article() {
  const {article} = useLoaderData<typeof loader>();
  const {title, image, contentHtml, author} = article;

  const publishedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article.publishedAt));

  return (
    <div className="article">
      <h1>Blog</h1>
      <FilDarianne />
      <div
        className="article-header"
        style={{
          backgroundImage: `url(${image?.url})`,
        }}
      >
        <div>
          <h2 className="titre">{title}</h2>
          <span>
            {publishedDate} &middot; {author?.name}
          </span>
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{__html: contentHtml}}
        className="article"
      />
      <div className="article-bottom">
        <Link to="/">
          <p>Retour à l&apos;acceuil</p>
        </Link>
        <Link to="/blogs/infos">
          <p>Voir plus de Blogs</p>
        </Link>
      </div>
    </div>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog#field-blog-articlebyhandle
const ARTICLE_QUERY = `#graphql
  query Article(
    $articleHandle: String!
    $blogHandle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
        title
        contentHtml
        publishedAt
        author: authorV2 {
          name
        }
        image {
          id
          altText
          url
          width
          height
        }
        seo {
          description
          title
        }
      }
    }
  }
` as const;
