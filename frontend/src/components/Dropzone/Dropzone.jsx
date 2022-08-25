import React, { useState, useCallback } from "react";
import { FiUpload } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import './style.css';

export const Dropzone = ({ onFileUploaded }) => {
  const [selectecFileUrl, setSelectedFileUrl] = useState("");
  const onDrop = useCallback(
    (acceptedFiles) => {
      console.log(acceptedFiles);
      const file = acceptedFiles[0];

      const fileUrl = URL.createObjectURL(file);

      setSelectedFileUrl(fileUrl);
      onFileUploaded(file);
    },
    [onFileUploaded]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".csv",
  });

  return (
    <>
      <div className="dropzone" {...getRootProps()}>
        <input 
        {...getInputProps()} accept=".csv" />
        {selectecFileUrl ? (
          <p style={{ padding: "calc(40% - 40px)", flex: "center", justifyContent: "center" }} >Arquivo carregado</p>
        ) : (
          <p>
            <FiUpload />
            Clique para fazer o upload do arquivo
          </p>
        )}
      </div>
    </>
  );
};


