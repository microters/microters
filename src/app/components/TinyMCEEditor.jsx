"use client";

import React, { useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';
import { toastError } from "lib/toast";

export const TinyMCEEditor = React.memo(function TinyMCEEditor({
  value,
  onEditorChange,
}) {
  const editorRef = useRef(null);

  // Custom Image Upload Handler
  const imageUploadHandler = async (blobInfo, progress) => {
    try {
      const formData = new FormData();
      formData.append("file", blobInfo.blob(), blobInfo.filename());
      formData.append("title", blobInfo.filename().replace(/\.[^/.]+$/, ""));

      // Check if API URL is defined
      const apiUrl = process.env.NEXT_PUBLIC_MEDIA_API_URL;

      if (!apiUrl) {
        console.warn(
          "No Media API URL found (NEXT_PUBLIC_MEDIA_API_URL). Using local blob."
        );
        return Promise.resolve(URL.createObjectURL(blobInfo.blob()));
      }

      // --- REAL API UPLOAD ---
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Image upload failed");
      }

      const newMedia = await response.json();

      if (newMedia && newMedia.location) {
        return newMedia.location;
      } else {
        throw new Error("API response missing 'location' property.");
      }
    } catch (error) {
      console.error("Image Upload Error:", error);
      toastError(`Image upload failed: ${error.message}`);
      throw error;
    }
  };

  return (
    <>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={value || ""}
        onEditorChange={(content) => {
          if (onEditorChange) {
            onEditorChange(content);
          }
        }}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
            "codesample",
          ],
          toolbar:
            "undo redo | blocks fontfamily fontsize | " +
            "bold italic forecolor | alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | link image media | " +
            "removeformat | code | help",

          images_upload_handler: imageUploadHandler,
          automatic_uploads: true,
          file_picker_types: "image",
          content_style: `
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; font-size: 16px; line-height: 1.6; color: #334155; }
            img { max-width: 100%; height: auto; border-radius: 8px; }
            `,
          branding: false,
          resize: true,
          statusbar: true,
        }}
      />
    </>
  );
});
