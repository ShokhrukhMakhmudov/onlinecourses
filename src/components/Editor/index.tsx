"use client";

import { CKEditor, useCKEditorCloud } from "@ckeditor/ckeditor5-react";
import { useEffect, useState, useRef } from "react";

const Editor = ({
  handleDescChange,
  description = "",
}: {
  handleDescChange: (value: string) => void;
  description: string;
}) => {
  const [editorData, setEditorData] = useState("<p>Qo'shimcha ma`lumot!</p>");
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    if (description && isMounted.current) {
      setEditorData(description);
    }
    return () => {
      isMounted.current = false;
    };
  }, [description]);

  const cloud = useCKEditorCloud({
    version: "44.1.0",
    premium: false,
  });

  if (cloud.status === "error") {
    return <div>Error loading CKEditor!</div>;
  }

  if (cloud.status === "loading") {
    return <div>Loading CKEditor...</div>;
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
    ImageStyle,
  } = cloud.CKEditor;

  return (
    <CKEditor
      editor={ClassicEditor}
      data={editorData}
      onChange={(e, editor) => {
        if (isMounted.current) {
          const data = editor.getData();
          handleDescChange(data);
        }
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
          ImageStyle,
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
            "ImageStyle:alignLeft",
            "ImageStyle:alignCenter",
            "ImageStyle:alignRight",
            "ImageStyle:inline",
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
