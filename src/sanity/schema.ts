export const schemaTypes = [
  {
    name: "post",
    title: "Post",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Title",
        type: "string",
      },
      {
        name: "slug",
        title: "Slug",
        type: "slug",
        options: {
          source: "title",
          maxLength: 96,
        },
      },
      {
        name: "mainImage",
        title: "Main image",
        type: "image",
        options: {
          hotspot: true,
        },
      },
      {
        name: "publishedAt",
        title: "Published at",
        type: "datetime",
      },
      {
        name: "body",
        title: "Body",
        type: "array",
        of: [{ type: "block" }],
      },
    ],
  },
  {
    name: "testimonial",
    title: "Testimonial",
    type: "document",
    fields: [
      {
        name: "name",
        title: "Name",
        type: "string",
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "quote",
        title: "Quote",
        type: "text",
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "approved",
        title: "Approved for Web",
        type: "boolean",
        initialValue: false,
        description: "Set to true to show this review on the website",
      },
    ],
  },
];
