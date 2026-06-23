import { groq } from "next-sanity";

export const getPostsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    body
  }
`;

export const getPostBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    body
  }
`;

export const getTestimonialsQuery = groq`
  *[_type == "testimonial" && approved == true] | order(_createdAt desc) {
    _id,
    name,
    quote,
    _createdAt
  }
`;
