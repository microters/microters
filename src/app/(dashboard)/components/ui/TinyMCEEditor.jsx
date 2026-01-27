'use client';

import { Editor } from '@tinymce/tinymce-react';

export function TinyMCEEditor({ value, onEditorChange }) {
  
  const handleImageUpload = async (blobInfo, progress) => {
    return new Promise(async (resolve, reject) => {
      const formData = new FormData();
      formData.append('image', blobInfo.blob(), blobInfo.filename());

      try {
        const apiUrl = process.env.NEXT_PUBLIC_MEDIA_API_URL || 'https://api.microters.com/upload';

        const response = await fetch(apiUrl, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Image upload failed');
        }

        const json = await response.json();

        const imageUrl = json.url || json.location;

        if (!imageUrl) {
          reject('Invalid JSON response from server: No image URL found.');
          return;
        }

        resolve(imageUrl);

      } catch (error) {
        console.error('TinyMCE Upload Error:', error);
        reject('Image upload failed: ' + error.message);
      }
    });
  };

  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
      value={value}
      onEditorChange={onEditorChange}
      init={{
        height: 500,
        menubar: true,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | image media link table | code',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        
        images_upload_handler: handleImageUpload,
        automatic_uploads: true,
        file_picker_types: 'image',
      }}
    />
  );
}