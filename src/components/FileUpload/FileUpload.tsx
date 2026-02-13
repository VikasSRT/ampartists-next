import {
  useCallback,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { useDropzone } from "react-dropzone";
import Upload from "../../assets/icons/upload.svg";
import styles from "./fileupload.module.css";

interface IProps {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  title?: string;
  children?: ReactNode;
  acceptTypes?: string[];
}

export default function FileUpload({
  file,
  setFile,
  title = "Click to upload your EPK",
  children,
  acceptTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/png",
    "image/webp",
  ],
}: IProps) {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];

    if (!uploadedFile) return;

    const isValidType = acceptTypes.includes(uploadedFile.type);

    const isValidSize = uploadedFile.size <= 10 * 1024 * 1024;

    if (!isValidType) {
      setError("Unsupported file type.");
      setFile(null);
      return;
    }

    if (!isValidSize) {
      setError("File size must be less than 10MB.");
      setFile(null);
      return;
    }

    setError(null);
    setFile(uploadedFile);
  }, []);

  const dropzoneAccept = acceptTypes.reduce((acc, type) => {
    const ext = {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    }[type];

    if (ext) acc[type] = ext;
    return acc;
  }, {} as Record<string, string[]>);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: dropzoneAccept,
    maxSize: 10 * 1024 * 1024,
  });

  return (
    <div className={styles.container}>
      <div {...getRootProps({ className: styles.dropzone })}>
        <input {...getInputProps()} />
        {file ? (
          <p className={styles.fileInfo}>Uploaded: {file.name}</p>
        ) : (
          <>
            <Upload className={styles.icon} />
            <p className={styles.title}>{title}</p>
            {children}
          </>
        )}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
