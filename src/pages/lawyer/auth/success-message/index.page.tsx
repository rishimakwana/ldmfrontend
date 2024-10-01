import { Container, IconButton, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { style } from "./SuccessMessage.style";
import { TiTick } from "react-icons/ti";
import { useRouter } from "next/navigation";

export default function SuccessMessage() {
  const { push } = useRouter();
  return (
    <>
      <style global jsx>{`
        main {
          display: flex;
          justify-content: center;
        }
      `}</style>

      <Container className="section-spacing-my">
        <Stack sx={style.box}>
          <IconButton sx={style.icon}>
            <TiTick />
          </IconButton>

          <Typography variant="h1" fontWeight="800">
            Account Created
            <Typography variant="body1" sx={style.text}>
              Thank you for completing the registration. Your account has been
              created. You’ll receive an email once your account is verified.
            </Typography>
          </Typography>

          <LoadingButton
            variant="contained"
            size="medium"
            onClick={() => push("/lawyer/auth/login")}
          >
            Ok
          </LoadingButton>
        </Stack>
      </Container>
    </>
  );
}
