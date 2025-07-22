/* eslint-disable @next/next/no-img-element */
'use client'
import { CloudUpload } from 'lucide-react'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface FileDropzoneProps {
  value?: File[]
  onChange?: (file: File[]) => void
}

export function FileDropzone(props: FileDropzoneProps) {
  const { value, onChange } = props
  const [preview, setPreview] = useState<string | null>(null)

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx',
      ],
    },
    maxFiles: 1,
    onDrop: (files) => {
      // Set preview for the first file
      if (files.length > 0) {
        const file = files[0]
        const filePreview = URL.createObjectURL(file)
        setPreview(filePreview)
        onChange && onChange(files)
      }
    },
  })

  return (
    <section className="container">
      <div
        {...getRootProps({
          className:
            'flex flex-col items-center justify-center w-full h-96 border-2 border-gray-400 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500',
        })}
      >
        <input
          {...getInputProps()}
          type="file"
        />
        {acceptedFiles.length > 0 ? (
          <div className="flex flex-col items-center justify-center gap-4">
            {preview && (
              <img
                alt="preview"
                src={'/svg/sheet.svg'}
                className="block w-20 h-20"
                onLoad={() => {
                  URL.revokeObjectURL(preview)
                }}
              />
            )}
            {acceptedFiles.map((file: any) => (
              <div
                key={file.path}
                className="flex flex-col items-center justify-center gap-2"
              >
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  {file.path}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {file.size} bytes
                </span>
                {/* <Button className="z-50">Previsualizar datos</Button> */}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center text-sm dark:text-gray-400">
            <CloudUpload
              size={64}
              className="text-gable-green-500"
            />
            <span className="font-semibold text-lg pb-1">
              Cargar un archivo o arrastrar y soltar
            </span>

            <em className="text-xs text-gray-500 dark:text-gray-400">*.xlsx</em>
          </div>
        )}
      </div>
    </section>
  )
}
