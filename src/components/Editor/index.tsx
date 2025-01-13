"use client"; // only in App Router

import { CKEditor, useCKEditorCloud } from "@ckeditor/ckeditor5-react";

const Editor = ({
  handleDescChange,
  description = "<p>Kurs haqida ma`lumot!</p>",
}: {
  handleDescChange: (value: string) => void;
  description: string;
}) => {
  const cloud = useCKEditorCloud({
    version: "44.1.0",
    premium: false,
  });

  if (cloud.status === "error") {
    return <div>Error!</div>;
  }

  if (cloud.status === "loading") {
    return <div>Loading...</div>;
  }

  const {
    ClassicEditor,
    Essentials,
    Paragraph,
    Bold,
    Italic,
    Link,
    Image,
    ImageInsert,
    ImageUpload,
    ImageResize,
    ImageInline,
    ImageBlock,
    ImageTextAlternative,
    ImageToolbar,
    Table,
    Heading,
    BlockQuote,
    Alignment,
    Font,
    FontColor,
    ImageCaption,
    ImageEditing,
    ImageUploadUI,
    List,
    ListProperties,
    AutoImage,
    ImageStyle, // Make sure ImageStyle is included
  } = cloud.CKEditor;

  return (
    <CKEditor
      editor={ClassicEditor}
      data={description}
      onChange={(e, editor) => {
        const data = editor.getData();
        handleDescChange(data);
      }}
      config={{
        licenseKey: process.env.NEXT_PUBLIC_CKEDITOR_KEY as string,
        plugins: [
          Essentials,
          Paragraph,
          Bold,
          Italic,
          Link,
          FontColor,
          Heading,
          BlockQuote,
          Bold,
          Italic,
          Font,
          Link,
          List,
          ListProperties,
          Image,
          ImageInsert,
          ImageUpload,
          ImageUploadUI,
          ImageEditing,
          ImageCaption,
          ImageResize,
          ImageToolbar,
          ImageInline,
          ImageBlock,
          ImageTextAlternative,
          AutoImage,
          Alignment,
          Table,
          ImageStyle, // Add ImageStyle plugin
        ],
        toolbar: [
          "bold",
          "italic",
          "fontSize",
          "fontFamily",
          "fontColor",
          "|",
          "link",
          "bulletedList",
          "numberedList",
          "blockQuote",
          "|",
          "insertTable",
          "Alignment",
          "undo",
          "redo",
        ],
        image: {
          toolbar: [
            "ImageStyle:alignLeft", // Align left button
            "ImageStyle:alignCenter", // Align center button
            "ImageStyle:alignRight", // Align right button
            "ImageStyle:inline", // Inline button
          ],
          insert: {
            type: "auto",
          },
        },
        list: {
          properties: {
            styles: true,
            startIndex: true,
            reversed: true,
          },
        },
      }}
    />
  );
};

export default Editor;
