import { ChangeEvent, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Fade,
  FormControl,
  FormHelperText,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useForm, Controller, FieldValues, FieldPath } from "react-hook-form";
import {
  MdCheck,
  MdClose,
  MdFileUpload,
  MdOutlineReportProblem,
} from "react-icons/md";
import { style } from "./CustomFileUpload.style";

interface FileUploadProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> {
  name: TName;
  control: any;
  label?: string;
  accept?: string;
  loading?: boolean;
  loadingText?: string;
  failed?: boolean;
  helperText?: string;
  onSubmit: (file: File) => void;
}

export default function CustomFileUploadField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  name,
  control,
  label,
  accept = "",
  loading = false,
  loadingText = "Uploading...",
  failed = false,
  helperText = "",
  onSubmit,
}: FileUploadProps<TFieldValues, TName>) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onSubmit(selectedFile);
    }
  };

  return (
    <FormControl fullWidth>
      {label && (
        <Typography variant="body2" gutterBottom>
          {label}
        </Typography>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Box sx={style.field}>
              <input
                {...field}
                type="file"
                accept={accept}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  handleFileChange(e);
                  field.onChange(e);
                }}
                style={{ display: "none" }}
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <IconButton color="primary" component="span">
                  <MdFileUpload size={30} />
                </IconButton>
              </label>
              <Typography color="textSecondary">
                Drag and drop document, or <strong>Browse</strong>
              </Typography>
              <Typography color="textSecondary" variant="caption">
                Supports jpg, png, doc, zip, rar files
              </Typography>
            </Box>

            {selectedFile && (
              <Stack direction="row" alignItems="center" mt={2}>
                {loading ? (
                  <Fade in>
                    <Stack direction="row" alignItems="center" gap={1}>
                      <CircularProgress size={20} /> {loadingText}
                    </Stack>
                  </Fade>
                ) : (
                  <Fade in>
                    <Stack direction="row" alignItems="center" gap={1}>
                      {failed ? <MdOutlineReportProblem /> : <MdCheck />}{" "}
                      {failed ? "Upload Failed" : selectedFile.name}
                    </Stack>
                  </Fade>
                )}
                <IconButton onClick={() => setSelectedFile(null)} size="small">
                  <MdClose />
                </IconButton>
              </Stack>
            )}

            {helperText && <FormHelperText>{helperText}</FormHelperText>}
            {error && <FormHelperText error>{error.message}</FormHelperText>}
          </>
        )}
      />
    </FormControl>
  );
}
