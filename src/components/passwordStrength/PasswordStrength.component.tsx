import React from "react";
import { Box, Typography } from "@mui/material";
type Props = { password?: string };

export function CheckPasswordStrength({ password }: Props) {
  const atLeastMinimumLength = (password: string) => password.length >= 10;
  const atLeastOneUppercaseLetter = (password: string) =>
    /[A-Z]/.test(password);
  const atLeastOneLowercaseLetter = (password: string) =>
    /[a-z]/.test(password);
  const atLeastOneNumber = (password: string) => /\d/.test(password);
  function testingPasswordStrength(password?: string) {
    if (!password) return "WEAK";
    let points = 0;
    if (atLeastMinimumLength(password)) points += 1;
    if (atLeastOneUppercaseLetter(password)) points += 1;
    if (atLeastOneLowercaseLetter(password)) points += 1;
    if (atLeastOneNumber(password)) points += 1;
    if (points >= 4) return "Strong";
    if (points >= 2) return "Medium";
    return "WEAK";
  }
  function generateColors(strength: string): string[] {
    const NEUTRAL = "#E0E0E0";
    const WEAK = "#FF6B6B";
    const MEDIUM = "#FFD166";
    const STRONG = "#06D6A0";
    switch (strength) {
      case "WEAK":
        return [WEAK, NEUTRAL, NEUTRAL, NEUTRAL];
      case "Medium":
        return [MEDIUM, MEDIUM, NEUTRAL, NEUTRAL];
      case "Strong":
        return [STRONG, STRONG, STRONG, STRONG];
      default:
        return [NEUTRAL, NEUTRAL, NEUTRAL, NEUTRAL];
    }
  }
  const passwordStrength = testingPasswordStrength(password);
  const colors = generateColors(passwordStrength);
  return (
    <>
      <Box marginTop={2}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="5px"
          marginBottom={1}
        >
          {colors.map((color, index) => (
            <Box
              key={index}
              flex={1}
              height="5px"
              bgcolor={color}
              borderRadius="2px"
            />
          ))}
        </Box>
        <Typography color={passwordStrength === "WEAK" ? "#FF6B6B" : "#000"}>
          {passwordStrength}
        </Typography>
        {passwordStrength === "WEAK" && (
          <Typography variant="body2" color="text.secondary">
            It must have at least 10 characters, 1 uppercase, 1 lowercase, and 1
            digit.
          </Typography>
        )}
      </Box>
    </>
  );
}
